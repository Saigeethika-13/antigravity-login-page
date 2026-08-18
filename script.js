/**
 * Modern Authentication Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Element References ---
  const authForm = document.getElementById('authForm');
  const authTitle = document.getElementById('authTitle');
  const authSubtitle = document.getElementById('authSubtitle');
  
  const nameGroup = document.getElementById('nameGroup');
  const fullNameInput = document.getElementById('fullName');
  const nameError = document.getElementById('nameError');
  
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  
  const passwordInput = document.getElementById('password');
  const passwordError = document.getElementById('passwordError');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const eyeOpen = togglePasswordBtn.querySelector('.eye-open');
  const eyeClosed = togglePasswordBtn.querySelector('.eye-closed');
  
  const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const confirmPasswordError = document.getElementById('confirmPasswordError');
  
  const rememberGroup = document.getElementById('rememberGroup');
  const submitBtn = document.getElementById('submitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const submitSpinner = document.getElementById('submitSpinner');
  const switchAuthModeBtn = document.getElementById('switchAuthMode');
  const switchPrompt = document.getElementById('switchPrompt');
  
  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
  const forgotModal = document.getElementById('forgotModal');
  const closeModalBtn = document.getElementById('closeModal');
  const forgotForm = document.getElementById('forgotForm');
  const resetEmailInput = document.getElementById('resetEmail');
  const resetEmailError = document.getElementById('resetEmailError');
  
  const googleBtn = document.getElementById('googleBtn');
  const githubBtn = document.getElementById('githubBtn');
  const toastContainer = document.getElementById('toastContainer');

  // --- State Variables ---
  let isSignUpMode = false;

  // ==========================================
  // 1. Show / Hide Password Functionality
  // ==========================================
  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    
    if (isPassword) {
      eyeOpen.classList.add('hidden');
      eyeClosed.classList.remove('hidden');
      togglePasswordBtn.setAttribute('title', 'Hide Password');
    } else {
      eyeOpen.classList.remove('hidden');
      eyeClosed.classList.add('hidden');
      togglePasswordBtn.setAttribute('title', 'Show Password');
    }
  });

  // ==========================================
  // 2. Switch Mode (Sign In <-> Sign Up)
  // ==========================================
  switchAuthModeBtn.addEventListener('click', () => {
    isSignUpMode = !isSignUpMode;
    clearErrors();

    if (isSignUpMode) {
      // Switch to Sign Up
      authTitle.textContent = 'Create Account';
      authSubtitle.textContent = 'Join thousands of users enjoying our platform';
      submitBtnText.textContent = 'Create Account';
      switchPrompt.textContent = 'Already have an account?';
      switchAuthModeBtn.textContent = 'Sign In';

      nameGroup.classList.remove('hidden');
      confirmPasswordGroup.classList.remove('hidden');
      rememberGroup.classList.add('hidden');
      forgotPasswordBtn.classList.add('hidden');
    } else {
      // Switch to Sign In
      authTitle.textContent = 'Welcome Back';
      authSubtitle.textContent = 'Please enter your credentials to access your account';
      submitBtnText.textContent = 'Sign In';
      switchPrompt.textContent = "Don't have an account?";
      switchAuthModeBtn.textContent = 'Sign Up';

      nameGroup.classList.add('hidden');
      confirmPasswordGroup.classList.add('hidden');
      rememberGroup.classList.remove('hidden');
      forgotPasswordBtn.classList.remove('hidden');
    }
  });

  // ==========================================
  // 3. Validation Helpers
  // ==========================================
  const validateEmail = (email) => {
    // Basic regex for email formatting or non-empty username
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim()) || email.trim().length >= 3;
  };

  const showError = (inputElement, errorElement, message) => {
    const group = inputElement.closest('.input-group');
    if (group) group.classList.add('has-error');
    if (errorElement) {
      if (message) errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  };

  const clearError = (inputElement, errorElement) => {
    const group = inputElement.closest('.input-group');
    if (group) group.classList.remove('has-error');
    if (errorElement) errorElement.style.display = 'none';
  };

  const clearErrors = () => {
    document.querySelectorAll('.input-group').forEach(group => group.classList.remove('has-error'));
    document.querySelectorAll('.error-message').forEach(err => err.style.display = 'none');
  };

  // Real-time input error clearing on user typing
  [fullNameInput, emailInput, passwordInput, confirmPasswordInput, resetEmailInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        const group = input.closest('.input-group');
        const err = group ? group.querySelector('.error-message') : null;
        clearError(input, err);
      });
    }
  });

  // ==========================================
  // 4. Form Submission Handler
  // ==========================================
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Validate Full Name (if Sign Up)
    if (isSignUpMode) {
      if (!fullNameInput.value.trim()) {
        showError(fullNameInput, nameError, 'Full Name is required');
        isValid = false;
      }
    }

    // Validate Email / Username
    const emailValue = emailInput.value.trim();
    if (!emailValue) {
      showError(emailInput, emailError, 'Email or username is required');
      isValid = false;
    } else if (!validateEmail(emailValue)) {
      showError(emailInput, emailError, 'Please enter a valid email address');
      isValid = false;
    }

    // Validate Password
    const passwordValue = passwordInput.value;
    if (!passwordValue) {
      showError(passwordInput, passwordError, 'Password is required');
      isValid = false;
    } else if (passwordValue.length < 6) {
      showError(passwordInput, passwordError, 'Password must be at least 6 characters');
      isValid = false;
    }

    // Validate Confirm Password (if Sign Up)
    if (isSignUpMode) {
      const confirmValue = confirmPasswordInput.value;
      if (!confirmValue) {
        showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
        isValid = false;
      } else if (confirmValue !== passwordValue) {
        showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
        isValid = false;
      }
    }

    if (!isValid) return;

    // Simulate Network Request / Processing
    setSubmitLoading(true);

    setTimeout(() => {
      setSubmitLoading(false);

      if (isSignUpMode) {
        showToast(`Account created successfully! Welcome, ${fullNameInput.value.trim() || 'User'}!`, 'success');
        authForm.reset();
        // Switch back to sign in
        switchAuthModeBtn.click();
      } else {
        showToast(`Welcome back, ${emailValue}! You are now logged in.`, 'success');
        authForm.reset();
      }
    }, 1200);
  });

  function setSubmitLoading(isLoading) {
    submitBtn.disabled = isLoading;
    if (isLoading) {
      submitBtnText.classList.add('hidden');
      submitSpinner.classList.remove('hidden');
    } else {
      submitBtnText.classList.remove('hidden');
      submitSpinner.classList.add('hidden');
    }
  }

  // ==========================================
  // 5. Forgot Password Modal Logic
  // ==========================================
  forgotPasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    forgotModal.classList.remove('hidden');
    resetEmailInput.focus();
  });

  const closeModal = () => {
    forgotModal.classList.add('hidden');
    forgotForm.reset();
    clearError(resetEmailInput, resetEmailError);
  };

  closeModalBtn.addEventListener('click', closeModal);

  forgotModal.addEventListener('click', (e) => {
    if (e.target === forgotModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !forgotModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailVal = resetEmailInput.value.trim();
    
    if (!emailVal || !validateEmail(emailVal)) {
      showError(resetEmailInput, resetEmailError, 'Please enter a valid email address');
      return;
    }

    showToast(`Password reset link has been sent to ${emailVal}`, 'info');
    closeModal();
  });

  // ==========================================
  // 6. Social Buttons Simulation
  // ==========================================
  googleBtn.addEventListener('click', () => {
    showToast('Redirecting to Google Authentication...', 'info');
  });

  githubBtn.addEventListener('click', () => {
    showToast('Redirecting to GitHub Authentication...', 'info');
  });

  // ==========================================
  // 7. Toast Notification System
  // ==========================================
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
});
