import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import './Transactions.css';

export default function TransactionFilters({ onAdd }) {
  const { state, dispatch, filteredTransactions } = useApp();
  const { filters, role } = state;

  const set = (field, val) => dispatch({ type: 'SET_FILTER', payload: { [field]: val } });

  const hasActive = filters.search || filters.type !== 'all' || filters.category !== 'all' || filters.dateFrom || filters.dateTo;

  return (
    <div className="filters-bar">
      <div className="filters-row">
        {/* Search */}
        <div className="search-wrap">
          <SearchIcon />
          <input
            className="input search-input"
            placeholder="Search transactions…"
            value={filters.search}
            onChange={e => set('search', e.target.value)}
          />
          {filters.search && (
            <button className="clear-search" onClick={() => set('search', '')}>✕</button>
          )}
        </div>

        {/* Type */}
        <select className="input filter-select" value={filters.type} onChange={e => set('type', e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category */}
        <select className="input filter-select" value={filters.category} onChange={e => set('category', e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Sort */}
        <select className="input filter-select" value={filters.sortBy} onChange={e => set('sortBy', e.target.value)}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>

        {/* Date range */}
        <input type="date" className="input filter-date" value={filters.dateFrom} onChange={e => set('dateFrom', e.target.value)} />
        <input type="date" className="input filter-date" value={filters.dateTo}   onChange={e => set('dateTo',   e.target.value)} />
      </div>

      <div className="filters-actions">
        <span className="result-count">{filteredTransactions.length} transactions</span>
        {hasActive && (
          <button className="btn btn-ghost btn-sm" onClick={() => dispatch({ type: 'RESET_FILTERS' })}>
            Clear Filters
          </button>
        )}
        {role === 'admin' && (
          <button className="btn btn-primary btn-sm" onClick={onAdd}>
            <PlusIcon /> Add Transaction
          </button>
        )}
      </div>
    </div>
  );
}

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
