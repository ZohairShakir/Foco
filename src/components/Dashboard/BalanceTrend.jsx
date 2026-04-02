import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { getMonthlyData } from '../../data/mockData';
import './Charts.css';

const fmt = (n) => '₹' + (n >= 1000 ? (n / 1000).toFixed(0) + 'k' : n);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="ct-label">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="ct-row">
          <span className="ct-dot" style={{ background: p.color }} />
          <span className="ct-name">{p.name}</span>
          <span className="ct-val">₹{Number(p.value).toLocaleString('en-IN')}</span>
        </div>
      ))}
    </div>
  );
};

export default function BalanceTrend() {
  const { state } = useApp();
  const data = useMemo(() => getMonthlyData(state.transactions), [state.transactions]);

  if (!data.length) {
    return (
      <div className="card chart-card">
        <div className="empty-state"><p>No data to display</p></div>
      </div>
    );
  }

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Balance Trend</h3>
          <p className="chart-sub">Monthly income vs expenses over time</p>
        </div>
        <div className="chart-legend">
          <span><span className="legend-dot" style={{ background: '#00D9A3' }} />Income</span>
          <span><span className="legend-dot" style={{ background: '#FF6B8A' }} />Expenses</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#00D9A3" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#00D9A3" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#FF6B8A" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#FF6B8A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-body)' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tickFormatter={fmt}
            tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
            axisLine={false} tickLine={false} width={50}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
          <Area
            type="monotone" dataKey="income" name="Income"
            stroke="#00D9A3" strokeWidth={2}
            fill="url(#gradIncome)" dot={false} activeDot={{ r: 4, fill: '#00D9A3' }}
          />
          <Area
            type="monotone" dataKey="expenses" name="Expenses"
            stroke="#FF6B8A" strokeWidth={2}
            fill="url(#gradExpense)" dot={false} activeDot={{ r: 4, fill: '#FF6B8A' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
