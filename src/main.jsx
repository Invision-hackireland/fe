import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { LandingPage } from './pages/landing.jsx';
import { AuthPage } from './pages/auth.jsx';
import { DashboardPage } from './pages/dashboard.jsx';
import { MonitorPage } from './pages/monitor.jsx';
import { CameraPage } from './pages/camera.jsx';
import { RulesPage } from './pages/rules.jsx';

// import './index.css'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="monitor" element={<MonitorPage />} />
        <Route path="camera" element={<CameraPage />} />
        <Route path="rules" element={<RulesPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
