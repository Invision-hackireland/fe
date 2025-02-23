import React, { useState } from 'react';

export const RoomsPage = () => {
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState([]);

  // Adds a new room if the input is not empty.
  const addRoom = () => {
    if (!roomName.trim()) return;
    const newRoom = {
      id: Date.now(), // Using Date.now() for a simple id.
      name: roomName.trim(),
    };
    setRooms([...rooms, newRoom]);
    setRoomName('');
  };

  // Deletes a room by filtering it out.
  const deleteRoom = (id) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  return (
    <div>
      <div className="room-manager">
        <h2>Room Manager</h2>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter room name..."
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
          />
          <button onClick={addRoom}>Add</button>
        </div>
        {rooms.length > 0 && (
          <table className="rooms-table">
            <thead>
              <tr>
                <th>Room Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id}>
                  <td>{room.name}</td>
                  <td>
                    <button onClick={() => deleteRoom(room.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <style jsx>{`
        .room-manager {
          margin: 20px;
          font-family: Arial, sans-serif;
        }
        .input-section {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        .input-section input {
          flex: 1;
          padding: 8px;
          font-size: 1rem;
          margin-right: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .input-section button {
          padding: 8px 16px;
          font-size: 1rem;
          background-color: #000;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .input-section button:hover {
          background-color: #444;
        }
        .rooms-table {
          width: 100%;
          border-collapse: collapse;
        }
        .rooms-table th, .rooms-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        .rooms-table th {
          background-color: #f4f4f4;
        }
        .rooms-table button {
          padding: 4px 8px;
          font-size: 0.9rem;
          background-color: red;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .rooms-table button:hover {
          background-color: darkred;
        }
      `}</style>
    </div>
  );
};
