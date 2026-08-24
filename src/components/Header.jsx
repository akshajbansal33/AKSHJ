import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

/* 
  Header Component
  Demonstrates:
  1. Functional Components and JSX structure.
  2. React State (useState) to handle mobile hamburger menu visibility toggles.
  3. Event Handling (onClick) for user interaction.
  4. Conditional Rendering / Class toggling based on state.
*/
function Header() {
  const navigate = useNavigate();

  // state hook to toggle the mobile drawer
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // state hook to simulate location selection
  const [location, setLocation] = useState('Mumbai');
  // state hook for light/dark theme preference
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  // Active logged-in user state
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsMenuOpen(false);
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLocationChange = () => {
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
    const currentIndex = cities.indexOf(location);
    const nextCity = cities[(currentIndex + 1) % cities.length];
    setLocation(nextCity);
  };

  // Helper function to handle routing to pages
  const handleScrollTo = (path) => {
    setIsMenuOpen(false); // Close mobile menu if open
    navigate(path);
  };


  return (
    <header className="header-wrapper">
      <div className="header-container container">
        {/* Brand Logo - Custom styled inline SVG for standalone stability */}
        <a href="#" className="logo-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </span>
          Torque<span className="logo-text-talk">Talk</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li>
              <span className="nav-link" onClick={() => handleScrollTo('/new-cars')}>
                New Cars
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => handleScrollTo('/brands')}>
                Popular Brands
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => handleScrollTo('/body-types')}>
                Body Types
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => handleScrollTo('/budgets')}>
                Budgets
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => handleScrollTo('/why-us')}>
                Why Torque Talk
              </span>
            </li>
          </ul>
        </nav>

        {/* Global Action items */}
        <div className="header-actions desktop-nav">
          <button 
            type="button" 
            className="location-selector" 
            onClick={handleLocationChange}
            title="Click to change city"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{location}</span>
          </button>

          <button 
            type="button" 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
          
          {currentUser ? (
            <div className="user-profile-header">
              <span className="user-name">Hi, {currentUser.name.split(' ')[0]}</span>
              <button type="button" className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button type="button" className="login-btn" onClick={() => navigate('/login')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Hamburger menu button for smaller viewport resolutions */}
        <button 
          type="button" 
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Drawer (Visible dynamically on viewport threshold) */}
      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li>
            <span className="nav-link" onClick={() => handleScrollTo('/new-cars')}>
              New Cars
            </span>
          </li>
          <li>
            <span className="nav-link" onClick={() => handleScrollTo('/brands')}>
              Popular Brands
            </span>
          </li>
          <li>
            <span className="nav-link" onClick={() => handleScrollTo('/body-types')}>
              Body Types
            </span>
          </li>
          <li>
            <span className="nav-link" onClick={() => handleScrollTo('/budgets')}>
              Budgets
            </span>
          </li>
          <li>
            <span className="nav-link" onClick={() => handleScrollTo('/why-us')}>
              Why Torque Talk
            </span>
          </li>
        </ul>
        <div className="mobile-actions">
          <button type="button" className="location-selector" onClick={handleLocationChange}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{location}</span>
          </button>

          <button 
            type="button" 
            className="theme-toggle-btn-mobile" 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <span>Light Mode</span>
              </>
            )}
          </button>
          
          {currentUser ? (
            <div className="mobile-user-profile">
              <span className="user-name-mobile">Logged in: {currentUser.name}</span>
              <button type="button" className="logout-btn-mobile" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button type="button" className="login-btn" onClick={() => { setIsMenuOpen(false); navigate('/login'); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
