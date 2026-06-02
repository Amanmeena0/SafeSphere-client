// App.jsx
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthTokenInterceptor } from './hooks/useAuth';
import './index.css';

// Lazy loaded components
const Home = lazy(() => import('./components/Home'));
const Statistics = lazy(() => import('./components/Satistical'));
const FirRegister = lazy(() => import('./components/FirRegister'));
const LostReportForm = lazy(() => import('./components/pages/FIRS_Component/service/LostItemReport'));
const MVTheftFIRForm = lazy(() => import('./components/pages/FIRS_Component/service/MVTheftEfir'));
const MissingPerson = lazy(() => import('./components/pages/FIRS_Component/service/MissingPersonform'));
const DomesticTenantForm = lazy(() => import('./components/pages/FIRS_Component/service/DomesticHelp&TenantRegistration'));
const TheftEFIRForm = lazy(() => import('./components/pages/FIRS_Component/service/TheftEfir'));
const CyberCrimeForm = lazy(() => import('./components/pages/FIRS_Component/service/CyberCrime'));
const RapeCaseForm = lazy(() => import('./components/pages/FIRS_Component/service/RapeCase'));
const SOSMainPage = lazy(() => import('./components/sos'));
const NearestPoliceStation = lazy(() => import('./components/pages/sos_components/police_services'));
const SOSReport = lazy(() => import('./components/pages/sos_components/alert_services'));
const CrimeMap = lazy(() => import('./components/pages/sos_components/crime_cluster_service'));
const SOData = lazy(() => import('./components/pages/sos_components/sos_Data'));
const EmergencyContacts = lazy(() => import('./components/pages/sos_components/contacts-police'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const ProfileInterface = lazy(() => import('./components/pages/profile_components/ProfileInterface'));
const NewUserForm = lazy(() => import('./components/pages/profile_components/NewUserForm'));
const MyReports = lazy(() => import('./components/pages/profile_components/MyReports'));

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
