import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Filter, 
  Download,
  AlertTriangle
} from 'lucide-react';
import CrimeAnalytics from './CrimeAnalytics';
import DataVisualization from './DataVisualization';
import SearchFilters from './SearchFilters';
import StatisticsCards from './StatisticsCards';
import DataTable from './DataTable';
import TrendAnalysis from './TrendAnalysis';
import axios from 'axios';
import backend from '@/config';
import './enhanced-dashboard.css';

const EnhancedStatisticalDashboard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [filters, setFilters] = useState({
        state: '',
        year: '',
        crimeType: '',
        district: ''
    });
    const [statistics, setStatistics] = useState({
        totalCrimes: 0,
        mostCommonCrime: '',
        mostAffectedState: '',
        yearWithHighestCrimes: ''
    });

    const calculateStatistics = useCallback(() => {
        const totalCrimes = data.reduce((sum, item) => sum + (item.total_ipc_crimes || 0), 0);
        
        const crimeTypes = {};
        const states = {};
        const years = {};
        
        data.forEach(item => {
            // Count crimes by type
            Object.keys(item).forEach(key => {
                if (key.includes('murder') || key.includes('rape') || key.includes('theft')) {
                    crimeTypes[key] = (crimeTypes[key] || 0) + (item[key] || 0);
                }
            });
            
            // Count by state
            states[item.state_ut] = (states[item.state_ut] || 0) + (item.total_ipc_crimes || 0);
            
            // Count by year
            years[item.year] = (years[item.year] || 0) + (item.total_ipc_crimes || 0);
        });

        const mostCommonCrime = Object.entries(crimeTypes).reduce((a, b) => a[1] > b[1] ? a : b)?.[0] || '';
        const mostAffectedState = Object.entries(states).reduce((a, b) => a[1] > b[1] ? a : b)?.[0] || '';
        const yearWithHighestCrimes = Object.entries(years).reduce((a, b) => a[1] > b[1] ? a : b)?.[0] || '';

        setStatistics({
            totalCrimes,
            mostCommonCrime: mostCommonCrime.replace(/_/g, ' ').toUpperCase(),
            mostAffectedState,
            yearWithHighestCrimes
        });
    }, [data]);

    const applyFilters = useCallback(() => {
        let filtered = [...data];
        
        if (filters.state) {
            filtered = filtered.filter(item => 
                item.state_ut.toLowerCase().includes(filters.state.toLowerCase())
            );
        }
        
        if (filters.year) {
            filtered = filtered.filter(item => item.year === parseInt(filters.year));
        }
        
        if (filters.district) {
            filtered = filtered.filter(item =>
                item.district.toLowerCase().includes(filters.district.toLowerCase())
            );
        }
        
        setFilteredData(filtered);
    }, [data, filters]);

    useEffect(() => {
        if (data.length > 0) {
            calculateStatistics();
            applyFilters();
        }
    }, [data, filters, calculateStatistics, applyFilters]);

    const handleSearch = async (searchFilters) => {
        setLoading(true);
        try {
            const response = await axios.get(`${backend.apiUrl}/search`, {
                params: { state_ut: searchFilters.state },
            });

            if (Array.isArray(response.data)) {
                setData(response.data);
                setFilteredData(response.data);
            } else {
                console.error("Expected an array of data but got:", response.data);
                setData([]);
                setFilteredData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
            setFilteredData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const exportData = () => {
        const csvContent = [
            Object.keys(filteredData[0] || {}).join(','),
            ...filteredData.map(row => Object.values(row).join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'crime_data.csv';
        a.click();
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'analytics', label: 'Analytics', icon: PieChart },
        { id: 'trends', label: 'Trends', icon: TrendingUp },
        { id: 'data', label: 'Raw Data', icon: Filter }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Crime Statistics Dashboard
                            </h1>
                            <p className="text-gray-600">
                                Comprehensive analysis and visualization of crime data across regions
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={exportData}
                                disabled={!filteredData.length}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Export Data
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <SearchFilters 
                        onSearch={handleSearch} 
                        onFilterChange={handleFilterChange}
                        loading={loading}
                        filters={filters}
                    />
                </motion.div>

                {/* Statistics Cards */}
                {data.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <StatisticsCards statistics={statistics} />
                    </motion.div>
                )}

                {/* Tabs */}
                {data.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl shadow-sm border">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Tab Content */}
                {data.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {activeTab === 'overview' && (
                            <DataVisualization data={filteredData} />
                        )}
                        {activeTab === 'analytics' && (
                            <CrimeAnalytics data={filteredData} />
                        )}
                        {activeTab === 'trends' && (
                            <TrendAnalysis data={filteredData} />
                        )}
                        {activeTab === 'data' && (
                            <DataTable data={filteredData} />
                        )}
                    </motion.div>
                )}

                {/* Loading State */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center py-12"
                    >
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </motion.div>
                )}

                {/* No Data State */}
                {!loading && data.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Available</h3>
                        <p className="text-gray-500">Search for a state or region to view crime statistics</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default EnhancedStatisticalDashboard;
