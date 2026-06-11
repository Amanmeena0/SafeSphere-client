import { useState, useCallback } from 'react';

/**
 * @typedef {Object} LocationData
 * @property {string} address - Human-readable address
 * @property {number} latitude - Latitude coordinate
 * @property {number} longitude - Longitude coordinate
 */

/**
 * Custom hook to handle browser geolocation and reverse geocoding
 * @returns {Object} Geolocation state and methods
 */
export const useCurrentLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({
    address: '',
    latitude: 0,
    longitude: 0,
  });

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || import.meta.env.VITE_MAPBOX_API;

  const reverseGeocode = async (lat, lon) => {
    if (!MAPBOX_TOKEN) {
      console.warn('Mapbox token is missing. Please set VITE_MAPBOX_TOKEN in your .env file.');
      return `Coords: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${MAPBOX_TOKEN}&limit=1`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        return data.features[0].place_name;
      }
      return `Coords: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      return `Coords: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    }
  };

  const getCurrentLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = 'Geolocation is not supported by your browser';
        setError(err);
        reject(err);
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await reverseGeocode(latitude, longitude);
          
          const newLocation = {
            latitude,
            longitude,
            address,
          };
          
          setLocation(newLocation);
          setLoading(false);
          resolve(newLocation);
        },
        (err) => {
          let errorMessage = 'Failed to get your location';
          if (err.code === 1) errorMessage = 'Location permission denied';
          else if (err.code === 2) errorMessage = 'Location unavailable';
          else if (err.code === 3) errorMessage = 'Location request timed out';
          
          setError(errorMessage);
          setLoading(false);
          reject(errorMessage);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });
  }, [MAPBOX_TOKEN]);

  return {
    location,
    setLocation,
    loading,
    error,
    getCurrentLocation,
  };
};
