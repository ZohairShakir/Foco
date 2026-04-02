import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

const EMPTY = {
  date: new Date().toISOString().split('T')[0],
  description: '',
  category: CATEGORIES[0],
  amount: '',
  type: 'expense',
  note: '',
};

export default function TransactionModal({ editing, onClose }) {
  const { dispatch } = useApp();
  const [form, setForm] = useState(editing || EMPTY);
  const [errors, setErrors] = useState({});

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = 'Required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) e.amount = 'Must be > 0';
    if (!form.date) e.date = 'Required';
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (editing) {
      dispatch({ type: 'UPDATE_TRANSACTION', payload: form });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: form });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <h2>{editing ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button className="btn-icon" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Type toggle */}
        <div className="form-group">
          <label>Type</label>
          <div className="type-toggle">
            {['expense', 'income'].map(t => (
              <button
                key={t}
                className={`type-btn ${form.type === t ? 'active ' + t : ''}`}
                onClick={() => set('type', t)}
              >
                {t === 'income' ? '↑ Income' : '↓ Expense'}
              </button>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              className={`input ${errors.amount ? 'input-error' : ''}`}
              type="number" min="1" placeholder="0"
              value={form.amount}
              onChange={e => set('amount', e.target.value)}
            />
            {errors.amount && <span className="field-err">{errors.amount}</span>}
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              className={`input ${errors.date ? 'input-error' : ''}`}
              type="date" value={form.date}
              onChange={e => set('date', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            className={`input ${errors.description ? 'input-error' : ''}`}
            type="text" placeholder="e.g. Swiggy Order"
            value={form.description}
            onChange={e => set('description', e.target.value)}
          />
          {errors.description && <span className="field-err">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <select className="input" value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Note (optional)</label>
          <input
            className="input" type="text" placeholder="Any additional note..."
            value={form.note}
            onChange={e => set('note', e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={submit}>
            {editing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>

      <style>{`
        .type-toggle { display: flex; gap: 8px; }
        .type-btn {
          flex: 1; padding: 8px; border-radius: var(--radius-sm);
          background: var(--bg-glass); border: 1px solid var(--border);
          color: var(--text-secondary); font-family: var(--font-body);
          font-size: 13px; font-weight: 500; cursor: pointer;
          transition: all var(--transition);
        }
        .type-btn.active.income  { background: var(--accent-dim); color: var(--accent); border-color: var(--border-accent); }
        .type-btn.active.expense { background: var(--danger-dim); color: var(--danger); border-color: rgba(255,107,138,0.3); }
        .input-error { border-color: var(--danger) !important; }
        .field-err { font-size: 11px; color: var(--danger); margin-top: 3px; display: block; }
      `}</style>
    </div>
  );
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
