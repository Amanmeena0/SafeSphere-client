import { Link } from 'react-router-dom';
import { useUser } from "../hooks/useAuth"; 
import SOData from './pages/sos_components/sos_Data';
import { useEffect, useState } from 'react';

const Home = () => {
  const { user, isLoaded } = useUser();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <div className="text-primary font-bold">Initializing SafeSphere...</div>
        </div>
      </div>
    );
  }

  const role = user?.publicMetadata?.role || 'civilian';
  const userName = user?.firstName || user?.username || 'Guest';

  return (
    <div className="min-h-screen">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden hero-gradient pb-20">
          <div className="max-w-container-max mx-auto px-margin-desktop py-section-gap flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left z-10">
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-primary-fixed/50 text-on-primary-fixed rounded-full text-label-sm font-bold backdrop-blur-sm border border-primary/10">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                Welcome back, {userName}
              </div>
              <h1 className="font-display-lg text-display-lg text-primary mb-6 leading-tight">
                Public Safety,<br/>
                <span className="text-secondary">Reimagined</span> for You.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                A comprehensive digital platform dedicated to crime awareness, reporting, and emergency support. Built for security, transparency, and rapid response in your community.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/FirRegister" className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold shadow-xl hover:bg-primary-container transition-all hover:scale-105 active:scale-95">
                  Explore Portal
                </Link>
                <Link to="/about" className="bg-surface-container-lowest text-primary border-2 border-primary/20 px-10 py-4 rounded-xl font-bold hover:bg-primary-fixed transition-all hover:scale-105 active:scale-95">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex-1 relative lg:mt-0 mt-12 w-full max-w-2xl">
              <div className="w-full aspect-square rounded-full bg-primary-fixed absolute -top-20 -right-20 blur-[100px] opacity-20"></div>
              <div className="w-full aspect-square rounded-full bg-secondary-fixed absolute -bottom-20 -left-20 blur-[100px] opacity-10"></div>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-outline-variant/50">
                <img 
                  alt="Public Safety Dashboard" 
                  className="w-full h-[550px] object-cover transition-transform duration-700 hover:scale-110" 
                  style={{ transform: `translateY(${scrollY * 0.05}px)` }}
                  src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2062&auto=format&fit=crop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Role-specific Dashboard Integration */}
        {role === "police" && (
          <section className="max-w-container-max mx-auto px-margin-desktop py-12">
            <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant shadow-sm">
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center">
                   <span className="material-symbols-outlined text-3xl">emergency_home</span>
                 </div>
                 <h2 className="font-headline-lg text-headline-lg text-primary">Emergency Dashboard</h2>
               </div>
               <SOData />
            </div>
          </section>
        )}

        {/* Features / How it Works */}
        <section className="bg-surface-container-lowest py-section-gap">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-4">How SafeSphere Protects You</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">Our platform combines real-time data with accessible reporting tools to ensure community safety.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-primary-fixed rounded-3xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-on-primary smooth-transition shadow-lg">
                  <span className="material-symbols-outlined text-4xl">location_on</span>
                </div>
                <h3 className="font-title-md text-xl text-primary mb-3">Real-time Awareness</h3>
                <p className="text-on-surface-variant">Stay informed with live crime clusters and safety alerts mapped in your neighborhood.</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-primary-fixed rounded-3xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-on-primary smooth-transition shadow-lg">
                  <span className="material-symbols-outlined text-4xl">edit_document</span>
                </div>
                <h3 className="font-title-md text-xl text-primary mb-3">Seamless Reporting</h3>
                <p className="text-on-surface-variant">File FIRs and missing person reports instantly through our secure digital portal.</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-primary-fixed rounded-3xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-on-primary smooth-transition shadow-lg">
                  <span className="material-symbols-outlined text-4xl">support_agent</span>
                </div>
                <h3 className="font-title-md text-xl text-primary mb-3">24/7 Expert Help</h3>
                <p className="text-on-surface-variant">Access emergency SOS services and AI-powered guidance whenever you need assistance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Safety Services Grid */}
        <section className="max-w-container-max mx-auto px-margin-desktop py-section-gap">
          <div className="flex justify-between items-end mb-12">
            <div className="text-left">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Essential Services</h2>
              <div className="w-12 h-1.5 bg-secondary rounded-full"></div>
            </div>
            <p className="text-on-surface-variant hidden md:block">Quick access to our most used safety tools.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Crime Statistics */}
            <div className="group bg-surface-container-low p-8 rounded-2xl border border-outline-variant hover:border-primary smooth-transition hover:shadow-2xl hover:-translate-y-2">
              <div className="w-14 h-14 bg-primary-fixed rounded-2xl flex items-center justify-center mb-6 text-primary shadow-inner">
                <span className="material-symbols-outlined text-3xl">insights</span>
              </div>
              <h3 className="font-title-md text-title-md text-primary mb-3">Crime Statistics</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">Analyze detailed crime data and trends across regions with interactive mapping.</p>
              <Link className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all" to="/statistics">
                Know Statistics <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            {/* Online FIR */}
            <div className="group bg-surface-container-low p-8 rounded-2xl border border-outline-variant hover:border-primary smooth-transition hover:shadow-2xl hover:-translate-y-2">
              <div className="w-14 h-14 bg-primary-fixed rounded-2xl flex items-center justify-center mb-6 text-primary shadow-inner">
                <span className="material-symbols-outlined text-3xl">assignment</span>
              </div>
              <h3 className="font-title-md text-title-md text-primary mb-3">Online FIR</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">File First Information Reports securely and conveniently from your personal device.</p>
              <Link className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all" to="/FirRegister">
                Register Now <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            {/* Emergency SOS */}
            <div className="group bg-secondary text-on-secondary p-8 rounded-2xl border border-secondary smooth-transition shadow-lg hover:shadow-secondary/30 hover:-translate-y-2">
              <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
              </div>
              <h3 className="font-title-md text-title-md text-white mb-3">Emergency SOS</h3>
              <p className="font-body-md text-body-md text-white/80 mb-8 leading-relaxed">Real-time alerts and immediate assistance for high-risk areas with GPS tracking.</p>
              <Link className="text-white font-bold flex items-center gap-2 group-hover:gap-4 transition-all" to="/sos">
                View Alerts <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            {/* AI Chatbot */}
            <div className="group bg-surface-container-low p-8 rounded-2xl border border-outline-variant hover:border-primary smooth-transition hover:shadow-2xl hover:-translate-y-2">
              <div className="w-14 h-14 bg-primary-fixed rounded-2xl flex items-center justify-center mb-6 text-primary shadow-inner">
                <span className="material-symbols-outlined text-3xl">smart_toy</span>
              </div>
              <h3 className="font-title-md text-title-md text-primary mb-3">AI Chatbot</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">Engage with our AI-powered bot for immediate safety guidance and protocols.</p>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all"
              >
                Start Chat <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Impact / Stats Section */}
        <section className="bg-primary text-on-primary py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 skew-x-12 transform translate-x-1/2"></div>
          <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div>
                <div className="text-5xl font-extrabold mb-4 text-secondary-fixed">99.9%</div>
                <div className="font-label-sm text-sm tracking-widest uppercase opacity-70">Uptime Reliability</div>
              </div>
              <div>
                <div className="text-5xl font-extrabold mb-4 text-secondary-fixed">50k+</div>
                <div className="font-label-sm text-sm tracking-widest uppercase opacity-70">Reports Resolved</div>
              </div>
              <div>
                <div className="text-5xl font-extrabold mb-4 text-secondary-fixed">24/7</div>
                <div className="font-label-sm text-sm tracking-widest uppercase opacity-70">Professional Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-container-max mx-auto px-margin-desktop py-section-gap">
          <div className="bg-primary-fixed/30 rounded-[40px] p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between border border-primary/10 gap-12 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="font-headline-lg text-4xl text-primary mb-4 leading-tight">Your Safety is Our<br/>Priority.</h2>
              <p className="text-on-surface-variant text-lg max-w-md">Our support team is available around the clock for any inquiries or assistance you may need.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 w-full lg:w-auto relative z-10">
              <div className="bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white flex items-center gap-4 shadow-sm hover:shadow-md smooth-transition">
                <div className="w-12 h-12 bg-primary text-on-primary rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <div className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Email Us</div>
                  <div className="font-bold text-primary">meenaaman581@gmail.com</div>
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white flex items-center gap-4 shadow-sm hover:shadow-md smooth-transition">
                <div className="w-12 h-12 bg-secondary text-on-secondary rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <div className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Call Emergency</div>
                  <div className="font-bold text-primary">+123 456 789</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
