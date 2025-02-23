import React, { useState } from 'react';
import '../styles/dashboard.css';

export const DashboardPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  
  // Mock data structure
  const [dashboardData] = useState({
    overview: {
      totalCameras: { count: 12, active: 8 },
      monitoredRooms: { count: 6, locations: 2 },
      activeRules: { count: 15, pendingReview: 3 },
      todaysAlerts: { count: 8, requiresAttention: 2 }
    },
    activeMonitors: [
      {
        id: "mon_1",
        name: "Main Entrance",
        status: "active",
        stats: {
          violations: 2,
          warnings: 5,
          lastCheck: new Date(Date.now() - 5 * 60000).toISOString()
        }
      },
      {
        id: "mon_2",
        name: "Production Floor A",
        status: "warning",
        stats: {
          violations: 1,
          warnings: 3,
          lastCheck: new Date(Date.now() - 2 * 60000).toISOString()
        }
      },
      {
        id: "mon_3",
        name: "Loading Dock",
        status: "active",
        stats: {
          violations: 0,
          warnings: 1,
          lastCheck: new Date(Date.now() - 8 * 60000).toISOString()
        }
      },
      {
        id: "mon_4",
        name: "Assembly Line B",
        status: "active",
        stats: {
          violations: 0,
          warnings: 2,
          lastCheck: new Date(Date.now() - 1 * 60000).toISOString()
        }
      }
    ],
    recentAlerts: [
      {
        id: "alt_1",
        type: "safety_violation",
        location: "Production Floor A",
        camera: "Camera 2",
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        status: "pending"
      },
      {
        id: "alt_2",
        type: "equipment_warning",
        location: "Loading Dock",
        camera: "Camera 5",
        timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
        status: "resolved"
      },
      {
        id: "alt_3",
        type: "motion_detected",
        location: "Main Entrance",
        camera: "Camera 1",
        timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
        status: "active"
      },
      {
        id: "alt_4",
        type: "safety_violation",
        location: "Assembly Line B",
        camera: "Camera 4",
        timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
        status: "pending"
      }
    ],
    metadata: {
      lastUpdated: new Date().toISOString(),
      timeZone: "UTC"
    }
  });

  const quickActions = [
    {
      title: 'Add Camera',
      description: 'Set up a new camera in your network',
      icon: '📹',
      action: () => console.log('Navigate to camera')
    },
    {
      title: 'Manage Rules',
      description: 'Configure safety rules and alerts',
      icon: '📋',
      action: () => console.log('Navigate to rules')
    },
    {
      title: 'View Reports',
      description: 'Access detailed safety reports',
      icon: '📊',
      action: () => console.log('Navigate to logs')
    },
    {
      title: 'Add Room',
      description: 'Create a new monitored area',
      icon: '🏢',
      action: () => console.log('Navigate to rooms')
    }
  ];

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const checkTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - checkTime) / 60000);
    
    if (diffMinutes < 1) return 'just now';
    if (diffMinutes === 1) return '1 min ago';
    if (diffMinutes < 60) return `${diffMinutes} mins ago`;
    return `${Math.floor(diffMinutes / 60)} hours ago`;
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Safety Dashboard</h1>
          <p className="subtitle">Real-time monitoring and alerts</p>
        </div>
        <div className="header-actions">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="timeframe-select"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Cameras</span>
          <span className="stat-value">{dashboardData.overview.totalCameras.count}</span>
          <span className="stat-subtitle">{dashboardData.overview.totalCameras.active} active</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Monitored Rooms</span>
          <span className="stat-value">{dashboardData.overview.monitoredRooms.count}</span>
          <span className="stat-subtitle">Across {dashboardData.overview.monitoredRooms.locations} locations</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Rules</span>
          <span className="stat-value">{dashboardData.overview.activeRules.count}</span>
          <span className="stat-subtitle">{dashboardData.overview.activeRules.pendingReview} pending review</span>
        </div>
        <div className="stat-card highlight">
          <span className="stat-label">Today's Alerts</span>
          <span className="stat-value">{dashboardData.overview.todaysAlerts.count}</span>
          <span className="stat-subtitle">{dashboardData.overview.todaysAlerts.requiresAttention} requires attention</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Active Monitors Section */}
        <div className="content-card monitors-card">
          <div className="card-header">
            <h2>Active Monitors</h2>
            <button 
              className="view-all-button"
              onClick={() => console.log('Navigate to monitors')}
            >
              View All
            </button>
          </div>
          <div className="monitors-grid">
            {dashboardData.activeMonitors.map(monitor => (
              <div key={monitor.id} className="monitor-item">
                <div className="monitor-header">
                  <h3>{monitor.name}</h3>
                  <span className={`status-badge ${monitor.status}`}>
                    {monitor.status}
                  </span>
                </div>
                <div className="monitor-metrics">
                  <div className="metric">
                    <span className="metric-label">Violations</span>
                    <span className="metric-value">{monitor.stats.violations}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Warnings</span>
                    <span className="metric-value">{monitor.stats.warnings}</span>
                  </div>
                </div>
                <span className="last-check">Last check: {getRelativeTime(monitor.stats.lastCheck)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts Section */}
        <div className="content-card alerts-card">
          <div className="card-header">
            <h2>Recent Alerts</h2>
            <span className="alert-count">{dashboardData.recentAlerts.length} new alerts</span>
          </div>
          <div className="alerts-list">
            {dashboardData.recentAlerts.length > 0 ? (
              dashboardData.recentAlerts.map(alert => (
                <div key={alert.id} className="alert-item">
                  <div className="alert-content">
                    <div className="alert-type">
                      <span className={`alert-indicator ${alert.type}`}></span>
                      {alert.type.replace('_', ' ')}
                    </div>
                    <div className="alert-details">
                      <span className="alert-location">{alert.location}</span>
                      <span className="alert-camera">{alert.camera}</span>
                    </div>
                  </div>
                  <div className="alert-meta">
                    <span className="alert-time">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                    <span className={`alert-status ${alert.status}`}>
                      {alert.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-alerts">No recent alerts</div>
            )}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="content-card actions-card">
          <div className="card-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <button 
                key={index}
                className="quick-action-button"
                onClick={action.action}
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-title">{action.title}</span>
                <span className="action-description">{action.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Last Updated Information */}
      <div className="dashboard-footer">
        <span className="last-updated">
          Last updated: {new Date(dashboardData.metadata.lastUpdated).toLocaleString()} {dashboardData.metadata.timeZone}
        </span>
      </div>
    </div>
  );
};

export default DashboardPage;