import { useUser } from "../../../hooks/useAuth";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function SignInPage() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/profile");
  };

  if (isSignedIn) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">You&apos;re already signed in!</h2>
          <p className="text-gray-600 mb-6">You can sign out if you want to switch accounts.</p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/profile"
              className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              <User className="w-4 h-4 mr-2" />
              View Profile
            </Link>
            
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In to SafeSphere</h2>
      <p className="text-gray-600 mb-8">
        This is a mock sign-in page since Clerk has been removed.
      </p>
      <button 
        onClick={handleSignIn}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
      >
        Continue with Mock User
      </button>
    </div>
  );
}
