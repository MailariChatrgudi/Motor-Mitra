import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import translations from '../utils/translations';
import './navbar.css';

// Navbar receives lang (current language) and toggleLang (function to switch it)
function Navbar({ lang, toggleLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  // Check if a link is the current page
  const isActive = (path) => location.pathname === path;

  // Get translation object for current lang
  const t = translations[lang] || translations['en'];

  return (
    <nav className="navbar">

      {/* Logo on the left */}
      <Link to='/' className="navbar-brand-link" onClick={closeMenu}>
        <div className="navbar-brand-text">Motor<span>Mitra</span></div>
      </Link>

      {/* Hamburger — only on mobile */}
      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        type="button"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Nav links */}
      <ul className={`navbar-links ${menuOpen ? 'show' : ''}`}>

        <li>
          <Link
            to="/"
            className={isActive('/') ? 'nav-link-active' : ''}
            onClick={closeMenu}
          >
            {t.navHome}
          </Link>
        </li>

        <li>
          <Link
            to="/request"
            className={isActive('/request') ? 'nav-link-active' : ''}
            onClick={closeMenu}
          >
            {t.navRequest}
          </Link>
        </li>

        <li>
          <Link
            to="/track"
            className={isActive('/track') ? 'nav-link-active' : ''}
            onClick={closeMenu}
          >
            {t.navTrack}
          </Link>
        </li>

        <li>
          <Link
            to="/mechanic"
            className={isActive('/mechanic') ? 'nav-link-active' : ''}
            onClick={closeMenu}
          >
            {t.navMechanic}
          </Link>
        </li>

        {/* Language toggle button — shows "ಕನ್ನಡ" when English is active, "English" when Kannada is active */}
        <li>
          <button
            className="mm-lang-pill"
            onClick={toggleLang}
            type="button"
          >
            {t.langToggle}
          </button>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;