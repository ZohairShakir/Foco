// ============================================================
// FINSIGHT — Mock Financial Data
// ============================================================

export const CATEGORIES = [
  'Food & Dining',
  'Transport',
  'Shopping',
  'Bills & Utilities',
  'Entertainment',
  'Health & Fitness',
  'Travel',
  'Freelance Income',
  'Salary',
  'Investment',
  'Other',
];

export const CATEGORY_CONFIG = {
  'Food & Dining':    { color: '#FFAD50', bg: 'rgba(255,173,80,0.12)',   icon: '🍜' },
  'Transport':        { color: '#5B9CF6', bg: 'rgba(91,156,246,0.12)',   icon: '🚗' },
  'Shopping':         { color: '#FF6B8A', bg: 'rgba(255,107,138,0.12)',  icon: '🛍️' },
  'Bills & Utilities':{ color: '#9B7FFF', bg: 'rgba(155,127,255,0.12)', icon: '⚡' },
  'Entertainment':    { color: '#00D9A3', bg: 'rgba(0,217,163,0.12)',    icon: '🎬' },
  'Health & Fitness': { color: '#F5C842', bg: 'rgba(245,200,66,0.12)',   icon: '💪' },
  'Travel':           { color: '#FF8C69', bg: 'rgba(255,140,105,0.12)', icon: '✈️' },
  'Freelance Income': { color: '#00D9A3', bg: 'rgba(0,217,163,0.12)',    icon: '💻' },
  'Salary':           { color: '#00D9A3', bg: 'rgba(0,217,163,0.12)',    icon: '💰' },
  'Investment':       { color: '#00D9A3', bg: 'rgba(0,217,163,0.12)',    icon: '📈' },
  'Other':            { color: '#8A9BBE', bg: 'rgba(138,155,190,0.12)', icon: '📦' },
};

let _id = 1;
const mkId = () => String(_id++).padStart(4, '0');

const tx = (date, description, category, amount, type, note = '') => ({
  id: mkId(),
  date,
  description,
  category,
  amount,
  type,   // 'income' | 'expense'
  note,
});

