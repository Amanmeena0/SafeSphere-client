import { useState, useEffect, useCallback, useMemo } from 'react';
import statisticsService from '../services/statistics.service';
import { CrimeData, StatisticsFilters, DashboardStatistics } from '../types/statistics.types';

export const useCrimeAnalytics = () => {
  const [data, setData] = useState<CrimeData[]>([]);
  const [filteredData, setFilteredData] = useState<CrimeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [filters, setFilters] = useState<StatisticsFilters>({
    state: '',
    year: '',
    crimeType: '',
    district: ''
  });
  const [statistics, setStatistics] = useState<DashboardStatistics>({
    totalCrimes: 0,
    mostCommonCrime: '',
    mostAffectedState: '',
    yearWithHighestCrimes: ''
  });

  const calculateStatistics = useCallback((currentData: CrimeData[]) => {
    const totalCrimes = currentData.reduce((sum, item) => sum + (Number(item.total_ipc_crimes) || 0), 0);
    
    const crimeTypes: Record<string, number> = {};
    const states: Record<string, number> = {};
    const years: Record<string, number> = {};
    
    currentData.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key.includes('murder') || key.includes('rape') || key.includes('theft')) {
          crimeTypes[key] = (crimeTypes[key] || 0) + (Number(item[key]) || 0);
        }
      });
      states[item.state_ut] = (states[item.state_ut] || 0) + (Number(item.total_ipc_crimes) || 0);
      years[item.year] = (years[item.year] || 0) + (Number(item.total_ipc_crimes) || 0);
    });

    const mostCommonCrime = Object.entries(crimeTypes).reduce((a, b) => (a[1] || 0) > (b[1] || 0) ? a : b, ['', 0])?.[0] || '';
    const mostAffectedState = Object.entries(states).reduce((a, b) => (a[1] || 0) > (b[1] || 0) ? a : b, ['', 0]) ? Object.entries(states).reduce((a, b) => (a[1] || 0) > (b[1] || 0) ? a : b, ['', 0])[0] : '';
    const yearWithHighestCrimes = Object.entries(years).reduce((a, b) => (a[1] || 0) > (b[1] || 0) ? a : b, ['', 0]) ? String(Object.entries(years).reduce((a, b) => (a[1] || 0) > (b[1] || 0) ? a : b, ['', 0])[0]) : '';

    setStatistics({
      totalCrimes,
      mostCommonCrime: mostCommonCrime.replace(/_/g, ' ').toUpperCase(),
      mostAffectedState,
      yearWithHighestCrimes
    });
    setLastUpdated(new Date().toLocaleTimeString());
  }, []);

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
    calculateStatistics(filtered);
  }, [data, filters, calculateStatistics]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearch = async (searchFilters: Partial<StatisticsFilters>) => {
    setLoading(true);
    try {
      const params: any = { limit: 100 };
      if (searchFilters.state) params.state_ut = searchFilters.state;
      if (searchFilters.district) params.district = searchFilters.district;
      if (searchFilters.year) params.year = parseInt(searchFilters.year);
      
      const result = await statisticsService.searchCrimeData(params);
      setData(result);
      // Update filters with searchFilters
      setFilters(prev => ({ ...prev, ...searchFilters }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: Partial<StatisticsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const activeRegionsCount = useMemo(() => 
    data.length > 0 ? [...new Set(data.map(d => d.state_ut))].length : 0
  , [data]);

  return {
    data,
    filteredData,
    loading,
    filters,
    statistics,
    lastUpdated,
    handleSearch,
    handleFilterChange,
    activeRegionsCount
  };
};

export default useCrimeAnalytics;
