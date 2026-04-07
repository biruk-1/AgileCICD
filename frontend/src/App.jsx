import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './index.css';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <span className="logo">&#9881; CI/CD Demo</span>
          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
          </nav>
        </div>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>CI/CD Demo Project &mdash; Powered by React + Express + Docker + GitHub Actions</p>
      </footer>
    </div>
  );
}
