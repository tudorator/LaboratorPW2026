import { useState, useEffect } from 'react';

const API = 'http://localhost:3000';

function Home() {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(function () {
    fetch(API + '/api/stats')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        setStats(data);
        setLoading(false);
      })
      .catch(function () {
        setError('Nu pot incarca statisticile. Verificati serverul.');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Bun venit, Grecu Tudor-Mihai!</h2>
      <p style={{ margin: '12px 0 24px' }}>
        Dashboard personal — React + Express + MongoDB.
      </p>

      <h3 style={{ marginBottom: '12px', color: 'var(--text-muted)' }}>
        Statistici din baza de date:
      </h3>

      {loading && <p className="loading">Se incarca statisticile...</p>}
      {error   && <p className="error">{error}</p>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total proiecte</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--green)' }}>
              {stats.done}
            </div>
            <div className="stat-label">Finalizate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.inProgress}</div>
            <div className="stat-label">In lucru</div>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: '32px' }}>
        <h3 style={{ marginBottom: '12px' }}>Stack tehnologic</h3>
        <p><strong style={{ color: 'var(--accent)' }}>Frontend:</strong> React + Vite + React Router</p>
        <p style={{ marginTop: '8px' }}><strong style={{ color: 'var(--accent)' }}>Backend:</strong> Node.js + Express</p>
        <p style={{ marginTop: '8px' }}><strong style={{ color: 'var(--accent)' }}>Baza de date:</strong> MongoDB + Mongoose</p>
        <p style={{ marginTop: '8px' }}><strong style={{ color: 'var(--accent)' }}>Deploy:</strong> Vercel + Render + MongoDB Atlas</p>
      </div>
    </div>
  );
}

export default Home;
