import { Link } from 'react-router-dom';
import { SignedOut, SignedIn, useUser } from '../../../hooks/useAuth';

const Navbar = () => {
  const { user } = useUser();

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/50">
      <nav className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max mx-auto">
        <div className="flex items-center gap-8">
          <Link className="flex items-center gap-3 group" to="/">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 smooth-transition shadow-lg shadow-primary/20">
              <img src="/src/assets/Logo.png" alt="SafeSphere Logo" className="w-6 h-6 invert" />
            </div>
            <span className="font-display-lg text-title-md font-bold text-primary tracking-tight">SafeSphere</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link className="font-body-md text-sm font-semibold text-primary hover:text-secondary smooth-transition" to="/">Home</Link>
            <Link className="font-body-md text-sm font-semibold text-on-surface-variant hover:text-primary smooth-transition" to="/FirRegister">Services</Link>
            <Link className="font-body-md text-sm font-semibold text-on-surface-variant hover:text-primary smooth-transition" to="/statistics">Statistics</Link>
            <Link className="font-body-md text-sm font-semibold text-on-surface-variant hover:text-primary smooth-transition" to="/about">About</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <SignedOut>
            <Link to="/sign-in" className="font-body-md text-sm font-bold text-on-surface-variant hover:text-primary smooth-transition px-4">Sign In</Link>
            <Link to="/sign-up" className="bg-primary text-on-primary px-6 py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-105 active:scale-95 smooth-transition font-bold text-sm">
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
             <Link to="/profile" className="flex items-center gap-3 p-1.5 pr-4 bg-surface-container rounded-full border border-outline-variant hover:border-primary smooth-transition group">
                <div className="w-8 h-8 bg-primary-fixed rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary smooth-transition">
                   <span className="material-symbols-outlined text-xl">person</span>
                </div>
                <span className="font-body-md text-sm font-bold text-primary">{user?.firstName || 'Account'}</span>
             </Link>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
