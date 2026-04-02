import { useApp } from '../context/AppContext';
import './Navbar.css';

const PAGES = [
  { id: 'dashboard',    label: 'Dashboard' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'insights',     label: 'Insights' },
];

export default function Navbar() {
  const { state, dispatch } = useApp();

  return (
    <header className="navbar">
      {/* Left: hamburger + logo */}
      <div className="navbar-left">
        <button
          className="btn-icon hamburger"
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          aria-label="Toggle sidebar"
        >
          <MenuIcon />
        </button>
        <div className="navbar-brand">
          <span className="brand-dot" />
          <span className="brand-name">FinSight</span>
        </div>
      </div>

      {/* Center: nav tabs */}
      <nav className="navbar-tabs">
        {PAGES.map(p => (
          <button
            key={p.id}
            className={`nav-tab ${state.activePage === p.id ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_PAGE', payload: p.id })}
          >
            {p.label}
          </button>
        ))}
      </nav>

      {/* Right: role switcher + theme */}
      <div className="navbar-right">
        <div className="role-switcher">
          <span className="role-label">Role:</span>
          <select
            className="input role-select"
            value={state.role}
            onChange={e => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
          >
            <option value="viewer">👁 Viewer</option>
            <option value="admin">⚡ Admin</option>
          </select>
        </div>

        <button
          className="btn-icon theme-btn"
          onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
          aria-label="Toggle theme"
          title={state.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {state.theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}

// ── Inline SVGs ──
const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/>
    <line x1="12" y1="18" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/>
    <line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="6" y2="12"/>
    <line x1="18" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="7.05" y2="16.95"/>
    <line x1="16.95" y1="7.05" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
