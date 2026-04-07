const TECH = [
  { icon: '⚛️',  name: 'React 18',      desc: 'UI library with hooks and routing' },
  { icon: '⚡',  name: 'Vite',          desc: 'Lightning-fast build tool' },
  { icon: '🟢',  name: 'Node.js',       desc: 'JavaScript runtime for the server' },
  { icon: '🚂',  name: 'Express',       desc: 'Minimal web framework for APIs' },
  { icon: '🐳',  name: 'Docker',        desc: 'Containerised, reproducible environments' },
  { icon: '🔁',  name: 'GitHub Actions', desc: 'Cloud-based CI/CD automation' },
];

const CI_STEPS = [
  { label: 'CI (Continuous Integration)', items: ['Checkout source code', 'Install all dependencies', 'Run automated tests (Jest + Vitest)', 'Build frontend production bundle', 'Build Docker images'] },
  { label: 'CD (Continuous Delivery / Deploy)', items: ['Pull built Docker images', 'Start containers via docker-compose', 'Backend available at localhost:5000', 'Frontend available at localhost:3000', 'Pipeline fails & blocks merge on any error'] },
];

export default function About() {
  return (
    <div>
      <h1 className="page-title">About This Project</h1>
      <p className="page-subtitle">A hands-on walkthrough of modern CI/CD and DevOps practices.</p>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>What is CI/CD?</h2>
        <p style={{ lineHeight: '1.7', color: 'var(--muted)', fontSize: '0.9rem' }}>
          <strong style={{ color: 'var(--text)' }}>Continuous Integration (CI)</strong> is the practice of automatically
          testing and building code every time a developer pushes a change. It catches bugs early
          before they reach production.
        </p>
        <p style={{ lineHeight: '1.7', color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
          <strong style={{ color: 'var(--text)' }}>Continuous Delivery (CD)</strong> takes it further — after the build
          passes, the pipeline automatically deploys the application (here simulated using Docker locally).
        </p>
      </div>

      {CI_STEPS.map((block) => (
        <div className="card" key={block.label} style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-blue" style={{ marginRight: 8 }}>Step</span>
            {block.label}
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {block.items.map((item) => (
              <li key={item} style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--muted)' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h2 style={{ fontSize: '1.05rem', margin: '2rem 0 1rem' }}>Technology Stack</h2>
      <div className="tech-grid">
        {TECH.map((t) => (
          <div className="tech-card" key={t.name}>
            <div className="icon">{t.icon}</div>
            <h3>{t.name}</h3>
            <p>{t.desc}</p>
            <p>{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
