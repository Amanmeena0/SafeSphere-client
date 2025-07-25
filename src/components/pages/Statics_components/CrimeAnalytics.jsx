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
    // Gender-based crime analysis
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
            labels: [
                'Rape',
                'Dowry Deaths',
                'Assault on Women',
                'Insult to Modesty',
                'Cruelty by Husband'
            ],
            datasets: [{
                label: 'Women-centric Crimes',
                data: Object.values(genderCrimes),
                backgroundColor: 'rgba(236, 72, 153, 0.6)',
                borderColor: 'rgb(236, 72, 153)',
                borderWidth: 2,
                pointBackgroundColor: 'rgb(236, 72, 153)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(236, 72, 153)'
            }]
        };
    };

    // Crime severity analysis
    const getCrimeSeverityData = () => {
        const severityData = {};
        
        data.forEach(item => {
            severityData.highSeverity = (severityData.highSeverity || 0) + 
                (item.murder || 0) + (item.rape || 0) + (item.kidnapping_abduction || 0);
            severityData.mediumSeverity = (severityData.mediumSeverity || 0) + 
                (item.robbery || 0) + (item.burglary || 0) + (item.riots || 0);
            severityData.lowSeverity = (severityData.lowSeverity || 0) + 
                (item.theft || 0) + (item.cheating || 0) + (item.counterfeiting || 0);
        });

        return {
            labels: ['High Severity', 'Medium Severity', 'Low Severity'],
            datasets: [{
                label: 'Crime Distribution by Severity',
                data: Object.values(severityData),
                backgroundColor: [
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(34, 197, 94, 0.7)'
                ],
                borderColor: [
                    'rgb(239, 68, 68)',
                    'rgb(245, 158, 11)',
                    'rgb(34, 197, 94)'
                ],
                borderWidth: 1,
                borderRadius: 6
            }]
        };
    };

    // District-wise crime intensity analysis
    const getDistrictAnalysis = () => {
        const districtData = {};
        
        data.forEach(item => {
            const key = `${item.district}-${item.state_ut}`;
            if (!districtData[key]) {
                districtData[key] = {
                    x: item.total_ipc_crimes || 0,
                    y: item.murder + item.rape + item.kidnapping_abduction || 0,
                    label: item.district
                };
            }
        });

        const scatterData = Object.values(districtData).slice(0, 50); // Limit for readability

        return {
            datasets: [{
                label: 'Total Crimes vs Violent Crimes',
                data: scatterData,
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        };
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                angleLines: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                pointLabels: {
                    font: {
                        size: 12
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top'
            }
        }
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
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

    const scatterOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        return context[0].raw.label || 'District';
                    },
                    label: function(context) {
                        return [
                            `Total Crimes: ${context.raw.x.toLocaleString()}`,
                            `Violent Crimes: ${context.raw.y.toLocaleString()}`
                        ];
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Total IPC Crimes'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Violent Crimes (Murder + Rape + Kidnapping)'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            }
        }
    };

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No data available for analytics</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Gender-based Crime Analysis */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Women-Centric Crime Analysis
                </h3>
                <div className="h-96">
                    <Radar data={getGenderBasedCrimes()} options={radarOptions} />
                </div>
            </div>

            {/* Crime Severity Analysis */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Crime Distribution by Severity Level
                </h3>
                <div className="h-96">
                    <Bar data={getCrimeSeverityData()} options={barOptions} />
                </div>
            </div>

            {/* District Crime Correlation */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Total Crimes vs Violent Crimes by District
                </h3>
                <div className="h-96">
                    <Scatter data={getDistrictAnalysis()} options={scatterOptions} />
                </div>
            </div>

            {/* Key Insights */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <h4 className="font-semibold text-blue-800 mb-2">Crime Pattern</h4>
                        <p className="text-sm text-gray-600">
                            Property crimes (theft, burglary) generally outnumber violent crimes, 
                            indicating different prevention strategies may be needed.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <h4 className="font-semibold text-blue-800 mb-2">Gender-based Analysis</h4>
                        <p className="text-sm text-gray-600">
                            Women-centric crimes show specific patterns that require targeted 
                            intervention and awareness programs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

CrimeAnalytics.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CrimeAnalytics;
