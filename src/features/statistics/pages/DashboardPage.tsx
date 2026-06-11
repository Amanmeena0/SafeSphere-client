import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Filter, 
  Download,
  Activity,
  Shield,
  Zap,
  RefreshCcw,
  Search
} from 'lucide-react';
import CrimeAnalytics from '../components/CrimeAnalytics';
import DataVisualization from '../components/DataVisualization';
import SearchFilters from '../components/SearchFilters';
import StatisticsCards from '../components/StatisticsCards';
import DataTable from '../components/DataTable';
import TrendAnalysis from '../components/TrendAnalysis';
import useCrimeAnalytics from '../hooks/useCrimeAnalytics';
import '../components/enhanced-dashboard.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const EnhancedStatisticalDashboard = () => {
    const {
        data,
        filteredData,
        loading,
        filters,
        statistics,
        lastUpdated,
        handleSearch,
        handleFilterChange,
        activeRegionsCount
    } = useCrimeAnalytics();

    const [activeTab, setActiveTab] = useState('overview');

    const exportData = () => {
        if (!filteredData.length) return;
        const csvContent = [
            Object.keys(filteredData[0] || {}).join(','),
            ...filteredData.map(row => Object.values(row).join(','))
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'safe_sphere_intelligence_report.csv';
        a.click();
    };

    const tabs = [
        { id: 'overview', label: 'Intelligence Overview', icon: BarChart3 },
        { id: 'analytics', label: 'Categorical Analytics', icon: PieChart },
        { id: 'trends', label: 'Trend Intelligence', icon: TrendingUp },
        { id: 'data', label: 'Raw Intelligence Data', icon: Filter }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#061224] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 relative z-10">
                {/* Header / Hero Section */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mb-12"
                >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-8 border-b border-slate-200 dark:border-slate-800">
                        <motion.div variants={fadeUpVariant} className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Live Intelligence Feed</span>
                                </div>
                                <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-full flex items-center gap-2">
                                    <Activity className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Updated: {lastUpdated}</span>
                                </div>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                                Crime Statistics <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 font-display">Intelligence Dashboard</span>
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-medium leading-relaxed">
                                Production-grade analytical platform providing mission-critical insights into regional crime patterns and public safety metrics.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center gap-4">
                            <div className="hidden xl:flex items-center gap-6 px-6 py-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm backdrop-blur-md">
                                <div className="text-center">
                                    <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Active Regions</div>
                                    <div className="text-lg font-bold text-slate-900 dark:text-white leading-none">{activeRegionsCount}</div>
                                </div>
                                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
                                <div className="text-center">
                                    <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Data Points</div>
                                    <div className="text-lg font-bold text-slate-900 dark:text-white leading-none">{data.length.toLocaleString()}</div>
                                </div>
                            </div>
                            <button
                                onClick={exportData}
                                disabled={!filteredData.length}
                                className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 group"
                            >
                                <Download className="w-4 h-4 group-hover:animate-bounce" />
                                Export Intelligence Report
                            </button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Toolbar Section (Search & Filters) */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariant}
                    className="mb-10"
                >
                    <SearchFilters 
                        onSearch={handleSearch} 
                        onFilterChange={handleFilterChange}
                        loading={loading}
                        filters={filters}
                    />
                </motion.div>

                {/* KPI Section */}
                <AnimatePresence>
                    {data.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="mb-10"
                        >
                            <StatisticsCards statistics={statistics} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Area */}
                {data.length > 0 ? (
                    <div className="space-y-8">
                        {/* Tab Navigation System */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm backdrop-blur-md sticky top-24 z-20">
                            <div className="flex flex-wrap gap-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all relative overflow-hidden group ${
                                            activeTab === tab.id
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                                        }`}
                                    >
                                        <tab.icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <motion.div 
                                                layoutId="tab-glow"
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"
                                            ></motion.div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700/30">
                                <Zap className="w-3 h-3 text-yellow-500" />
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Accelerated Analytics Active</span>
                            </div>
                        </div>

                        {/* Intelligence Viewport */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="min-h-[600px] rounded-[32px] bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/50 p-1 shadow-xl overflow-hidden"
                        >
                            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-[31px] p-6 lg:p-8 backdrop-blur-sm">
                                {activeTab === 'overview' && <DataVisualization data={filteredData} />}
                                {activeTab === 'analytics' && <CrimeAnalytics data={filteredData} />}
                                {activeTab === 'trends' && <TrendAnalysis data={filteredData} />}
                                {activeTab === 'data' && <DataTable data={filteredData} />}
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    /* Initial / Empty State */
                    <div className="relative py-24 px-6 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/10 overflow-hidden shadow-inner">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]"></div>
                        
                        <div className="relative z-10 text-center max-w-md mx-auto">
                            {loading ? (
                                <div className="flex flex-col items-center">
                                    <div className="relative mb-8">
                                        <div className="w-20 h-20 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                                        <div className="absolute inset-0 w-20 h-20 border-t-4 border-blue-600 rounded-full animate-spin"></div>
                                        <RefreshCcw className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 animate-pulse" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Querying Database...</h3>
                                    <p className="text-slate-500 font-medium">Extracting regional intelligence data for analysis.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800/50 rounded-[24px] flex items-center justify-center mb-8 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                                        <Shield className="w-10 h-10 text-slate-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Awaiting Query Parameters</h3>
                                    <p className="text-slate-500 font-medium mb-8">
                                        Select a region or state in the toolbar above to initialize the intelligence dashboard.
                                    </p>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/5 border border-blue-500/10 rounded-full">
                                        <Search className="w-4 h-4 text-blue-500" />
                                        <span className="text-xs font-bold text-blue-500/80 uppercase tracking-widest italic">Try searching &quot;Delhi&quot; or &quot;Mumbai&quot;</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnhancedStatisticalDashboard;
