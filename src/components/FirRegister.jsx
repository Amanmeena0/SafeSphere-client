import { useState } from "react";
import { Link } from "react-router-dom"; // or "next/link" if you're using Next.js
// import LostItemFIRForm from src/components/pages/FIRS-Component/Lost-item.jsx;
export default function FirRegister() {
  const [activeTab, setActiveTab] = useState("citizen");

  const citizenServices = [
    { title: "Lost Report", icon: "help-circle", link: "/LostItemReport" },
    { title: "MV Theft E FIR", icon: "car", link: "/MVTheftEfir" },
    { title: "Missing Person/Children Registration", icon: "edit", link: "/MissingPersonForm" },
    { title: "Domestic Help/Tenant Registration", icon: "user-check", link: "/DomesticHelp&TenantRegistration" }, 
    { title: "Theft e FIR", icon: "shield-off", link: "/TheftEfir" },
    { title: "Cyber Theft", icon: "shield-off", link: "/CyberCrime" },
    { title: "Rape Case", icon: "shield-off", link: "/RapeCase" },
    
  ];
  
  const policeServices = [
    { title: "FIR status", icon: "clipboard-list", link: "/FirStatus" },
    { title: "Police Clearance Certificate", icon: "file-check", link: "/PoliceClearanceCertifice" },
    
  ];

  const firDataServices = [
    { title: "FIR Records", icon: "database", link: "/FirRecords" },
    { title: "Case History", icon: "history", link: "/CaseHistory" },
    { title: "Evidence Management", icon: "folder", link: "/EvidenceManagement" },
  ];

  return (
    <div className="min-h-screen bg-blue-200 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">Services</h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center mb-8 gap-4">
        <button
          onClick={() => setActiveTab("citizen")}
          className={`px-6 py-2 rounded-md font-medium hover:scale-105 transition-transform ${
            activeTab === "citizen" ? "bg-blue-900 text-white" : "bg-gray-300 text-black"
          }`}
        >
          File FIR
        </button>
        <button
          onClick={() => setActiveTab("police")}
          className={`px-6 py-2 rounded-md font-medium hover:scale-105 transition-transform ${
            activeTab === "police" ? "bg-blue-900 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Status
        </button>
        <button
          onClick={() => setActiveTab("firData")}
          className={`px-6 py-2 rounded-md font-medium hover:scale-105 transition-transform ${
            activeTab === "firData" ? "bg-blue-900 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Data
        </button>
      </div> 
      {/* Citizen Services */}
      {activeTab === "citizen" && (
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {citizenServices.map((service, idx) => (
              <Link key={idx} to={service.link}>
                <div className="bg-white rounded-2xl shadow-md flex flex-col items-center p-4 text-center hover:scale-105 transition-transform">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <i className={`lucide-${service.icon} w-8 h-8 text-blue-600`}></i>
                  </div>
                  <p className="text-sm font-semibold text-yellow-500 mb-2">{service.title}</p>
                  <button className="bg-blue-600 text-white text-xs px-4 py-1 rounded-full hover:bg-blue-700 transition">
                    Open
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Police Services */}
      {activeTab === "police" && (
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {policeServices.map((service, idx) => (
              <Link key={idx} to={service.link}>
                <div className="bg-white rounded-2xl shadow-md flex flex-col items-center p-4 text-center hover:scale-105 transition-transform">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <i className={`lucide-${service.icon} w-8 h-8 text-blue-600`}></i>
                  </div>
                  <p className="text-sm font-semibold text-yellow-500 mb-2">{service.title}</p>
                  <button className="bg-blue-600 text-white text-xs px-4 py-1 rounded-full hover:bg-blue-700 transition">
                    Open
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FIR Data Services */}
      {activeTab === "firData" && (
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {firDataServices.map((service, idx) => (
              <Link key={idx} to={service.link}>
                <div className="bg-white rounded-2xl shadow-md flex flex-col items-center p-4 text-center hover:scale-105 transition-transform">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <i className={`lucide-${service.icon} w-8 h-8 text-blue-600`}></i>
                  </div>
                  <p className="text-sm font-semibold text-yellow-500 mb-2">{service.title}</p>
                  <button className="bg-blue-600 text-white text-xs px-4 py-1 rounded-full hover:bg-blue-700 transition">
                    Open
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
