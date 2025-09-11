import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HelpCircle,
  Car,
  FileEdit,
  Shield,
  ClipboardList,
  FileCheck,
  Database,
  History,
  Folder,
} from "lucide-react";

export default function FirRegister() {
  const [activeTab, setActiveTab] = useState("citizen");

  const citizenServices = [
    { title: "Lost Report", icon: HelpCircle, link: "/LostItemReport" },
    { title: "MV Theft E FIR", icon: Car, link: "/MVTheftEfir" },
    { title: "Missing Person/Children Registration", icon: FileEdit, link: "/MissingPersonForm" },
    { title: "Domestic Help/Tenant Registration", icon: Shield, link: "/DomesticHelp&TenantRegistration" },
    { title: "Theft e FIR", icon: Shield, link: "/TheftEfir" },
    { title: "Cyber Theft", icon: Shield, link: "/CyberCrime" },
    { title: "Rape Case", icon: Shield, link: "/RapeCase" },
  ];

  const policeServices = [
    { title: "FIR status", icon: ClipboardList, link: "/FirStatus" },
    { title: "Police Clearance Certificate", icon: FileCheck, link: "/PoliceClearanceCertifice" },
  ];

  const firDataServices = [
    { title: "FIR Records", icon: Database, link: "/FirRecords" },
    { title: "Case History", icon: History, link: "/CaseHistory" },
    { title: "Evidence Management", icon: Folder, link: "/EvidenceManagement" },
  ];

  const renderServiceCards = (services) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {services.map((service, idx) => (
        <Link key={idx} to={service.link}>
          <div className="bg-white rounded-2xl shadow-md flex flex-col items-center p-4 text-center hover:scale-105 transition-transform">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <service.icon className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm font-semibold text-yellow-500 mb-2">{service.title}</p>
            <button className="bg-blue-600 text-white text-xs px-4 py-1 rounded-full hover:bg-blue-700 transition">
              Open
            </button>
          </div>
        </Link>
      ))}
    </div>
  );

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

      {/* Render Services */}
      {activeTab === "citizen" && renderServiceCards(citizenServices)}
      {activeTab === "police" && renderServiceCards(policeServices)}
      {activeTab === "firData" && renderServiceCards(firDataServices)}
    </div>
  );
}
