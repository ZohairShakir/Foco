import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

// ── State shape ───────────────────────────────────────────────────────────────
const STORAGE_KEY = 'finsight_state_v1';

const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
};

const DEFAULT_STATE = {
  transactions: INITIAL_TRANSACTIONS,
  role:         'viewer',   // 'viewer' | 'admin'
  theme:        'dark',     // 'dark' | 'light'
  sidebarOpen:  true,
  activePage:   'dashboard',
  filters: {
    search:    '',
    type:      'all',
    category:  'all',
    sortBy:    'date-desc',
    dateFrom:  '',
    dateTo:    '',
  },
};

// ── Reducer ───────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'TOGGLE_THEME': {
      const theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      return { ...state, theme };
    }

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case 'SET_PAGE':
      return { ...state, activePage: action.payload };

    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'RESET_FILTERS':
      return { ...state, filters: DEFAULT_STATE.filters };

    case 'ADD_TRANSACTION': {
      const newTx = {
        ...action.payload,
        id: String(Date.now()),
        amount: Number(action.payload.amount),
      };
      return { ...state, transactions: [newTx, ...state.transactions] };
    }

    case 'UPDATE_TRANSACTION': {
      const updated = state.transactions.map(t =>
        t.id === action.payload.id
          ? { ...t, ...action.payload, amount: Number(action.payload.amount) }
          : t
      );
      return { ...state, transactions: updated };
    }

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };

    case 'RESTORE_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, loadState() || DEFAULT_STATE);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Apply saved theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, []);

  // Derived: filtered + sorted transactions
  const filteredTransactions = useMemo(() => {
    const { search, type, category, sortBy, dateFrom, dateTo } = state.filters;
    let txs = [...state.transactions];

    if (search) {
      const q = search.toLowerCase();
      txs = txs.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.note?.toLowerCase().includes(q)
      );
    }
    if (type !== 'all')     txs = txs.filter(t => t.type === type);
    if (category !== 'all') txs = txs.filter(t => t.category === category);
    if (dateFrom) txs = txs.filter(t => t.date >= dateFrom);
    if (dateTo)   txs = txs.filter(t => t.date <= dateTo);

    txs.sort((a, b) => {
      if (sortBy === 'date-desc')    return b.date.localeCompare(a.date);
      if (sortBy === 'date-asc')     return a.date.localeCompare(b.date);
      if (sortBy === 'amount-desc')  return b.amount - a.amount;
      if (sortBy === 'amount-asc')   return a.amount - b.amount;
      return 0;
    });
    return txs;
  }, [state.transactions, state.filters]);

  const value = { state, dispatch, filteredTransactions };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
