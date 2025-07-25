import "./NearestPoliceMap.css"; // Add this line at the top    
import { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

export default function NearestPoliceMap() {
  const [searchInput, setSearchInput] = useState("");
  const [userPosition, setUserPosition] = useState(null);
  const [nearestStations, setNearestStations] = useState([]);
  const [mapZoom, setMapZoom] = useState(6); // <-- Add zoom state

  const mapRef = useRef();

  // Add custom CSS for animations
  const customStyles = `
    <style>
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
      
      .custom-user-marker div:first-child {
        animation: pulse 2s infinite;
      }
      
      .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 12px !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
      }
      
      .custom-popup .leaflet-popup-tip {
        background: white !important;
      }
      
      .leaflet-container {
        border-radius: 0 0 16px 16px;
      }
    </style>
  `;

  // Insert custom styles
  if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customStyles.replace(/<\/?style>/g, '');
    if (!document.querySelector('[data-police-map-styles]')) {
      styleElement.setAttribute('data-police-map-styles', 'true');
      document.head.appendChild(styleElement);
    }
  }

  const fetchNearestStations = async (lat, lon) => {
    const res = await fetch(
      `http://127.0.0.1:5000/sos/nearest-police-stations?lat=${lat}&lon=${lon}&top=3`
    );
    const data = await res.json();
    setNearestStations(data);
  };

  const handleGeocodeSearch = async () => {
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
      setMapZoom(15); // <-- Zoom in on search
      fetchNearestStations(lat, lon);
    } else {
      alert("Location not found. Please try again.");
    }
  };

  const handleNearMe = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPosition([latitude, longitude]);
        setMapZoom(15); // <-- Zoom in on "Near Me"
        fetchNearestStations(latitude, longitude);
      },
      () => {
        alert("Location access denied or not available.");
      }
    );
  };

  // Function to pan map to a station
  const panToStation = (coordinates) => {
    if (mapRef.current) {
      mapRef.current.setView(coordinates, 17); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            🚔 Police Station Locator
          </h1>
          <p className="text-lg text-gray-600 font-medium">Find the nearest police stations in your area quickly and efficiently</p>
        </div>

        {/* Search Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Location
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Enter location (e.g., Pune, Mumbai, Delhi)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full p-4 pl-12 pr-4 text-gray-800 bg-white border-2 border-gray-200 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 hover:shadow-xl"
                onKeyPress={(e) => e.key === 'Enter' && handleGeocodeSearch()}
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleGeocodeSearch}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
              <button
                onClick={handleNearMe}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Near Me
              </button>
            </div>
          </div>
        </div>

        {/* Police Stations List */}
        {nearestStations.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-red-500 rounded-lg mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Nearest Police Stations</h3>
              <div className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {nearestStations.length} Found
              </div>
            </div>
            <div className="grid gap-4">
              {nearestStations.map((station, index) => (
                <div 
                  key={station.name + station.district + station.state}
                  className="group bg-gradient-to-r from-white to-gray-50 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => panToStation(station.coordinates)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {station.name}
                        </h4>
                        <p className="text-gray-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {station.district}, {station.state}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {station.distance_km} km
                      </div>
                      <div className="text-xs text-gray-500 mt-1 group-hover:text-blue-500 transition-colors">
                        Click to view on map
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map Section */}
        {userPosition ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-500 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Interactive Map</h3>
                <div className="ml-auto text-sm text-gray-500">
                  Click on stations to view details
                </div>
              </div>
            </div>
            <div className="h-[600px]">
              <MapContainer
                center={userPosition}
                zoom={mapZoom}
                className="w-full h-full"
                whenCreated={(mapInstance) => {
                  mapRef.current = mapInstance;
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <MapViewUpdater position={userPosition} zoom={mapZoom} />

                {/* Enhanced User Location Marker */}
                <Marker
                  position={userPosition}
                  icon={L.divIcon({
                    className: "custom-user-marker",
                    html: `
                      <div style="text-align: center; transform: translate(-50%, -100%);">
                        <div style="
                          background: linear-gradient(135deg, #3B82F6, #1D4ED8);
                          border: 3px solid white;
                          border-radius: 50%;
                          width: 24px;
                          height: 24px;
                          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
                          animation: pulse 2s infinite;
                        "></div>
                        <div style="
                          background: linear-gradient(135deg, #3B82F6, #1D4ED8);
                          color: white;
                          padding: 6px 12px;
                          border-radius: 12px;
                          font-size: 12px;
                          font-weight: bold;
                          margin-top: 4px;
                          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                          white-space: nowrap;
                        ">
                          📍 Your Location
                        </div>
                      </div>
                    `,
                    iconSize: [80, 60],
                    iconAnchor: [40, 60],
                  })}
                >
                  <Popup className="custom-popup">
                    <div style={{textAlign: 'center', padding: '8px'}}>
                      <div style={{fontWeight: 'bold', color: '#3B82F6', marginBottom: '4px'}}>🏠 Your Current Location</div>
                      <div style={{color: '#6B7280', fontSize: '12px'}}>This is where you are right now</div>
                    </div>
                  </Popup>
                </Marker>

                {/* Enhanced Police Station Markers */}
                {nearestStations.map((station, index) => (
                  <Marker
                    key={station.name + station.district + station.state}
                    position={station.coordinates}
                    icon={L.divIcon({
                      className: "custom-police-marker",
                      html: `
                        <div style="text-align: center; transform: translate(-50%, -100%);">
                          <div style="
                            background: linear-gradient(135deg, #EF4444, #DC2626);
                            border: 3px solid white;
                            border-radius: 50%;
                            width: 20px;
                            height: 20px;
                            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 10px;
                            font-weight: bold;
                          ">${index + 1}</div>
                          <div style="
                            background: linear-gradient(135deg, #EF4444, #DC2626);
                            color: white;
                            padding: 4px 8px;
                            border-radius: 8px;
                            font-size: 10px;
                            font-weight: bold;
                            margin-top: 4px;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                            white-space: nowrap;
                            max-width: 120px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                          ">
                            🚔 ${station.name.length > 15 ? station.name.substring(0, 15) + '...' : station.name}
                          </div>
                        </div>
                      `,
                      iconSize: [100, 50],
                      iconAnchor: [50, 50],
                    })}
                  >
                    <Popup className="custom-popup">
                      <div style={{padding: '12px', minWidth: '200px'}}>
                        <div style={{fontWeight: 'bold', color: '#EF4444', marginBottom: '8px', fontSize: '16px'}}>
                          🚔 {station.name}
                        </div>
                        <div style={{color: '#6B7280', marginBottom: '4px'}}>
                          <strong>📍 Location:</strong> {station.district}, {station.state}
                        </div>
                        <div style={{color: '#6B7280', marginBottom: '8px'}}>
                          <strong>📏 Distance:</strong> {station.distance_km} km away
                        </div>
                        <div style={{
                          background: 'linear-gradient(135deg, #10B981, #059669)',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: '12px'
                        }}>
                          Emergency Contact Available
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Ready to Help You</h3>
              <p className="text-gray-600 mb-6">
                Search for a location or use &quot;Near Me&quot; to find the closest police stations in your area.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-700 text-sm font-medium">
                  💡 Tip: Allow location access for more accurate results when using &quot;Near Me&quot;
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
