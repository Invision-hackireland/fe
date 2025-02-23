import React, { useState } from 'react';

export const CameraPage = () => {
  const [cameraName, setCameraName] = useState('');
  const [room, setRoom] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [cameras, setCameras] = useState([]);

  // Adds a new camera if all fields are filled
  const addCamera = () => {
    if (!cameraName.trim() || !room.trim() || !ipAddress.trim()) return;
    const newCamera = {
      id: Date.now(), // For demo purposes; in production consider using UUIDs.
      name: cameraName,
      room: room,
      ip: ipAddress,
      date_created: new Date().toISOString(),
    };
    setCameras([...cameras, newCamera]);
    setCameraName('');
    setRoom('');
    setIpAddress('');
  };

  // Deletes a camera by filtering it out of the current cameras array.
  const deleteCamera = (id) => {
    setCameras(cameras.filter(camera => camera.id !== id));
  };

  return (
    <div className="camera-manager">
      <h2>Camera Manager</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Camera Name"
          value={cameraName}
          onChange={e => setCameraName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Room"
          value={room}
          onChange={e => setRoom(e.target.value)}
        />
        <input
          type="text"
          placeholder="IP Address"
          value={ipAddress}
          onChange={e => setIpAddress(e.target.value)}
        />
        <button onClick={addCamera}>Add Camera</button>
      </div>
      {cameras.length > 0 && (
        <table className="cameras-table">
          <thead>
            <tr>
              <th>Camera Name</th>
              <th>Room</th>
              <th>IP Address</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cameras.map(camera => (
              <tr key={camera.id}>
                <td>{camera.name}</td>
                <td>{camera.room}</td>
                <td>{camera.ip}</td>
                <td>{new Date(camera.date_created).toLocaleString()}</td>
                <td>
                  <button onClick={() => deleteCamera(camera.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style jsx>{`
        .camera-manager {
          margin: 20px;
          font-family: Arial, sans-serif;
        }
        .input-section {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        .input-section input {
          flex: 1;
          min-width: 150px;
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .input-section button {
          padding: 10px 20px;
          font-size: 1rem;
          background-color: black;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .input-section button:hover {
          background-color: grey;
        }
        .cameras-table {
          width: 100%;
          border-collapse: collapse;
        }
        .cameras-table th, .cameras-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        .cameras-table th {
          background-color: #f0f0f0;
        }
        .cameras-table button {
          padding: 5px 10px;
          font-size: 0.9rem;
          background-color: #e00;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .cameras-table button:hover {
          background-color: #c00;
        }
      `}</style>
    </div>
  );
};


