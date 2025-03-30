// Corporate Template Renderer
function renderCorporateTemplate(container, data) {
    let html = `
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
        
        <div class="main-content">
            <div class="section">
                <h2 class="section-title">Professional Summary</h2>
                <p class="editable">${data.personalInfo.bio || 'Write a brief introduction about yourself...'}</p>
            </div>
            
            <div class="section">
                <h2 class="section-title">Skills</h2>
                <div class="skills-list">
                    ${data.skills.map(skill => `
                        <div class="skill-item">
                            <span class="editable">${skill}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Languages</h2>
                <div class="skills-list">
                    ${data.languages.map(language => `
                        <div class="skill-item">
                            <span class="editable">${language}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Professional Experience</h2>
                ${data.experience.map(exp => `
                    <div class="experience-item">
                        <h3 class="experience-title editable">${exp.position || 'Position'}</h3>
                        <h4 class="experience-company editable">${exp.company || 'Company'}</h4>
                        <span class="experience-duration editable">${exp.duration || 'Duration'}</span>
                        <p class="editable">${exp.description || 'Description'}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="section">
                <h2 class="section-title">Projects</h2>
                ${data.projects.map(project => `
                    <div class="project-item">
                        <h3 class="project-title editable">${project.title || 'Project Title'}</h3>
                        <p class="editable">${project.description || 'Project Description'}</p>
                        ${project.link ? `<a href="${project.link}" class="editable" target="_blank">${project.link}</a>` : ''}
                    </div>
                `).join('')}
            </div>
            
            <div class="section">
                <h2 class="section-title">Career Objectives</h2>
                <p class="editable">${data.goals || 'Describe your career goals and aspirations...'}</p>
            </div>
        </div>
    `;

    container.innerHTML = html;
}