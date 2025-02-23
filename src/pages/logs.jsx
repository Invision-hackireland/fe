import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle, AlertTriangle, Shield, Clock } from 'lucide-react';
import '../styles/logs.css';

export const LogsPage = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [simulationResults, setSimulationResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'high-severity';
      case 'medium':
        return 'medium-severity';
      case 'low':
        return 'low-severity';
      default:
        return '';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await fetch('http://0.0.0.0:8000/cameras?user_id=ba3197a8-f182-11ef-80e2-77fbe9534181');
        const data = await response.json();
        setCameras(data);
        if (data.length > 0) {
          setSelectedCamera(data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch cameras:', error);
      }
    };

    fetchCameras();
  }, []);

  const handleCameraChange = (e) => {
    const camera = cameras.find(cam => cam.id === e.target.value);
    setSelectedCamera(camera);
    setSimulationResults(null);
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'video/mp4') {
      setUploadedFile(file);
    } else {
      alert('Please upload an MP4 file');
    }
  }, []);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'video/mp4') {
      setUploadedFile(file);
    } else {
      alert('Please upload an MP4 file');
    }
  };

  const handleSimulation = async () => {
    if (!selectedCamera || !uploadedFile) return;

    setIsLoading(true);

    try {
      // Construct query parameters
      const params = new URLSearchParams({
        video_id: uploadedFile.name,
        camera_id: selectedCamera.id,
      });

      const response = await fetch(`http://0.0.0.0:8000/simulate?${params.toString()}`, {
        method: 'GET', // Change to 'POST' if required
      });

      const data = await response.json();
      setSimulationResults(data);
    } catch (error) {
      console.error('Simulation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResults = () => {
    if (!simulationResults) return null;

    return (
      <div className="analysis-content">
        <div className="summary-section">
          <div className="summary-header">
            <h3>Summary</h3>
            <span className="simulation-id">ID: {simulationResults.simulation_id}</span>
          </div>
          <div className="summary-stats">
            <div className="stat-item">
              <Shield className="stat-icon" />
              <span className="stat-value">{simulationResults.summary.total_breaches}</span>
              <span className="stat-label">Total Breaches</span>
            </div>
            <div className="stat-item">
              <Clock className="stat-icon" />
              <span className="stat-value">{new Date(simulationResults.timestamp).toLocaleTimeString()}</span>
              <span className="stat-label">Timestamp</span>
            </div>
          </div>
        </div>

        <div className="breaches-section">
          <h3>Detected Breaches</h3>
          {simulationResults.breaches.length > 0 ? (
            simulationResults.breaches.map((breach) => (
              <div key={breach.id} className="breach-card">
                <div className="breach-header">
                  <div className="breach-title">
                    <Shield className="breach-icon" />
                    <span>{breach.description}</span>
                  </div>
                  <span className="breach-time">
                    {new Date(breach.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="breach-details">
                  <div className="detail-item">
                    <span className="detail-label">Rule ID:</span>
                    <span className="detail-value">{breach.rule_id}</span>
                  </div>
                  {breach.severity && (
                    <div className="detail-item">
                      <span className="detail-label">Severity:</span>
                      <span className="detail-value">{breach.severity}</span>
                    </div>
                  )}
                  {breach.confidence && (
                    <div className="detail-item">
                      <span className="detail-label">Confidence:</span>
                      <span className="detail-value">
                        {(breach.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                  {breach.location && (
                    <div className="detail-item">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">{breach.location}</span>
                    </div>
                  )}
                </div>

                {breach.metadata && Object.keys(breach.metadata).length > 0 && (
                  <div className="metadata-grid">
                    {Object.entries(breach.metadata).map(([key, value]) => (
                      <div key={key} className="metadata-item">
                        <span className="metadata-label">{key.replace(/_/g, ' ')}:</span>
                        <span className="metadata-value">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-breaches">
              <CheckCircle className="no-breaches-icon" />
              <p>No breaches detected</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="simulation-page">
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">Camera Simulation</h1>
          <p className="page-subtitle">Upload video feeds and run simulations</p>
        </div>

        <div className="camera-section">
          <div className="camera-select-container">
            <h2 className="section-title">Camera Selection</h2>
            <select
              className="camera-select"
              value={selectedCamera?.id || ''}
              onChange={handleCameraChange}
            >
              {cameras.map(camera => (
                <option key={camera.id} value={camera.id}>
                  {camera.room.name} - {camera.id}
                </option>
              ))}
            </select>
          </div>

          <div className="upload-section">
            <h2 className="section-title">Upload Video Feed</h2>
            <div
              className={`dropzone ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="video/mp4"
                onChange={handleFileInput}
              />
              <Upload className="upload-icon" />
              <p className="upload-text">
                Drag and drop your MP4 file here, or click to select
              </p>
              {uploadedFile && (
                <div className="file-info">
                  <CheckCircle />
                  <span>{uploadedFile.name}</span>
                </div>
              )}
            </div>

            <button
              className="button"
              onClick={handleSimulation}
              disabled={!selectedCamera || !uploadedFile || isLoading}
            >
              {isLoading ? 'Running Simulation...' : 'Run Simulation'}
            </button>
          </div>

          {uploadedFile && (
            <div className="video-preview">
              <video controls>
                <source src={URL.createObjectURL(uploadedFile)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar">
        <div className="sidebar-header">
          <Camera />
          <h2 className="sidebar-title">Analysis Results</h2>
        </div>

        {selectedCamera && (
          <div className="camera-status">
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span>Camera Active: {selectedCamera.room.name}</span>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p className="loading-text">Processing simulation...</p>
          </div>
        ) : simulationResults ? (
          renderResults()
        ) : (
          <div className="empty-state">
            <AlertCircle className="empty-icon" />
            <p>Upload a video and run a simulation to see results</p>
          </div>
        )}
      </div>
    </div>
  );
};