import React from 'react';

export default function DashboardCard({
  title,
  value,
  change,
  trend = 'up',
  period,
  icon,
  theme = 'indigo',
  progress = 75,
}) {
  return (
    <article className={`dashboard-card card-theme-${theme}`}>
      <div className="card-top">
        <span className="card-title">{title}</span>
        <div className="card-icon-box">
          {icon}
        </div>
      </div>

      <div className="card-value-wrap">
        <div className="card-value">{value}</div>
      </div>

      {progress !== undefined && (
        <div className="card-progress-bar">
          <div
            className="card-progress-fill"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          ></div>
        </div>
      )}

      <div className="card-footer">
        {change && (
          <span className={`card-trend-badge trend-${trend}`}>
            {trend === 'up' && (
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            )}
            {trend === 'down' && (
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            )}
            {change}
          </span>
        )}
        {period && <span className="card-footer-text">{period}</span>}
      </div>
    </article>
  );
}

