import React from 'react';
import Logoicon from '../assets/logo.svg'

import { useNavigate } from 'react-router-dom';



function Header() {
    const navigate = useNavigate();

    const handleNavigation = () => {
      navigate('/monitor');
    };
  
    
  return (
    <header className="header">
        <div style={{magin:0, padding:0}}>
        <img src={Logoicon} alt="Logo" height={500} width={500}/>
        </div>
    
      <nav>
        <button className="nav-button">Sign Up</button>
        <button className="nav-button demo" onClick={handleNavigation}>Demo</button>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <h2>Revolutionize Safety & Compliance</h2>
      <p>
        Invision uses cutting-edge AI to monitor cameras and ensure everyone adheres to the code of conduct.
      </p>
      <div className="cta">
        <button className="cta-button">Sign Up</button>
        <button className="cta-button demo">Demo</button>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="features">
      <div className="feature">
        <h3>Real-Time Monitoring</h3>
        <p>
          Our AI system continuously monitors your premises to ensure compliance and immediate alerts.
        </p>
      </div>
      <div className="feature">
        <h3>Advanced Analytics</h3>
        <p>
          Gain valuable insights with robust data analytics to keep your environment safe.
        </p>
      </div>
      <div className="feature">
        <h3>Easy Integration</h3>
        <p>
          Seamlessly integrate Invision with your current security and monitoring systems.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Invision. All rights reserved.</p>
    </footer>
  );
}

export const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Footer />
      <style>{`
        /* Global Styles */
        body, html {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #fff;
          color: #000;
        }
        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background-color: blue;
          color: #fff;
        }
        .header h1 {
          margin: 0;
        }
        nav {
          display: flex;
        }
        .nav-button {
          background: none;
          border: 1px solid #fff;
          color: #fff;
          padding: 10px 20px;
          margin-left: 10px;
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
        }
        .nav-button:hover {
          background-color: #fff;
          color: #000;
        }
        /* Hero Section */
        .hero {
          padding: 100px 20px;
          text-align: center;
        }
        .hero h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        .hero p {
          font-size: 1.2rem;
          margin-bottom: 30px;
        }
        .cta-button {
          background-color: #000;
          border: 2px solid #000;
          color: #fff;
          padding: 15px 30px;
          margin: 10px;
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
        }
        .cta-button:hover {
          background-color: #fff;
          color: #000;
        }
        /* Features Section */
        .features {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 50px 20px;
          background-color: #f4f4f4;
        }
        .feature {
          flex: 1 1 300px;
          margin: 20px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          text-align: center;
        }
        .feature h3 {
          margin-bottom: 10px;
        }
        /* Footer */
        .footer {
          padding: 20px;
          text-align: center;
          background-color: #000;
          color: #fff;
        }
      `}</style>
    </>
  );
}

