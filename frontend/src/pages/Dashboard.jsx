import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskService, authService } from '../services/api';
import { 
  Plus, 
  LogOut, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Clock, 
  Filter,
  CheckCircle,
  Clock3,
  Loader2,
  Zap,
  Search,
  LayoutDashboard,
  Settings,
  User as UserIcon,
  Calendar,
  Edit3,
  ArrowUpDown,
  MoreVertical,
  PlusCircle,
  X,
  ChevronDown,
  ShieldCheck,
  Mail,
  UserCircle,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium', dueDate: '' });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Settings state
  const [settingsForm, setSettingsForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Dropdown states
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  useEffect(() => {
    fetchTasks();
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setShowSortDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      showToast('Failed to load tasks', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateTask = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const updated = await taskService.updateTask(editingTask._id, newTask);
        setTasks(tasks.map(t => t._id === editingTask._id ? updated : t));
        showToast('Task updated');
      } else {
        const data = await taskService.createTask(newTask);
        setTasks([data, ...tasks]);
        showToast('Task created');
      }
      closeModal();
    } catch (err) {
      showToast('Action failed', 'error');
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      await authService.updateProfile(settingsForm);
      showToast('Profile updated');
      setSettingsForm({ ...settingsForm, password: '' });
    } catch (err) {
      showToast('Update failed', 'error');
    } finally {
      setSettingsLoading(false);
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
  };

  const toggleComplete = async (task) => {
    try {
      const updated = await taskService.updateTask(task._id, { completed: !task.completed });
      setTasks(tasks.map((t) => (t._id === task._id ? updated : t)));
    } catch (err) {
      showToast('Failed to update', 'error');
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await taskService.deleteTask(id);
        setTasks(tasks.filter((t) => t._id !== id));
        showToast('Task deleted');
      } catch (err) {
        showToast('Failed to delete', 'error');
      }
    }
  };

  const getSortedTasks = (taskList) => {
    return [...taskList].sort((a, b) => {
      if (sortBy === 'priority') {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      }
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const filteredTasks = getSortedTasks(tasks.filter((t) => {
    const matchesFilter = filter === 'all' ? true : filter === 'completed' ? t.completed : !t.completed;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  }));

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  const sortOptions = [
    { value: 'recent', label: 'Recent' },
    { value: 'priority', label: 'Priority' },
    { value: 'dueDate', label: 'Due Date' }
  ];

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Calendar, label: 'Calendar' },
    { icon: UserIcon, label: 'Team' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden selection:bg-white selection:text-black">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden lg:flex w-64 flex-col border-r border-white/5 bg-[#0f0f0f] p-6"
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Zap className="text-black w-4 h-4 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight">Foco</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.label ? 'bg-white text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-72 bg-[#0f0f0f] z-[70] p-8 flex flex-col border-r border-white/10 lg:hidden"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Zap className="text-black w-4 h-4 fill-current" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">Foco</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => (
                <button 
                  key={item.label}
                  onClick={() => { setActiveTab(item.label); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-base font-semibold transition-all ${
                    activeTab === item.label ? 'bg-white text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>

            <button 
              onClick={logout}
              className="mt-auto flex items-center gap-4 px-5 py-4 rounded-xl text-base font-semibold text-gray-500 hover:text-red-500 hover:bg-red-500/5 transition-all border-t border-white/5 pt-8"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-10 z-20">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-white transition-colors" />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 ml-3">
            <div className="hidden sm:flex flex-col items-end mr-1">
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Active</span>
              <span className="text-xs font-semibold">{user?.name?.split(' ')[0]}</span>
            </div>
            <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <UserIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 relative no-scrollbar">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {activeTab === 'Dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Stats Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 md:mb-10">
                  {[
                    { label: 'ALL TASKS', value: stats.total },
                    { label: 'COMPLETED', value: stats.completed },
                    { label: 'PENDING', value: stats.pending }
                  ].map((stat) => (
                    <div 
                      key={stat.label}
                      className="bg-[#0f0f0f] border border-white/5 p-4 md:p-5 rounded-2xl flex flex-col justify-between"
                    >
                      <span className="text-[9px] md:text-[10px] font-bold text-gray-600 tracking-widest">{stat.label}</span>
                      <span className="text-xl md:text-2xl font-bold mt-1 tracking-tight">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* Action Row */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 overflow-x-auto no-scrollbar">
                      {['all', 'pending', 'completed'].map((f) => (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${
                            filter === f ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                    
                    <div className="relative" ref={sortRef}>
                      <button 
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        className="w-full flex items-center justify-between gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:border-white/20 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <ArrowUpDown className="w-3.5 h-3.5 text-gray-600" />
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                            {sortOptions.find(o => o.value === sortBy)?.label}
                          </span>
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {showSortDropdown && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full left-0 right-0 md:right-auto md:w-40 mt-2 bg-[#0f0f0f] border border-white/10 rounded-xl shadow-2xl z-50 py-2 overflow-hidden"
                          >
                            {sortOptions.map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                                className={`w-full text-left px-4 py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all ${sortBy === opt.value ? 'text-white' : 'text-gray-600'}`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(true)}
                    className="bg-white text-black px-6 py-3 md:py-2.5 rounded-xl font-bold text-[10px] md:text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    <PlusCircle className="w-4 h-4" />
                    New Task
                  </motion.button>
                </div>

                {/* Task Grid */}
                <AnimatePresence mode="popLayout">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-20">
                      <Loader2 className="w-10 h-10 animate-spin" />
                    </div>
                  ) : filteredTasks.length > 0 ? (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      {filteredTasks.map((task, idx) => (
                        <motion.div 
                          layout
                          key={task._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`group bg-[#0f0f0f] border border-white/5 p-4 md:p-5 rounded-2xl hover:border-white/10 transition-all flex items-start gap-3 md:gap-4 ${task.completed ? 'opacity-40' : ''}`}
                        >
                          <button 
                            onClick={() => toggleComplete(task)}
                            className={`mt-1 transition-all ${task.completed ? 'text-white' : 'text-gray-700 hover:text-white'}`}
                          >
                            {task.completed ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" /> : <Circle className="w-5 h-5 md:w-6 md:h-6" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                task.priority === 'high' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 
                                task.priority === 'medium' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 
                                'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'
                              }`} />
                              <h3 className={`font-bold text-base md:text-lg truncate ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                {task.title}
                              </h3>
                            </div>
                            <p className="text-gray-500 text-[11px] md:text-xs line-clamp-2 leading-relaxed mb-4">{task.description}</p>
                            
                            <div className="flex items-center gap-4">
                              {task.dueDate && (
                                <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-gray-600 font-bold uppercase tracking-tighter">
                                  <Clock className="w-3.5 h-3.5" />
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.button 
                              whileHover={{ color: "#ffffff", backgroundColor: "rgba(255,255,255,0.05)" }}
                              onClick={() => openEditModal(task)}
                              className="p-2 text-gray-800 rounded-lg"
                            >
                              <Edit3 className="w-4 h-4" />
                            </motion.button>
                            <motion.button 
                              whileHover={{ color: "#ef4444", backgroundColor: "rgba(239,68,68,0.05)" }}
                              onClick={() => deleteTask(task._id)}
                              className="p-2 text-gray-800 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl px-4"
                    >
                      <Zap className="w-10 h-10 text-white/5 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-1 tracking-tight">No tasks found</h3>
                      <p className="text-gray-600 text-xs">Try adjusting your filters or search query.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === 'Settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-6 md:p-10">
                  <h2 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">Account Settings</h2>
                  <p className="text-gray-500 text-xs md:text-sm mb-8 md:mb-10">Manage your profile information and account security.</p>
                  
                  <form onSubmit={handleUpdateSettings} className="space-y-6 md:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Full Name</label>
                        <div className="relative">
                          <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                          <input 
                            type="text" 
                            value={settingsForm.name}
                            onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-white/20 transition-all text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Email Address</label>
                        <div className="relative opacity-50">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                          <input 
                            type="email" 
                            value={settingsForm.email}
                            disabled
                            className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 cursor-not-allowed text-sm"
                          />
                        </div>
                        <span className="text-[9px] text-gray-700 uppercase font-bold">Email cannot be changed</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">New Password</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <input 
                          type="password" 
                          placeholder="Leave blank to keep current"
                          value={settingsForm.password}
                          onChange={(e) => setSettingsForm({ ...settingsForm, password: e.target.value })}
                          className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-white/20 transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div className="pt-4 md:pt-6">
                      <motion.button 
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        disabled={settingsLoading}
                        className="w-full md:w-auto bg-white text-black px-10 py-3.5 rounded-xl font-bold text-[10px] md:text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                      >
                        {settingsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {(activeTab === 'Calendar' || activeTab === 'Team') && (
              <motion.div 
                key="coming-soon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 md:py-40 px-4 text-center"
              >
                <div className="w-16 md:w-20 h-16 md:h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Zap className="w-8 md:w-10 h-8 md:h-10 text-white/20" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">{activeTab} Coming Soon</h2>
                <p className="text-gray-600 text-xs md:text-sm">We're working hard to bring this feature to Foco.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Task Modal - Updated for Mobile */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-md bg-black/80">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0f0f0f] w-full max-w-lg p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-y-auto max-h-[90vh] no-scrollbar"
            >
              <button onClick={closeModal} className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="absolute top-0 left-0 w-full h-1 bg-white" />
              <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 tracking-tight">{editingTask ? 'Edit Task' : 'Create Task'}</h2>
              <form onSubmit={handleCreateOrUpdateTask} className="space-y-5 md:space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Title</label>
                  <input
                    type="text" required value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="What needs to be done?"
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Add details..."
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-all min-h-[80px] md:min-h-[100px] text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Priority</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['low', 'medium', 'high'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setNewTask({ ...newTask, priority: p })}
                          className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest border transition-all ${
                            newTask.priority === p ? 'bg-white text-black border-white' : 'border-white/5 text-gray-500 hover:text-white'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Due Date</label>
                    <input
                      type="date" value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
                  <button type="button" onClick={closeModal} className="order-2 sm:order-1 flex-1 py-3.5 rounded-xl font-bold text-[10px] md:text-[11px] uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all">Cancel</button>
                  <button type="submit" className="order-1 sm:order-2 flex-1 py-3.5 rounded-xl font-bold text-[10px] md:text-[11px] uppercase tracking-widest bg-white text-black hover:bg-gray-100 transition-all shadow-xl">
                    {editingTask ? 'Save Changes' : 'Create Task'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 md:bottom-10 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto bg-[#0f0f0f] border border-white/10 px-6 md:px-8 py-3 rounded-full flex items-center justify-center md:justify-start gap-3 shadow-2xl z-[200]"
          >
            <CheckCircle className="w-4 h-4 text-white" />
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
