import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';

export default function App() {
  const { state, dispatch } = useApp();

  const Page = {
    dashboard:    DashboardPage,
    transactions: TransactionsPage,
    insights:     InsightsPage,
  }[state.activePage] || DashboardPage;

  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-shell">
        {state.sidebarOpen && (
          <div 
            className="sidebar-backdrop active" 
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })} 
          />
        )}
        <Sidebar />
        <div className={`main-area ${state.sidebarOpen ? '' : 'sidebar-collapsed'}`}>
          <main className="page-content">
            <Page key={state.activePage} />
          </main>
        </div>
      </div>
    </div>
  );
}
