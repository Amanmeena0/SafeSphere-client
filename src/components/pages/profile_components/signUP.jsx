import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/create-profile");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Join SafeSphere</h2>
      <p className="text-gray-600 mb-8">
        This is a mock sign-up page since Clerk has been removed.
      </p>
      <button 
        onClick={handleSignUp}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
      >
        Continue with Mock User
      </button>
    </div>
  );
}
