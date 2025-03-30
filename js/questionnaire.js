// Questionnaire functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    // Declare requireAuth if it's not globally available
    let requireAuth = window.requireAuth || function() {
        // Implement your authentication logic here or leave it empty if no authentication is needed
        console.warn('requireAuth function is not defined.  Define it or remove the call if no authentication is required.');
    };

    if (typeof requireAuth === 'function') {
        requireAuth();
    }
    
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Get existing portfolio data if available for current user
    let portfolioData = JSON.parse(localStorage.getItem(`portfolioData_${currentUser.id}`)) || {
        personalInfo: {},
        skills: [],
        languages: [],
        experience: [{}],
        projects: [{}],
        goals: ''
    };
    
    // Fill form with existing data if available
    if (portfolioData.personalInfo) {
        document.getElementById('name').value = portfolioData.personalInfo.name || '';
        document.getElementById('email').value = portfolioData.personalInfo.email || '';
        document.getElementById('phone').value = portfolioData.personalInfo.phone || '';
        document.getElementById('bio').value = portfolioData.personalInfo.bio || '';
        
        if (portfolioData.personalInfo.photoPreview) {
            const photoPreview = document.getElementById('photo-preview');
            photoPreview.innerHTML = `<img src="${portfolioData.personalInfo.photoPreview}" alt="Profile Photo">`;
        }
    }
    
    // Fill skills
    if (portfolioData.skills && portfolioData.skills.length > 0) {
        renderTags('skills-tags', portfolioData.skills);
    }
    
    // Fill languages
    if (portfolioData.languages && portfolioData.languages.length > 0) {
        renderTags('languages-tags', portfolioData.languages);
    }
    
    // Fill experience
    if (portfolioData.experience && portfolioData.experience.length > 0) {
        const experienceContainer = document.getElementById('experience-container');
        experienceContainer.innerHTML = '';
        
        portfolioData.experience.forEach((exp, index) => {
            const expItem = createExperienceItem(index + 1, exp);
            experienceContainer.appendChild(expItem);
        });
    }
    
    // Fill projects
    if (portfolioData.projects && portfolioData.projects.length > 0) {
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = '';
        
        portfolioData.projects.forEach((project, index) => {
            const projectItem = createProjectItem(index + 1, project);
            projectsContainer.appendChild(projectItem);
        });
    }
    
    // Fill goals
    if (portfolioData.goals) {
        document.getElementById('goals').value = portfolioData.goals;
    }
    
    // Handle photo upload
    document.getElementById('photo').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const photoPreview = document.getElementById('photo-preview');
                photoPreview.innerHTML = `<img src="${event.target.result}" alt="Profile Photo">`;
                portfolioData.personalInfo.photoPreview = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Handle skills input
    document.getElementById('skills').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const skillsInput = document.getElementById('skills');
            const skill = skillsInput.value.trim();
            
            if (skill) {
                if (!portfolioData.skills) {
                    portfolioData.skills = [];
                }
                
                portfolioData.skills.push(skill);
                renderTags('skills-tags', portfolioData.skills);
                skillsInput.value = '';
            }
        }
    });
    
    // Handle languages input
    document.getElementById('languages').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const languagesInput = document.getElementById('languages');
            const language = languagesInput.value.trim();
            
            if (language) {
                if (!portfolioData.languages) {
                    portfolioData.languages = [];
                }
                
                portfolioData.languages.push(language);
                renderTags('languages-tags', portfolioData.languages);
                languagesInput.value = '';
            }
        }
    });
    
    // Handle add experience button
    document.getElementById('add-experience').addEventListener('click', function() {
        const experienceContainer = document.getElementById('experience-container');
        const experienceCount = experienceContainer.children.length;
        const newExperienceItem = createExperienceItem(experienceCount + 1);
        experienceContainer.appendChild(newExperienceItem);
    });
    
    // Handle add project button
    document.getElementById('add-project').addEventListener('click', function() {
        const projectsContainer = document.getElementById('projects-container');
        const projectCount = projectsContainer.children.length;
        const newProjectItem = createProjectItem(projectCount + 1);
        projectsContainer.appendChild(newProjectItem);
    });
    
    // Handle next button clicks
    const nextButtons = document.querySelectorAll('.btn-next');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const currentStepNum = parseInt(currentStep.id.split('-')[1]);
            const nextStepNum = currentStepNum + 1;
            
            // Save data from current step
            saveStepData(currentStepNum);
            
            // Hide current step
            currentStep.classList.remove('active');
            
            // Show next step
            const nextStep = document.getElementById(`step-${nextStepNum}`);
            nextStep.classList.add('active');
            
            // Update progress bar
            updateProgressBar(nextStepNum);
        });
    });
    
    // Handle previous button clicks
    const prevButtons = document.querySelectorAll('.btn-prev');
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const currentStepNum = parseInt(currentStep.id.split('-')[1]);
            const prevStepNum = currentStepNum - 1;
            
            // Save data from current step
            saveStepData(currentStepNum);
            
            // Hide current step
            currentStep.classList.remove('active');
            
            // Show previous step
            const prevStep = document.getElementById(`step-${prevStepNum}`);
            prevStep.classList.add('active');
            
            // Update progress bar
            updateProgressBar(prevStepNum);
        });
    });
    
    // Handle submit button click
    document.getElementById('submit-questionnaire').addEventListener('click', function() {
        // Save data from last step
        saveStepData(5);
        
        // Save portfolio data to localStorage with user ID
        localStorage.setItem(`portfolioData_${currentUser.id}`, JSON.stringify(portfolioData));
        
        // Update user's questionnaire status
        updateCurrentUser({ questionnaire: true });
        
        // Redirect to templates page
        window.location.href = 'templates.html';
    });
    
    // Helper function to update progress bar
    function updateProgressBar(stepNum) {
        const progressSteps = document.querySelectorAll('.progress-step');
        
        progressSteps.forEach((step, index) => {
            if (index + 1 < stepNum) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index + 1 === stepNum) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }
    
    // Helper function to save data from a step
    function saveStepData(stepNum) {
        switch (stepNum) {
            case 1:
                portfolioData.personalInfo = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    bio: document.getElementById('bio').value,
                    photoPreview: portfolioData.personalInfo.photoPreview || null
                };
                break;
            case 2:
                // Skills and languages are already saved in the event listeners
                break;
            case 3:
                portfolioData.experience = [];
                const experienceItems = document.querySelectorAll('.experience-item');
                
                experienceItems.forEach((item, index) => {
                    portfolioData.experience.push({
                        position: document.getElementById(`position-${index + 1}`).value,
                        company: document.getElementById(`company-${index + 1}`).value,
                        duration: document.getElementById(`duration-${index + 1}`).value,
                        description: document.getElementById(`description-${index + 1}`).value
                    });
                });
                break;
            case 4:
                portfolioData.projects = [];
                const projectItems = document.querySelectorAll('.project-item');
                
                projectItems.forEach((item, index) => {
                    portfolioData.projects.push({
                        title: document.getElementById(`project-title-${index + 1}`).value,
                        description: document.getElementById(`project-description-${index + 1}`).value,
                        link: document.getElementById(`project-link-${index + 1}`).value
                    });
                });
                break;
            case 5:
                portfolioData.goals = document.getElementById('goals').value;
                break;
        }
    }
    
    // Helper function to render tags
    function renderTags(containerId, tags) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        tags.forEach((tag, index) => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag';
            tagElement.innerHTML = `
                ${tag}
                <span class="tag-remove" data-index="${index}">×</span>
            `;
            container.appendChild(tagElement);
        });
        
        // Add event listeners to remove buttons
        const removeButtons = container.querySelectorAll('.tag-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (containerId === 'skills-tags') {
                    portfolioData.skills.splice(index, 1);
                    renderTags('skills-tags', portfolioData.skills);
                } else if (containerId === 'languages-tags') {
                    portfolioData.languages.splice(index, 1);
                    renderTags('languages-tags', portfolioData.languages);
                }
            });
        });
    }
    
    // Helper function to create experience item
    function createExperienceItem(index, data = {}) {
        const div = document.createElement('div');
        div.className = 'experience-item';
        div.innerHTML = `
            <div class="form-group">
                <label for="position-${index}">Position</label>
                <input type="text" id="position-${index}" name="position-${index}" value="${data.position || ''}">
            </div>
            <div class="form-group">
                <label for="company-${index}">Company</label>
                <input type="text" id="company-${index}" name="company-${index}" value="${data.company || ''}">
            </div>
            <div class="form-group">
                <label for="duration-${index}">Duration</label>
                <input type="text" id="duration-${index}" name="duration-${index}" placeholder="e.g., Jan 2020 - Present" value="${data.duration || ''}">
            </div>
            <div class="form-group">
                <label for="description-${index}">Description</label>
                <textarea id="description-${index}" name="description-${index}" rows="3">${data.description || ''}</textarea>
            </div>
        `;
        return div;
    }
    
    // Helper function to create project item
    function createProjectItem(index, data = {}) {
        const div = document.createElement('div');
        div.className = 'project-item';
        div.innerHTML = `
            <div class="form-group">
                <label for="project-title-${index}">Project Title</label>
                <input type="text" id="project-title-${index}" name="project-title-${index}" value="${data.title || ''}">
            </div>
            <div class="form-group">
                <label for="project-description-${index}">Description</label>
                <textarea id="project-description-${index}" name="project-description-${index}" rows="3">${data.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="project-link-${index}">Project Link (Optional)</label>
                <input type="url" id="project-link-${index}" name="project-link-${index}" placeholder="https://..." value="${data.link || ''}">
            </div>
        `;
        return div;
    }
});