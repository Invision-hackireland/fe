import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/landing.jsx';
import { AuthPage } from './pages/auth.jsx';
import { DashboardPage } from './pages/dashboard.jsx';
import { MonitorPage } from './pages/monitor.jsx';
import { CameraPage } from './pages/camera.jsx';
import { RulesPage } from './pages/rules.jsx';
import Sidebar from './components/sidebar.jsx';
import PageContainer from './components/page-container.jsx';

// import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<PageContainer><LandingPage /></PageContainer>} />
        <Route path="/dashboard" element={<PageContainer><DashboardPage /></PageContainer>} />
        <Route path="/auth" element={<PageContainer><AuthPage /></PageContainer>} />
        <Route path="/monitor" element={<PageContainer><MonitorPage /></PageContainer>} />
        <Route path="/camera" element={<PageContainer><CameraPage /></PageContainer>} />
        <Route path="/rules" element={<PageContainer><RulesPage /></PageContainer>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
