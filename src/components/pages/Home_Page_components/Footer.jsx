import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0B1F3A] border-t border-slate-200 dark:border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand and Description */}
          <div className="lg:col-span-2">
            <Link className="flex items-center gap-3 mb-6" to="/">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">SafeSphere</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 font-medium max-w-sm mb-6 leading-relaxed">
              SafeSphere is a production-grade civic-tech platform dedicated to crime awareness, reporting, and emergency support. Reimagining public safety for the digital age.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Platform</h3>
            <div className="flex flex-col gap-4">
              <Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors" to="/FirRegister">Services</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors" to="/statistics">Statistics</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors" to="/sos">Emergency SOS</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors" to="/about">About Us</Link>
            </div>
          </div>

          {/* Legal and Support */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Legal</h3>
            <div className="flex flex-col gap-4">
              <Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors" to="/privacy">Privacy Policy</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors" to="/terms">Terms of Service</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors" to="/faqs">FAQs</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors" to="/contact">Support</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">
            © 2024 SafeSphere Portal. All rights reserved.
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm font-medium flex items-center gap-1.5">
            Designed with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for community safety.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
