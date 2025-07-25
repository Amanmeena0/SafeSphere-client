import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search, Download, Filter } from 'lucide-react';
import PropTypes from 'prop-types';

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
        { key: 'state_ut', label: 'State/UT' },
        { key: 'district', label: 'District' },
        { key: 'year', label: 'Year' },
        { key: 'murder', label: 'Murder' },
        { key: 'attempt_to_murder', label: 'Attempt to Murder' },
        { key: 'rape', label: 'Rape' },
        { key: 'kidnapping_abduction', label: 'Kidnapping & Abduction' },
        { key: 'robbery', label: 'Robbery' },
        { key: 'burglary', label: 'Burglary' },
        { key: 'theft', label: 'Theft' },
        { key: 'auto_theft', label: 'Auto Theft' },
        { key: 'riots', label: 'Riots' },
        { key: 'criminal_breach_of_trust', label: 'Criminal Breach of Trust' },
        { key: 'cheating', label: 'Cheating' },
        { key: 'counterfeiting', label: 'Counterfeiting' },
        { key: 'arson', label: 'Arson' },
        { key: 'hurt_grevious_hurt', label: 'Hurt/Grievous Hurt' },
        { key: 'dowry_deaths', label: 'Dowry Deaths' },
        { key: 'assault_on_women_with_intent_to_outrage_her_modesty', label: 'Assault on Women' },
        { key: 'insult_to_modesty_of_women', label: 'Insult to Modesty' },
        { key: 'cruelty_by_husband_or_his_relatives', label: 'Cruelty by Husband' },
        { key: 'causing_death_by_negligence', label: 'Death by Negligence' },
        { key: 'other_ipc_crimes', label: 'Other IPC Crimes' },
        { key: 'total_ipc_crimes', label: 'Total IPC Crimes' }
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
                
                if (aVal < bVal) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aVal > bVal) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
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
        a.download = 'filtered_crime_data.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    const visibleColumns = allColumns.filter(col => selectedColumns[col.key]);

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            {/* Header Controls */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <h3 className="text-xl font-semibold text-gray-800">Crime Data Table</h3>
                    
                    <div className="flex flex-wrap gap-3">
                        {/* Column Selector */}
                        <div className="relative">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Filter className="w-4 h-4" />
                                Columns
                            </button>
                            {/* Note: In a real implementation, this would be a dropdown */}
                        </div>
                        
                        {/* Export Button */}
                        <button
                            onClick={exportToCSV}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                    </div>
                </div>
                
                {/* Search and Pagination Controls */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search across all columns..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Show:</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="border border-gray-300 rounded px-3 py-1 text-sm"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                            {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of{' '}
                            {filteredAndSortedData.length} entries
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {visibleColumns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => handleSort(column.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        <div className="flex flex-col">
                                            <ChevronUp
                                                className={`w-3 h-3 ${
                                                    sortConfig.key === column.key && sortConfig.direction === 'ascending'
                                                        ? 'text-blue-600'
                                                        : 'text-gray-400'
                                                }`}
                                            />
                                            <ChevronDown
                                                className={`w-3 h-3 ${
                                                    sortConfig.key === column.key && sortConfig.direction === 'descending'
                                                        ? 'text-blue-600'
                                                        : 'text-gray-400'
                                                }`}
                                            />
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
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                                {visibleColumns.map((column) => (
                                    <td key={column.key} className="px-4 py-3 text-sm text-gray-900">
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

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    
                    <div className="flex items-center gap-2">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-3 py-2 rounded ${
                                        currentPage === pageNum
                                            ? 'bg-blue-600 text-white'
                                            : 'border border-gray-300 hover:bg-gray-50'
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
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

DataTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;