export const INITIAL_TRANSACTIONS = [
  // ─── October 2024 ───
  tx('2024-10-01', 'Monthly Salary',        'Salary',           85000, 'income'),
  tx('2024-10-02', 'Electricity Bill',       'Bills & Utilities',  2200, 'expense'),
  tx('2024-10-03', 'Swiggy Order',           'Food & Dining',       480, 'expense'),
  tx('2024-10-04', 'Uber Cab',              'Transport',           340, 'expense'),
  tx('2024-10-05', 'Amazon Purchase',       'Shopping',           2100, 'expense'),
  tx('2024-10-06', 'Netflix Subscription',  'Entertainment',       649, 'expense'),
  tx('2024-10-08', 'Gym Membership',        'Health & Fitness',   1200, 'expense'),
  tx('2024-10-10', 'Freelance Project A',   'Freelance Income',  15000, 'income'),
  tx('2024-10-12', 'Zomato Order',          'Food & Dining',       320, 'expense'),
  tx('2024-10-14', 'Metro Card Recharge',   'Transport',           500, 'expense'),
  tx('2024-10-15', 'Internet Bill',         'Bills & Utilities',   999, 'expense'),
  tx('2024-10-17', 'Movie Tickets',         'Entertainment',       800, 'expense'),
  tx('2024-10-18', 'Grocery Store',         'Food & Dining',      3200, 'expense'),
  tx('2024-10-20', 'Phone Bill',            'Bills & Utilities',   399, 'expense'),
  tx('2024-10-22', 'Ola Auto',             'Transport',           120, 'expense'),
  tx('2024-10-25', 'Online Course',         'Other',              2999, 'expense'),
  tx('2024-10-28', 'Dinner with Friends',   'Food & Dining',      1800, 'expense'),
  tx('2024-10-30', 'Dividend Income',       'Investment',         4200, 'income'),

  // ─── November 2024 ───
  tx('2024-11-01', 'Monthly Salary',        'Salary',           85000, 'income'),
  tx('2024-11-02', 'Electricity Bill',       'Bills & Utilities',  2400, 'expense'),
  tx('2024-11-03', 'Starbucks',             'Food & Dining',       480, 'expense'),
  tx('2024-11-04', 'Rapido Bike Taxi',      'Transport',           180, 'expense'),
  tx('2024-11-05', 'Myntra Purchase',       'Shopping',           3400, 'expense'),
  tx('2024-11-06', 'Spotify Premium',       'Entertainment',       119, 'expense'),
  tx('2024-11-08', 'Pharmacy',              'Health & Fitness',    680, 'expense'),
  tx('2024-11-10', 'Freelance Project B',   'Freelance Income',  22000, 'income'),
  tx('2024-11-12', 'KFC Meal',              'Food & Dining',       620, 'expense'),
  tx('2024-11-15', 'Internet Bill',         'Bills & Utilities',   999, 'expense'),
  tx('2024-11-16', 'Weekend Getaway',       'Travel',            8500, 'expense'),
  tx('2024-11-18', 'Grocery Store',         'Food & Dining',      2900, 'expense'),
  tx('2024-11-20', 'Gas LPG Cylinder',      'Bills & Utilities',   950, 'expense'),
  tx('2024-11-22', 'Uber Cab',             'Transport',           290, 'expense'),
  tx('2024-11-25', 'Flipkart Sale',         'Shopping',           4200, 'expense'),
  tx('2024-11-28', 'Restaurant Dinner',     'Food & Dining',      2100, 'expense'),
  tx('2024-11-29', 'Investment Return',     'Investment',         6000, 'income'),

  // ─── December 2024 ───
  tx('2024-12-01', 'Monthly Salary',        'Salary',           85000, 'income'),
  tx('2024-12-02', 'Electricity Bill',       'Bills & Utilities',  2600, 'expense'),
  tx('2024-12-04', 'Christmas Shopping',    'Shopping',          12000, 'expense'),
  tx('2024-12-05', 'Swiggy',               'Food & Dining',       550, 'expense'),
  tx('2024-12-06', 'Uber',                 'Transport',           410, 'expense'),
  tx('2024-12-08', 'Year End Bonus',        'Salary',           25000, 'income'),
  tx('2024-12-10', 'Goa Trip Flights',      'Travel',           14000, 'expense'),
  tx('2024-12-12', 'Goa Hotel',            'Travel',            8800, 'expense'),
  tx('2024-12-15', 'Internet Bill',         'Bills & Utilities',   999, 'expense'),
  tx('2024-12-18', 'Grocery Store',         'Food & Dining',      3500, 'expense'),
  tx('2024-12-20', 'New Year Eve Party',    'Entertainment',      3200, 'expense'),
  tx('2024-12-22', 'Gym Membership',        'Health & Fitness',   1200, 'expense'),
  tx('2024-12-26', 'Amazon Sale',           'Shopping',           6200, 'expense'),
  tx('2024-12-29', 'Freelance Project C',   'Freelance Income',  18000, 'income'),

  // ─── January 2025 ───
  tx('2025-01-01', 'Monthly Salary',        'Salary',           85000, 'income'),
  tx('2025-01-02', 'Electricity Bill',       'Bills & Utilities',  2100, 'expense'),
  tx('2025-01-03', 'Swiggy Order',           'Food & Dining',       430, 'expense'),
  tx('2025-01-04', 'Metro Card',            'Transport',           500, 'expense'),
  tx('2025-01-06', 'Sports Shoes',          'Shopping',           4800, 'expense'),
  tx('2025-01-08', 'Doctor Consultation',   'Health & Fitness',   1500, 'expense'),
  tx('2025-01-10', 'Netflix',               'Entertainment',       649, 'expense'),
  tx('2025-01-12', 'Grocery Store',         'Food & Dining',      3100, 'expense'),
  tx('2025-01-15', 'Internet Bill',         'Bills & Utilities',   999, 'expense'),
  tx('2025-01-17', 'Freelance Project D',   'Freelance Income',  12000, 'income'),
  tx('2025-01-18', 'Ola Cab',              'Transport',           320, 'expense'),
  tx('2025-01-20', 'Dining Out',            'Food & Dining',      1600, 'expense'),
  tx('2025-01-22', 'Investment SIP',        'Investment',         5000, 'expense', 'Monthly SIP'),
  tx('2025-01-25', 'Book Purchase',         'Other',               899, 'expense'),
  tx('2025-01-28', 'Movie Night',           'Entertainment',       600, 'expense'),
  tx('2025-01-30', 'Dividend',              'Investment',         2800, 'income'),

  // ─── February 2025 ───
  tx('2025-02-01', 'Monthly Salary',        'Salary',           85000, 'income'),
  tx('2025-02-02', 'Electricity Bill',       'Bills & Utilities',  1900, 'expense'),
  tx('2025-02-03', 'Zomato',               'Food & Dining',       380, 'expense'),
  tx('2025-02-05', 'Valentine Day Dinner',  'Food & Dining',      4200, 'expense'),
  tx('2025-02-06', 'Rapido',               'Transport',           150, 'expense'),
  tx('2025-02-08', 'Myntra Sale',           'Shopping',           2800, 'expense'),
  tx('2025-02-10', 'Gym Membership',        'Health & Fitness',   1200, 'expense'),
  tx('2025-02-12', 'Freelance Project E',   'Freelance Income',  20000, 'income'),
  tx('2025-02-14', 'Grocery Store',         'Food & Dining',      2600, 'expense'),
  tx('2025-02-15', 'Internet Bill',         'Bills & Utilities',   999, 'expense'),
  tx('2025-02-18', 'Petrol',               'Transport',           1800, 'expense'),
  tx('2025-02-20', 'OTT Platforms Bundle',  'Entertainment',       999, 'expense'),
  tx('2025-02-22', 'Investment SIP',        'Investment',         5000, 'expense'),
  tx('2025-02-25', 'Phone Upgrade',         'Shopping',          14000, 'expense'),
  tx('2025-02-27', 'Weekend Trip',          'Travel',             5500, 'expense'),

  // ─── March 2025 ───
  tx('2025-03-01', 'Monthly Salary',        'Salary',           92000, 'income', 'Increment applied'),
  tx('2025-03-02', 'Electricity Bill',       'Bills & Utilities',  2300, 'expense'),
  tx('2025-03-03', 'Swiggy',               'Food & Dining',       510, 'expense'),
  tx('2025-03-05', 'Cab to Airport',        'Transport',           680, 'expense'),
  tx('2025-03-06', 'Amazon Order',          'Shopping',           3100, 'expense'),
  tx('2025-03-08', 'Holi Celebrations',     'Entertainment',      1800, 'expense'),
  tx('2025-03-10', 'Freelance Project F',   'Freelance Income',  28000, 'income'),
  tx('2025-03-12', 'Grocery Store',         'Food & Dining',      3400, 'expense'),
  tx('2025-03-14', 'Doctor + Medicines',    'Health & Fitness',   2100, 'expense'),
  tx('2025-03-15', 'Internet Bill',         'Bills & Utilities',   999, 'expense'),
  tx('2025-03-17', 'Gym Membership',        'Health & Fitness',   1200, 'expense'),
  tx('2025-03-19', 'Petrol',               'Transport',           1600, 'expense'),
  tx('2025-03-20', 'Investment SIP',        'Investment',         5000, 'expense'),
  tx('2025-03-22', 'Dinner Party',          'Food & Dining',      3200, 'expense'),
  tx('2025-03-25', 'Spotify + Netflix',     'Entertainment',       768, 'expense'),
  tx('2025-03-28', 'Tax Refund',           'Other',              8400, 'income'),
  tx('2025-03-30', 'Dividend',              'Investment',         3500, 'income'),
];

// ── Aggregate helpers ─────────────────────────────────────────────────────────

export const getMonthlyData = (transactions) => {
  const map = {};
  transactions.forEach(t => {
    const [year, month] = t.date.split('-');
    const key = `${year}-${month}`;
    if (!map[key]) map[key] = { month: key, income: 0, expenses: 0 };
    if (t.type === 'income')   map[key].income   += t.amount;
    if (t.type === 'expense')  map[key].expenses += t.amount;
  });
  return Object.values(map)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(d => ({
      ...d,
      balance: d.income - d.expenses,
      label: new Date(d.month + '-01').toLocaleString('default', { month: 'short', year: '2-digit' }),
    }));
};

export const getCategoryBreakdown = (transactions) => {
  const map = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
  return Object.entries(map)
    .map(([category, amount]) => ({ category, amount, ...CATEGORY_CONFIG[category] }))
    .sort((a, b) => b.amount - a.amount);
};

export const getSummary = (transactions) => {
  const income   = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  return { income, expenses, balance: income - expenses, savingsRate: income ? Math.round(((income - expenses) / income) * 100) : 0 };
};
