import React, { useState, useCallback} from 'react';
import { useDropzone } from "react-dropzone"
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';

export const MonitorPage = () => {
  const cameras = [
    { id: 1, name: 'Camera 1', video: video1, analysis: 'Below is an updated version of your component that uses an HTML table for layout and includes modern styling. In this version, the table’s header (which contains the camera selection) and the table’s body (which holds the media) automatically share the same width. The CSS has been updated to provide a modern look with clean typography, subtle shadows, and responsive behavior.' },
    { id: 2, name: 'Camera 2', video: video2, analysis: 'Analysis for Camera 2' },
    { id: 3, name: 'Camera 3', video: video3, analysis: 'Analysis for Camera 3' },
  ];

  const [selectedCamera, setSelectedCamera] = useState(cameras[0]);

  const handleCameraChange = (e) => {
    const cameraId = parseInt(e.target.value, 10);
    const newCamera = cameras.find((cam) => cam.id === cameraId);
    setSelectedCamera(newCamera);
  };

  const [dataURL, setDataURL] = useState(null)
  const [uploadedURL, setUploadedURL] = useState(null)

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onabort = () => console.log("file reading was aborted")
      reader.onerror = () => console.log("file reading has failed")
      reader.onload = () => {
        const binaryStr = reader.result
        setDataURL(binaryStr)
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop })

  const selectedFile = acceptedFiles[0]

  const uploadImage = async () => {
    let formData = new FormData()

    formData.append("file", selectedFile)
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY)

    await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then(r => {
        return r.json()
      })
      .then(data => {
        setUploadedURL(data.url)
      })

  }
  

  return (
    <div className="camera-page">
      <table className="monitor-table">
        <thead>
          <tr>
            <th className="camera-select">
              <div className="camera-select-content">
                <label htmlFor="camera-dropdown">Select Camera:</label>
                <select id="camera-dropdown" onChange={handleCameraChange}>
                  {cameras.map((camera) => (
                    <option key={camera.id} value={camera.id}>
                      {camera.name}
                    </option>
                  ))}
                </select>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="media-container">
              <div className="video-container">
                <video controls>
                  <source src={selectedCamera.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="analysis-container">
                {/* <textarea readOnly value={selectedCamera.analysis} /> */}
                <p>{selectedCamera.analysis}</p>
              </div>
              
            </td>
          </tr>
        </tbody>
      </table>

      <style>{`
        .camera-page {
          padding: 20px;
          background: #f0f2f5;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          justify-content: center;
        }
        .monitor-table {
          border-collapse: collapse;
          width: 100%;
          background: #fff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        .monitor-table th, .monitor-table td {
          padding: 20px;
          text-align: left;
        }
        .camera-select {
          background-color: #009688;
          color: #fff;
          font-size: 1.25rem;
        }
        .camera-select-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .camera-select label {
          margin-right: 10px;
        }
        .camera-select select {
          font-size: 1rem;
          padding: 8px;
          border: none;
          border-radius: 4px;
        }
        .media-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-items: center;
          
        }
        .video-container video {
          width: 100%;
          border-radius: 8px;
        }
        .analysis-container {
          width: 100%;
          height: 100%;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 10px;
          resize: none;
          font-family: inherit;
          font-size: 1rem;
          overflowY: scroll;
        }
        @media (max-width: 768px) {
          .media-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
