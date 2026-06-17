import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { } from 'mapbox-gl';
import { MapPin, Loader2, Navigation, AlertCircle } from 'lucide-react';
import { useCurrentLocation } from "@/shared/hooks/useCurrentLocation";

// Set Mapbox token
const MAPBOX_TOKEN = (import.meta as ImportMeta & {
  env: {
    VITE_MAPBOX_TOKEN?: string;
    VITE_MAPBOX_API?: string;
  };
}).env.VITE_MAPBOX_TOKEN || (import.meta as ImportMeta & {
  env: {
    VITE_MAPBOX_TOKEN?: string;
    VITE_MAPBOX_API?: string;
  };
}).env.VITE_MAPBOX_API;

mapboxgl.accessToken = MAPBOX_TOKEN;

const LocationSelector = ({ onLocationChange, initialLocation = '' }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  
  const { 
    location, 
    setLocation, 
    loading, 
    error: geoError, 
    getCurrentLocation 
  } = useCurrentLocation();

  const [address, setAddress] = useState(initialLocation);
  const [showMap, setShowMap] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);

  // Sync internal address with location hook or initialLocation
  useEffect(() => {
    if (location.address) {
      setAddress(location.address);
      onLocationChange({
        address: location.address,
        latitude: location.latitude,
        longitude: location.longitude
      });
      setShowMap(true);
    }
  }, [location, onLocationChange]);

  // Initialize Mapbox map
  useEffect(() => {
    if (!showMap || !mapContainer.current || map.current) return;
    
    if (!MAPBOX_TOKEN) {
      console.error('Mapbox token is missing. Map cannot be initialized.');
      return;
    }

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [location.longitude, location.latitude],
        zoom: 15
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      marker.current = new mapboxgl.Marker({
        draggable: true,
        color: '#ef4444' // red-500
      })
        .setLngLat([location.longitude, location.latitude])
        .addTo(map.current);

      marker.current.on('dragend', async () => {
        const lngLat = marker.current.getLngLat();
        const lat = lngLat.lat;
        const lng = lngLat.lng;
        
        setMapLoading(true);
        // Update coordinates
        setLocation(prev => ({ ...prev, latitude: lat, longitude: lng }));
        
        // Reverse geocode to get new address
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&limit=1`
          );
          const data = await response.json();
          const newAddress = data.features?.[0]?.place_name || `Coords: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          
          setAddress(newAddress);
          onLocationChange({
            address: newAddress,
            latitude: lat,
            longitude: lng
          });
        } catch (err) {
          console.error('Reverse geocoding error:', err);
        } finally {
          setMapLoading(false);
        }
      });
    } catch (err) {
      console.error('Mapbox initialization error:', err);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [showMap, location.latitude, location.longitude, setLocation, onLocationChange]);

  // Update map and marker when location changes (from button click)
  useEffect(() => {
    if (map.current && marker.current && location.latitude && location.longitude) {
      map.current.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 15
      });
      marker.current.setLngLat([location.longitude, location.latitude]);
    }
  }, [location.latitude, location.longitude]);

  const handleUseCurrentLocation = async (e) => {
    e.preventDefault();
    try {
      await getCurrentLocation();
    } catch (err) {
      console.error('Error getting current location:', err);
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    onLocationChange({
      address: e.target.value,
      latitude: location.latitude,
      longitude: location.longitude
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            Incident Location
          </label>
          <input
            type="text"
            name="location"
            required
            value={address}
            onChange={handleAddressChange}
            className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 dark:text-white transition-all"
            placeholder="Street address, Landmark, or City"
          />
        </div>
        
        <div className="flex items-end">
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={loading}
            className="w-full sm:w-auto h-[54px] px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Fetching...
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4" />
                📍 Use Current Location
              </>
            )}
          </button>
        </div>
      </div>

      {geoError && (
        <div className="flex items-center gap-2 text-red-500 text-sm font-medium animate-pulse">
          <AlertCircle className="w-4 h-4" />
          {geoError}
        </div>
      )}

      {showMap && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
          {!MAPBOX_TOKEN ? (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 p-4 rounded-xl flex items-start gap-3">
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>Drag the marker to refine your location</span>
                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </span>
              </div>
              <div className="relative group">
                <div 
                  ref={mapContainer} 
                  className="w-full h-[250px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner"
                />
                {mapLoading && (
                  <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] flex items-center justify-center rounded-2xl z-10">
                    <div className="bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
