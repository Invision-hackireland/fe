import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/landing.jsx';
import { AuthPage } from './pages/auth.jsx';
import { DashboardPage } from './pages/dashboard.jsx';
import { LogsPage } from './pages/logs.jsx';
import { CameraPage } from './pages/camera.jsx';
import { RulesPage } from './pages/rules.jsx';
import { RoomsPage } from './pages/rooms.jsx';
import Sidebar from './components/sidebar.jsx';
import PageContainer from './components/page-container.jsx';
import { useLocation } from 'react-router-dom';

const ConditionalSidebar = () => {
  const location = useLocation();
  return ((location.pathname === '/auth') || (location.pathname === '/')) ? null : <Sidebar />;
};

// import './index.css'



const RouterWrapper = () => {
  const [importantId, setImportantId] = useState(null);

  const settingFunction = (x) => {
    setImportantId(x)
    console.log(x)
  }

  return (
    <BrowserRouter>
      <ConditionalSidebar />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/dashboard" element={<PageContainer><DashboardPage /></PageContainer>} />
        <Route path="/auth" element={<AuthPage setImportantId={settingFunction} />} />
        <Route path="/logs" element={<PageContainer><LogsPage /></PageContainer>} />
        <Route path="/camera" element={<PageContainer><CameraPage /></PageContainer>} />
        <Route path="/rules" element={<PageContainer><RulesPage /></PageContainer>} />
        <Route path="/rooms" element={<PageContainer><RoomsPage /></PageContainer>} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterWrapper />
  </StrictMode>
)
