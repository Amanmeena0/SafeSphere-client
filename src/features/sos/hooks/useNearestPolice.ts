import { useState, useCallback } from "react";
import { sosService } from "../services/sos.service";
import { PoliceStation } from "../types/sos.types";

export const useNearestPolice = () => {
  const [nearestStations, setNearestStations] = useState<PoliceStation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStations = useCallback(async (lat: number, lon: number) => {
    setIsSearching(true);
    setError(null);
    try {
      const stations = await sosService.getNearestPoliceStations(lat, lon);
      setNearestStations(stations);
    } catch (err) {
      console.error("Error fetching stations:", err);
      setError("Error fetching nearby police stations.");
    } finally {
      setIsSearching(false);
    }
  }, []);

  const searchByAddress = async (address: string) => {
    if (!address.trim()) return null;
    setIsSearching(true);
    setError(null);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        await fetchStations(lat, lon);
        return { lat, lon };
      } else {
        setError("Location not found. Please try again.");
        return null;
      }
    } catch (err) {
      setError("Error searching for location.");
      return null;
    } finally {
      setIsSearching(false);
    }
  };

  const getStationsNearMe = () => {
    return new Promise<{ lat: number; lon: number } | null>((resolve) => {
      setIsSearching(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          await fetchStations(latitude, longitude);
          resolve({ lat: latitude, lon: longitude });
        },
        () => {
          setError("Location access denied or not available.");
          setIsSearching(false);
          resolve(null);
        }
      );
    });
  };

  return {
    nearestStations,
    isSearching,
    error,
    fetchStations,
    searchByAddress,
    getStationsNearMe,
  };
};
