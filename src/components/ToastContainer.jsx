import React, { useEffect, useState } from 'react';

function ToastItem({ toast, onRemove }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      const removeTimer = setTimeout(() => {
        onRemove(toast.id);
      }, 300);
      return () => clearTimeout(removeTimer);
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const renderIcon = () => {
    if (toast.type === 'success') {
      return (
        <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      );
    } else if (toast.type === 'error') {
      return (
        <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      );
    }
    // Default: info
    return (
      <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    );
  };

  return (
    <div className={`toast toast-${toast.type} ${isExiting ? 'toast-exiting' : ''}`}>
      {renderIcon()}
      <span>{toast.message}</span>
    </div>
  );
}

export default function ToastContainer({ toasts, onRemoveToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" id="toastContainer">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemoveToast} />
      ))}
    </div>
  );
}

