import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import ToastContainer from './components/ToastContainer';

export default function App() {
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
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
        />
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
    </>
  );
}

