import { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Loader } from 'lucide-react';
import PropTypes from 'prop-types';

const SearchFilters = ({ onSearch, onFilterChange, loading, filters }) => {
    const [searchState, setSearchState] = useState('');
    const [localFilters, setLocalFilters] = useState(filters);

    const handleSearch = () => {
        onSearch({ state: searchState });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = { state: '', year: '', crimeType: '', district: '' };
        setLocalFilters(clearedFilters);
        onFilterChange(clearedFilters);
        setSearchState('');
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">Search & Filters</h2>
            </div>
            
            {/* Search Bar */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchState}
                                onChange={(e) => setSearchState(e.target.value)}
                                placeholder="Enter State/UT (e.g., Maharashtra, Delhi)"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={loading || !searchState.trim()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
                    >
                        {loading ? (
                            <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                            <Search className="w-4 h-4" />
                        )}
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4" />
                        Year
                    </label>
                    <select
                        value={localFilters.year}
                        onChange={(e) => handleFilterChange('year', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                        <option value="">All Years</option>
                        {Array.from({ length: 13 }, (_, i) => 2001 + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Filter className="w-4 h-4" />
                        Crime Type
                    </label>
                    <select
                        value={localFilters.crimeType}
                        onChange={(e) => handleFilterChange('crimeType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                        <option value="">All Crimes</option>
                        <option value="murder">Murder</option>
                        <option value="rape">Rape</option>
                        <option value="kidnapping_abduction">Kidnapping & Abduction</option>
                        <option value="robbery">Robbery</option>
                        <option value="burglary">Burglary</option>
                        <option value="theft">Theft</option>
                        <option value="auto_theft">Auto Theft</option>
                        <option value="riots">Riots</option>
                        <option value="dowry_deaths">Dowry Deaths</option>
                        <option value="total_ipc_crimes">Total IPC Crimes</option>
                    </select>
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4" />
                        District
                    </label>
                    <input
                        type="text"
                        value={localFilters.district}
                        onChange={(e) => handleFilterChange('district', e.target.value)}
                        placeholder="Filter by district"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                </div>

                <div className="flex items-end">
                    <button
                        onClick={clearFilters}
                        className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

SearchFilters.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    filters: PropTypes.object.isRequired,
};

export default SearchFilters;
