import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getSummary } from '../../data/mockData';
import './SummaryCards.css';

const fmt = (n) => '₹' + n.toLocaleString('en-IN');

export default function SummaryCards() {
  const { state } = useApp();
  const { income, expenses, balance, savingsRate } = useMemo(
    () => getSummary(state.transactions),
    [state.transactions]
  );

  const cards = [
    {
      label:    'Net Balance',
      value:    fmt(balance),
      sub:      balance >= 0 ? '▲ Positive cash flow' : '▼ Negative cash flow',
      subColor: balance >= 0 ? 'var(--accent)' : 'var(--danger)',
      accent:   'var(--accent)',
      icon:     <WalletIcon />,
      glow:     'rgba(0,217,163,0.15)',
    },
    {
      label:    'Total Income',
      value:    fmt(income),
      sub:      `${state.transactions.filter(t => t.type === 'income').length} credit transactions`,
      subColor: 'var(--text-muted)',
      accent:   'var(--info)',
      icon:     <IncomeIcon />,
      glow:     'rgba(91,156,246,0.12)',
    },
    {
      label:    'Total Expenses',
      value:    fmt(expenses),
      sub:      `${state.transactions.filter(t => t.type === 'expense').length} debit transactions`,
      subColor: 'var(--text-muted)',
      accent:   'var(--danger)',
      icon:     <ExpenseIcon />,
      glow:     'rgba(255,107,138,0.12)',
    },
    {
      label:    'Savings Rate',
      value:    `${savingsRate}%`,
      sub:      savingsRate >= 20 ? '✓ Healthy savings' : '⚠ Below 20% target',
      subColor: savingsRate >= 20 ? 'var(--accent)' : 'var(--warning)',
      accent:   'var(--purple)',
      icon:     <SavingsIcon />,
      glow:     'rgba(155,127,255,0.12)',
      isRate:   true,
      rate:     savingsRate,
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((c, i) => (
        <div className="summary-card" key={i} style={{ '--card-glow': c.glow, '--card-accent': c.accent, animationDelay: `${i * 0.06}s` }}>
          <div className="sc-header">
            <p className="sc-label">{c.label}</p>
            <div className="sc-icon" style={{ color: c.accent, background: c.glow }}>
              {c.icon}
            </div>
          </div>
          <p className="sc-value" style={{ color: c.accent }}>{c.value}</p>
          {c.isRate && (
            <div className="sc-rate-bar">
              <div className="sc-rate-fill" style={{ width: `${Math.min(100, c.rate)}%`, background: c.accent }} />
            </div>
          )}
          <p className="sc-sub" style={{ color: c.subColor }}>{c.sub}</p>
        </div>
      ))}
    </div>
  );
}

const WalletIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
  </svg>
);
const IncomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>
  </svg>
);
const ExpenseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>
  </svg>
);
const SavingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
