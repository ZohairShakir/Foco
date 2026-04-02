import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../../context/AppContext';
import { getCategoryBreakdown } from '../../data/mockData';
import './Charts.css';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="chart-tooltip">
      <div className="ct-row">
        <span className="ct-dot" style={{ background: d.payload.color }} />
        <span className="ct-name">{d.name}</span>
        <span className="ct-val">₹{Number(d.value).toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
};

export default function SpendingBreakdown() {
  const { state } = useApp();
  const data = useMemo(() => getCategoryBreakdown(state.transactions), [state.transactions]);
  const total = data.reduce((s, d) => s + d.amount, 0);

  if (!data.length) {
    return (
      <div className="card chart-card">
        <div className="empty-state"><p>No expense data</p></div>
      </div>
    );
  }

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Spending Breakdown</h3>
          <p className="chart-sub">By category (all time)</p>
        </div>
      </div>

      <div className="breakdown-body">
        <div className="breakdown-chart">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data} cx="50%" cy="50%"
                innerRadius={60} outerRadius={90}
                dataKey="amount" nameKey="category"
                paddingAngle={3}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center">
            <p className="donut-total">₹{(total/1000).toFixed(0)}k</p>
            <p className="donut-sub">total spend</p>
          </div>
        </div>

        <div className="breakdown-list">
          {data.slice(0, 6).map((d, i) => (
            <div key={i} className="breakdown-item">
              <div className="bi-left">
                <span className="bi-icon">{d.icon}</span>
                <span className="bi-name">{d.category}</span>
              </div>
              <div className="bi-right">
                <span className="bi-pct">{Math.round((d.amount / total) * 100)}%</span>
                <div className="bi-bar">
                  <div
                    className="bi-bar-fill"
                    style={{ width: `${(d.amount / data[0].amount) * 100}%`, background: d.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
