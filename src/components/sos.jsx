import { useNavigate } from 'react-router-dom';

const sosModules = [
  { name: 'SOS Reports', path: '/alert_services', color: 'bg-red-500' },
  { name: 'Crime Clusters ', path: '/crime_cluster_service', color: 'bg-indigo-500' },
  { name: 'Nearest Police Station', path: '/police_services', color: 'bg-blue-600' },
  { name: 'Emergency Contacts', path: '/contacts-police', color: 'bg-yellow-500' },
  { name: 'SOS data', path: '/sos_data', color: 'bg-green-500' },
];

const SOSMainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex flex-col items-center px-6 py-10">
      <h1 className="text-5xl font-bold text-red-600 mb-6 text-center drop-shadow">
        🚨 SOS Control Panel
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-xl">
        Choose an emergency service below. This portal is designed for quick and secure actions in critical situations.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        {sosModules.map((module) => (
          <button
            key={module.name}
            onClick={() => navigate(module.path)}
            className={`p-6 rounded-2xl text-white font-semibold text-lg shadow-md hover:scale-105 transition-transform duration-200 ${module.color}`}
          >
            {module.name}
          </button>
        ))}
      </div>

      <footer className="mt-16 text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} SOS Emergency System • Developed for Public Safety
      </footer>
    </div>
  );
};

export default SOSMainPage;
