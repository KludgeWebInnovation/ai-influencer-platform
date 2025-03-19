import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Analytics() {
  const [error, setError] = useState('');
  const { logout } = useAuth();
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
    <div className="analytics">
      <header className="app-header">
        <div className="logo">AI Influencer Platform</div>
        <nav>
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/content-planner')}>Content Planner</button>
          <button onClick={() => navigate('/analytics')} className="active">Analytics</button>
          <button onClick={() => navigate('/settings')}>Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main className="analytics-main">
        <h1>Analytics Dashboard</h1>
        {error && <div className="error-message">{error}</div>}

        <div className="placeholder-message">
          <h2>Coming Soon</h2>
          <p>Analytics features will be available in the future version of the platform.</p>
          <p>Here you'll be able to track:</p>
          <ul>
            <li>Content performance</li>
            <li>Audience growth</li>
            <li>Engagement metrics</li>
            <li>Trending topics</li>
          </ul>
        </div>
      </main>
    </div>
  );
}