import { Link, useLocation } from 'react-router-dom';
import { SignedOut, SignedIn, useUser } from '../../../hooks/useAuth';
import { Shield, User, Menu, X, ArrowRight, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user } = useUser();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/FirRegister' },
    { name: 'Statistics', path: '/statistics' },
    { name: 'Emergency', path: '/sos' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-white/70 dark:bg-[#0B1F3A]/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-black/5' 
          : 'py-5 bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <Link className="flex items-center gap-3 group outline-none" to="/">
          <div className="relative">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-[10deg] transition-all duration-500 shadow-lg shadow-blue-600/30">
              <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute -inset-1 bg-blue-600/20 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">SafeSphere</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center bg-slate-100/50 dark:bg-slate-800/30 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const isEmergency = link.name === 'Emergency';
            
            return (
              <Link 
                key={link.name}
                to={link.path}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 outline-none ${
                  isActive 
                    ? isEmergency 
                      ? 'text-red-600' 
                      : 'text-blue-600' 
                    : isEmergency
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full shadow-sm z-0 ${
                      isEmergency ? 'bg-red-50 dark:bg-red-900/20' : 'bg-white dark:bg-blue-900/20'
                    }`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>
        
        {/* User Profile / Auth Area */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <div className="hidden md:flex items-center gap-4">
              <Link to="/sign-in" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Log in</Link>
              <Link to="/sign-up" className="bg-[#0B1F3A] dark:bg-white text-white dark:text-[#0B1F3A] px-6 py-2.5 rounded-full shadow-xl shadow-[#0B1F3A]/10 dark:shadow-none hover:scale-[1.03] active:scale-[0.98] transition-all text-sm font-bold flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0B1F3A]"></span>
              </button>
              <Link to="/profile" className="flex items-center gap-3 p-1 pr-4 bg-white dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:shadow-lg transition-all group">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                   <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter leading-none">Account</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                    {user?.firstName || user?.username?.split(' ')[0] || 'Member'}
                  </span>
                </div>
              </Link>
            </div>
          </SignedIn>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-[72px] w-full bg-white dark:bg-[#0B1F3A] md:hidden z-[99]"
          >
            <div className="flex flex-col gap-6 p-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold transition-all ${
                    location.pathname === link.path 
                      ? link.name === 'Emergency' ? 'text-red-600' : 'text-blue-600'
                      : 'text-slate-900 dark:text-white hover:translate-x-2'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <SignedOut>
                <div className="mt-8 flex flex-col gap-4">
                  <Link to="/sign-in" className="text-lg font-bold text-slate-600" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                  <Link to="/sign-up" className="bg-[#0B1F3A] text-white px-5 py-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    Get Started <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
