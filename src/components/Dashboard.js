          import React, { useEffect, useState } from 'react';
          import { useNavigate } from 'react-router-dom';
          import { useAuth } from '../contexts/AuthContext';
          import { db } from '../firebase';
          import { collection, query, where, getDocs } from 'firebase/firestore';

          export default function Dashboard() {
            const [contentIdeas, setContentIdeas] = useState([]);
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState('');
            const { currentUser, logout } = useAuth();
            const navigate = useNavigate();

            useEffect(() => {
              async function fetchContentIdeas() {
                try {
                  const ideasQuery = query(
                    collection(db, 'contentIdeas'),
                    where('userId', '==', currentUser.uid)
                  );
                  const querySnapshot = await getDocs(ideasQuery);
                  const ideas = [];
                  querySnapshot.forEach((doc) => {
                    ideas.push({ id: doc.id, ...doc.data() });
                  });
                  setContentIdeas(ideas);
                } catch (err) {
                  console.error('Error fetching content ideas:', err);
                  setError('Failed to load content ideas');
                } finally {
                  setLoading(false);
                }
              }

              fetchContentIdeas();
            }, [currentUser.uid]);

            async function handleLogout() {
              try {
                await logout();
                navigate('/login');
              } catch {
                setError('Failed to log out');
              }
            }

            return (
              <div className="dashboard">
                <header className="app-header">
                  <div className="logo">AI Influencer Platform</div>
                  <nav>
                    <button onClick={() => navigate('/dashboard')} className="active">Dashboard</button>
                    <button onClick={() => navigate('/content-planner')}>Content Planner</button>
                    <button onClick={() => navigate('/analytics')}>Analytics</button>
                    <button onClick={() => navigate('/settings')}>Settings</button>
                    <button onClick={handleLogout}>Logout</button>
                  </nav>
                </header>

                <main className="dashboard-content">
                  <h1>Welcome to your Influencer Dashboard</h1>
                  {error && <div className="error-message">{error}</div>}

                  <div className="stat-cards">
                    <div className="stat-card">
                      <h3>Content Ideas</h3>
                      <p className="stat-number">{contentIdeas.length}</p>
                    </div>
                    <div className="stat-card">
                      <h3>Scheduled Posts</h3>
                      <p className="stat-number">0</p>
                    </div>
                    <div className="stat-card">
                      <h3>Platform Connections</h3>
                      <p className="stat-number">0</p>
                    </div>
                  </div>

                  <section className="recent-content">
                    <h2>Recent Content Ideas</h2>
                    {loading ? (
                      <p>Loading your content ideas...</p>
                    ) : contentIdeas.length > 0 ? (
                      <ul className="content-list">
                        {contentIdeas.slice(0, 5).map(idea => (
                          <li key={idea.id} className="content-item">
                            <div className="content-title">{idea.title}</div>
                            <div className="content-meta">Platform: {idea.platform}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>You haven't created any content ideas yet. Head over to the Content Planner to get started!</p>
                    )}
                    <button 
                      className="action-button"
                      onClick={() => navigate('/content-planner')}
                    >
                      Create New Content
                    </button>
                  </section>
                </main>
              </div>
            );
          }