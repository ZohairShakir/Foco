import InsightsPanel from '../components/Insights/InsightsPanel';
import './Pages.css';

export default function InsightsPage() {
  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Insights</h1>
        <p>Smart observations and trends from your financial data</p>
      </div>
      <InsightsPanel />
    </div>
  );
}
