// Tech Template Renderer
function renderTechTemplate(container, data) {
    let html = `
    <div class="template-container">
        <div class="header">
            ${data.personalInfo.photoPreview ? `
                <img src="${data.personalInfo.photoPreview}" alt="${data.personalInfo.name}" class="profile-photo">
            ` : ''}
            
            <div class="header-content">
                <h1 class="editable">${data.personalInfo.name || 'Your Name'}</h1>
                <div class="contact-info">
                    ${data.personalInfo.email ? `<span class="editable">${data.personalInfo.email}</span>` : ''}
                    ${data.personalInfo.phone ? `<span class="editable">${data.personalInfo.phone}</span>` : ''}
                </div>
            </div>
        </div>
        
        <div class="content-grid">
            <div class="sidebar">
                <div class="sidebar-section">
                    <h2 class="sidebar-title">Skills</h2>
                    <div class="skills-list">
                        ${(data.skills || []).map(skill => `
                            <div class="skill-item">
                                <span>${skill}</span>
                            </div>
                        `).join('')}
                        ${(!data.skills || data.skills.length === 0) ? `
                            <div class="skill-item">
                                <span>No skills added yet</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="sidebar-section">
                    <h2 class="sidebar-title">Languages</h2>
                    <div class="languages-list">
                        ${(data.languages || []).map(language => `
                            <div class="language-item">
                                <span>${language}</span>
                            </div>
                        `).join('')}
                        ${(!data.languages || data.languages.length === 0) ? `
                            <div class="language-item">
                                <span>No languages added yet</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="sidebar-section">
                    <h2 class="sidebar-title">Goals</h2>
                    <p class="editable">${data.goals || 'Describe your career goals and aspirations...'}</p>
                </div>
            </div>
            
            <div class="main-content">
                <div class="section">
                    <h2 class="section-title">About Me</h2>
                    <p class="editable">${data.personalInfo.bio || 'Write a brief introduction about yourself...'}</p>
                </div>
                
                <div class="section">
                    <h2 class="section-title">Experience</h2>
                    ${(data.experience || []).map(exp => `
                        <div class="experience-item">
                            <div class="experience-header">
                                <h3 class="experience-title editable">${exp.position || 'Position'}</h3>
                                <span class="experience-duration editable">${exp.duration || 'Duration'}</span>
                            </div>
                            <h4 class="experience-company editable">${exp.company || 'Company'}</h4>
                            <p class="experience-description editable">${exp.description || 'Description'}</p>
                        </div>
                    `).join('')}
                    ${(!data.experience || data.experience.length === 0) ? `
                        <div class="experience-item">
                            <div class="experience-header">
                                <h3 class="experience-title editable">Add your experience here</h3>
                                <span class="experience-duration editable">Duration</span>
                            </div>
                            <h4 class="experience-company editable">Company</h4>
                            <p class="experience-description editable">Description</p>
                        </div>
                    ` : ''}
                </div>
                
                <div class="section">
                    <h2 class="section-title">Projects</h2>
                    ${(data.projects || []).map(project => `
                        <div class="project-item">
                            <h3 class="project-title editable">${project.title || 'Project Title'}</h3>
                            <p class="project-description editable">${project.description || 'Project Description'}</p>
                            ${project.link ? `<a href="${project.link}" class="project-link editable" target="_blank">${project.link}</a>` : ''}
                        </div>
                    `).join('')}
                    ${(!data.projects || data.projects.length === 0) ? `
                        <div class="project-item">
                            <h3 class="project-title editable">Add your project here</h3>
                            <p class="project-description editable">Project Description</p>
                            <a href="#" class="project-link editable" target="_blank">Project Link</a>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    </div>
`;

    container.innerHTML = html;
}