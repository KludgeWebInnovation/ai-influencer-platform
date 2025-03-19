import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <div className="settings">
      <header className="app-header">
        <div className="logo">AI Influencer Platform</div>
        <nav>
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/content-planner')}>Content Planner</button>
          <button onClick={() => navigate('/analytics')}>Analytics</button>
          <button onClick={() => navigate('/settings')} className="active">Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main className="settings-main">
        <h1>Account Settings</h1>
        {error && <div className="error-message">{error}</div>}

        <div className="settings-section">
          <h2>Profile Information</h2>
          <div className="profile-info">
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Account created:</strong> {currentUser.metadata.creationTime}</p>
          </div>
        </div>

        <div className="settings-section">
          <h2>Connected Platforms</h2>
          <p className="placeholder-message">No social media platforms connected yet.</p>
          <div className="platform-connections">
            <div className="platform-item">
              <div className="platform-name">Instagram</div>
              <button className="connect-button" disabled>Connect</button>
            </div>
            <div className="platform-item">
              <div className="platform-name">TikTok</div>
              <button className="connect-button" disabled>Connect</button>
            </div>
            <div className="platform-item">
              <div className="platform-name">YouTube</div>
              <button className="connect-button" disabled>Connect</button>
            </div>
            <div className="platform-item">
              <div className="platform-name">Twitter</div>
              <button className="connect-button" disabled>Connect</button>
            </div>
          </div>
          <p className="note">Platform connections will be available in a future version.</p>
        </div>
      </main>
    </div>
  );
}