import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { motion } from "framer-motion";
import { 
  Map as MapIcon, 
  MapPin,
  Search, 
  Filter, 
  Table as TableIcon, 
  Calendar, 
  Activity,
  ChevronDown
} from "lucide-react";

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const CrimeMap = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter states
  const [attackTypeFilter, setAttackTypeFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    apiClient.get('/api/crime-data')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setCrimeData(data);
        setFilteredData(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setCrimeData([]);
        setFilteredData([]);
      });
  }, []);

  // Extract unique values for dropdowns
  const getUniqueValues = (key) => {
    return [...new Set(crimeData.map((item) => item[key]).filter(Boolean))].sort();
  };

  const filterData = () => {
    let filtered = crimeData.filter((item) =>
      item["attack type"]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.year && item.year.toString().includes(searchQuery))
    );

    if (attackTypeFilter) filtered = filtered.filter((item) => item["attack type"] === attackTypeFilter);
    if (cityFilter) filtered = filtered.filter((item) => item.city === cityFilter);
    if (stateFilter) filtered = filtered.filter((item) => item.state === stateFilter);
    if (yearFilter) filtered = filtered.filter((item) => item.year?.toString() === yearFilter);

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [searchQuery, attackTypeFilter, cityFilter, stateFilter, yearFilter, crimeData]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061224] py-16 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen"></div>

      <div className="max-w-[1440px] mx-auto">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUpVariant} className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-800 shadow-sm">
            <Activity className="w-4 h-4" />
            <span>Real-time Analytical Intelligence</span>
          </motion.div>
          
          <motion.h1 variants={fadeUpVariant} className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Crime Map & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Analytics Dashboard</span>
          </motion.h1>
          
          <motion.p variants={fadeUpVariant} className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Explore and analyze crime patterns through interactive spatial mapping and advanced data filtering.
          </motion.p>
        </motion.div>

        {/* Search Input */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mb-8 max-w-3xl mx-auto"
        >
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by attack type, city, state, or summary..."
              className="w-full p-5 pl-14 pr-6 text-slate-800 dark:text-white bg-white dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors">
              <Search className="w-6 h-6" />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12 bg-white dark:bg-slate-800/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-500" />
            Advanced Filter Options
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Attack Type', value: attackTypeFilter, setter: setAttackTypeFilter, key: 'attack type' },
              { label: 'City', value: cityFilter, setter: setCityFilter, key: 'city' },
              { label: 'State', value: stateFilter, setter: setStateFilter, key: 'state' },
              { label: 'Year', value: yearFilter, setter: setYearFilter, key: 'year' },
            ].map((f) => (
              <div key={f.label} className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{f.label}</label>
                <div className="relative">
                  <select
                    className="w-full p-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold dark:text-white appearance-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    value={f.value}
                    onChange={(e) => f.setter(e.target.value)}
                  >
                    <option value="">All {f.label}s</option>
                    {getUniqueValues(f.key).map((val, i) => (
                      <option key={i} value={val}>{val}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
                  <MapIcon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Interactive Map</h2>
              </div>
            </div>
            <div className="flex-grow min-h-[600px] rounded-[2.5rem] border border-slate-200 dark:border-slate-700/50 shadow-2xl overflow-hidden bg-white/50 dark:bg-slate-800/20 backdrop-blur-sm relative z-0">
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={4.2}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredData.map((item, idx) =>
                  item.Latitude && item.Longitude ? (
                    <Marker key={idx} position={[item.Latitude, item.Longitude]}>
                      <Popup>
                        <div className="p-3 min-w-[220px] font-sans">
                          <div className="text-base font-bold text-red-600 mb-2 border-b pb-2">{item["attack type"]}</div>
                          <div className="space-y-2">
                            <div className="text-sm text-slate-700 flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-semibold text-slate-900">{item.city}, {item.state}</span>
                            </div>
                            <div className="text-sm text-slate-700 flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-medium">{item.year}</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-2 p-2 bg-slate-50 rounded-lg italic leading-relaxed">
                              {item.summary}
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ) : null
                )}
              </MapContainer>
            </div>
          </motion.div>

          {/* Table Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/20">
                  <TableIcon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Intelligence Ledger</h2>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-5 py-2 rounded-full text-sm font-bold border border-indigo-100 dark:border-indigo-800 shadow-sm">
                {filteredData.length} Records Detected
              </div>
            </div>
            
            <div className="flex-grow overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-700/50 shadow-2xl bg-white/80 dark:bg-slate-800/40 backdrop-blur-sm">
              <div className="overflow-auto max-h-[600px] scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <table className="w-full table-auto border-collapse text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 sticky top-0 z-10">
                    <tr>
                      <th className="p-5 text-left font-bold uppercase tracking-wider text-xs">Attack Type</th>
                      <th className="p-5 text-left font-bold uppercase tracking-wider text-xs">Location</th>
                      <th className="p-5 text-left font-bold uppercase tracking-wider text-xs">Date</th>
                      <th className="p-5 text-left font-bold uppercase tracking-wider text-xs">Intelligence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {filteredData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                        <td className="p-5">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                            {item["attack type"]}
                          </span>
                        </td>
                        <td className="p-5">
                          <div className="font-bold text-slate-900 dark:text-slate-200 leading-tight">{item.city}</div>
                          <div className="text-xs text-slate-500 font-medium">{item.state}</div>
                        </td>
                        <td className="p-5 text-slate-600 dark:text-slate-400 font-bold whitespace-nowrap">
                          {`${item.day || ""} ${item.month || ""} ${item.year || ""}`}
                        </td>
                        <td className="p-5">
                          <div className="max-w-[180px] truncate text-slate-500 dark:text-slate-400 font-medium italic" title={item.summary}>
                            {item.summary}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredData.length === 0 && (
                  <div className="p-16 text-center">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                      🔍
                    </div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white mb-2">No intelligence found</div>
                    <div className="text-slate-500 font-medium">Try adjusting your filtration criteria</div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        
        <footer className="mt-20 text-center text-sm font-medium text-slate-400 italic">
          &copy; {new Date().getFullYear()} SafeSphere Global Intelligence Network • Data Updated Hourly
        </footer>
      </div>
    </div>
  );
};

export default CrimeMap;
