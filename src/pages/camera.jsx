import React, { useState } from 'react';
import '../styles/camera-manager.css';

export const CameraPage = () => {
  const [cameraName, setCameraName] = useState('');
  const [room, setRoom] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [cameras, setCameras] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form fields
  const validateForm = (name, room, ip) => {
    const isValid = name.trim() && room.trim() && ip.trim();
    setIsFormValid(isValid);
    return isValid;
  };

  // Handle input changes
  const handleInputChange = (e, setter) => {
    const value = e.target.value;
    setter(value);
    validateForm(
      setter === setCameraName ? value : cameraName,
      setter === setRoom ? value : room,
      setter === setIpAddress ? value : ipAddress
    );
  };

  // Adds a new camera if all fields are filled
  const addCamera = () => {
    if (!validateForm(cameraName, room, ipAddress)) return;
    
    const newCamera = {
      id: Date.now(),
      name: cameraName,
      room: room,
      ip: ipAddress,
      date_created: new Date().toISOString(),
      status: 'offline' // Initial status
    };
    
    setCameras([...cameras, newCamera]);
    setCameraName('');
    setRoom('');
    setIpAddress('');
    setIsFormValid(false);
  };

  // Deletes a camera
  const deleteCamera = (id) => {
    setCameras(cameras.filter(camera => camera.id !== id));
  };

  // Get camera status class
  const getStatusClass = (status) => {
    return `status-badge ${status}`;
  };

  return (
    <div className="camera-manager">
      <div className="manager-header">
        <div className="header-content">
          <h1>Camera Manager</h1>
          <p className="subtitle">Add and manage your security cameras</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-value">{cameras.length}</span>
            <span className="stat-label">Total Cameras</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{cameras.filter(c => c.status === 'online').length}</span>
            <span className="stat-label">Online</span>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h2>Add New Camera</h2>
        </div>
        <div className="input-grid">
          <div className="input-group">
            <label htmlFor="camera-name">Camera Name</label>
            <input
              id="camera-name"
              type="text"
              placeholder="e.g., Front Door Camera"
              value={cameraName}
              onChange={(e) => handleInputChange(e, setCameraName)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="room">Room Location</label>
            <input
              id="room"
              type="text"
              placeholder="e.g., Main Entrance"
              value={room}
              onChange={(e) => handleInputChange(e, setRoom)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="ip-address">IP Address</label>
            <input
              id="ip-address"
              type="text"
              placeholder="e.g., 192.168.1.100"
              value={ipAddress}
              onChange={(e) => handleInputChange(e, setIpAddress)}
            />
          </div>
          <button 
            className={`add-button ${isFormValid ? 'active' : ''}`}
            onClick={addCamera}
            disabled={!isFormValid}
          >
            Add Camera
          </button>
        </div>
      </div>

      {cameras.length > 0 && (
        <div className="content-card">
          <div className="card-header">
            <h2>Camera List</h2>
            <span className="camera-count">{cameras.length} cameras</span>
          </div>
          <div className="table-container">
            <table className="cameras-table">
              <thead>
                <tr>
                  <th>Camera Name</th>
                  <th>Room</th>
                  <th>IP Address</th>
                  <th>Status</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cameras.map(camera => (
                  <tr key={camera.id}>
                    <td className="camera-name">
                      <span className="name-text">{camera.name}</span>
                    </td>
                    <td>{camera.room}</td>
                    <td>
                      <code className="ip-address">{camera.ip}</code>
                    </td>
                    <td>
                      <span className={getStatusClass(camera.status)}>
                        {camera.status}
                      </span>
                    </td>
                    <td>{new Date(camera.date_created).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="icon-button edit"
                          onClick={() => {/* Add edit handler */}}
                        >
                          Edit
                        </button>
                        <button 
                          className="icon-button delete"
                          onClick={() => deleteCamera(camera.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};