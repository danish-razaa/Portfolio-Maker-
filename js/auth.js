// Authentication related functions

// Check if user is logged in
function checkAuth() {
    // If on index.html, completely bypass authentication
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        return true;
    }

    const currentUser = localStorage.getItem('currentUser');
    
    // If on login.html or signup.html, don't redirect
    if (window.location.pathname.includes('login.html') || 
        window.location.pathname.includes('signup.html')) {
        return true;
    }
    
    // For all other pages, require authentication
    if (!currentUser) {
        window.location.href = 'login.html';
        return false;
    }
    
    // Update user name display if element exists
    const userNameElements = document.querySelectorAll('#user-name');
    if (userNameElements.length > 0) {
        const userData = JSON.parse(currentUser);
        userNameElements.forEach(element => {
            element.textContent = userData.name;
        });
    }
    
    // Setup logout button if it exists
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    return true;
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Basic validation
    if (!email || !password) {
        errorMessage.textContent = 'Please enter both email and password.';
        return;
    }
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        errorMessage.textContent = 'Invalid email or password.';
        return;
    }
    
    // Store current user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

// Handle signup form submission
function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        errorMessage.textContent = 'Please fill in all fields.';
        return;
    }
    
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.email === email)) {
        errorMessage.textContent = 'Email already in use.';
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        questionnaire: null,
        selectedTemplate: null
    };
    
    // Add to users array
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set as current user
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

// Logout function
function logout() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        // Clear user-specific portfolio data
        localStorage.removeItem(`portfolioData_${currentUser.id}`);
    }
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Get current user data
function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        return null;
    }
    return JSON.parse(currentUser);
}

// Update current user data
function updateCurrentUser(userData) {
    // Get current user
    const currentUser = getCurrentUser();
    if (!currentUser) {
        return false;
    }
    
    // Update user data
    const updatedUser = { ...currentUser, ...userData };
    
    // Update in localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(user => {
        if (user.id === currentUser.id) {
            return updatedUser;
        }
        return user;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    return true;
}

// Initialize auth-related event listeners
function initAuth() {
    // Check if user is logged in
    checkAuth();
    
    // Setup login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Setup signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initAuth);