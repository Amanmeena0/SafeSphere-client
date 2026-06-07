import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  MapPin, 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  Loader2,
  Info,
  ChevronRight
} from 'lucide-react';

const SOSReport = () => {
  const [formData, setFormData] = useState({
    location: '',
    incidentType: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiClient.post('/api/sos/trigger', {
        location: formData.location,
        incident_type: formData.incidentType,
        description: formData.description
      });
      
      setResponseMessage('🚨 SOS Report submitted successfully. Response teams have been notified.');
      setStep(2);
    } catch (error) {
      console.error(error);
      setResponseMessage('❌ Failed to submit report. Please try again or call emergency services.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061224] py-16 px-6 lg:px-12 relative overflow-hidden flex items-center justify-center">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-400/10 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl"
      >
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-[2.5rem] shadow-2xl shadow-red-900/5 border border-slate-200 dark:border-slate-700/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -z-0"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Emergency SOS Report</h2>
              <p className="text-red-100 font-medium">Provide critical details for immediate response coordination.</p>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        Incident Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 dark:text-white transition-all"
                        placeholder="Street address, Landmark, or City"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        Incident Type
                      </label>
                      <div className="relative">
                        <select
                          name="incidentType"
                          required
                          value={formData.incidentType}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 dark:text-white transition-all appearance-none"
                        >
                          <option value="">Select Priority Level</option>
                          <option value="harassment">Harassment / Disturbance</option>
                          <option value="theft">Theft / Burglary</option>
                          <option value="assault">Physical Assault</option>
                          <option value="cybercrime">Cyber Incident</option>
                          <option value="medical">Medical Emergency</option>
                          <option value="other">Other Emergency</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4 text-red-500" />
                        Additional Details (Optional)
                      </label>
                      <textarea
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 dark:text-white transition-all resize-none"
                        placeholder="Briefly describe the situation..."
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0B1F3A] dark:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/10 dark:shadow-red-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing Emergency Signal...
                        </>
                      ) : (
                        <>
                          Submit SOS Report
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-center mt-4 text-xs text-slate-500 font-medium">
                      By submitting, you confirm this is a genuine emergency. False reporting is a punishable offense.
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Signal Transmitted Successfully</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm mx-auto">
                    Your report has been logged and sent to the nearest response unit. Please stay in a safe location.
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Submit another report
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-900 dark:text-white">Encrypted</div>
              <div className="text-slate-500">Secure E2E link</div>
            </div>
          </div>
          <div className="bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-900 dark:text-white">GPS Sync</div>
              <div className="text-slate-500">Auto-locating</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SOSReport;
