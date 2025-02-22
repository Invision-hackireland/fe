import { Link, useLocation } from "react-router-dom";
import { FaHome, FaVideo, FaDesktop, FaShieldAlt, FaCog } from "react-icons/fa";
import "../styles/sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Cameras", path: "/camera", icon: <FaVideo /> },
    { name: "Monitor", path: "/monitor", icon: <FaDesktop /> },
    { name: "Rules", path: "/rules", icon: <FaShieldAlt /> },
    { name: "Settings", path: "/auth", icon: <FaCog /> },
  ];

  return (
    <nav className="sidebar sleek-sidebar">
      <div className="sidebar-logo">InVision</div>
      <ul className="sidebar-menu">
        {navItems.map((item) => (
          <li key={item.path} className={`sidebar-item ${location.pathname === item.path ? "active" : ""}`}>
            <Link to={item.path} className="sidebar-link">
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;