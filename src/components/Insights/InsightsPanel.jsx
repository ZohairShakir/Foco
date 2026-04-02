import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { getMonthlyData, getCategoryBreakdown, CATEGORY_CONFIG } from '../../data/mockData';
import './Insights.css';

const fmt  = (n) => '₹' + n.toLocaleString('en-IN');
const fmtk = (n) => '₹' + (n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n);

// ── Custom bar tooltip ──
const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="ct-label">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="ct-row">
          <span className="ct-dot" style={{ background: p.fill }} />
          <span className="ct-name">{p.name}</span>
          <span className="ct-val">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function InsightsPanel() {
  const { state } = useApp();
  const txs = state.transactions;

  const monthly     = useMemo(() => getMonthlyData(txs), [txs]);
  const catBreakdown= useMemo(() => getCategoryBreakdown(txs), [txs]);

  // ── Compute insights ──
  const insights = useMemo(() => {
    if (!monthly.length) return null;

    const latest   = monthly[monthly.length - 1];
    const prev     = monthly[monthly.length - 2];

    const topCat   = catBreakdown[0];
    const totalExp = catBreakdown.reduce((s, c) => s + c.amount, 0);
    const totalInc = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);

    const savingsRate  = totalInc ? Math.round(((totalInc - totalExp) / totalInc) * 100) : 0;
    const avgMonthlyExp= Math.round(totalExp / monthly.length);
    const avgMonthlyInc= Math.round(totalInc / monthly.length);

    const expChange = prev
      ? Math.round(((latest.expenses - prev.expenses) / prev.expenses) * 100)
      : 0;
    const incChange = prev
      ? Math.round(((latest.income - prev.income) / prev.income) * 100)
      : 0;

    const bestMonth = [...monthly].sort((a, b) => b.balance - a.balance)[0];
    const worstMonth= [...monthly].sort((a, b) => a.balance - b.balance)[0];

    return {
      latest, prev, topCat, totalExp, totalInc,
      savingsRate, avgMonthlyExp, avgMonthlyInc,
      expChange, incChange, bestMonth, worstMonth,
    };
  }, [monthly, catBreakdown, txs]);

  if (!insights) {
    return <div className="empty-state"><p>Not enough data for insights.</p></div>;
  }

  const { latest, prev, topCat, savingsRate, avgMonthlyExp, avgMonthlyInc,
          expChange, incChange, bestMonth, worstMonth, totalExp, totalInc } = insights;

  return (
    <div className="insights-grid">

      {/* ── KPI Cards row ── */}
      <div className="insight-kpis">
        <KpiCard
          label="Avg Monthly Income"
          value={fmt(avgMonthlyInc)}
          accent="var(--accent)"
          icon="💰"
          sub={`Over ${monthly.length} months`}
        />
        <KpiCard
          label="Avg Monthly Spend"
          value={fmt(avgMonthlyExp)}
          accent="var(--danger)"
          icon="💸"
          sub="Avg expenses per month"
        />
        <KpiCard
          label="Overall Savings Rate"
          value={`${savingsRate}%`}
          accent={savingsRate >= 20 ? 'var(--accent)' : 'var(--warning)'}
          icon={savingsRate >= 20 ? '✅' : '⚠️'}
          sub={savingsRate >= 20 ? 'Above the 20% benchmark' : 'Below the 20% benchmark'}
        />
        <KpiCard
          label="Best Month (Net)"
          value={fmt(bestMonth.balance)}
          accent="var(--info)"
          icon="🏆"
          sub={bestMonth.label}
        />
      </div>

      {/* ── Monthly comparison bar chart ── */}
      <div className="card insight-chart-card">
        <div className="chart-header">
          <div>
            <h3 className="chart-title">Monthly Comparison</h3>
            <p className="chart-sub">Income vs Expenses by month</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthly} margin={{ top: 4, right: 0, left: 0, bottom: 0 }} barGap={4}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-body)' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmtk} tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} width={52} />
            <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="income"   name="Income"   fill="#00D9A3" radius={[4,4,0,0]} maxBarSize={30} />
            <Bar dataKey="expenses" name="Expenses" fill="#FF6B8A" radius={[4,4,0,0]} maxBarSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Top categories table ── */}
      <div className="card insight-cats-card">
        <div className="chart-header">
          <div>
            <h3 className="chart-title">Top Spending Categories</h3>
            <p className="chart-sub">Where your money is going</p>
          </div>
        </div>
        <div className="cat-table">
          {catBreakdown.slice(0, 7).map((c, i) => (
            <div key={i} className="cat-row">
              <span className="cat-rank">#{i + 1}</span>
              <span className="cat-icon">{c.icon}</span>
              <span className="cat-name">{c.category}</span>
              <div className="cat-bar-wrap">
                <div className="cat-bar" style={{ width: `${(c.amount / catBreakdown[0].amount) * 100}%`, background: c.color }} />
              </div>
              <span className="cat-amount" style={{ color: c.color }}>{fmt(c.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Observation cards ── */}
      <div className="observations">
        <ObsCard
          icon="🔥"
          title="Highest Spending Category"
          color="var(--warning)"
          text={`${topCat?.icon} ${topCat?.category} accounts for ₹${topCat?.amount?.toLocaleString('en-IN')} — ${Math.round((topCat?.amount / totalExp) * 100)}% of all expenses.`}
        />
        <ObsCard
          icon={expChange > 0 ? '⬆️' : '⬇️'}
          title="Month-over-Month Expenses"
          color={expChange > 10 ? 'var(--danger)' : 'var(--accent)'}
          text={
            prev
              ? `Spending ${expChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(expChange)}% in ${latest.label} vs ${prev.label}. ${expChange > 10 ? 'Watch your spending!' : 'Great job keeping it down.'}`
              : `Only one month of data available so far.`
          }
        />
        <ObsCard
          icon={incChange >= 0 ? '📈' : '📉'}
          title="Month-over-Month Income"
          color={incChange >= 0 ? 'var(--info)' : 'var(--danger)'}
          text={
            prev
              ? `Income ${incChange >= 0 ? 'grew' : 'dropped'} by ${Math.abs(incChange)}% in ${latest.label}. ${incChange >= 0 ? 'Keep it up!' : 'Consider diversifying income sources.'}`
              : `Tracking income trends across months.`
          }
        />
        <ObsCard
          icon="💡"
          title="Smart Observation"
          color="var(--purple)"
          text={
            savingsRate < 20
              ? `Your savings rate is ${savingsRate}%. Consider reducing ${topCat?.category} spend (currently ₹${topCat?.amount?.toLocaleString('en-IN')}) to hit the 20% target.`
              : `You're saving ${savingsRate}% of income — well above the 20% benchmark. Your best net month was ${bestMonth.label} with ₹${bestMonth.balance.toLocaleString('en-IN')} surplus.`
          }
        />
      </div>

    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function KpiCard({ label, value, accent, icon, sub }) {
  return (
    <div className="kpi-card" style={{ '--ka': accent }}>
      <div className="kpi-top">
        <span className="kpi-icon">{icon}</span>
        <p className="kpi-label">{label}</p>
      </div>
      <p className="kpi-value" style={{ color: accent }}>{value}</p>
      <p className="kpi-sub">{sub}</p>
    </div>
  );
}

function ObsCard({ icon, title, color, text }) {
  return (
    <div className="obs-card" style={{ '--oc': color }}>
      <div className="obs-header">
        <span className="obs-icon">{icon}</span>
        <p className="obs-title">{title}</p>
      </div>
      <p className="obs-text">{text}</p>
    </div>
  );
}
