import React, { useState, useCallback } from 'react';
import { useDropzone } from "react-dropzone";
import '../styles/logs.css';

// Import your video assets
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';

export const LogsPage = () => {
  const cameras = [
    { 
      id: 1, 
      name: 'Main Entrance', 
      video: video1,
      status: 'active',
      analysis: 'Analysis shows normal activity patterns. No safety violations detected in the last hour. Foot traffic remains within expected parameters.' 
    },
    { 
      id: 2, 
      name: 'Production Floor', 
      video: video2,
      status: 'warning',
      analysis: 'Analysis for Camera 2' 
    },
    { 
      id: 3, 
      name: 'Loading Dock', 
      video: video3,
      status: 'active',
      analysis: 'Analysis for Camera 3' 
    },
  ];

  const [selectedCamera, setSelectedCamera] = useState(cameras[0]);
  const [dataURL, setDataURL] = useState(null);
  const [uploadedURL, setUploadedURL] = useState(null);

  const handleCameraChange = (e) => {
    const cameraId = parseInt(e.target.value, 10);
    const newCamera = cameras.find((cam) => cam.id === cameraId);
    setSelectedCamera(newCamera);
  };

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        setDataURL(binaryStr);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop });

  const selectedFile = acceptedFiles[0];

  const uploadImage = async () => {
    if (!selectedFile) return;
    
    let formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setUploadedURL(data.url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="logs-page">
      <div className="logs-header">
        <h1>Camera logs</h1>
        <div className="camera-controls">
          <select 
            className="camera-select" 
            onChange={handleCameraChange}
            value={selectedCamera.id}
          >
            {cameras.map((camera) => (
              <option key={camera.id} value={camera.id}>
                {camera.name}
              </option>
            ))}
          </select>
          <button className="refresh-button">
            Refresh
          </button>
        </div>
      </div>

      <div className="logs-grid">
        <div className="video-section">
          <div className="video-container">
            <div className="video-header">
              <h2>{selectedCamera.name}</h2>
              <span className={`status-indicator ${selectedCamera.status}`}>
                {selectedCamera.status === 'active' ? 'Live' : 'Warning'}
              </span>
            </div>
            <video controls className="video-player">
              <source src={selectedCamera.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="upload-section">
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag & drop files here, or click to select</p>
              )}
            </div>
            {selectedFile && (
              <button 
                className="upload-button"
                onClick={uploadImage}
              >
                Upload Selected File
              </button>
            )}
          </div>
        </div>

        <div className="analysis-section">
          <div className="analysis-header">
            <h2>AI Analysis</h2>
            <span className="timestamp">Updated 2 minutes ago</span>
          </div>
          
          <div className="analysis-content">
            <div className="analysis-card">
              <h3>Safety Status</h3>
              <div className="status-indicator-large active">
                All Clear
              </div>
            </div>

            <div className="analysis-card">
              <h3>Current Analysis</h3>
              <p>{selectedCamera.analysis}</p>
            </div>

            <div className="analysis-card">
              <h3>Recent Events</h3>
              <ul className="event-list">
                <li>
                  <span className="event-time">10:45 AM</span>
                  <span className="event-description">Normal activity detected</span>
                </li>
                <li>
                  <span className="event-time">10:30 AM</span>
                  <span className="event-description">Shift change completed</span>
                </li>
                <li>
                  <span className="event-time">10:15 AM</span>
                  <span className="event-description">Equipment check passed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};