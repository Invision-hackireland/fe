import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css'

function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <span className="logo-text">Invision</span>
        </div>
        <nav>
          <button className="nav-button">Product</button>
          <button className="nav-button">Enterprise</button>
          <button className="nav-button primary">Get Started →</button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    navigate(`/${link}`);
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            AI-Powered Safety & Compliance
            <span className="gradient-text"> For The Modern Workplace</span>
          </h1>
          <p className="hero-subtitle">
            Transform your workplace safety with real-time AI monitoring. 
            Join 500+ companies ensuring compliance with Invision.
          </p>
          <div className="cta-group">
            <button 
              className="cta-button primary" 
              onClick={() => handleNavigation("auth")}
            >
              Start Free Trial
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => handleNavigation("monitor")}
            >
              Watch Demo →
            </button>
          </div>
          <div className="social-proof">
            <p>Trusted by innovative companies</p>
            <div className="company-logos">
              <div className="logo-placeholder"></div>
              <div className="logo-placeholder"></div>
              <div className="logo-placeholder"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="features">
      <div className="container">
        <h2 className="section-title">Everything you need for workplace safety</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon monitoring"></div>
            <h3>Real-Time Monitoring</h3>
            <p>
              Advanced AI monitoring system that detects safety violations instantly,
              providing immediate alerts to prevent incidents.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon analytics"></div>
            <h3>Intelligent Analytics</h3>
            <p>
              Transform safety data into actionable insights with our 
              comprehensive analytics dashboard.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon integration"></div>
            <h3>Seamless Integration</h3>
            <p>
              Connect with your existing security infrastructure in minutes.
              No complex setup required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-text">Invision</span>
            <p>Making workplaces safer with AI</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Enterprise</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">Support</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Invision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}