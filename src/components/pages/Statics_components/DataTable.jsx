import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search, Download, Filter, LayoutGrid } from 'lucide-react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const DataTable = ({ data }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedColumns] = useState({
        state_ut: true,
        district: true,
        year: true,
        murder: true,
        rape: true,
        kidnapping_abduction: true,
        robbery: true,
        burglary: true,
        theft: true,
        total_ipc_crimes: true
    });

    const allColumns = [
        { key: 'state_ut', label: 'STATE/UT' },
        { key: 'district', label: 'DISTRICT' },
        { key: 'year', label: 'CYCLE' },
        { key: 'murder', label: 'MURDER' },
        { key: 'rape', label: 'RAPE' },
        { key: 'kidnapping_abduction', label: 'KIDNAPPING' },
        { key: 'robbery', label: 'ROBBERY' },
        { key: 'burglary', label: 'BURGLARY' },
        { key: 'theft', label: 'THEFT' },
        { key: 'total_ipc_crimes', label: 'TOTAL IPC' }
    ];

    const filteredAndSortedData = useMemo(() => {
        let filteredData = data.filter(item =>
            Object.values(item).some(value =>
                value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        if (sortConfig.key) {
            filteredData.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return filteredData;
    }, [data, searchTerm, sortConfig]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredAndSortedData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        setCurrentPage(1);
    };

    const exportToCSV = () => {
        const visibleColumns = allColumns.filter(col => selectedColumns[col.key]);
        const headers = visibleColumns.map(col => col.label).join(',');
        const rows = filteredAndSortedData.map(row =>
            visibleColumns.map(col => row[col.key] || '').join(',')
        ).join('\n');
        const csvContent = [headers, rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'safe_sphere_raw_intel.csv';
        a.click();
    };

    const visibleColumns = allColumns.filter(col => selectedColumns[col.key]);

    if (!data || data.length === 0) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 border border-slate-800 rounded-[32px] overflow-hidden"
        >
            {/* Header Controls */}
            <div className="p-8 border-b border-slate-800">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <LayoutGrid className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Raw Intelligence Data Table</h3>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all">
                            <Filter className="w-4 h-4" />
                            Parameters
                        </button>
                        <button
                            onClick={exportToCSV}
                            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-900/20"
                        >
                            <Download className="w-4 h-4" />
                            Export Intel
                        </button>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="relative flex-1 w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Filter records by identifier..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-12 pr-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        />
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Density:</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-300 outline-none"
                            >
                                <option value={10}>10 Records</option>
                                <option value={25}>25 Records</option>
                                <option value={50}>50 Records</option>
                            </select>
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} entries
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full">
                    <thead className="bg-slate-800/30">
                        <tr>
                            {visibleColumns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] cursor-pointer hover:bg-slate-800/50 transition-all border-b border-slate-800"
                                    onClick={() => handleSort(column.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronUp className={`w-2.5 h-2.5 ${sortConfig.key === column.key && sortConfig.direction === 'ascending' ? 'text-blue-500' : 'text-slate-600'}`} />
                                            <ChevronDown className={`w-2.5 h-2.5 ${sortConfig.key === column.key && sortConfig.direction === 'descending' ? 'text-blue-500' : 'text-slate-600'}`} />
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, index) => (
                            <tr
                                key={index}
                                className="group border-b border-slate-800/50 hover:bg-blue-500/5 transition-all"
                            >
                                {visibleColumns.map((column) => (
                                    <td key={column.key} className="px-6 py-5 text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                                        {typeof row[column.key] === 'number'
                                            ? row[column.key].toLocaleString()
                                            : row[column.key] || '-'
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination System */}
            <div className="px-8 py-6 bg-slate-900/60 border-t border-slate-800">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-6 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-xs font-bold text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white hover:bg-slate-700/50 transition-all"
                    >
                        PREVIOUS CYCLE
                    </button>
                    
                    <div className="flex items-center gap-2">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) pageNum = i + 1;
                            else if (currentPage <= 3) pageNum = i + 1;
                            else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                            else pageNum = currentPage - 2 + i;
                            
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                                        currentPage === pageNum
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                            : 'bg-slate-800/30 text-slate-500 hover:text-white hover:bg-slate-800/60'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>
                    
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-6 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-xs font-bold text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white hover:bg-slate-700/50 transition-all"
                    >
                        NEXT CYCLE
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

DataTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;
