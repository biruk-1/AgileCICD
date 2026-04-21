import { useState, useEffect } from 'react';

const STEPS = [
  { icon: '🔀', title: 'Push to main', desc: 'Developer pushes code — pipeline triggers automatically' },
  { icon: '📦', title: 'Install Dependencies', desc: 'npm ci runs for frontend and backend' },
  { icon: '🧪', title: 'Run Tests', desc: 'Jest + Vitest test suites execute; pipeline fails on error' },
  { icon: '🏗️', title: 'Build Frontend', desc: 'Vite produces an optimized production bundle' },
  { icon: '🐳', title: 'Build Docker Images', desc: 'Multi-stage builds create lean production images' },
  { icon: '🚀', title: 'Deploy (Simulated)', desc: 'Docker Compose starts containers — backend on :5000, frontend on :3000' },
];

export default function Home() {
  const [apiData, setApiData] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ok | error

  async function fetchMessage() {
    setStatus('loading');
    setApiData(null);
    try {
      const res = await fetch('/api/message');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setApiData(data);
      setStatus('ok');
    } catch (err) {
      setApiData({ error: err.message });
      setStatus('error');
    }
  }

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div>
      <h1 className="page-title">CI/CD Demo Project</h1>
      <div className="page-subtitle">
        <h1>welccome every body </h1>
        <h2>we are happy to see you here</h2>
        <h1>welccome every body </h1>
        <h2>we are happy to see you here</h2>
      </div>
      <p className="page-subtitle">A full-stack learning simulation of real-world DevOps flow.</p>

      {/* Live API Demo */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.05rem' }}>Live Backend API</h2>
          <span className={`badge ${status === 'ok' ? 'badge-green' : status === 'error' ? 'badge-gray' : 'badge-blue'}`}>
            {status === 'loading' ? 'Fetching...' : status === 'ok' ? '● Connected' : status === 'error' ? '✕ Error' : 'Idle'}
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
          Calling <code style={{ background: 'var(--border)', padding: '1px 6px', borderRadius: 4 }}>GET /api/message</code> from the React frontend:
        </p>
        <div className={`api-box ${status === 'loading' ? 'loading' : status === 'error' ? 'error' : ''}`}>
          {status === 'loading' && 'Waiting for response...'}
          {(status === 'ok' || status === 'error') && JSON.stringify(apiData, null, 2)}
          {status === 'idle' && '// press the button to fetch'}
        </div>
        <button className="btn btn-primary" onClick={fetchMessage} disabled={status === 'loading'} style={{ marginTop: '0.75rem' }}>
          ↺ Refresh
        </button>
      </div>

      {/* Pipeline steps */}
      <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>How the CI/CD Pipeline Works</h2>
      <div className="pipeline">
        {STEPS.map((s, i) => (
          <div className="step" key={i}>
            <span className="step-icon">{s.icon}</span>
            <div>
              <div className="step-title">{i + 1}. {s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
