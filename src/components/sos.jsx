import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  MapPin, 
  Building2, 
  PhoneCall, 
  Database, 
  ArrowRight,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

const sosModules = [
  { 
    name: 'SOS Reports', 
    description: 'Report immediate emergencies and view active alerts.',
    path: '/alert_services', 
    icon: <AlertTriangle className="w-8 h-8" />,
    color: 'from-red-600 to-orange-600',
    hoverColor: 'hover:shadow-red-500/20'
  },
  { 
    name: 'Crime Clusters', 
    description: 'Visualize high-risk areas and historical crime hotspots.',
    path: '/crime_cluster_service', 
    icon: <MapPin className="w-8 h-8" />,
    color: 'from-blue-600 to-indigo-600',
    hoverColor: 'hover:shadow-blue-500/20'
  },
  { 
    name: 'Nearest Police Station', 
    description: 'Locate and navigate to the closest police precinct.',
    path: '/police_services', 
    icon: <Building2 className="w-8 h-8" />,
    color: 'from-teal-600 to-emerald-600',
    hoverColor: 'hover:shadow-teal-500/20'
  },
  { 
    name: 'Emergency Contacts', 
    description: 'Quick access to national and local emergency helplines.',
    path: '/contacts-police', 
    icon: <PhoneCall className="w-8 h-8" />,
    color: 'from-amber-500 to-yellow-600',
    hoverColor: 'hover:shadow-amber-500/20'
  },
  { 
    name: 'SOS Data Archive', 
    description: 'Review historical SOS logs and resolution metrics.',
    path: '/sos_data', 
    icon: <Database className="w-8 h-8" />,
    color: 'from-slate-700 to-slate-900',
    hoverColor: 'hover:shadow-slate-500/20'
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const SOSMainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061224] py-16 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-400/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUpVariant} className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold border border-red-200 dark:border-red-800 shadow-sm">
            <ShieldAlert className="w-4 h-4" />
            <span>Emergency Command Center</span>
          </motion.div>
          
          <motion.h1 variants={fadeUpVariant} className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Critical <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">SOS Portal</span>
          </motion.h1>
          
          <motion.p variants={fadeUpVariant} className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Instant access to emergency response services. Rapid, secure, and coordinated actions for community safety.
          </motion.p>
        </motion.div>

        {/* Modules Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {sosModules.map((module) => (
            <motion.div
              key={module.name}
              variants={fadeUpVariant}
              whileHover={{ y: -8 }}
              className={`group relative bg-white dark:bg-slate-800/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 transition-all duration-300 shadow-xl ${module.hoverColor} flex flex-col h-full overflow-hidden`}
            >
              {/* Module Accent Background */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${module.color} opacity-[0.03] group-hover:opacity-10 rounded-bl-full -z-10 transition-opacity duration-300`}></div>
              
              {/* Icon Container */}
              <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                {module.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {module.name}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed flex-grow">
                {module.description}
              </p>
              
              <button
                onClick={() => navigate(module.path)}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white group-hover:gap-3 transition-all"
              >
                Launch Service <ChevronRight className="w-4 h-4 text-blue-600" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-24 pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-slate-900 dark:text-white leading-tight">System Integrity</div>
              <div className="text-xs text-green-500 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Active Monitoring Enabled
              </div>
            </div>
          </div>
          
          <div className="text-sm text-slate-500 dark:text-slate-500 font-medium italic">
            &copy; {new Date().getFullYear()} SafeSphere • Advanced Public Safety Infrastructure
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SOSMainPage;
