import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  
  // Mock data - replace with real data
  const stats = {
    totalCameras: 12,
    activeCameras: 10,
    totalRooms: 8,
    activeRules: 15,
    alertsToday: 3
  };

  const recentAlerts = [
    {
      id: 1,
      timestamp: '2024-02-23T10:30:00',
      type: 'safety_violation',
      location: 'Production Floor',
      camera: 'Camera 3',
      status: 'pending'
    },
    {
      id: 2,
      timestamp: '2024-02-23T09:15:00',
      type: 'unauthorized_access',
      location: 'Storage Room',
      camera: 'Camera 7',
      status: 'resolved'
    },
    // Add more alerts as needed
  ];

  const activeMonitors = [
    {
      id: 1,
      name: 'Main Entrance',
      status: 'online',
      lastCheck: '2 mins ago',
      metrics: { violations: 0, warnings: 2 }
    },
    {
      id: 2,
      name: 'Production Line A',
      status: 'online',
      lastCheck: '1 min ago',
      metrics: { violations: 1, warnings: 0 }
    },
    // Add more monitors
  ];

  const quickActions = [
    {
      title: 'Add Camera',
      description: 'Set up a new camera in your network',
      icon: '📹',
      action: () => navigate('/camera')
    },
    {
      title: 'Manage Rules',
      description: 'Configure safety rules and alerts',
      icon: '📋',
      action: () => navigate('/rules')
    },
    {
      title: 'View Reports',
      description: 'Access detailed safety reports',
      icon: '📊',
      action: () => navigate('/logs')
    },
    {
      title: 'Add Room',
      description: 'Create a new monitored area',
      icon: '🏢',
      action: () => navigate('/rooms')
    }
  ];

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
          <span className="stat-value">{stats.totalCameras}</span>
          <span className="stat-subtitle">{stats.activeCameras} active</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Monitored Rooms</span>
          <span className="stat-value">{stats.totalRooms}</span>
          <span className="stat-subtitle">Across 3 locations</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Rules</span>
          <span className="stat-value">{stats.activeRules}</span>
          <span className="stat-subtitle">2 pending review</span>
        </div>
        <div className="stat-card highlight">
          <span className="stat-label">Today's Alerts</span>
          <span className="stat-value">{stats.alertsToday}</span>
          <span className="stat-subtitle">1 requires attention</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Active Monitors Section */}
        <div className="content-card monitors-card">
          <div className="card-header">
            <h2>Active Monitors</h2>
            <button className="view-all-button" onClick={() => navigate('/monitor')}>
              View All
            </button>
          </div>
          <div className="monitors-grid">
            {activeMonitors.map(monitor => (
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
                    <span className="metric-value">{monitor.metrics.violations}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Warnings</span>
                    <span className="metric-value">{monitor.metrics.warnings}</span>
                  </div>
                </div>
                <span className="last-check">Last check: {monitor.lastCheck}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts Section */}
        <div className="content-card alerts-card">
          <div className="card-header">
            <h2>Recent Alerts</h2>
            <span className="alert-count">{recentAlerts.length} new alerts</span>
          </div>
          <div className="alerts-list">
            {recentAlerts.map(alert => (
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
            ))}
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
    </div>
  );
};