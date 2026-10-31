import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import ToastContainer from '../components/ToastContainer';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="login-page-container">
      {/* Animated Background Orbs & Overlay */}
      <div className="background-decor">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Main Container */}
      <main className="login-wrapper">
        <LoginForm
          onOpenForgotPassword={() => setIsForgotModalOpen(true)}
          onShowToast={addToast}
          onLoginSuccess={handleLoginSuccess}
        />

        <div style={{ textAlign: 'center' }}>
          <Link to="/dashboard" className="demo-dashboard-link">
            <span>Skip to Dashboard</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        onSendResetLink={(email) => {
          addToast(`Password reset link has been sent to ${email}`, 'info');
        }}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}

