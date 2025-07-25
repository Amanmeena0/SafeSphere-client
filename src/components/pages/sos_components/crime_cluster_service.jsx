import { useEffect, useState } from "react";
import axios from "axios";
import backend from "@/config";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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
    axios.get(`${backend.apiUrl}/api/crime-data`)
      .then((res) => {
        setCrimeData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
            🗺️ Crime Map & Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600 font-medium">Explore crime data patterns with interactive mapping and advanced filtering</p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search by attack type, city, state, or summary..."
              className="w-full p-4 pl-12 pr-4 text-gray-800 bg-white/80 backdrop-blur-sm border-2 border-transparent rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 hover:shadow-xl"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter Options
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Attack Type</label>
              <select
                className="w-full p-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 hover:shadow-xl group-hover:border-blue-300"
                value={attackTypeFilter}
                onChange={(e) => setAttackTypeFilter(e.target.value)}
              >
                <option value="">All Attack Types</option>
                {getUniqueValues("attack type").map((val, i) => (
                  <option key={i} value={val}>{val}</option>
                ))}
              </select>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                className="w-full p-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 hover:shadow-xl group-hover:border-blue-300"
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
              >
                <option value="">All States</option>
                {getUniqueValues("state").map((val, i) => (
                  <option key={i} value={val}>{val}</option>
                ))}
              </select>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                className="w-full p-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 hover:shadow-xl group-hover:border-blue-300"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="">All Years</option>
                {getUniqueValues("year").map((val, i) => (
                  <option key={i} value={val}>{val}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="group">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-500 rounded-lg mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Interactive Crime Map</h2>
            </div>
            <div className="h-[600px] rounded-2xl border-2 border-gray-200 shadow-2xl overflow-hidden bg-white/50 backdrop-blur-sm group-hover:shadow-3xl transition-all duration-300">
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
                        <div className="p-2 min-w-[200px]">
                          <div className="text-lg font-bold text-red-600 mb-2">{item["attack type"]}</div>
                          <div className="text-sm text-gray-700 mb-1">
                            <span className="font-semibold">📍 Location:</span> {item.city}, {item.state}
                          </div>
                          <div className="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                            <span className="font-semibold">📝 Summary:</span> {item.summary}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ) : null
                )}
              </MapContainer>
            </div>
          </div>

          {/* Table Section */}
          <div className="group">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-500 rounded-lg mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Crime Data Table</h2>
              <div className="ml-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {filteredData.length} Records
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 shadow-2xl bg-white/80 backdrop-blur-sm group-hover:shadow-3xl transition-all duration-300">
              <div className="overflow-auto max-h-[600px] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
                <table className="w-full table-auto border-collapse text-sm">
                  <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-10">
                    <tr>
                      <th className="p-4 text-left font-semibold">
                        <div className="flex items-center">
                          🚨 Attack Type
                        </div>
                      </th>
                      <th className="p-4 text-left font-semibold">
                        <div className="flex items-center">
                          🏙️ City
                        </div>
                      </th>
                      <th className="p-4 text-left font-semibold">
                        <div className="flex items-center">
                          📍 State
                        </div>
                      </th>
                      <th className="p-4 text-left font-semibold">
                        <div className="flex items-center">
                          📅 Date
                        </div>
                      </th>
                      <th className="p-4 text-left font-semibold">
                        <div className="flex items-center">
                          📄 Summary
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 even:bg-gray-50/50 transition-all duration-200 border-b border-gray-100">
                        <td className="p-4 border-r border-gray-100">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                            {item["attack type"]}
                          </span>
                        </td>
                        <td className="p-4 border-r border-gray-100 font-medium text-gray-700">{item.city}</td>
                        <td className="p-4 border-r border-gray-100 font-medium text-gray-700">{item.state}</td>
                        <td className="p-4 border-r border-gray-100 text-gray-600">{`${item.day || ""} ${item.month || ""} ${item.year || ""}`}</td>
                        <td className="p-4">
                          <div className="max-w-xs truncate text-gray-600" title={item.summary}>
                            {item.summary}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredData.length === 0 && (
                  <div className="p-8 text-center bg-gradient-to-r from-red-50 to-pink-50 m-4 rounded-xl border-2 border-red-200">
                    <div className="text-6xl mb-4">🚫</div>
                    <div className="text-xl font-bold text-red-600 mb-2">No matching records found</div>
                    <div className="text-gray-600">Try adjusting your search criteria or filters</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeMap;
