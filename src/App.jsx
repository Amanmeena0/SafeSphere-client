// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from './components/Home';
// statistics components
import Statistics from './components/Satistical';
// home
import Navbar from './components/pages/Home_Page_components/Navbar';
import './index.css';
// {fir components}
import FirRegister from './components/FirRegister';
import LostReportForm from "./components/pages/FIRS_Component/service/LostItemReport";
import MVTheftFIRForm from "./components/pages/FIRS_Component/service/MVTheftEfir";
import MissingPerson from "./components/pages/FIRS_Component/service/MissingPersonform";
import DomesticTenantForm from "./components/pages/FIRS_Component/service/DomesticHelp&TenantRegistration";
import TheftEFIRForm from "./components/pages/FIRS_Component/service/TheftEfir";
import CyberCrimeForm from "./components/pages/FIRS_Component/service/CyberCrime";
import RapeCaseForm from "./components/pages/FIRS_Component/service/RapeCase";
// sos comoponents
import SOSMainPage from './components/sos';
import NearestPoliceStation from './components/pages/sos_components/police_services';
import SOSReport from './components/pages/sos_components/alert_services';
import CrimeMap from './components/pages/sos_components/crime_cluster_service';
import SOData from './components/pages/sos_components/sos_Data';
import EmergencyContacts from './components/pages/sos_components/contacts-police'
// chatbot
import ChatWidget from './components/pages/Chabot/bot';
// about us
import AboutUs from './components/AboutUs';
// profile components
import SignUpPage from "./components/pages/profile_components/signUP";
import SignInPage from "./components/pages/profile_components/signIN";
import ProfileInterface from "./components/pages/profile_components/ProfileInterface";
import NewUserForm from "./components/pages/profile_components/NewUserForm";

function App() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen text-black">
        <Navbar/>
        <div className="container mx-auto p-4">
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<SignedIn><Home /></SignedIn>} />
            <Route path="/profile" element={<SignedIn><ProfileInterface /></SignedIn>} />
            <Route path="/sign-up" element={
                <>
                  <SignedOut>
                    <SignUpPage />
                  </SignedOut>
                  <SignedIn>
                    <Navigate to="/profile" />
                  </SignedIn>
                </>
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <SignedOut>
                    <SignInPage />
                  </SignedOut>
                  <SignedIn>
                    <Navigate to="/profile" />
                  </SignedIn>
                </>
              }
            />
            <Route path="/create-profile" element={<SignedIn><NewUserForm /></SignedIn>} />
            
            {/* statistics */}
            <Route path="/statistics" element={<SignedIn><Statistics /></SignedIn>} />
            {/* fir register */}
            <Route path="/FirRegister" element={<FirRegister />} />
            <Route path="/lostItemReport" element={<LostReportForm />} />
            <Route path="/MVTheftEfir" element={<MVTheftFIRForm />} />
            <Route path="/MissingPersonform" element={<MissingPerson />} />
            <Route path="/DomesticHelp&TenantRegistration" element={<DomesticTenantForm />} />
            <Route path="/TheftEfir" element={<TheftEFIRForm />} />
            <Route path="/CyberCrime" element={<CyberCrimeForm />} />
            <Route path="/RapeCase" element={<RapeCaseForm />} />
            {/* sos components */}
            <Route path="/sos" element={<SOSMainPage />} />
            <Route path="/police_services" element={<NearestPoliceStation />} />
            <Route path="/alert_services" element={<SOSReport />} />
            <Route path="/crime_cluster_service" element={<CrimeMap />} />
            <Route path="/sos_data" element={<SOData />} />
            <Route path="/contacts-police" element={<EmergencyContacts/>}/>
            {/* about us */}
            <Route path="/about" element={<AboutUs />} />
            
            {/* Default route fallback */}
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </Routes>
        </div>
        <SignedIn>
          <ChatWidget />
        </SignedIn>
      </div>
    </>
  );
}

export default App;
