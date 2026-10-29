import React, { useState, useEffect } from 'react';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) || email.trim().length >= 3;
};

export default function ForgotPasswordModal({ isOpen, onClose, onSendResetLink }) {
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState('');

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setResetEmail('');
    setError('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailVal = resetEmail.trim();

    if (!emailVal || !validateEmail(emailVal)) {
      setError('Please enter a valid email address');
      return;
    }

    onSendResetLink(emailVal);
    handleClose();
  };

  const handleEmailChange = (e) => {
    setResetEmail(e.target.value);
    if (error) setError('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="modal-card">
        <button
          type="button"
          className="modal-close"
          id="closeModal"
          aria-label="Close modal"
          onClick={handleClose}
        >
          &times;
        </button>
        <div className="modal-icon-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12.5"></path>
            <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            <path d="M18 14v7"></path>
            <path d="M15 18h6"></path>
          </svg>
        </div>
        <h2 className="modal-title" id="modalTitle">Reset Password</h2>
        <p className="modal-desc">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </p>

        <form id="forgotForm" noValidate onSubmit={handleSubmit}>
          <div className={`input-group ${error ? 'has-error' : ''}`}>
            <label htmlFor="resetEmail" className="input-label">Email Address</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                type="email"
                id="resetEmail"
                className="form-input"
                placeholder="name@example.com"
                required
                autoFocus
                value={resetEmail}
                onChange={handleEmailChange}
              />
            </div>
            {error && <span className="error-message" id="resetEmailError" style={{ display: 'block' }}>{error}</span>}
          </div>

          <button type="submit" className="btn-primary" id="resetSubmitBtn">
            <span>Send Reset Link</span>
          </button>
        </form>
      </div>
    </div>
  );
}

