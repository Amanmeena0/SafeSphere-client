import { Link } from 'react-router-dom';
import { useUser } from "../hooks/useAuth"; 
import { ShieldCheck, MapPin, FileText, Headset, Activity, FileEdit, TriangleAlert, Bot, ArrowRight, Mail, PhoneCall } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Home = () => {
  const { user, isLoaded } = useUser();
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 100]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-[#0B1F3A]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="text-slate-600 font-medium">Initializing SafeSphere...</div>
        </div>
      </div>
    );
  }

  const userName = user?.firstName || user?.username || 'Citizen';

  return (
    <div className="bg-slate-50 dark:bg-[#061224] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto pt-10 pb-24 lg:pt-20 lg:pb-32">
          {/* Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen"></div>
          <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen"></div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="flex-1 text-center lg:text-left z-10"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUpVariant} className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-800 shadow-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Access • Welcome, {userName}</span>
              </motion.div>
              
              <motion.h1 variants={fadeUpVariant} className="text-5xl lg:text-7xl font-extrabold text-[#0B1F3A] dark:text-white mb-6 leading-[1.1] tracking-tight">
                Public Safety,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Reimagined</span> for You.
              </motion.h1>
              
              <motion.p variants={fadeUpVariant} className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                A comprehensive digital platform dedicated to crime awareness, reporting, and emergency support. Built for security, transparency, and rapid response in your community.
              </motion.p>
              
              <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/FirRegister" className="w-full sm:w-auto bg-[#0B1F3A] dark:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[#0B1F3A]/20 dark:shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                  Explore Portal <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/about" className="w-full sm:w-auto bg-white dark:bg-slate-800 text-[#0B1F3A] dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl font-bold shadow-sm hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex-1 relative w-full max-w-2xl lg:mt-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <motion.div style={{ y: yImage }} className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white dark:bg-slate-800 p-2">
                <img 
                  alt="Public Safety Dashboard" 
                  className="w-full h-[400px] lg:h-[500px] object-cover rounded-xl" 
                  src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2062&auto=format&fit=crop"
                />
                {/* Floating Elements for SaaS feel */}
                <div className="absolute -left-6 top-12 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500">System Status</div>
                    <div className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Fully Secure</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features / How it Works */}
        <section className="py-24 bg-white dark:bg-[#0B1F3A]/20 border-y border-slate-100 dark:border-slate-800/50">
          <div className="px-6 lg:px-12 max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] dark:text-white mb-4 tracking-tight">How SafeSphere Protects You</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Our platform combines real-time data with accessible reporting tools to ensure community safety.</p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            >
              {/* Feature 1 */}
              <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center group bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-3">Real-time Awareness</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Stay informed with live crime clusters and safety alerts mapped in your neighborhood.</p>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center group bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-3">Seamless Reporting</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">File FIRs and missing person reports instantly through our secure digital portal.</p>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center group bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                  <Headset className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-3">24/7 Expert Help</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Access emergency SOS services and AI-powered guidance whenever you need assistance.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Core Safety Services Grid */}
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div className="text-left">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-3">Essential Services</h2>
              <div className="w-16 h-1.5 bg-blue-600 rounded-full"></div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium md:max-w-xs text-lg">Quick access to our most used safety and analytical tools.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Crime Statistics */}
            <motion.div variants={fadeUpVariant} className="group bg-white dark:bg-[#0B1F3A]/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-3">Crime Statistics</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed flex-grow">Analyze detailed crime data and trends across regions with interactive mapping.</p>
              <Link className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto w-fit" to="/statistics">
                Know Statistics <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Online FIR */}
            <motion.div variants={fadeUpVariant} className="group bg-white dark:bg-[#0B1F3A]/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
                <FileEdit className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-3">Online FIR</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed flex-grow">File First Information Reports securely and conveniently from your personal device.</p>
              <Link className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto w-fit" to="/FirRegister">
                Register Now <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Emergency SOS */}
            <motion.div variants={fadeUpVariant} className="group bg-gradient-to-br from-[#C1121F] to-red-800 text-white p-8 rounded-3xl border border-[#C1121F] transition-all duration-300 shadow-xl shadow-red-900/20 hover:shadow-2xl hover:shadow-red-900/40 hover:-translate-y-2 relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                <TriangleAlert className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Emergency SOS</h3>
              <p className="text-white/80 font-medium mb-8 leading-relaxed flex-grow">Real-time alerts and immediate assistance for high-risk areas with GPS tracking.</p>
              <Link className="text-white font-bold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto w-fit" to="/sos">
                View Alerts <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* AI Chatbot */}
            <motion.div variants={fadeUpVariant} className="group bg-white dark:bg-[#0B1F3A]/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-2 relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 dark:bg-teal-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/50 rounded-2xl flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400">
                <Bot className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-3">AI Chatbot</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed flex-grow">Engage with our AI-powered bot for immediate safety guidance and protocols.</p>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                className="text-teal-600 dark:text-teal-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto w-fit"
              >
                Start Chat <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Impact / Stats Section */}
        <section className="bg-[#0B1F3A] text-white py-24 relative overflow-hidden border-t border-slate-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-700"
            >
              <motion.div variants={fadeUpVariant} className="py-6 md:py-0">
                <div className="text-5xl lg:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">99.9%</div>
                <div className="text-sm font-bold tracking-widest uppercase text-slate-400">Uptime Reliability</div>
              </motion.div>
              <motion.div variants={fadeUpVariant} className="py-6 md:py-0">
                <div className="text-5xl lg:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">50k+</div>
                <div className="text-sm font-bold tracking-widest uppercase text-slate-400">Reports Resolved</div>
              </motion.div>
              <motion.div variants={fadeUpVariant} className="py-6 md:py-0">
                <div className="text-5xl lg:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">24/7</div>
                <div className="text-sm font-bold tracking-widest uppercase text-slate-400">Professional Support</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-blue-50 dark:bg-slate-800/80 rounded-[2.5rem] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between border border-blue-100 dark:border-slate-700 gap-12 overflow-hidden relative shadow-2xl shadow-blue-900/5"
          >
            {/* Decorative blurs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -translate-x-1/2 translate-y-1/2 blur-[80px]"></div>
            
            <div className="relative z-10 lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] dark:text-white mb-6 leading-tight tracking-tight">Your Safety is Our<br/>Priority.</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium max-w-md mx-auto lg:mx-0">Our support team is available around the clock for any inquiries or assistance you may need.</p>
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center sm:items-start gap-4 shadow-lg hover:shadow-xl transition-shadow w-full sm:w-64 group">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Email Us</div>
                  <div className="font-extrabold text-[#0B1F3A] dark:text-white text-base break-all">meenaaman581@gmail.com</div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center sm:items-start gap-4 shadow-lg hover:shadow-xl transition-shadow w-full sm:w-64 group">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-[#C1121F] dark:text-red-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Call Emergency</div>
                  <div className="font-extrabold text-[#0B1F3A] dark:text-white text-lg">+123 456 789</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
    </div>
  );
};

export default Home;
