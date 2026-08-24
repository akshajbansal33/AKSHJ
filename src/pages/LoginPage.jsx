import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Status states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Seed default demo users in localStorage if not present
  useEffect(() => {
    const existingUsers = localStorage.getItem('users');
    if (!existingUsers) {
      const defaultUsers = [
        { name: 'John Doe', email: 'user@torquetalk.com', password: 'user123' },
        { name: 'Admin Talk', email: 'admin@torquetalk.com', password: 'admin123' }
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }, []);

  // Handle Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (matchedUser) {
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      setSuccess(`Welcome back, ${matchedUser.name}! Redirecting...`);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setError('Invalid email or password.');
    }
  };

  // Handle Signup submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

    if (emailExists) {
      setError('An account with this email already exists.');
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    setSuccess('Account created successfully! Logging you in...');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="login-page-container">
      {/* Left side hero branding banner */}
      <div className="login-side-image">
        <img src="/realistic_car_hero.png" alt="Torque Talk Vehicles" />
        <div className="login-image-content">
          <h2>Your Journey to Premium Motoring Starts Here</h2>
          <p>Sign in to save search configurations, compare premium packages, and track catalog listings.</p>
        </div>
      </div>

      {/* Right side interactive card form */}
      <div className="login-side-form">
        <div className="login-form-card">
          <div className="login-header">
            <h1 className="login-title" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              Torque<span style={{ color: 'var(--primary)' }}>Talk</span>
            </h1>
            <p className="login-subtitle">Discover and compare luxury & premium cars</p>
          </div>

          {/* Dual Toggle tab */}
          <div className="login-toggle-tabs">
            <button 
              type="button" 
              className={`login-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => { setActiveTab('login'); setError(''); setSuccess(''); }}
            >
              Sign In
            </button>
            <button 
              type="button" 
              className={`login-tab ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => { setActiveTab('signup'); setError(''); setSuccess(''); }}
            >
              Create Account
            </button>
          </div>

          {/* Validation Status message flags */}
          {error && <div className="login-error-msg">{error}</div>}
          {success && <div className="login-success-msg">{success}</div>}

          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="login-form-group">
                <label className="login-label">Email Address</label>
                <input 
                  type="email" 
                  className="login-input" 
                  placeholder="user@torquetalk.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="login-form-group">
                <label className="login-label">Password</label>
                <input 
                  type="password" 
                  className="login-input" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="login-btn-submit">Sign In</button>
              
              <div className="demo-credentials">
                <h4>Try demo accounts:</h4>
                <p><strong>Regular:</strong> user@torquetalk.com / user123</p>
                <p><strong>Admin:</strong> admin@torquetalk.com / admin123</p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit}>
              <div className="login-form-group">
                <label className="login-label">Full Name</label>
                <input 
                  type="text" 
                  className="login-input" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="login-form-group">
                <label className="login-label">Email Address</label>
                <input 
                  type="email" 
                  className="login-input" 
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="login-form-group">
                <label className="login-label">Password</label>
                <input 
                  type="password" 
                  className="login-input" 
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="login-btn-submit">Create Account</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
