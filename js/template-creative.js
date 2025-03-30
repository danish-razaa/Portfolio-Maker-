// Creative Template Renderer
function renderCreativeTemplate(container, data) {
    let html = `
        <div class="header">
            ${data.personalInfo.photoPreview ? `
                <img src="${data.personalInfo.photoPreview}" alt="${data.personalInfo.name}" class="profile-photo">
            ` : ''}
            
            <h1 class="editable">${data.personalInfo.name || 'Your Name'}</h1>
            <div class="contact-info">
                ${data.personalInfo.email ? `<span class="editable">${data.personalInfo.email}</span>` : ''}
                ${data.personalInfo.phone ? `<span class="editable">${data.personalInfo.phone}</span>` : ''}
            </div>
        </div>
        
        <div class="content">
            <div class="section">
                <h2 class="section-title">About Me</h2>
                <p class="editable">${data.personalInfo.bio || 'Write a brief introduction about yourself...'}</p>
            </div>
            
            <div class="section">
                <h2 class="section-title">Skills</h2>
                <div class="skills-container">
                    ${(data.skills || []).map(skill => `
                        <div class="skill-item">
                            <span class="editable">${skill}</span>
                        </div>
                    `).join('')}
                    ${(!data.skills || data.skills.length === 0) ? `
                        <div class="skill-item">
                            <span class="editable">Add your skills here</span>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Languages</h2>
                <div class="skills-container">
                    ${(data.languages || []).map(language => `
                        <div class="skill-item">
                            <span class="editable">${language}</span>
                        </div>
                    `).join('')}
                    ${(!data.languages || data.languages.length === 0) ? `
                        <div class="skill-item">
                            <span class="editable">Add your languages here</span>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Experience</h2>
                ${(data.experience || []).map(exp => `
                    <div class="experience-item">
                        <h3 class="experience-title editable">${exp.position || 'Position'}</h3>
                        <h4 class="experience-company editable">${exp.company || 'Company'}</h4>
                        <span class="experience-duration editable">${exp.duration || 'Duration'}</span>
                        <p class="editable">${exp.description || 'Description'}</p>
                    </div>
                `).join('')}
                ${(!data.experience || data.experience.length === 0) ? `
                    <div class="experience-item">
                        <h3 class="experience-title editable">Add your experience here</h3>
                        <h4 class="experience-company editable">Company</h4>
                        <span class="experience-duration editable">Duration</span>
                        <p class="editable">Description</p>
                    </div>
                ` : ''}
            </div>
            
            <div class="section">
                <h2 class="section-title">Projects</h2>
                ${(data.projects || []).map(project => `
                    <div class="project-item">
                        <h3 class="project-title editable">${project.title || 'Project Title'}</h3>
                        <p class="editable">${project.description || 'Project Description'}</p>
                        ${project.link ? `<a href="${project.link}" class="editable" target="_blank">${project.link}</a>` : ''}
                    </div>
                `).join('')}
                ${(!data.projects || data.projects.length === 0) ? `
                    <div class="project-item">
                        <h3 class="project-title editable">Add your project here</h3>
                        <p class="editable">Project Description</p>
                        <a href="#" class="editable" target="_blank">Project Link</a>
                    </div>
                ` : ''}
            </div>
            
            <div class="section">
                <h2 class="section-title">Goals & Aspirations</h2>
                <p class="editable">${data.goals || 'Describe your career goals and aspirations...'}</p>
            </div>
        </div>
    `;

    container.innerHTML = html;
}