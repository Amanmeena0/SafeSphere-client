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
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import PropTypes from 'prop-types';

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
    // Calculate year-over-year trends for major crime types
    const getTrendData = () => {
        const yearlyData = {};
        
        data.forEach(item => {
            const year = item.year;
            if (!yearlyData[year]) {
                yearlyData[year] = {
                    murder: 0,
                    rape: 0,
                    theft: 0,
                    burglary: 0,
                    kidnapping_abduction: 0,
                    total: 0
                };
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
                    tension: 0.4
                },
                {
                    label: 'Rape',
                    data: years.map(year => yearlyData[year].rape),
                    borderColor: 'rgb(236, 72, 153)',
                    backgroundColor: 'rgba(236, 72, 153, 0.1)',
                    borderWidth: 3,
                    tension: 0.4
                },
                {
                    label: 'Theft',
                    data: years.map(year => yearlyData[year].theft),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    tension: 0.4
                },
                {
                    label: 'Burglary',
                    data: years.map(year => yearlyData[year].burglary),
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4
                },
                {
                    label: 'Kidnapping & Abduction',
                    data: years.map(year => yearlyData[year].kidnapping_abduction),
                    borderColor: 'rgb(245, 158, 11)',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 3,
                    tension: 0.4
                }
            ]
        };
    };

    // Calculate trend percentages
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
            const current = yearlyTotals[currentYear];
            const previous = yearlyTotals[previousYear];
            
            if (previous > 0) {
                trends[currentYear] = ((current - previous) / previous) * 100;
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
                labels: {
                    usePointStyle: true,
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                title: {
                    display: true,
                    text: 'Year'
                }
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                title: {
                    display: true,
                    text: 'Number of Cases'
                },
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString();
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No data available for trend analysis</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Overall Trend Chart */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Crime Trends Over Time
                </h3>
                <div className="h-96">
                    <Line data={getTrendData()} options={chartOptions} />
                </div>
            </div>

            {/* Trend Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${latestTrend >= 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {latestTrend >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                        </div>
                        <div className={`text-2xl font-bold ${latestTrend >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {Math.abs(latestTrend).toFixed(1)}%
                        </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Overall Trend</h4>
                    <p className="text-gray-600 text-sm">
                        {latestTrend >= 0 ? 'Increase' : 'Decrease'} in total crimes compared to previous year
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                            {Object.keys(trendPercentages).length}
                        </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Years Analyzed</h4>
                    <p className="text-gray-600 text-sm">
                        Total years of trend data available for analysis
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div className="text-2xl font-bold text-purple-600">
                            {Object.values(trendPercentages).filter(t => t > 0).length}
                        </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Positive Trends</h4>
                    <p className="text-gray-600 text-sm">
                        Years showing increase in crime rates
                    </p>
                </div>
            </div>

            {/* Yearly Trend Breakdown */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Year-over-Year Changes</h3>
                <div className="space-y-3">
                    {Object.entries(trendPercentages).map(([year, percentage]) => (
                        <div key={year} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded ${percentage >= 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {percentage >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                </div>
                                <span className="font-medium text-gray-800">{year}</span>
                            </div>
                            <div className={`font-semibold ${percentage >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {percentage >= 0 ? '+' : ''}{percentage.toFixed(1)}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Trend Analysis Insights</h3>
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700">
                            Long-term trends help identify patterns and effectiveness of policy interventions
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700">
                            Seasonal variations and economic factors may influence year-over-year changes
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700">
                            Multiple years of declining trends indicate successful crime prevention strategies
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

TrendAnalysis.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TrendAnalysis;
