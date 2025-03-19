import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { generateContentIdeas } from '../services/aiService';

export default function ContentPlanner() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleGenerateIdeas(e) {
    e.preventDefault();

    if (!topic.trim()) {
      return setError('Please enter a topic');
    }

    try {
      setError('');
      setIsGenerating(true);

      // Call our AI service to generate ideas
      const ideas = await generateContentIdeas(topic, platform);
      setGeneratedIdeas(ideas);
    } catch (err) {
      console.error('Error generating ideas:', err);
      setError('Failed to generate content ideas');
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSaveIdea(idea) {
    try {
      await addDoc(collection(db, 'contentIdeas'), {
        title: idea,
        platform: platform,
        topic: topic,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      });

      alert('Content idea saved successfully!');
    } catch (err) {
      console.error('Error saving idea:', err);
      setError('Failed to save content idea');
    }
  }

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <div className="content-planner">
      <header className="app-header">
        <div className="logo">AI Influencer Platform</div>
        <nav>
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/content-planner')} className="active">Content Planner</button>
          <button onClick={() => navigate('/analytics')}>Analytics</button>
          <button onClick={() => navigate('/settings')}>Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main className="content-planner-main">
        <h1>Content Idea Generator</h1>
        {error && <div className="error-message">{error}</div>}

        <div className="generator-form">
          <form onSubmit={handleGenerateIdeas}>
            <div className="form-group">
              <label htmlFor="topic">What topic are you creating content about?</label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Fitness, Travel, Cooking, Fashion..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="platform">Which platform are you creating for?</label>
              <select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="YouTube">YouTube</option>
                <option value="Twitter">Twitter</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="generate-button"
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Content Ideas'}
            </button>
          </form>
        </div>

        {generatedIdeas.length > 0 && (
          <div className="generated-ideas">
            <h2>Generated Content Ideas</h2>
            <ul className="ideas-list">
              {generatedIdeas.map((idea, index) => (
                <li key={index} className="idea-item">
                  <div className="idea-content">{idea}</div>
                  <button 
                    onClick={() => handleSaveIdea(idea)}
                    className="save-button"
                  >
                    Save Idea
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}