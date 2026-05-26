import { motion } from "framer-motion";
import { Database, FileText, Calendar, ShieldCheck } from "lucide-react";

const sosHistory = [
  { id: 'SO-2025-001', title: 'Narcotics Raid', location: 'Mumbai', date: 'Oct 12, 2025', status: 'Resolved' },
  { id: 'SO-2025-002', title: 'Cyber Crime Bust', location: 'Bangalore', date: 'Nov 05, 2025', status: 'In Progress' },
  { id: 'SO-2025-003', title: 'Intelligence Briefing', location: 'Delhi HQ', date: 'Dec 01, 2025', status: 'Completed' },
];

export default function SOData() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061224] py-16 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/10">
            <Database className="w-8 h-8" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">SOS Data Archive</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Historical logs and sensitive operation records for regional safety analysis.</p>
        </motion.div>

        <div className="space-y-4">
          {sosHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">{item.id}</div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                    <span className="flex items-center gap-1">📍 {item.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  item.status === 'Resolved' || item.status === 'Completed'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800'
                    : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800'
                }`}>
                  {item.status}
                </span>
                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all cursor-pointer">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 flex items-start gap-4">
          <Database className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 dark:text-blue-400 font-medium leading-relaxed">
            Archive data is strictly for internal analytical purposes. Access to detailed case files requires secondary authorization from regional safety headquarters.
          </p>
        </div>
      </div>
    </div>
  );
}