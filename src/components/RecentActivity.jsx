import React, { useState } from 'react';
import { currentUser } from '../constants/user';

const initialActivities = [
  {
    id: 1,
    user: 'Sarah Chen',
    action: 'deployed v2.4.0 to production',
    category: 'project',
    time: '12m ago',
    status: 'Completed',
    statusClass: 'status-completed',
    avatar: 'SC',
    avatarColor: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    id: 2,
    user: 'David Kim',
    action: 'created task: Optimize database indexing',
    category: 'task',
    time: '34m ago',
    status: 'In Progress',
    statusClass: 'status-inprogress',
    avatar: 'DK',
    avatarColor: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    id: 3,
    user: 'Liam Patel',
    action: 'resolved security vulnerability #102',
    category: 'security',
    time: '1h ago',
    status: 'Resolved',
    statusClass: 'status-completed',
    avatar: 'LP',
    avatarColor: 'linear-gradient(135deg, #f43f5e, #e11d48)',
  },
  {
    id: 4,
    user: 'Elena Rostova',
    action: 'invited 3 new engineers to frontend squad',
    category: 'team',
    time: '2h ago',
    status: 'Joined',
    statusClass: 'status-completed',
    avatar: 'ER',
    avatarColor: 'linear-gradient(135deg, #a855f7, #7c3aed)',
  },
  {
    id: 5,
    user: currentUser.name,
    action: 'updated modern authentication and dashboard tokens',
    category: 'project',
    time: '4h ago',
    status: 'Merged',
    statusClass: 'status-completed',
    avatar: currentUser.initials,
    avatarColor: 'linear-gradient(135deg, #06b6d4, #0284c7)',
  },
];

export default function RecentActivity() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredActivities = activeTab === 'all'
    ? initialActivities
    : initialActivities.filter((item) => item.category === activeTab);

  return (
    <section className="recent-activity-card">
      <header className="section-header">
        <div className="section-title-wrap">
          <h2 className="section-title">Recent Activity</h2>
          <p className="section-subtitle">Real-time team updates and system activity</p>
        </div>

        <nav className="filter-tabs" aria-label="Activity categories">
          {['all', 'project', 'task', 'security', 'team'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      <ul className="activity-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filteredActivities.map((act) => (
          <li key={act.id} className="activity-item">
            <div className="activity-left">
              <div
                className="activity-avatar"
                style={{ background: act.avatarColor }}
                title={act.user}
              >
                {act.avatar}
              </div>
              <div className="activity-info">
                <div className="activity-title">
                  <strong>{act.user}</strong> <span>{act.action}</span>
                </div>
                <div className="activity-meta">
                  <span className={`category-tag cat-${act.category}`}>
                    {act.category}
                  </span>
                  <span>•</span>
                  <time>{act.time}</time>
                </div>
              </div>
            </div>

            <span className={`activity-status-badge ${act.statusClass}`}>
              {act.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

