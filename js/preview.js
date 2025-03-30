document.addEventListener('DOMContentLoaded', function() {
    // Ensure requireAuth exists before calling
    if (typeof requireAuth === 'function') {
        requireAuth();
    }

    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Get portfolio data and selected template for current user
    let portfolioData = JSON.parse(localStorage.getItem(`portfolioData_${currentUser.id}`));
    const selectedTemplate = localStorage.getItem(`selectedTemplate_${currentUser.id}`);

    // If no portfolio data or template, redirect to appropriate page
    if (!portfolioData) {
        window.location.href = 'questionnaire.html';
        return;
    }

    if (!selectedTemplate) {
        window.location.href = 'templates.html';
        return;
    }

    // Ensure portfolio data has all required fields
    portfolioData = {
        personalInfo: portfolioData.personalInfo || {},
        skills: portfolioData.skills || [],
        languages: portfolioData.languages || [],
        experience: portfolioData.experience || [],
        projects: portfolioData.projects || [],
        goals: portfolioData.goals || ''
    };

    // Get portfolio container and ensure it exists
    const portfolioContainer = document.getElementById('portfolio-container');
    if (!portfolioContainer) {
        console.error('Portfolio container not found.');
        return;
    }

    portfolioContainer.className = `template-container template-${selectedTemplate}`;

    // Define template render functions
    const renderFunctions = {
        modern: renderModernTemplate,
        creative: renderCreativeTemplate,
        corporate: renderCorporateTemplate,
        tech: renderTechTemplate,
        academic: renderAcademicTemplate
    };

    // Render the selected template if function exists
    if (typeof renderFunctions[selectedTemplate] === 'function') {
        renderFunctions[selectedTemplate](portfolioContainer, portfolioData);
    } else {
        console.error(`No render function found for template: ${selectedTemplate}`);
    }

    // Handle edit mode
    const editBtn = document.getElementById('edit-btn');
    const saveEditsBtn = document.getElementById('save-edits-btn');
    const cancelEditsBtn = document.getElementById('cancel-edits-btn');
    const downloadBtn = document.getElementById('download-btn');
    const changeTemplateBtn = document.getElementById('change-template-btn');

    if (editBtn) {
        editBtn.addEventListener('click', function() {
            document.querySelector('.edit-mode-container').style.display = 'flex';
            // Only make non-skills and non-languages elements editable
            document.querySelectorAll('.editable:not(.skill-item .editable):not(.language-item .editable)').forEach(element => {
                element.contentEditable = true;
                element.classList.add('editing');
            });
        });
    }

    if (saveEditsBtn) {
        saveEditsBtn.addEventListener('click', function() {
            document.querySelector('.edit-mode-container').style.display = 'none';
            document.querySelectorAll('.editable').forEach(element => {
                element.contentEditable = false;
                element.classList.remove('editing');
            });

            // Update portfolio data with edited content (excluding skills and languages)
            const editedExperience = Array.from(document.querySelectorAll('.experience-item')).map(item => ({
                position: item.querySelector('.experience-title')?.textContent || '',
                company: item.querySelector('.experience-company')?.textContent || '',
                duration: item.querySelector('.experience-duration')?.textContent || '',
                description: item.querySelector('.experience-description')?.textContent || ''
            }));

            const editedProjects = Array.from(document.querySelectorAll('.project-item')).map(item => ({
                title: item.querySelector('.project-title')?.textContent || '',
                description: item.querySelector('.project-description')?.textContent || '',
                link: item.querySelector('.project-link')?.href || ''
            }));

            portfolioData.experience = editedExperience;
            portfolioData.projects = editedProjects;
            portfolioData.personalInfo.bio = document.querySelector('.section p.editable')?.textContent || '';
            portfolioData.goals = document.querySelector('.section:last-child p.editable')?.textContent || '';
            
            // Save updated data
            localStorage.setItem(`portfolioData_${currentUser.id}`, JSON.stringify(portfolioData));
        });
    }

    if (cancelEditsBtn) {
        cancelEditsBtn.addEventListener('click', function() {
            document.querySelector('.edit-mode-container').style.display = 'none';
            location.reload();
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            if (!portfolioContainer) return;
            const portfolioClone = portfolioContainer.cloneNode(true);
            portfolioClone.querySelectorAll('.editable').forEach(element => {
                element.removeAttribute('contenteditable');
                element.classList.remove('editing');
            });

            const userName = portfolioData?.personalInfo?.name || 'Portfolio';
            const filename = `${userName.replace(/\s+/g, '_')}_Portfolio.pdf`;

            if (typeof html2pdf === 'undefined') {
                console.error('html2pdf is not defined. Make sure to include the library.');
                return;
            }

            html2pdf().set({
                margin: 10,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            }).from(portfolioClone).save();
        });
    }

    if (changeTemplateBtn) {
        changeTemplateBtn.addEventListener('click', function() {
            window.location.href = 'templates.html';
        });
    }
});
