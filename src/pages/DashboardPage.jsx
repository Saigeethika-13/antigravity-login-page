import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DashboardCard from '../components/DashboardCard';
import RecentActivity from '../components/RecentActivity';
import ToastContainer from '../components/ToastContainer';
import { currentUser } from '../constants/user';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLogout = () => {
    addToast('You have been logged out. Redirecting to login...', 'info');
    setTimeout(() => {
      navigate('/login');
    }, 600);
  };

  const handleNewProject = () => {
    addToast('New Project workflow initiated!', 'success');
  };

  const handleDownloadReport = () => {
    addToast('Generating quarterly workspace report PDF...', 'info');
  };

  return (
    <div className="dashboard-layout">
      {/* Background Ambient Orbs & Grid Overlay */}
      <div className="dash-decor" aria-hidden="true">
        <div className="dash-orb dash-orb-1"></div>
        <div className="dash-orb dash-orb-2"></div>
        <div className="dash-grid-overlay"></div>
      </div>

      {/* Responsive Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeItem={activeNavItem}
        onSelectItem={(item) => {
          setActiveNavItem(item);
          addToast(`Navigated to ${item.charAt(0).toUpperCase() + item.slice(1)} view`, 'info');
        }}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Top Navbar */}
        <Navbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onLogout={handleLogout}
          onNewProject={handleNewProject}
        />

        {/* Dashboard Body Content */}
        <main className="dashboard-content">
          {/* Welcome Message / Hero Section */}
          <section className="welcome-banner" aria-label="Welcome Overview">
            <div className="welcome-text-wrap">
              <div className="welcome-badge">
                <span className="welcome-badge-dot"></span>
                <span>System Status: Healthy</span>
              </div>
              <h1 className="welcome-title">Welcome back, {currentUser.name} 👋</h1>
              <p className="welcome-subtitle">
                Here's what is happening across your teams, tasks, and cloud projects today.
              </p>
            </div>

            <div className="welcome-actions">
              <div className="welcome-date-chip">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Oct 31, 2026</span>
              </div>

              <button
                type="button"
                className="btn-social"
                style={{ height: '40px', padding: '0 1rem' }}
                onClick={handleDownloadReport}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Export Report</span>
              </button>
            </div>
          </section>

          {/* 4 Dashboard Metric Cards */}
          <section className="dashboard-cards-grid" aria-label="Key Performance Indicators">
            {/* Total Users Card */}
            <DashboardCard
              title="Total Users"
              value="24,892"
              change="+14.2%"
              trend="up"
              period="vs last month"
              theme="indigo"
              progress={84}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              }
            />

            {/* Projects Card */}
            <DashboardCard
              title="Active Projects"
              value="48"
              change="+6 this week"
              trend="up"
              period="12 nearing release"
              theme="purple"
              progress={68}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              }
            />

            {/* Tasks Card */}
            <DashboardCard
              title="Pending Tasks"
              value="142"
              change="89% done"
              trend="up"
              period="28 due today"
              theme="emerald"
              progress={89}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              }
            />

            {/* Notifications Card */}
            <DashboardCard
              title="Notifications"
              value="18"
              change="4 urgent"
              trend="down"
              period="Action required"
              theme="rose"
              progress={40}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              }
            />
          </section>

          {/* Secondary Grid: Recent Activity & Project Progress Overview */}
          <div className="dashboard-grid-secondary">
            {/* Recent Activity Section */}
            <RecentActivity />

            {/* Active Projects Overview */}
            <section className="project-overview-card" aria-label="Project Milestones">
              <header className="section-header">
                <div className="section-title-wrap">
                  <h2 className="section-title">Project Progress</h2>
                  <p className="section-subtitle">Sprint milestones & completion status</p>
                </div>
              </header>

              <div className="projects-list">
                <div className="project-item">
                  <div className="project-item-header">
                    <span className="project-name">Design System 2.0</span>
                    <span className="project-percentage">88%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: '88%' }}></div>
                  </div>
                  <div className="project-meta-row">
                    <span>14 tasks remaining</span>
                    <span>Due in 3 days</span>
                  </div>
                </div>

                <div className="project-item">
                  <div className="project-item-header">
                    <span className="project-name">Mobile App v2.1</span>
                    <span className="project-percentage">72%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: '72%' }}></div>
                  </div>
                  <div className="project-meta-row">
                    <span>9 tasks remaining</span>
                    <span>Due in 8 days</span>
                  </div>
                </div>

                <div className="project-item">
                  <div className="project-item-header">
                    <span className="project-name">API Gateway Migration</span>
                    <span className="project-percentage">95%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: '95%' }}></div>
                  </div>
                  <div className="project-meta-row">
                    <span>2 tasks remaining</span>
                    <span>Tomorrow</span>
                  </div>
                </div>

                <div className="project-item">
                  <div className="project-item-header">
                    <span className="project-name">Security Audit & MFA</span>
                    <span className="project-percentage">54%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: '54%' }}></div>
                  </div>
                  <div className="project-meta-row">
                    <span>18 tasks remaining</span>
                    <span>Due in 14 days</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Floating Notifications */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}

