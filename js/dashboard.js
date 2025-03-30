// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (typeof requireAuth === 'function') {
        // Assuming requireAuth is defined elsewhere or should be a no-op if not defined
        if (typeof window.requireAuth === 'undefined') {
            window.requireAuth = function() {
                // No-op function if requireAuth is not defined
                console.warn('requireAuth is not defined.  Skipping authentication.');
            };
        }
        requireAuth();
    }
    
    // Get portfolio data
    const portfolioData = JSON.parse(localStorage.getItem('portfolioData')) || null;
    const selectedTemplate = localStorage.getItem('selectedTemplate') || null;
    
    // Update status container
    const statusContainer = document.getElementById('status-container');
    if (statusContainer) {
        let statusHTML = '';
        
        if (portfolioData) {
            statusHTML += `
                <div class="status-item">
                    <div class="status-icon status-complete">✓</div>
                    <span>Questionnaire completed</span>
                </div>
            `;
            
            if (selectedTemplate) {
                statusHTML += `
                    <div class="status-item">
                        <div class="status-icon status-complete">✓</div>
                        <span>Template selected: ${selectedTemplate}</span>
                    </div>
                `;
            } else {
                statusHTML += `
                    <div class="status-item">
                        <div class="status-icon status-incomplete">!</div>
                        <span>Template not selected</span>
                    </div>
                `;
            }
        } else {
            statusHTML += `
                <div class="status-item">
                    <div class="status-icon status-incomplete">!</div>
                    <span>Questionnaire not completed</span>
                </div>
            `;
        }
        
        statusContainer.innerHTML = statusHTML;
    }
    
    // Update action buttons
    const continueBtn = document.getElementById('continue-btn');
    const previewBtn = document.getElementById('preview-btn');
    
    if (portfolioData) {
        if (continueBtn) {
            continueBtn.style.display = 'flex';
            
            if (selectedTemplate) {
                continueBtn.href = 'preview.html';
            } else {
                continueBtn.href = 'templates.html';
            }
        }
        
        if (previewBtn && selectedTemplate) {
            previewBtn.style.display = 'flex';
            previewBtn.href = 'preview.html';
        }
    }
});