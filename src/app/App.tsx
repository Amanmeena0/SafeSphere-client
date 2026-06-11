// App.jsx
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthTokenInterceptor } from '@/shared/hooks/useAuth';
import '../index.css';

// Lazy loaded components
const Home = lazy(() => import('../components/Home'));
const Statistics = lazy(() => import('../features/statistics/pages/DashboardPage'));
const FirRegister = lazy(() => import('../components/FirRegister'));
const LostReportForm = lazy(() => import('../features/fir/pages/LostItemReport'));
const MVTheftFIRForm = lazy(() => import('../features/fir/pages/MVTheftEfir'));
const MissingPerson = lazy(() => import('../features/fir/pages/MissingPersonform'));
const DomesticTenantForm = lazy(() => import('../features/fir/pages/DomesticHelp&TenantRegistration'));
const TheftEFIRForm = lazy(() => import('../features/fir/pages/TheftEfir'));
const CyberCrimeForm = lazy(() => import('../features/fir/pages/CyberCrime'));
const RapeCaseForm = lazy(() => import('../features/fir/pages/RapeCase'));
const SOSMainPage = lazy(() => import('../components/sos'));
const NearestPoliceStation = lazy(() => import('../features/sos/pages/police_services'));
const SOSReport = lazy(() => import('../features/sos/pages/alert_services'));
const CrimeMap = lazy(() => import('../features/sos/pages/crime_cluster_service'));
const SOData = lazy(() => import('../features/sos/pages/sos_Data'));
const EmergencyContacts = lazy(() => import('../features/sos/pages/contacts-police'));
const AboutUs = lazy(() => import('../components/AboutUs'));
const MyReports = lazy(() => import('../components/pages/profile_components/MyReports'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <MainLayout>
      <AuthTokenInterceptor />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          
          {/* Protected Routes */}
          <Route path="/profile" element={<ProtectedRoute><ProfileInterface /></ProtectedRoute>} />
          <Route path="/create-profile" element={<ProtectedRoute><NewUserForm /></ProtectedRoute>} />
          <Route path="/my-reports" element={<ProtectedRoute><MyReports /></ProtectedRoute>} />
          
          {/* statistics */}
          <Route path="/statistics" element={<Statistics />} />
          
          {/* fir register */}
          <Route path="/FirRegister" element={<FirRegister />} />
          <Route path="/lostItemReport" element={<ProtectedRoute><LostReportForm /></ProtectedRoute>} />
          <Route path="/MVTheftEfir" element={<ProtectedRoute><MVTheftFIRForm /></ProtectedRoute>} />
          <Route path="/MissingPersonform" element={<ProtectedRoute><MissingPerson /></ProtectedRoute>} />
          <Route path="/DomesticHelp&TenantRegistration" element={<ProtectedRoute><DomesticTenantForm /></ProtectedRoute>} />
          <Route path="/TheftEfir" element={<ProtectedRoute><TheftEFIRForm /></ProtectedRoute>} />
          <Route path="/CyberCrime" element={<ProtectedRoute><CyberCrimeForm /></ProtectedRoute>} />
          <Route path="/RapeCase" element={<ProtectedRoute><RapeCaseForm /></ProtectedRoute>} />
          
          {/* sos components */}
          <Route path="/sos" element={<SOSMainPage />} />
          <Route path="/police_services" element={<NearestPoliceStation />} />
          <Route path="/alert_services" element={<SOSReport />} />
          <Route path="/crime_cluster_service" element={<CrimeMap />} />
          <Route path="/sos_data" element={<SOData />} />
          <Route path="/contacts-police" element={<EmergencyContacts/>}/>
          
          {/* Default route fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;
