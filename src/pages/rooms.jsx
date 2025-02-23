import React, { useState } from 'react';
import '../styles/rooms-manager.css';

export const RoomsPage = () => {
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState('office');
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const roomTypes = [
    { id: 'office', label: 'Office' },
    { id: 'warehouse', label: 'Warehouse' },
    { id: 'production', label: 'Production Floor' },
    { id: 'storage', label: 'Storage' }
  ];

  // Add new room
  const addRoom = () => {
    if (!roomName.trim()) return;
    const newRoom = {
      id: Date.now(),
      name: roomName.trim(),
      type: roomType,
      dateAdded: new Date().toISOString(),
      status: 'active',
      cameras: 0
    };
    setRooms([...rooms, newRoom]);
    setRoomName('');
  };

  // Delete room
  const deleteRoom = (id) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  // Filter rooms based on search
  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle room status
  const toggleRoomStatus = (id) => {
    setRooms(rooms.map(room => 
      room.id === id 
        ? { ...room, status: room.status === 'active' ? 'inactive' : 'active' }
        : room
    ));
  };

  return (
    <div className="rooms-page">
      <div className="rooms-header">
        <div className="header-content">
          <h1>Room Manager</h1>
          <p className="subtitle">Manage and monitor your facility spaces</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-value">{rooms.length}</span>
            <span className="stat-label">Total Rooms</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {rooms.filter(r => r.status === 'active').length}
            </span>
            <span className="stat-label">Active</span>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="rooms-grid">
          {/* Room Creation Card */}
          <div className="content-card">
            <div className="card-header">
              <h2>Add New Room</h2>
            </div>
            <div className="card-content">
              <div className="input-group">
                <label htmlFor="room-name">Room Name</label>
                <input
                  id="room-name"
                  type="text"
                  placeholder="e.g., Main Conference Room"
                  value={roomName}
                  onChange={e => setRoomName(e.target.value)}
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="room-type">Room Type</label>
                <select
                  id="room-type"
                  value={roomType}
                  onChange={e => setRoomType(e.target.value)}
                >
                  {roomTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                className="add-button"
                onClick={addRoom}
                disabled={!roomName.trim()}
              >
                Add Room
              </button>
            </div>
          </div>

          {/* Rooms List Card */}
          {rooms.length > 0 && (
            <div className="content-card">
              <div className="card-header">
                <h2>Rooms</h2>
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="table-container">
                <table className="rooms-table">
                  <thead>
                    <tr>
                      <th>Room Name</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Cameras</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRooms.map(room => (
                      <tr key={room.id}>
                        <td className="room-name">{room.name}</td>
                        <td>
                          <span className="room-type">
                            {roomTypes.find(t => t.id === room.type)?.label}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${room.status}`}>
                            {room.status}
                          </span>
                        </td>
                        <td className="cameras-cell">
                          {room.cameras} cameras
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="icon-button edit"
                              onClick={() => {/* Add edit handler */}}
                            >
                              Edit
                            </button>
                            <button 
                              className="icon-button toggle"
                              onClick={() => toggleRoomStatus(room.id)}
                            >
                              {room.status === 'active' ? 'Disable' : 'Enable'}
                            </button>
                            <button 
                              className="icon-button delete"
                              onClick={() => deleteRoom(room.id)}
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

          {rooms.length === 0 && (
            <div className="content-card">
              <div className="empty-state">
                <p>No rooms added yet.</p>
                <p>Add your first room to get started!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};