import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Zap, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, register, setUser } = useAuth();
  const navigate = useNavigate();

  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const mockUser = { name: 'Foco User', email: 'user@foco.app', token: 'mock-token' };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-[#0a0a0a] text-white font-sans overflow-hidden selection:bg-white selection:text-black">
      {/* Left Column: Branding & Info */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex flex-1 flex-col justify-between p-10 lg:p-12 relative overflow-hidden border-r border-white/5"
      >
        {/* Background Watermark with slow rotation */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.01] pointer-events-none"
        >
          <Zap className="w-[600px] h-[600px]" />
        </motion.div>
        
        {/* Subtle corner glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Top: Branding/Empty Space */}
        <div className="flex-1" />

        {/* Bottom: Info Section */}
        <div className="z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-black fill-current" />
            </div>
            <span className="text-lg font-bold tracking-tight">Foco</span>
          </div>
          <p className="text-gray-400 text-xs max-w-sm leading-relaxed mb-8">
            Foco is your complete productivity platform designed to simplify tasks and 
            enhance execution. It supports growing teams from onboarding to completion. 
          </p>
          
          <div className="flex gap-6 text-[10px] text-gray-500 font-medium">
            <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">About</button>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Auth Form */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col justify-between p-6 md:p-10 lg:p-16 bg-[#0f0f0f] overflow-y-auto md:overflow-hidden relative"
      >
        {/* Subtle glow */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        {/* Mobile Logo */}
        <div className="md:hidden flex items-center gap-2 mb-8">
          <Zap className="w-5 h-5 text-white fill-current" />
          <span className="font-bold tracking-tight">Foco</span>
        </div>

        <div className="max-w-sm w-full mx-auto my-auto py-4">
          {/* Form Content */}
          <AnimatePresence mode="wait">
            {resetSent ? (
              <motion.div 
                key="reset-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">Check your email</h3>
                <p className="text-gray-500 text-xs mb-6 leading-relaxed">
                  We've sent a password reset link to <br/>
                  <span className="text-white font-semibold">{formData.email || 'your email'}</span>
                </p>
                <button 
                  onClick={() => { setResetSent(false); setForgotPassword(false); }}
                  className="text-white font-bold text-[10px] uppercase tracking-widest hover:underline"
                >
                  Back to login
                </button>
              </motion.div>
            ) : forgotPassword ? (
              <motion.div 
                key="forgot-password"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-xl font-semibold mb-1">Reset Password</h2>
                <p className="text-gray-500 text-[10px] mb-6">
                  Enter your email and we'll send you a link to reset your password
                </p>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      className="w-full bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-2 focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-500 text-xs"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-black font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-all disabled:opacity-50 text-xs shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Send Reset Link'}
                  </motion.button>
                  <div className="text-center">
                    <button 
                      type="button"
                      onClick={() => setForgotPassword(false)}
                      className="text-[10px] text-gray-600 hover:text-white font-semibold"
                    >
                      Back to login
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="auth-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-xl font-semibold mb-1">Register or login</h2>
                <p className="text-gray-500 text-[10px] mb-6">
                  To keep things easy, just log in with your work email or hit that button to continue
                </p>

                {/* Social Buttons */}
                <div className="mb-5">
                  <motion.button 
                    onClick={handleGoogleLogin}
                    whileHover={{ scale: 1.01, backgroundColor: "#202020" }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-[#1a1a1a] border border-white/5 rounded-lg transition-all text-[11px] font-medium"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="relative mb-5">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/5"></span>
                  </div>
                  <div className="relative flex justify-center text-[9px] uppercase tracking-widest font-bold">
                    <span className="px-3 bg-[#0f0f0f] text-gray-600">OR</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-2 focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-500 text-xs"
                        required={!isLogin}
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      className="w-full bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-2 focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-500 text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Password</label>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-2 focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-500 text-xs pr-10"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="text-right">
                      <button 
                        type="button" 
                        onClick={() => setForgotPassword(true)}
                        className="text-[9px] text-gray-600 hover:text-white font-semibold"
                      >
                        Forgot Password
                      </button>
                    </div>
                  </div>

                  {/* Toggle Section */}
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[10px] text-gray-600 font-medium">Receive updates</span>
                    <div className="w-7 h-3.5 bg-[#1a1a1a] rounded-full relative cursor-pointer group">
                      <div className="absolute right-1 top-0.5 w-2.5 h-2.5 bg-gray-600 rounded-full group-hover:bg-gray-400 transition-colors"></div>
                    </div>
                  </div>

                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs font-medium text-center"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-black font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-all disabled:opacity-50 mt-2 text-xs shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    {loading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>{isLogin ? 'Sign In' : 'Register'}</>
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 text-center text-[10px] text-gray-600">
                  {isLogin ? "Not signed up yet? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-white font-bold hover:underline underline-offset-4"
                  >
                    {isLogin ? 'Register Now' : 'Sign In Now'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-[9px] text-gray-700 text-center md:text-right mt-auto pb-2">
          Foco — All rights reserved.
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
