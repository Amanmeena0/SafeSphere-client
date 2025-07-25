import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignOutButton, useUser } from '@clerk/clerk-react';
import { User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-500">
            <img src="src/assets/Logo.png" alt="Logo" className="rounded-" />
          </div>
          <div className="text-xl font-bold text-blue-700">
            SafeSphere
          </div>
        </div>

        <div className="flex space-x-8 text-base font-semibold text-gray-800">
          <SignedIn>
            <Link to="/home" className="hover:text-blue-600 transition duration-200 ease-in-out">Home</Link>
            <Link to="/statistics" className="hover:text-blue-600 transition duration-200 ease-in-out">Statistics</Link>
            <Link to="/FirRegister" className="hover:text-blue-600 transition duration-200 ease-in-out">FIR Registration</Link>
            <Link to="/sos" className="hover:text-blue-600 transition duration-200 ease-in-out">SOS</Link>
            <Link to="/about" className="hover:text-blue-600 transition duration-200 ease-in-out">About US</Link>
          </SignedIn>
          
          <SignedOut>
            <Link to="/" className="hover:text-blue-600 transition duration-200 ease-in-out">Home</Link>
            <Link to="/about" className="hover:text-blue-600 transition duration-200 ease-in-out">About US</Link>
          </SignedOut>
        </div>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link 
              to="/profile" 
              className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition duration-200 ease-in-out"
            >
              {user?.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5" />
              )}
              <span>Profile</span>
            </Link>
            
            <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
              <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition duration-200 ease-in-out">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </SignOutButton>
          </SignedIn>

          <SignedOut>
            <Link 
              to="/sign-in" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out"
            >
              Sign In
            </Link>
            <Link 
              to="/sign-up" 
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md transition duration-200 ease-in-out"
            >
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
