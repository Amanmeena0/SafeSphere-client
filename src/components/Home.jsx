import Header from './pages/Home_Page_components/Header';
import { useUser } from "@clerk/clerk-react"; 
import Contact from './Contact';
import SOData from './pages/sos_components/sos_Data';

const Home = () => {
  const { user, isLoaded } = useUser();
  
  // Show loading state while user data is being fetched
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const role = user?.publicMetadata?.role;
  const userName = user?.firstName || user?.username || 'User';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {userName}!
          </h1>
        </div>       
        {role === "police" && (
          <div className="mb-6">
            <SOData />
          </div>
        )}

        {role === "civilian" && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Civilian Dashboard</h3>
            <p className="text-blue-700">
              Access your profile, file reports, and stay updated with community safety information.
            </p>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <Header />
      <Contact />
    </div>
  );
};

export default Home;