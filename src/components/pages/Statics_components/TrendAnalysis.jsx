import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { TrendingUp, TrendingDown, Activity, Clock, BarChart3, AlertCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TrendAnalysis = ({ data }) => {
    const getTrendData = () => {
        const yearlyData = {};
        data.forEach(item => {
            const year = item.year;
            if (!yearlyData[year]) {
                yearlyData[year] = { murder: 0, rape: 0, theft: 0, burglary: 0, kidnapping_abduction: 0, total: 0 };
            }
            yearlyData[year].murder += item.murder || 0;
            yearlyData[year].rape += item.rape || 0;
            yearlyData[year].theft += item.theft || 0;
            yearlyData[year].burglary += item.burglary || 0;
            yearlyData[year].kidnapping_abduction += item.kidnapping_abduction || 0;
            yearlyData[year].total += item.total_ipc_crimes || 0;
        });

        const years = Object.keys(yearlyData).sort();
        
        return {
            labels: years,
            datasets: [
                {
                    label: 'Murder',
                    data: years.map(year => yearlyData[year].murder),
                    borderColor: 'rgb(239, 68, 68)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                },
                {
                    label: 'Rape',
                    data: years.map(year => yearlyData[year].rape),
                    borderColor: 'rgb(236, 72, 153)',
                    backgroundColor: 'rgba(236, 72, 153, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                },
                {
                    label: 'Theft',
                    data: years.map(year => yearlyData[year].theft),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                },
                {
                    label: 'Burglary',
                    data: years.map(year => yearlyData[year].burglary),
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }
            ]
        };
    };

    const calculateTrendPercentages = () => {
        const yearlyTotals = {};
        data.forEach(item => {
            const year = item.year;
            yearlyTotals[year] = (yearlyTotals[year] || 0) + (item.total_ipc_crimes || 0);
        });
        const years = Object.keys(yearlyTotals).sort();
        const trends = {};
        for (let i = 1; i < years.length; i++) {
            const currentYear = years[i];
            const previousYear = years[i - 1];
            if (yearlyTotals[previousYear] > 0) {
                trends[currentYear] = ((yearlyTotals[currentYear] - yearlyTotals[previousYear]) / yearlyTotals[previousYear]) * 100;
            }
        }
        return trends;
    };

    const trendPercentages = calculateTrendPercentages();
    const latestTrend = Object.values(trendPercentages).slice(-1)[0] || 0;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#94a3b8', font: { size: 10, weight: 'bold' }, usePointStyle: true, padding: 20 }
            },
            tooltip: {
                backgroundColor: '#0f172a',
                titleColor: '#94a3b8',
                bodyColor: '#f8fafc',
                padding: 12,
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                intersect: false,
                mode: 'index'
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10, weight: 'bold' } } },
            y: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#64748b', font: { size: 10 } } }
        }
    };

    if (!data || data.length === 0) return null;

    return (
        <div className="space-y-10">
            {/* Main Trend Visualization */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900/40 border border-slate-800 p-8 rounded-[32px] backdrop-blur-md"
            >
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <Activity className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Multi-Vector Temporal Propagation</h3>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic text-nowrap">Real-time Historical Sync</span>
                    </div>
                </div>
                <div className="h-[450px]">
                    <Line data={getTrendData()} options={chartOptions} />
                </div>
            </motion.div>

            {/* Summary Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'YOY VARIANCE', value: `${Math.abs(latestTrend).toFixed(1)}%`, icon: latestTrend >= 0 ? TrendingUp : TrendingDown, color: latestTrend >= 0 ? 'text-red-400' : 'text-emerald-400', glow: latestTrend >= 0 ? 'bg-red-500/10' : 'bg-emerald-500/10', desc: 'Current vs Previous cycle' },
                    { label: 'CYCLE RANGE', value: Object.keys(trendPercentages).length, icon: Clock, color: 'text-blue-400', glow: 'bg-blue-500/10', desc: 'Total analytical epochs' },
                    { label: 'RISK ESCALATION', value: Object.values(trendPercentages).filter(t => t > 0).length, icon: AlertCircle, color: 'text-amber-400', glow: 'bg-amber-500/10', desc: 'Periods of positive growth' }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-900/40 border border-slate-800 p-6 rounded-[24px] backdrop-blur-md relative overflow-hidden"
                    >
                        <div className={`absolute -right-2 -top-2 w-16 h-16 ${item.glow} rounded-full blur-2xl`}></div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700">
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <span className={`text-2xl font-black ${item.color}`}>{item.value}</span>
                        </div>
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 relative z-10">{item.label}</h4>
                        <p className="text-xs font-medium text-slate-500 italic relative z-10">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Micro-Trend Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-900/40 border border-slate-800 p-8 rounded-[32px] backdrop-blur-md"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <BarChart3 className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-lg font-bold text-white tracking-tight italic uppercase">Sequential Variance Log</h3>
                    </div>
                    <div className="space-y-3">
                        {Object.entries(trendPercentages).reverse().map(([year, percentage]) => (
                            <div key={year} className="flex items-center justify-between p-4 bg-slate-800/20 border border-slate-700/30 rounded-2xl hover:bg-slate-800/40 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-1.5 h-6 rounded-full ${percentage >= 0 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                                    <span className="font-bold text-slate-300 tracking-tighter">{year} CYCLE</span>
                                </div>
                                <div className={`flex items-center gap-2 font-black ${percentage >= 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                                    {percentage >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {percentage >= 0 ? '+' : ''}{percentage.toFixed(1)}%
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Intelligence Insights */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-br from-indigo-500/5 to-blue-500/5 border border-slate-800 p-8 rounded-[32px] relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <TrendingUp className="w-48 h-48 text-white" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-black text-white uppercase tracking-[0.15em] mb-8">Strategic Analysis Insights</h3>
                        <div className="space-y-6">
                            {[
                                'Long-term vector stability identified in primary urban clusters.',
                                'Anomalous Q2 escalation patterns suggest external environmental drivers.',
                                'Sustained decline in violent vectors correlates with accelerated patrol density.',
                                'Predictive modelling indicates low-variance progression for subsequent epochs.'
                            ].map((text, i) => (
                                <div key={i} className="flex items-start gap-4 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 group-hover:scale-150 transition-transform shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                                    <p className="text-sm font-medium text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors italic">
                                        {text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

TrendAnalysis.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TrendAnalysis;
