document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginButton = document.getElementById('loginButton');
    const successMessage = document.getElementById('successMessage');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const icon = this.querySelector('i');
        if (type === 'text') {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
    
    // Form validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePassword(password) {
        return password.length >= 6;
    }
    
    // Real-time validation
    emailInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            emailError.textContent = 'Email is required';
            this.parentElement.classList.add('error');
        } else if (!validateEmail(this.value)) {
            emailError.textContent = 'Please enter a valid email address';
            this.parentElement.classList.add('error');
        } else {
            emailError.textContent = '';
            this.parentElement.classList.remove('error');
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            passwordError.textContent = 'Password is required';
            this.parentElement.classList.add('error');
        } else if (!validatePassword(this.value)) {
            passwordError.textContent = 'Password must be at least 6 characters';
            this.parentElement.classList.add('error');
        } else {
            passwordError.textContent = '';
            this.parentElement.classList.remove('error');
        }
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const rememberMe = document.getElementById('remember').checked;
        
        // Validate form
        let isValid = true;
        
        if (email === '' || !validateEmail(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.parentElement.classList.add('error');
            isValid = false;
        }
        
        if (password === '' || !validatePassword(password)) {
            passwordError.textContent = 'Password must be at least 6 characters';
            passwordInput.parentElement.classList.add('error');
            isValid = false;
        }
        
        if (!isValid) {
            // Shake form for visual feedback
            loginForm.classList.add('shake');
            setTimeout(() => {
                loginForm.classList.remove('shake');
            }, 500);
            return;
        }
        
        // Show loading state
        loginButton.classList.add('loading');
        loginButton.disabled = true;
        
        // Simulate API call with setTimeout
        setTimeout(() => {
            // In a real application, you would make an API call here
            console.log('Login attempt with:', { email, password, rememberMe });
            
            // Hide loading state
            loginButton.classList.remove('loading');
            loginButton.disabled = false;
            
            // Show success message
            successMessage.classList.add('active');
            
            // In a real application, you would redirect to dashboard
            // For demo, reset after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('active');
                loginForm.reset();
                emailError.textContent = '';
                passwordError.textContent = '';
                
                // Reset password visibility
                passwordInput.setAttribute('type', 'password');
                const eyeIcon = togglePasswordBtn.querySelector('i');
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }, 3000);
        }, 1500);
    });
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Microsoft';
            
            // Show loading on the clicked button
            const originalContent = this.innerHTML;
            this.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connecting to ${provider}...`;
            this.disabled = true;
            
            // Simulate social login process
            setTimeout(() => {
                // Reset button
                this.innerHTML = originalContent;
                this.disabled = false;
                
                // Show success message for demo
                successMessage.classList.add('active');
                
                setTimeout(() => {
                    successMessage.classList.remove('active');
                }, 3000);
            }, 1500);
            
            console.log(`Social login with ${provider}`);
        });
    });
    
    // Forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // In a real app, this would open a password reset modal or page
        alert('Password reset feature would open here. In a real application, this would direct to a password reset page or open a modal.');
    });
    
    // Request access link
    const requestAccessLink = document.querySelector('.signup-link a');
    requestAccessLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Account request feature would open here. In a real application, this would direct to a registration or account request page.');
    });
});
