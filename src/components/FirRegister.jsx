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
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function FirRegister() {
  const allServices = [
    { title: "Lost Report", icon: HelpCircle, link: "/LostItemReport", description: "Report lost items for police verification." },
    { title: "MV Theft E-FIR", icon: Car, link: "/MVTheftEfir", description: "Electronic FIR for Motor Vehicle theft." },
    { title: "Missing Person", icon: FileEdit, link: "/MissingPersonForm", description: "Register reports for missing individuals." },
    { title: "Tenant Registration", icon: Shield, link: "/DomesticHelp&TenantRegistration", description: "Verification for domestic help and tenants." },
    { title: "Theft e-FIR", icon: Shield, link: "/TheftEfir", description: "File digital FIR for general theft incidents." },
    { title: "Cyber Crime", icon: Shield, link: "/CyberCrime", description: "Report online fraud and digital harassment." },
    { title: "Rape Case", icon: Shield, link: "/RapeCase", description: "Immediate reporting for sexual assault cases." },
  ];

  const renderServiceCards = (services) => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
    >
      {services.map((service, idx) => (
        <motion.div key={idx} variants={itemVariants}>
          <Link to={service.link} className="group block h-full">
            <div className="bg-white dark:bg-[#0B1F3A]/40 h-full p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                Open Service <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061224] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] dark:text-white mb-4 tracking-tight"
          >
            Digital Services Portal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto text-lg"
          >
            Access all SafeSphere tools and safety resources in one unified interface.
          </motion.p>
        </div>

        {/* Service Content */}
        <div className="mt-8">
          {renderServiceCards(allServices)}
        </div>
      </div>
    </div>
  );
}
