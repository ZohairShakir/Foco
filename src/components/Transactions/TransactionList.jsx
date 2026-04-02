import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORY_CONFIG } from '../../data/mockData';
import TransactionModal from './TransactionModal';
import './Transactions.css';

export default function TransactionList() {
  const { state, dispatch, filteredTransactions } = useApp();
  const { role } = state;
  const [modal, setModal] = useState(null); // null | 'add' | tx object

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  return (
    <div>
      {filteredTransactions.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <EmptyIcon />
            <p style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: 16, marginBottom: 4 }}>
              No transactions found
            </p>
            <p>Try adjusting your filters or add a new transaction.</p>
          </div>
        </div>
      ) : (
        <div className="tx-list">
          {filteredTransactions.map(tx => {
            const cfg = CATEGORY_CONFIG[tx.category] || CATEGORY_CONFIG['Other'];
            return (
              <div key={tx.id} className="tx-row">
                <div className="tx-icon" style={{ background: cfg.bg, color: cfg.color }}>
                  {cfg.icon}
                </div>

                <div className="tx-main">
                  <p className="tx-desc">{tx.description}</p>
                  <div className="tx-meta">
                    <span className="tx-cat" style={{ color: cfg.color }}>{tx.category}</span>
                    {tx.note && <span className="tx-note">· {tx.note}</span>}
                  </div>
                </div>

                <div className="tx-date">{formatDate(tx.date)}</div>

                <div className={`tx-amount ${tx.type}`}>
                  {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                </div>

                <span className={`badge badge-${tx.type}`}>{tx.type}</span>

                {role === 'admin' && (
                  <div className="tx-actions">
                    <button className="btn-icon btn-sm" title="Edit" onClick={() => setModal(tx)}>
                      <EditIcon />
                    </button>
                    <button className="btn-icon btn-sm" title="Delete" onClick={() => handleDelete(tx.id)}
                      style={{ color: 'var(--danger)' }}>
                      <TrashIcon />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {modal === 'add' && <TransactionModal onClose={() => setModal(null)} />}
      {modal && modal !== 'add' && (
        <TransactionModal editing={modal} onClose={() => setModal(null)} />
      )}
    </div>
  );
}

// pass setModal up via ref trick — simpler to export a setter
export { };

const formatDate = (d) => {
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' });
};

const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const EmptyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <path d="M2 10h20"/>
  </svg>
);
