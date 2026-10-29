import React, { useState } from 'react';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) || email.trim().length >= 3;
};

export default function LoginForm({ onOpenForgotPassword, onShowToast }) {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle Input Changes with real-time error clearing
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Toggle Mode (Sign In <-> Sign Up)
  const handleToggleMode = () => {
    setIsSignUpMode((prev) => !prev);
    setErrors({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    let isValid = true;

    // Validate Full Name (if Sign Up)
    if (isSignUpMode) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full Name is required';
        isValid = false;
      }
    }

    // Validate Email / Username
    const emailValue = formData.email.trim();
    if (!emailValue) {
      newErrors.email = 'Email or username is required';
      isValid = false;
    } else if (!validateEmail(emailValue)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate Password
    const passwordValue = formData.password;
    if (!passwordValue) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (passwordValue.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Validate Confirm Password (if Sign Up)
    if (isSignUpMode) {
      const confirmValue = formData.confirmPassword;
      if (!confirmValue) {
        newErrors.confirmPassword = 'Please confirm your password';
        isValid = false;
      } else if (confirmValue !== passwordValue) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (!isValid) return;

    // Simulate Network Request / Processing
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (isSignUpMode) {
        onShowToast(
          `Account created successfully! Welcome, ${formData.fullName.trim() || 'User'}!`,
          'success'
        );
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          rememberMe: true,
        });
        setIsSignUpMode(false);
      } else {
        onShowToast(
          `Welcome back, ${emailValue}! You are now logged in.`,
          'success'
        );
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          rememberMe: formData.rememberMe,
        });
      }
    }, 1200);
  };

  const handleGoogleClick = () => {
    onShowToast('Redirecting to Google Authentication...', 'info');
  };

  const handleGithubClick = () => {
    onShowToast('Redirecting to GitHub Authentication...', 'info');
  };

  return (
    <div className="auth-card" id="authCard">
      {/* Brand Header */}
      <div className="brand-header">
        <div className="logo-box">
          <svg
            className="logo-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="auth-title" id="authTitle">
          {isSignUpMode ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="auth-subtitle" id="authSubtitle">
          {isSignUpMode
            ? 'Join thousands of users enjoying our platform'
            : 'Please enter your credentials to access your account'}
        </p>
      </div>

      {/* Auth Form */}
      <form className="auth-form" id="authForm" noValidate onSubmit={handleSubmit}>
        {/* Full Name Input (Visible only in Sign Up mode) */}
        {isSignUpMode && (
          <div className={`input-group ${errors.fullName ? 'has-error' : ''}`} id="nameGroup">
            <label htmlFor="fullName" className="input-label">Full Name</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="fullName"
                className="form-input"
                placeholder="John Doe"
                autoComplete="name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
              />
            </div>
            {errors.fullName && (
              <span className="error-message" id="nameError" style={{ display: 'block' }}>
                {errors.fullName}
              </span>
            )}
          </div>
        )}

        {/* Email / Username Input */}
        <div className={`input-group ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="email" className="input-label" id="emailLabel">
            Email Address or Username
          </label>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="name@example.com"
              required
              autoComplete="username"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          {errors.email && (
            <span className="error-message" id="emailError" style={{ display: 'block' }}>
              {errors.email}
            </span>
          )}
        </div>

        {/* Password Input */}
        <div className={`input-group ${errors.password ? 'has-error' : ''}`}>
          <div className="label-row">
            <label htmlFor="password" className="input-label">Password</label>
            {!isSignUpMode && (
              <button
                type="button"
                className="forgot-link"
                id="forgotPasswordBtn"
                onClick={onOpenForgotPassword}
              >
                Forgot password?
              </button>
            )}
          </div>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="form-input"
              placeholder="••••••••••••"
              required
              autoComplete={isSignUpMode ? 'new-password' : 'current-password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            {/* Show/Hide Password Toggle Button */}
            <button
              type="button"
              className="toggle-password-btn"
              id="togglePassword"
              aria-label="Toggle password visibility"
              title={showPassword ? 'Hide Password' : 'Show Password'}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                /* Eye Off Icon (Hidden state) */
                <svg className="eye-icon eye-closed" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                /* Eye Icon (Default) */
                <svg className="eye-icon eye-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <span className="error-message" id="passwordError" style={{ display: 'block' }}>
              {errors.password}
            </span>
          )}
        </div>

        {/* Confirm Password (Visible only in Sign Up mode) */}
        {isSignUpMode && (
          <div className={`input-group ${errors.confirmPassword ? 'has-error' : ''}`} id="confirmPasswordGroup">
            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="form-input"
                placeholder="••••••••••••"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              />
            </div>
            {errors.confirmPassword && (
              <span className="error-message" id="confirmPasswordError" style={{ display: 'block' }}>
                {errors.confirmPassword}
              </span>
            )}
          </div>
        )}

        {/* Remember Me Checkbox (Sign In mode) */}
        {!isSignUpMode && (
          <div className="form-options" id="rememberGroup">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              />
              <span className="checkmark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span className="checkbox-label">Remember me for 30 days</span>
            </label>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn-primary" id="submitBtn" disabled={isLoading}>
          {isLoading ? (
            <span className="btn-spinner" id="submitSpinner"></span>
          ) : (
            <>
              <span className="btn-text" id="submitBtnText">
                {isSignUpMode ? 'Create Account' : 'Sign In'}
              </span>
              <svg className="btn-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Social Divider */}
      <div className="divider">
        <span>Or continue with</span>
      </div>

      {/* Social Logins */}
      <div className="social-grid">
        <button
          type="button"
          className="btn-social"
          id="googleBtn"
          title="Sign in with Google"
          onClick={handleGoogleClick}
        >
          <svg className="social-icon" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"/>
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
          </svg>
          <span>Google</span>
        </button>

        <button
          type="button"
          className="btn-social"
          id="githubBtn"
          title="Sign in with GitHub"
          onClick={handleGithubClick}
        >
          <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </button>
      </div>

      {/* Auth Mode Toggle Link */}
      <div className="auth-switch">
        <span id="switchPrompt">
          {isSignUpMode ? 'Already have an account?' : "Don't have an account?"}
        </span>
        <button
          type="button"
          className="switch-btn"
          id="switchAuthMode"
          onClick={handleToggleMode}
        >
          {isSignUpMode ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
}

