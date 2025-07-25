import { SignIn, SignOutButton, useUser } from "@clerk/clerk-react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignInPage() {
  const { isSignedIn } = useUser();

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
            
            <SignOutButton>
              <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <SignIn 
        forceRedirectUrl="/"
        routing="path"
        path="/sign-in"
      />
    </div>
  );
}
