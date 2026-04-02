import { useApp } from '../context/AppContext';
import './Sidebar.css';

const NAV_ITEMS = [
  { id: 'dashboard',    icon: <DashIcon />,   label: 'Dashboard' },
  { id: 'transactions', icon: <TxIcon />,     label: 'Transactions' },
  { id: 'insights',     icon: <InsightIcon />,label: 'Insights' },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const open = state.sidebarOpen;

  const income   = state.transactions.filter(t => t.type === 'income').reduce((s,t) => s+t.amount, 0);
  const expenses = state.transactions.filter(t => t.type === 'expense').reduce((s,t) => s+t.amount, 0);
  const balance  = income - expenses;

  return (
    <aside className={`sidebar ${open ? 'open' : 'collapsed'}`}>
      {/* Mini balance pill */}
      {open && (
        <div className="sidebar-balance">
          <p className="sb-label">Net Balance</p>
          <p className="sb-amount">₹{balance.toLocaleString('en-IN')}</p>
          <div className="sb-bar">
            <div className="sb-bar-fill" style={{ width: `${Math.min(100, (expenses/income)*100)}%` }} />
          </div>
          <div className="sb-stats">
            <span className="sb-income">↑ ₹{(income/100000).toFixed(1)}L</span>
            <span className="sb-expense">↓ ₹{(expenses/100000).toFixed(1)}L</span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`sidebar-item ${state.activePage === item.id ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_PAGE', payload: item.id })}
            title={!open ? item.label : undefined}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {open && <span className="sidebar-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Role badge */}
      {open && (
        <div className="sidebar-footer">
          <div className={`role-badge ${state.role}`}>
            {state.role === 'admin' ? '⚡ Admin Mode' : '👁 View Only'}
          </div>
          <p className="sidebar-tip">
            {state.role === 'admin'
              ? 'You can add, edit and delete transactions.'
              : 'Switch to Admin to manage transactions.'}
          </p>
        </div>
      )}
    </aside>
  );
}

function DashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
    </svg>
  );
}
function TxIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12H3M21 6H3M21 18H3"/>
    </svg>
  );
}
function InsightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
    </svg>
  );
}
