import { useState, useEffect } from "react";
import { sosService } from "../services/sos.service";
import { CrimeData } from "../types/sos.types";

export const useCrimeClusters = () => {
  const [crimeData, setCrimeData] = useState<CrimeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await sosService.getCrimeData();
        setCrimeData(data);
      } catch (err) {
        console.error("Error fetching crime data:", err);
        setError("Error fetching crime data.");
        setCrimeData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { crimeData, isLoading, error };
};
