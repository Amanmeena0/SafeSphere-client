import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { PieChart, BarChart, TrendingUp, Shield } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DataVisualization = ({ data }) => {
    const getCrimeTypeData = () => {
        const crimeTypes = {};
        data.forEach(item => {
            crimeTypes.murder = (crimeTypes.murder || 0) + (item.murder || 0);
            crimeTypes.rape = (crimeTypes.rape || 0) + (item.rape || 0);
            crimeTypes.kidnapping = (crimeTypes.kidnapping || 0) + (item.kidnapping_abduction || 0);
            crimeTypes.robbery = (crimeTypes.robbery || 0) + (item.robbery || 0);
            crimeTypes.burglary = (crimeTypes.burglary || 0) + (item.burglary || 0);
            crimeTypes.theft = (crimeTypes.theft || 0) + (item.theft || 0);
            crimeTypes.riots = (crimeTypes.riots || 0) + (item.riots || 0);
        });

        return {
            labels: Object.keys(crimeTypes).map(key => key.toUpperCase()),
            datasets: [{
                data: Object.values(crimeTypes),
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(245, 158, 11, 0.8)', 
                    'rgba(16, 185, 129, 0.8)', 'rgba(139, 92, 246, 0.8)', 'rgba(236, 72, 153, 0.8)', 
                    'rgba(20, 184, 166, 0.8)', 'rgba(100, 116, 139, 0.8)'
                ],
                borderWidth: 0,
                hoverOffset: 20
            }]
        };
    };

    const getStateWiseData = () => {
        const stateData = {};
        data.forEach(item => {
            stateData[item.state_ut] = (stateData[item.state_ut] || 0) + (item.total_ipc_crimes || 0);
        });

        const sortedStates = Object.entries(stateData)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        return {
            labels: sortedStates.map(([state]) => state.toUpperCase()),
            datasets: [{
                label: 'Aggregate Volume',
                data: sortedStates.map(([, crimes]) => crimes),
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderRadius: 8,
                borderWidth: 0,
                barThickness: 24
            }]
        };
    };

    const getYearlyTrend = () => {
        const yearData = {};
        data.forEach(item => {
            yearData[item.year] = (yearData[item.year] || 0) + (item.total_ipc_crimes || 0);
        });

        const sortedYears = Object.entries(yearData).sort((a, b) => a[0] - b[0]);

        return {
            labels: sortedYears.map(([year]) => year),
            datasets: [{
                label: 'Temporal Flow',
                data: sortedYears.map(([, crimes]) => crimes),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointRadius: 4
            }]
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0f172a',
                titleColor: '#94a3b8',
                bodyColor: '#f8fafc',
                padding: 12,
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10, weight: 'bold' } } },
            y: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#64748b', font: { size: 10 } } }
        }
    };

    if (!data || data.length === 0) return null;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Distribution Chart */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-900/40 border border-slate-800 p-8 rounded-[32px] backdrop-blur-md"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                            <PieChart className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight">Intelligence Composition by Vector</h3>
                    </div>
                    <div className="h-80 relative">
                        <Doughnut data={getCrimeTypeData()} options={{
                            ...chartOptions,
                            plugins: { ...chartOptions.plugins, legend: { display: true, position: 'right', labels: { color: '#94a3b8', font: { size: 10, weight: 'bold' }, usePointStyle: true, padding: 15 } } },
                            cutout: '65%'
                        }} />
                        <div className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <Shield className="w-8 h-8 text-slate-800 mx-auto mb-1 opacity-20" />
                            <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Secure Matrix</div>
                        </div>
                    </div>
                </motion.div>

                {/* Regional Bar Chart */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-900/40 border border-slate-800 p-8 rounded-[32px] backdrop-blur-md"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <BarChart className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight">Regional Density Ranking (Top 10)</h3>
                    </div>
                    <div className="h-80">
                        <Bar data={getStateWiseData()} options={chartOptions} />
                    </div>
                </motion.div>
            </div>

            {/* Linear Temporal Analysis */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900/40 border border-slate-800 p-8 rounded-[32px] backdrop-blur-md"
            >
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Temporal Intelligence Progression</h3>
                </div>
                <div className="h-96">
                    <Line data={getYearlyTrend()} options={chartOptions} />
                </div>
            </motion.div>
        </div>
    );
};

DataVisualization.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataVisualization;
