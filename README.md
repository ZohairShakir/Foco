# FinSight — Finance Dashboard

> A clean, interactive personal finance dashboard built with React.

![FinSight Preview](https://via.placeholder.com/1200x630/080C18/00D9A3?text=FinSight+Finance+Dashboard)

## 🚀 Live Demo

**[→ View Live on Vercel](#)** *(replace with your deployment URL)*

---

## 📦 Tech Stack

| Layer           | Choice                        |
|----------------|-------------------------------|
| Framework       | React 18 + Vite               |
| State Management| React Context + useReducer    |
| Charts          | Recharts                      |
| Styling         | Custom CSS (design tokens)    |
| Persistence     | localStorage                  |
| Data            | Static mock data (~90 tx)     |

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build    # outputs to /dist
npm run preview  # preview the production build
```

### Deploy to Vercel (one click)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select the repo — Vercel auto-detects Vite
4. Click Deploy ✅

---

## 🗂 Project Structure

```
src/
├── main.jsx                  # Entry point
├── App.jsx                   # Root component + page routing
├── index.css                 # Global design system (CSS variables)
│
├── context/
│   └── AppContext.jsx         # Global state: Context + useReducer
│
├── data/
│   └── mockData.js            # 90+ transactions, helpers, config
│
├── components/
│   ├── Navbar.jsx / .css      # Top navbar: tabs, role switcher, theme
│   ├── Sidebar.jsx / .css     # Collapsible sidebar with balance widget
│   │
│   ├── Dashboard/
│   │   ├── SummaryCards.jsx   # 4 KPI cards (balance, income, expenses, savings)
│   │   ├── BalanceTrend.jsx   # Area chart: monthly income vs expenses
│   │   ├── SpendingBreakdown.jsx # Donut + category list
│   │   └── Charts.css
│   │
│   ├── Transactions/
│   │   ├── TransactionFilters.jsx  # Search, type, category, sort, date range
│   │   ├── TransactionList.jsx     # Scrollable tx rows with edit/delete (admin)
│   │   ├── TransactionModal.jsx    # Add / Edit modal form
│   │   └── Transactions.css
│   │
│   └── Insights/
│       ├── InsightsPanel.jsx   # KPIs, bar chart, category table, observations
│       └── Insights.css
│
└── pages/
    ├── DashboardPage.jsx
    ├── TransactionsPage.jsx
    └── InsightsPage.jsx
```

---

## ✅ Features Implemented

### Dashboard Overview
- **4 Summary Cards**: Net Balance, Total Income, Total Expenses, Savings Rate
- **Balance Trend**: Area chart showing 6 months of income vs expenses
- **Spending Breakdown**: Interactive donut chart + ranked category list
- **Recent Transactions**: 5 most recent at a glance

### Transactions
- Full transaction list (90+ mock transactions across 6 months)
- **Search** by description, category or note
- **Filter** by type (income/expense), category, and date range
- **Sort** by date (asc/desc) or amount (asc/desc)
- **CSV Export** — downloads all transactions as a `.csv` file
- **Add / Edit / Delete** transactions *(Admin only)*

### Role-Based UI
Switch roles from the navbar dropdown:
| Role    | Permissions                              |
|---------|------------------------------------------|
| Viewer  | Read-only — no add/edit/delete controls  |
| Admin   | Full CRUD — add, edit, delete transactions |

### Insights
- **4 KPI cards**: Avg monthly income/spend, savings rate, best month
- **Monthly Comparison** bar chart (income vs expenses per month)
- **Top Categories** table with inline progress bars
- **4 Observation cards** with dynamic, data-driven text:
  - Highest spending category with % share
  - Month-over-month expense change
  - Month-over-month income change
  - Smart recommendation based on savings rate

### UX & Quality
- 🌙 **Dark / Light mode** toggle (CSS variable theming)
- 💾 **LocalStorage persistence** — state survives page refresh
- 📱 **Responsive** — works on mobile, tablet, and desktop
- 🔄 **Reset Data** button — restores original mock data
- ✅ **Empty states** — graceful messages when no data matches filters
- ⚡ **Collapsible sidebar** with balance mini-widget
- 🎨 **Custom design system** — all colors/radii/shadows via CSS variables

---

## 🧠 State Management Approach

All global state lives in a **single `AppContext`** powered by `useReducer`:

```
AppState {
  transactions[]   — full transaction array
  role             — 'viewer' | 'admin'
  theme            — 'dark' | 'light'
  sidebarOpen      — boolean
  activePage       — 'dashboard' | 'transactions' | 'insights'
  filters {
    search, type, category, sortBy, dateFrom, dateTo
  }
}
```

Filtered + sorted transactions are derived with `useMemo` — no duplicate state, single source of truth. Every state change goes through explicit action types (SET_ROLE, ADD_TRANSACTION, UPDATE_TRANSACTION, etc.).

---

## 🎨 Design Decisions

- **Font pairing**: Sora (display) + Plus Jakarta Sans (body) + JetBrains Mono (numbers)
- **Color system**: Dark navy base with emerald accent (#00D9A3) for positive, rose (#FF6B8A) for negative
- **CSS Variables**: Full dark/light theme switching without JS — just swap a `data-theme` attribute
- **Animation**: Subtle `fadeIn` and `slideUp` keyframes on mount, `translateY(-2px)` hover lifts

---

## 📊 Mock Data

90+ transactions spanning **October 2024 – March 2025** across 11 categories:
Food & Dining, Transport, Shopping, Bills & Utilities, Entertainment,
Health & Fitness, Travel, Freelance Income, Salary, Investment, Other.

Includes realistic patterns: monthly salary, recurring bills, variable spending spikes (December travel/shopping), a salary increment in March.

---

## 📝 Assumptions Made

- No backend or authentication — roles are purely frontend-simulated
- LocalStorage used for persistence (no IndexedDB or remote sync)
- Currency fixed to INR (₹) with Indian number formatting
- Date range is Oct 2024 – Mar 2025 for meaningful insight comparisons

---

*Built for evaluation — FinSight by [Your Name]*
