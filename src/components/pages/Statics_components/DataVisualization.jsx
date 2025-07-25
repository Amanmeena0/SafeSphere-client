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
    // Prepare data for different visualizations
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
            labels: Object.keys(crimeTypes).map(key => key.charAt(0).toUpperCase() + key.slice(1)),
            datasets: [{
                data: Object.values(crimeTypes),
                backgroundColor: [
                    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
                    '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'
                ],
                borderWidth: 2,
                borderColor: '#fff'
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
            labels: sortedStates.map(([state]) => state),
            datasets: [{
                label: 'Total Crimes',
                data: sortedStates.map(([, crimes]) => crimes),
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1,
                borderRadius: 4
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
                label: 'Total Crimes by Year',
                data: sortedYears.map(([, crimes]) => crimes),
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgb(16, 185, 129)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 20,
                    usePointStyle: true
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    maxRotation: 45
                }
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString();
                    }
                }
            }
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    padding: 20,
                    usePointStyle: true
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                callbacks: {
                    label: function(context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((context.raw / total) * 100).toFixed(1);
                        return `${context.label}: ${context.raw.toLocaleString()} (${percentage}%)`;
                    }
                }
            }
        },
        cutout: '50%'
    };

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No data available for visualization</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Crime Types Distribution */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Crime Distribution by Type</h3>
                <div className="h-96">
                    <Doughnut data={getCrimeTypeData()} options={doughnutOptions} />
                </div>
            </div>

            {/* State-wise Analysis */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Top 10 States by Crime Count</h3>
                <div className="h-96">
                    <Bar data={getStateWiseData()} options={chartOptions} />
                </div>
            </div>

            {/* Yearly Trends */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Crime Trends Over Years</h3>
                <div className="h-96">
                    <Line data={getYearlyTrend()} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

DataVisualization.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataVisualization;
