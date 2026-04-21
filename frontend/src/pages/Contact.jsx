import { useState } from 'react';

const INITIAL = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission (mock — no real email sent)
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  }

  function handleReset() {
    setForm(INITIAL);
    setSubmitted(false);
  }

  return (
    <div>
      <h1 className="page-title">Contact</h1>
      <h2 className="page-title">Contact us please </h2>
      <p className="page-subtitle">Send a message &mdash; submissions are mocked for this demo.</p>

      <div className="card" style={{ maxWidth: 540 }}>
        {submitted ? (
          <div>
            <div className="form-success" style={{ marginBottom: '1rem' }}>
              ✓ Message received! (This is a simulated submission — no data was sent.)
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem' }}>
              In a real app this would POST to the backend, validate inputs, and persist to a database.
            </p>
            <button className="btn btn-outline" onClick={handleReset}>Send another</button>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading || !form.name || !form.email || !form.message}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>

      <div className="card" style={{ maxWidth: 540, marginTop: '1rem' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-gray" style={{ marginRight: 8 }}>Note</span>
          Mock Submission
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          This form intentionally does not call a real API. In production, you would POST to
          <code style={{ background: 'var(--border)', padding: '1px 5px', borderRadius: 4, margin: '0 4px' }}>POST /api/contact</code>
          and handle server-side validation, spam filtering, and email delivery.
        </p>
      </div>
    </div>
  );
}
