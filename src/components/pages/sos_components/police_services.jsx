import "./NearestPoliceMap.css";   
import { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Search, 
  Navigation, 
  Map as MapIcon, 
  Phone, 
  ShieldCheck,
  ChevronRight,
  Info
} from "lucide-react";
import apiClient from "@/lib/apiClient";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
});

const MapViewUpdater = ({ position, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, zoom);
  }, [position, zoom, map]);
  return null;
};

MapViewUpdater.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function NearestPoliceMap() {
  const [searchInput, setSearchInput] = useState("");
  const [userPosition, setUserPosition] = useState(null);
  const [nearestStations, setNearestStations] = useState([]);
  const [mapZoom, setMapZoom] = useState(6);
  const [isSearching, setIsSearching] = useState(false);

  const mapRef = useRef();

  // Custom animations for the map markers
  useEffect(() => {
    const customStyles = `
      @keyframes pulse-ring {
        0% { transform: scale(0.33); opacity: 1; }
        80%, 100% { opacity: 0; }
      }
      .custom-user-marker {
        animation: pulse-ring 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
      }
    `;
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customStyles;
    document.head.appendChild(styleElement);
    return () => document.head.removeChild(styleElement);
  }, []);

  const fetchNearestStations = async (lat, lon) => {
    setIsSearching(true);
    try {
      const res = await apiClient.get(
        `/api/search/police-stations?lat=${lat}&lon=${lon}&top=3`
      );
      setNearestStations(res.data);
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleGeocodeSearch = async () => {
    if (!searchInput.trim()) return;
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchInput
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setUserPosition([lat, lon]);
        setMapZoom(15);
        fetchNearestStations(lat, lon);
      } else {
        alert("Location not found. Please try again.");
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleNearMe = () => {
    setIsSearching(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPosition([latitude, longitude]);
        setMapZoom(15);
        fetchNearestStations(latitude, longitude);
      },
      () => {
        alert("Location access denied or not available.");
        setIsSearching(false);
      }
    );
  };

  const panToStation = (coordinates) => {
    if (mapRef.current) {
      mapRef.current.setView(coordinates, 17); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061224] py-16 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUpVariant} className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-semibold border border-teal-200 dark:border-teal-800 shadow-sm">
            <Building2 className="w-4 h-4" />
            <span>Precinct Locator Network</span>
          </motion.div>
          
          <motion.h1 variants={fadeUpVariant} className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Nearest Police <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Station Locator</span>
          </motion.h1>
          
          <motion.p variants={fadeUpVariant} className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Quickly identify and navigate to the nearest law enforcement facilities for immediate assistance or reporting.
          </motion.p>
        </motion.div>

        {/* Search Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800/40 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-8 mb-12 border border-slate-200 dark:border-slate-700/50"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <input
                type="text"
                placeholder="Enter city, district, or landmark..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full p-4 pl-14 pr-6 text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300"
                onKeyPress={(e) => e.key === 'Enter' && handleGeocodeSearch()}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-hover:text-teal-500 transition-colors" />
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleGeocodeSearch}
                disabled={isSearching}
                className="flex-1 md:flex-none px-8 py-4 bg-[#0B1F3A] dark:bg-teal-600 text-white font-bold rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                Search <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleNearMe}
                disabled={isSearching}
                className="px-8 py-4 bg-white dark:bg-slate-700 text-[#0B1F3A] dark:text-white border border-slate-200 dark:border-slate-600 font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 group disabled:opacity-70"
              >
                <Navigation className="w-5 h-5 text-teal-600 group-hover:rotate-12 transition-transform" />
                Near Me
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* List Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="xl:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-teal-600 rounded-xl text-white shadow-lg shadow-teal-500/20">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Nearby Precincts</h2>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {nearestStations.length > 0 ? (
                  nearestStations.map((station, index) => (
                    <motion.div 
                      key={station.name + index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ x: 5 }}
                      onClick={() => panToStation(station.coordinates)}
                      className="group bg-white dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-lg hover:border-teal-500/50 cursor-pointer transition-all duration-300"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center font-black text-xs shrink-0">
                            0{index + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors leading-tight mb-1">
                              {station.name}
                            </h4>
                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                              <MapIcon className="w-3 h-3" />
                              {station.district}, {station.state}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                            {station.distance_km} KM
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-12 text-center bg-white dark:bg-slate-800/20 rounded-[2.5rem] border border-dashed border-slate-300 dark:border-slate-700"
                  >
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      🔍
                    </div>
                    <p className="text-slate-500 font-medium text-sm">
                      {isSearching ? "Identifying nearby units..." : "Search for a location to view results"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800/30">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-xs text-blue-700 dark:text-blue-400 font-medium leading-relaxed">
                  In case of immediate threat to life, please dial <span className="font-bold underline">100</span> directly rather than navigating.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="xl:col-span-2 h-full flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20">
                  <Navigation className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Interactive Map</h2>
              </div>
              {userPosition && (
                <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-5 py-2 rounded-full text-sm font-bold border border-emerald-100 dark:border-emerald-800 shadow-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Live Sync
                </div>
              )}
            </div>

            <div className="flex-grow min-h-[500px] xl:min-h-0 rounded-[2.5rem] border border-slate-200 dark:border-slate-700/50 shadow-2xl overflow-hidden bg-white/50 dark:bg-slate-800/20 backdrop-blur-sm relative z-0">
              <MapContainer
                center={userPosition || [20.5937, 78.9629]}
                zoom={userPosition ? mapZoom : 5}
                className="w-full h-full"
                whenCreated={(mapInstance) => {
                  mapRef.current = mapInstance;
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {userPosition && <MapViewUpdater position={userPosition} zoom={mapZoom} />}

                {userPosition && (
                  <Marker
                    position={userPosition}
                    icon={L.divIcon({
                      className: "custom-user-marker",
                      html: `
                        <div style="background: #3B82F6; border: 4px solid white; border-radius: 50%; width: 20px; height: 20px; box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);"></div>
                      `,
                      iconSize: [20, 20],
                      iconAnchor: [10, 10],
                    })}
                  >
                    <Popup>
                      <div className="p-2 font-bold text-blue-600">You are here</div>
                    </Popup>
                  </Marker>
                )}

                {nearestStations.map((station, index) => (
                  <Marker
                    key={station.name + index}
                    position={station.coordinates}
                    icon={L.divIcon({
                      html: `
                        <div style="background: #EF4444; border: 3px solid white; border-radius: 50%; width: 16px; height: 16px; box-shadow: 0 0 15px rgba(239, 68, 68, 0.6); display: flex; align-items: center; justify-content: center; color: white; font-size: 8px; font-weight: bold;">
                          ${index + 1}
                        </div>
                      `,
                      iconSize: [16, 16],
                      iconAnchor: [8, 8],
                    })}
                  >
                    <Popup>
                      <div className="p-3 min-w-[180px]">
                        <div className="font-bold text-red-600 mb-1">🚔 {station.name}</div>
                        <div className="text-xs text-slate-500 mb-2">{station.district}, {station.state}</div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full w-fit">
                          <Navigation className="w-2.5 h-2.5" />
                          {station.distance_km} KM AWAY
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
