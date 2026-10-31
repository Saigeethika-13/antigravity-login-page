import React, { useState, useEffect, useRef } from 'react';
import { currentUser } from '../constants/user';

export default function Navbar({ onToggleSidebar, onLogout, onNewProject, user = currentUser }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="dashboard-navbar">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="navbar-left">
        <button
          type="button"
          className="mobile-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Open sidebar menu"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div className="navbar-search">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="search"
            className="search-input"
            placeholder="Search projects, tasks, users..."
            aria-label="Search dashboard"
          />
          <kbd className="search-shortcut">⌘K</kbd>
        </div>
      </div>

      {/* Right: Quick Action, Notifications, User Menu */}
      <div className="navbar-right">
        <button
          type="button"
          className="nav-action-btn"
          onClick={onNewProject}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>New Project</span>
        </button>

        <button
          type="button"
          className="nav-icon-btn"
          aria-label="View notifications"
          title="4 new notifications"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="nav-icon-badge">4</span>
        </button>

        {/* User Profile Dropdown */}
        <div className="navbar-user-dropdown" ref={dropdownRef}>
          <button
            type="button"
            className="navbar-user-trigger"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            aria-expanded={isUserMenuOpen}
            aria-haspopup="true"
          >
            <div className="user-avatar-wrap">
              <div className="user-avatar">{user.initials}</div>
              <span className="online-dot"></span>
            </div>
            <span className="user-trigger-name">{user.name}</span>
            <svg
              className="dropdown-arrow"
              viewBox="0 0 24 24"
              style={{ transform: isUserMenuOpen ? 'rotate(180deg)' : 'none' }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {isUserMenuOpen && (
            <div className="user-menu-dropdown" role="menu">
              <div className="menu-header">
                <div className="menu-header-name">{user.name}</div>
                <div className="menu-header-email">{user.email}</div>
              </div>

              <button
                type="button"
                className="menu-item"
                role="menuitem"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>View Profile</span>
              </button>

              <button
                type="button"
                className="menu-item"
                role="menuitem"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <span>Settings</span>
              </button>

              <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '0.25rem 0' }}></div>

              <button
                type="button"
                className="menu-item danger"
                role="menuitem"
                onClick={() => {
                  setIsUserMenuOpen(false);
                  if (onLogout) onLogout();
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

