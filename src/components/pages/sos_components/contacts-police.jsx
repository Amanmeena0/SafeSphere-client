import { motion } from 'framer-motion';
import { 
  PhoneCall, 
  ShieldAlert, 
  Ambulance, 
  Flame, 
  Users, 
  LifeBuoy,
  Phone,
  ArrowUpRight
} from 'lucide-react';

const emergencyContacts = [
  {
    name: 'Police Control Room',
    number: '100',
    description: 'Immediate police assistance for crimes and emergencies.',
    icon: <ShieldAlert className="w-7 h-7" />,
    color: 'from-blue-600 to-indigo-700',
    lightColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    name: 'Ambulance Service',
    number: '102',
    description: 'Emergency medical services and patient transport.',
    icon: <Ambulance className="w-7 h-7" />,
    color: 'from-red-600 to-orange-700',
    lightColor: 'bg-red-50 dark:bg-red-900/20',
    textColor: 'text-red-600 dark:text-red-400'
  },
  {
    name: 'Fire Brigade',
    number: '101',
    description: 'Fire suppression and rescue operations.',
    icon: <Flame className="w-7 h-7" />,
    color: 'from-orange-500 to-red-600',
    lightColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600 dark:text-orange-400'
  },
  {
    name: 'Women Helpline',
    number: '1091',
    description: 'Dedicated support for women in distress or danger.',
    icon: <Users className="w-7 h-7" />,
    color: 'from-pink-600 to-rose-700',
    lightColor: 'bg-pink-50 dark:bg-pink-900/20',
    textColor: 'text-pink-600 dark:text-pink-400'
  },
  {
    name: 'Disaster Management',
    number: '108',
    description: 'Integrated emergency response for large-scale incidents.',
    icon: <LifeBuoy className="w-7 h-7" />,
    color: 'from-teal-600 to-emerald-700',
    lightColor: 'bg-teal-50 dark:bg-teal-900/20',
    textColor: 'text-teal-600 dark:text-teal-400'
  },
  {
    name: 'Child Helpline',
    number: '1098',
    description: 'Protection and support for children in need of care.',
    icon: <Phone className="w-7 h-7" />,
    color: 'from-amber-500 to-yellow-600',
    lightColor: 'bg-amber-50 dark:bg-amber-900/20',
    textColor: 'text-amber-600 dark:text-amber-400'
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

const EmergencyContacts = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061224] py-16 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-400/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUpVariant} className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-800 shadow-sm">
            <PhoneCall className="w-4 h-4" />
            <span>24/7 National Helplines</span>
          </motion.div>
          
          <motion.h1 variants={fadeUpVariant} className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Emergency <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Contact Directory</span>
          </motion.h1>
          
          <motion.p variants={fadeUpVariant} className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Quickly reach out to essential services. Tap on any card to initiate an immediate call.
          </motion.p>
        </motion.div>

        {/* Contacts Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {emergencyContacts.map((contact) => (
            <motion.div
              key={contact.number}
              variants={fadeUpVariant}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-slate-800/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden flex flex-col"
            >
              {/* Decorative Accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${contact.color} opacity-[0.03] group-hover:opacity-10 rounded-bl-full -z-10 transition-opacity duration-300`}></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 ${contact.lightColor} rounded-2xl flex items-center justify-center ${contact.textColor} shadow-inner`}>
                  {contact.icon}
                </div>
                <div className="text-3xl font-black text-slate-200 dark:text-slate-700/50 group-hover:text-slate-300 dark:group-hover:text-slate-600 transition-colors tracking-tighter">
                  {contact.number}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {contact.name}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-8 leading-relaxed flex-grow">
                {contact.description}
              </p>
              
              <a
                href={`tel:${contact.number}`}
                className={`w-full bg-gradient-to-r ${contact.color} text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-[0.98] transition-all`}
              >
                Call {contact.number}
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Responsible Use Notice */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 p-8 rounded-[2.5rem] bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 text-center"
        >
          <p className="text-amber-800 dark:text-amber-300 font-bold text-lg mb-2 flex items-center justify-center gap-2">
            <ShieldAlert className="w-6 h-6" />
            Use Responsibly
          </p>
          <p className="text-amber-700 dark:text-amber-400/80 max-w-xl mx-auto font-medium">
            These lines are strictly for genuine emergencies. Unnecessary calls can delay response to critical situations and may be subject to legal action.
          </p>
        </motion.div>

        <footer className="mt-16 text-sm text-slate-500 dark:text-slate-500 text-center font-medium italic">
          &copy; {new Date().getFullYear()} SafeSphere Emergency Directory • Always Vigilant
        </footer>
      </div>
    </div>
  );
};

export default EmergencyContacts;
