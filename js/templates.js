document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (typeof requireAuth === 'function') {
        requireAuth();
    } else {
        console.warn('requireAuth is not defined. Assuming user is authenticated.');
    }
    
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Get portfolio data for current user
    let portfolioData = JSON.parse(localStorage.getItem(`portfolioData_${currentUser.id}`)) || {};

    // If no portfolio data, redirect to questionnaire
    if (Object.keys(portfolioData).length === 0) {
        window.location.href = 'questionnaire.html';
        return;
    }

    // Handle template selection
    const selectButtons = document.querySelectorAll('.btn-select');
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const templateCard = this.closest('.template-card');
            
            if (!templateCard) {
                console.error('Template card not found.');
                return;
            }

            const templateName = templateCard.getAttribute('data-template');

            if (!templateName) {
                console.error('Template name is missing on selected template card.');
                return;
            }

            // Update current user with selected template
            currentUser.selectedTemplate = templateName;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Save selected template to localStorage with user ID
            localStorage.setItem(`selectedTemplate_${currentUser.id}`, templateName);

            // Show loading state
            button.textContent = 'Selecting...';
            button.disabled = true;

            // Redirect to preview page after a short delay
            setTimeout(() => {
                window.location.href = 'preview.html';
            }, 1000);
        });
    });
});
