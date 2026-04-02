import { useState } from 'react';
import TransactionFilters from '../components/Transactions/TransactionFilters';
import TransactionList from '../components/Transactions/TransactionList';
import TransactionModal from '../components/Transactions/TransactionModal';
import { useApp } from '../context/AppContext';
import { INITIAL_TRANSACTIONS } from '../data/mockData';
import './Pages.css';

export default function TransactionsPage() {
  const { state, dispatch } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  const exportCSV = () => {
    const rows = [
      ['Date', 'Description', 'Category', 'Type', 'Amount', 'Note'],
      ...state.transactions.map(t => [t.date, t.description, t.category, t.type, t.amount, t.note || '']),
    ];
    const csv  = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'finsight_transactions.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const resetData = () => {
    if (window.confirm('Reset to original mock data? All custom transactions will be lost.')) {
      dispatch({ type: 'RESTORE_STATE', payload: { transactions: INITIAL_TRANSACTIONS } });
      dispatch({ type: 'RESET_FILTERS' });
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header tx-page-header">
        <div>
          <h1>Transactions</h1>
          <p>Full history — filter, sort, search and manage</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm" onClick={exportCSV} title="Export CSV">
            <DownloadIcon /> Export CSV
          </button>
          <button className="btn btn-ghost btn-sm" onClick={resetData} title="Reset data">
            <ResetIcon /> Reset Data
          </button>
        </div>
      </div>

      <TransactionFilters onAdd={() => setShowAdd(true)} />
      <TransactionList />

      {showAdd && <TransactionModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const ResetIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);
