import { Link } from 'react-router-dom';
import { SignedOut } from '../../../hooks/useAuth';

const Navbar = () => {
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
          <Link to="/home" className="hover:text-blue-600 transition duration-200 ease-in-out">Home</Link>
          <Link to="/statistics" className="hover:text-blue-600 transition duration-200 ease-in-out">Statistics</Link>
          <Link to="/FirRegister" className="hover:text-blue-600 transition duration-200 ease-in-out">FIR Registration</Link>
          <Link to="/sos" className="hover:text-blue-600 transition duration-200 ease-in-out">SOS</Link>
          <Link to="/about" className="hover:text-blue-600 transition duration-200 ease-in-out">About US</Link>
        </div>

        <div className="flex items-center space-x-4">
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
