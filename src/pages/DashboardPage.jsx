import SummaryCards from '../components/Dashboard/SummaryCards';
import BalanceTrend from '../components/Dashboard/BalanceTrend';
import SpendingBreakdown from '../components/Dashboard/SpendingBreakdown';
import { useApp } from '../context/AppContext';
import './Pages.css';

export default function DashboardPage() {
  const { state } = useApp();
  const txCount = state.transactions.length;

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>
          Financial overview across {txCount} transactions
          {state.role === 'admin' && <span className="admin-chip"> · Admin Mode</span>}
        </p>
      </div>

      <SummaryCards />

      <div className="charts-row">
        <div className="chart-primary"><BalanceTrend /></div>
        <div className="chart-secondary"><SpendingBreakdown /></div>
      </div>

      {/* Recent transactions preview */}
      <RecentTransactions />
    </div>
  );
}

function RecentTransactions() {
  const { state, dispatch } = useApp();
  const recent = [...state.transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="card recent-card">
      <div className="recent-header">
        <h3 className="chart-title">Recent Transactions</h3>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'transactions' })}
        >
          View All →
        </button>
      </div>
      <div>
        {recent.map(tx => (
          <div key={tx.id} className="recent-row">
            <div>
              <p className="recent-desc">{tx.description}</p>
              <p className="recent-cat">{tx.category} · {tx.date}</p>
            </div>
            <span className={`recent-amount ${tx.type}`}>
              {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
