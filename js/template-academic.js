// Academic Template Renderer
function renderAcademicTemplate(container, data) {
    let html = `
    <div class="template-container">
        <div class="header">
            <h1 class="editable">${data.personalInfo.name || 'Your Name'}</h1>
            <div class="contact-info">
                ${data.personalInfo.email ? `<span class="editable">${data.personalInfo.email}</span>` : ''}
                ${data.personalInfo.phone ? `<span class="editable">${data.personalInfo.phone}</span>` : ''}
            </div>
            
            ${data.personalInfo.photoPreview ? `
                <img src="${data.personalInfo.photoPreview}" alt="${data.personalInfo.name}" class="profile-photo">
            ` : ''}
        </div>
        
        <div class="content-grid">
            <div class="main-content">
                <div class="section">
                    <h2 class="section-title">Research Interests</h2>
                    <p class="editable">${data.personalInfo.bio || 'Write a brief introduction about yourself...'}</p>
                </div>
                
                <div class="section">
                    <h2 class="section-title">Experience</h2>
                    ${data.experience.map(exp => `
                        <div class="experience-item">
                            <div class="experience-header">
                                <h3 class="experience-title editable">${exp.position || 'Position'}</h3>
                                <span class="experience-duration editable">${exp.duration || 'Duration'}</span>
                            </div>
                            <h4 class="experience-company editable">${exp.company || 'Company'}</h4>
                            <p class="experience-description editable">${exp.description || 'Description'}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div class="section">
                    <h2 class="section-title">Publications & Projects</h2>
                    ${data.projects.map(project => `
                        <div class="project-item">
                            <h3 class="project-title editable">${project.title || 'Project Title'}</h3>
                            <p class="project-description editable">${project.description || 'Project Description'}</p>
                            ${project.link ? `<a href="${project.link}" class="project-link editable" target="_blank">${project.link}</a>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="sidebar">
                <div class="sidebar-section">
                    <h2 class="sidebar-title">Skills</h2>
                    <div class="skills-list">
                        ${data.skills.map(skill => `
                            <div class="skill-item">
                                <div class="skill-dot"></div>
                                <span class="editable">${skill}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="sidebar-section">
                    <h2 class="sidebar-title">Languages</h2>
                    <div class="languages-list">
                        ${data.languages.map(language => `
                            <div class="language-item">
                                <div class="language-dot"></div>
                                <span class="editable">${language}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="sidebar-section">
                    <h2 class="sidebar-title">Research Goals</h2>
                    <p class="editable">${data.goals || 'Describe your research goals and aspirations...'}</p>
                </div>
            </div>
        </div>
    </div>
`;

    container.innerHTML = html;
}