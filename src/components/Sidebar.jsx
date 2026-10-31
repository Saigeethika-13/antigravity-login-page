import React from 'react';
import { currentUser } from '../constants/user';

export default function Sidebar({
  isOpen = false,
  onClose,
  activeItem = 'dashboard',
  onSelectItem,
  onLogout,
  user = currentUser,
}) {
  const mainNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="9" rx="1"></rect>
          <rect x="14" y="3" width="7" height="5" rx="1"></rect>
          <rect x="14" y="12" width="7" height="9" rx="1"></rect>
          <rect x="3" y="16" width="7" height="5" rx="1"></rect>
        </svg>
      ),
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: (
        <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
    },
    {
      id: 'projects',
      label: 'Projects',
      badge: '8',
      icon: (
        <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
    {
      id: 'tasks',
      label: 'Tasks',
      badge: '14',
      icon: (
        <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4"></path>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      ),
    },
  ];

  const secondaryNavItems = [
    {
      id: 'users',
      label: 'Users',
      icon: (
        <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      badge: '4',
      badgeClass: 'badge-urgent',
      icon: (
        <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`dashboard-sidebar ${isOpen ? 'sidebar-open' : ''}`} aria-label="Dashboard Sidebar Navigation">
        {/* Sidebar Brand Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="brand-text-wrap">
              <span className="brand-title">ModernAuth</span>
              <span className="brand-badge">Nexus Platform</span>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section-title">Main Menu</div>
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => {
                if (onSelectItem) onSelectItem(item.id);
                if (onClose) onClose();
              }}
            >
              <div className="sidebar-nav-item-content">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}

          <div className="nav-section-title">Workspace</div>
          {secondaryNavItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => {
                if (onSelectItem) onSelectItem(item.id);
                if (onClose) onClose();
              }}
            >
              <div className="sidebar-nav-item-content">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`nav-badge ${item.badgeClass || ''}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar User Profile Section */}
        <footer className="sidebar-footer">
          <div className="sidebar-user-pill">
            <div className="user-avatar-wrap">
              <div className="user-avatar">{user.initials}</div>
              <span className="online-dot" title="Active now"></span>
            </div>
            <div className="sidebar-user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-logout-btn"
            onClick={onLogout}
            title="Log Out"
            aria-label="Log Out"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </footer>
      </aside>
    </>
  );
}

