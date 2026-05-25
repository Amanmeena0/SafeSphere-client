import { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Loader, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const SearchFilters = ({ onSearch, onFilterChange, loading, filters }) => {
    const [searchState, setSearchState] = useState('');
    const [localFilters, setLocalFilters] = useState(filters);
    const [isExpanded, setIsExpanded] = useState(false);

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
        <div className="relative">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[24px] p-2 shadow-2xl shadow-black/20">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
                    {/* Search Input Group */}
                    <div className="flex-1 relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
                            <MapPin className="w-5 h-5 text-blue-500 group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchState}
                            onChange={(e) => setSearchState(e.target.value)}
                            placeholder="Search Intelligence by State or Region..."
                            className="w-full pl-12 pr-4 py-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>

                    {/* Quick Filters Group */}
                    <div className="flex flex-wrap items-center gap-2 px-2">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Calendar className="w-4 h-4 text-slate-500" />
                            </div>
                            <select
                                value={localFilters.year}
                                onChange={(e) => handleFilterChange('year', e.target.value)}
                                className="pl-10 pr-10 py-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-slate-300 text-sm font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer hover:bg-slate-800/60 transition-all min-w-[140px]"
                            >
                                <option value="" className="bg-[#0B1220]">All Cycles</option>
                                {Array.from({ length: 13 }, (_, i) => 2001 + i).map(year => (
                                    <option key={year} value={year} className="bg-[#0B1220]">{year} Data</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none group-hover:text-slate-400 transition-colors" />
                        </div>

                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Filter className="w-4 h-4 text-slate-500" />
                            </div>
                            <select
                                value={localFilters.crimeType}
                                onChange={(e) => handleFilterChange('crimeType', e.target.value)}
                                className="pl-10 pr-10 py-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-slate-300 text-sm font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer hover:bg-slate-800/60 transition-all min-w-[180px]"
                            >
                                <option value="" className="bg-[#0B1220]">All Vectors</option>
                                <option value="murder" className="bg-[#0B1220]">Murder</option>
                                <option value="rape" className="bg-[#0B1220]">Rape</option>
                                <option value="kidnapping_abduction" className="bg-[#0B1220]">Kidnapping</option>
                                <option value="robbery" className="bg-[#0B1220]">Robbery</option>
                                <option value="burglary" className="bg-[#0B1220]">Burglary</option>
                                <option value="theft" className="bg-[#0B1220]">Theft</option>
                                <option value="auto_theft" className="bg-[#0B1220]">Auto Theft</option>
                                <option value="total_ipc_crimes" className="bg-[#0B1220]">Total IPC</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none group-hover:text-slate-400 transition-colors" />
                        </div>
                    </div>

                    {/* Action Group */}
                    <div className="flex items-center gap-2 p-1">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`p-4 rounded-2xl border transition-all ${
                                isExpanded 
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' 
                                    : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800/60'
                            }`}
                            title="Advanced Parameters"
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                        </button>
                        
                        {(searchState || localFilters.year || localFilters.crimeType || localFilters.district) && (
                            <button
                                onClick={clearFilters}
                                className="p-4 bg-slate-800/40 border border-slate-700/50 text-slate-400 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/30 rounded-2xl transition-all"
                                title="Reset Matrix"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}

                        <div className="w-px h-10 bg-slate-800 mx-1 hidden lg:block"></div>

                        <button
                            onClick={handleSearch}
                            disabled={loading || !searchState.trim()}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:translate-y-0 flex items-center gap-3 whitespace-nowrap min-w-[140px] justify-center"
                        >
                            {loading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <Search className="w-5 h-5" />
                            )}
                            {loading ? 'Processing...' : 'Execute Search'}
                        </button>
                    </div>
                </div>

                {/* Advanced Filters Drawer */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 pb-2 px-2 border-t border-slate-800 mt-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2">District Targeting</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={localFilters.district}
                                                onChange={(e) => handleFilterChange('district', e.target.value)}
                                                placeholder="Enter specific district..."
                                                className="w-full pl-4 pr-4 py-3.5 bg-slate-800/20 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                    {/* Placeholder for more advanced filters like Severity, Density, etc */}
                                    <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/5 border border-blue-500/10 rounded-xl lg:col-span-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <p className="text-xs font-medium text-slate-400">
                                            <span className="text-blue-400 font-bold">Pro Tip:</span> Refine intelligence results by cross-referencing districts with specific crime vectors.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Filter Chips Display */}
            {(localFilters.year || localFilters.crimeType || localFilters.district) && (
                <div className="flex flex-wrap gap-2 mt-4 px-2">
                    {localFilters.year && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                            Year: {localFilters.year}
                            <button onClick={() => handleFilterChange('year', '')}><X className="w-3 h-3 hover:text-white" /></button>
                        </div>
                    )}
                    {localFilters.crimeType && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                            Vector: {localFilters.crimeType}
                            <button onClick={() => handleFilterChange('crimeType', '')}><X className="w-3 h-3 hover:text-white" /></button>
                        </div>
                    )}
                    {localFilters.district && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                            District: {localFilters.district}
                            <button onClick={() => handleFilterChange('district', '')}><X className="w-3 h-3 hover:text-white" /></button>
                        </div>
                    )}
                </div>
            )}
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
