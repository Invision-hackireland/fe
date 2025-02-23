import { useState, useEffect } from 'react';
import { BASE_API_URL } from '../constants';
import { USER_ID } from '../constants';
import '../styles/rooms-manager.css';

export const RoomsPage = ({ImportantId}) => {
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState('office');
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const roomTypes = [
    { id: 'office', label: 'Office' },
    { id: 'warehouse', label: 'Warehouse' },
    { id: 'production', label: 'Production Floor' },
    { id: 'storage', label: 'Storage' }
  ];

  // Fetch rooms on component mount
  useEffect(() => {
    fetchRooms();
  }, []);

  // Fetch all rooms
  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}/rooms?user_id=${USER_ID}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }});
      console.log(response);
      if (!response.ok) throw new Error('Failed to fetch rooms');
      const data = await response.json();
      
      // Transform the data to match our component's expected format
      const transformedRooms = data.map(room => ({
        id: room.id,
        name: room.name,
        type: 'office', // Default type since it's not in the API response
        status: 'active', // Default status since it's not in the API response
        cameras: room.num_cameras || 0,
        rules: room.num_rules || 0
      }));
      
      setRooms(transformedRooms);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new room
  const addRoom = async () => {
    if (!roomName.trim()) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: roomName.trim(),
          user_id: USER_ID
        }),
      });

      if (!response.ok) throw new Error('Failed to add room');
      
      fetchRooms();
      
      //setRooms(newRooms);
      setRoomName('');
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete room
  const deleteRoom = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}/rooms/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete room');
      
      setRooms(rooms.filter(room => room.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle room status
  const toggleRoomStatus = async (id) => {
    try {
      const room = rooms.find(r => r.id === id);
      const newStatus = room.status === 'active' ? 'inactive' : 'active';
      
      setRooms(rooms.map(room => 
        room.id === id 
          ? { ...room, status: newStatus }
          : room
      ));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter rooms based on search
  const filteredRooms = rooms.filter(room =>
    room?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rooms-page">
      <div className="rooms-header">
        <div className="header-content">
          <h1>Room Manager</h1>
          {error && <div className="error-message">{error}</div>}
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
                  disabled={isLoading}
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="room-type">Room Type</label>
                <select
                  id="room-type"
                  value={roomType}
                  onChange={e => setRoomType(e.target.value)}
                  disabled={isLoading}
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
                disabled={isLoading || !roomName.trim()}
              >
                {isLoading ? 'Adding...' : 'Add Room'}
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
                      <th>Rules</th>
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
                        <td className="rules-cell">
                          {room.rules} rules
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="icon-button edit"
                              onClick={() => {/* Add edit handler */}}
                              disabled={isLoading}
                            >
                              Edit
                            </button>
                            <button 
                              className="icon-button toggle"
                              onClick={() => toggleRoomStatus(room.id)}
                              disabled={isLoading}
                            >
                              {room.status === 'active' ? 'Disable' : 'Enable'}
                            </button>
                            <button 
                              className="icon-button delete"
                              onClick={() => deleteRoom(room.id)}
                              disabled={isLoading}
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

          {rooms.length === 0 && !isLoading && (
            <div className="content-card">
              <div className="empty-state">
                <p>No rooms added yet.</p>
                <p>Add your first room to get started!</p>
              </div>
            </div>
          )}

          {isLoading && rooms.length === 0 && (
            <div className="content-card">
              <div className="loading-state">
                <p>Loading rooms...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};