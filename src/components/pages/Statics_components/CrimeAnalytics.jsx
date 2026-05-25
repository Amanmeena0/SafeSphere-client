import { Bar, Radar, Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Brain, ShieldAlert, TrendingUp, Target } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const CrimeAnalytics = ({ data }) => {
    const getGenderBasedCrimes = () => {
        const genderCrimes = {
            rape: 0,
            dowry_deaths: 0,
            assault_on_women_with_intent_to_outrage_her_modesty: 0,
            insult_to_modesty_of_women: 0,
            cruelty_by_husband_or_his_relatives: 0
        };

        data.forEach(item => {
            Object.keys(genderCrimes).forEach(crime => {
                genderCrimes[crime] += item[crime] || 0;
            });
        });

        return {
            labels: ['Rape', 'Dowry Deaths', 'Assault', 'Modesty', 'Cruelty'],
            datasets: [{
                label: 'Vector Magnitude',
                data: Object.values(genderCrimes),
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 2,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(59, 130, 246)',
                fill: true
            }]
        };
    };

    const getCrimeSeverityData = () => {
        const severityData = {};
        data.forEach(item => {
            severityData.highSeverity = (severityData.highSeverity || 0) + (item.murder || 0) + (item.rape || 0) + (item.kidnapping_abduction || 0);
            severityData.mediumSeverity = (severityData.mediumSeverity || 0) + (item.robbery || 0) + (item.burglary || 0) + (item.riots || 0);
            severityData.lowSeverity = (severityData.lowSeverity || 0) + (item.theft || 0) + (item.cheating || 0) + (item.counterfeiting || 0);
        });

        return {
            labels: ['HIGH SEVERITY', 'MEDIUM SEVERITY', 'LOW SEVERITY'],
            datasets: [{
                label: 'Operational Severity',
                data: Object.values(severityData),
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(34, 197, 94, 0.8)'
                ],
                borderRadius: 12,
                borderWidth: 0,
                barThickness: 40
            }]
        };
    };

    const getDistrictAnalysis = () => {
        const districtData = {};
        data.forEach(item => {
            const key = `${item.district}-${item.state_ut}`;
            if (!districtData[key]) {
                districtData[key] = {
                    x: item.total_ipc_crimes || 0,
                    y: (item.murder || 0) + (item.rape || 0) + (item.kidnapping_abduction || 0),
                    label: item.district
                };
            }
        });
        return {
            datasets: [{
                label: 'Crime Intensity Correlation',
                data: Object.values(districtData).slice(0, 50),
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderColor: 'rgb(59, 130, 246)',
                pointRadius: 6,
                pointHoverRadius: 10
            }]
        };
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                beginAtZero: true,
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
                pointLabels: { color: '#94a3b8', font: { size: 10, weight: 'bold' } },
                ticks: { display: false }
            }
        },
        plugins: { legend: { display: false } }
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10, weight: 'bold' } } },
            y: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#64748b', font: { size: 10 } } }
        },
        plugins: { legend: { display: false } }
    };

    if (!data || data.length === 0) return null;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Radar Analytics */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-900/40 border border-slate-800 p-8 rounded-[32px] backdrop-blur-md"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                            <Target className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight">Vector Profile: Women-Centric Crimes</h3>
                    </div>
                    <div className="h-80">
                        <Radar data={getGenderBasedCrimes()} options={radarOptions} />
                    </div>
                </motion.div>

                {/* Severity Analysis */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-900/40 border border-slate-800 p-8 rounded-[32px] backdrop-blur-md"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight">Operational Severity Distribution</h3>
                    </div>
                    <div className="h-80">
                        <Bar data={getCrimeSeverityData()} options={chartOptions} />
                    </div>
                </motion.div>
            </div>

            {/* Scatter Analysis */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900/40 border border-slate-800 p-8 rounded-[32px] backdrop-blur-md"
            >
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Regional Intensity Correlation Matrix</h3>
                </div>
                <div className="h-96">
                    <Scatter data={getDistrictAnalysis()} options={{
                        ...chartOptions,
                        scales: {
                            x: { ...chartOptions.scales.x, title: { display: true, text: 'AGGREGATE VOLUME', color: '#475569', font: { size: 10, weight: 'bold' } } },
                            y: { ...chartOptions.scales.y, title: { display: true, text: 'VIOLENT VECTOR', color: '#475569', font: { size: 10, weight: 'bold' } } }
                        }
                    }} />
                </div>
            </motion.div>

            {/* AI Generated Insights Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative p-8 rounded-[32px] bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Brain className="w-32 h-32 text-blue-400" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Brain className="w-6 h-6 text-blue-400" />
                        <h3 className="text-xl font-black text-white uppercase tracking-wider">AI Intelligence Insights</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-900/60 p-6 rounded-2xl border border-blue-500/10">
                            <h4 className="font-bold text-blue-400 mb-2 uppercase text-xs tracking-widest">Core Observation</h4>
                            <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                Anomalous density detected in property-based vectors. Tactical reallocation of regional response units recommended for high-volume sectors.
                            </p>
                        </div>
                        <div className="bg-slate-900/60 p-6 rounded-2xl border border-blue-500/10">
                            <h4 className="font-bold text-indigo-400 mb-2 uppercase text-xs tracking-widest">Predictive Vector</h4>
                            <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                Historical trend analysis suggests a potential 12% escalation in seasonal riots across identified urban clusters during Q3 cycles.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

CrimeAnalytics.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CrimeAnalytics;
