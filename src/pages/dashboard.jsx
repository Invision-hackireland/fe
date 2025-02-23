import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import { BASE_API_URL } from '../constants';
import { USER_ID } from '../constants';

export const DashboardPage = ({ImportantId}) => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalCameras: { count: 0, active: 0 },
      monitoredRooms: { count: 0, locations: 0 },
      activeRules: { count: 0, pendingReview: 0 },
      todaysAlerts: { count: 0, requiresAttention: 0 }
    },
    activeMonitors: [],
    recentAlerts: [],
    metadata: { lastUpdated: '', timeZone: '' }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_API_URL}/dashboardstats`, {
          headers: {
            'Authorization': '123',
            'Content-Type': 'application/json',
            'X-User-ID': `${USER_ID}`,
            'ngrok-skip-browser-warning': '69420'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError('Error fetching dashboard data');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    // Set up polling interval
    const interval = setInterval(fetchDashboardData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [selectedTimeframe]); // Refetch when timeframe changes

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

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Format the last check time to be relative (e.g., "2 mins ago")
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
            <button className="view-all-button" onClick={() => navigate('/monitor')}>
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