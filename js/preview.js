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
            document.querySelectorAll('.editable').forEach(element => {
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
            localStorage.setItem(`editedPortfolio_${currentUser.id}`, portfolioContainer.innerHTML);
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
