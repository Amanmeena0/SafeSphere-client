import apiClient from "@/lib/apiClient";
import { SOSTriggerData, PoliceStation, CrimeData } from "../types/sos.types";

export const sosService = {
  triggerSOS: async (data: SOSTriggerData): Promise<void> => {
    await apiClient.post("/api/sos/trigger", data);
  },

  getNearestPoliceStations: async (
    lat: number,
    lon: number,
    top: number = 3
  ): Promise<PoliceStation[]> => {
    const res = await apiClient.get<PoliceStation[]>(
      `/api/police/stations?lat=${lat}&lon=${lon}&top=${top}`
    );
    return res.data;
  },

  getCrimeData: async (): Promise<CrimeData[]> => {
    const res = await apiClient.get<CrimeData[]>("/api/search", {
      params: { limit: 100 }
    });
    return Array.isArray(res.data) ? res.data : [];
  },
};

export default sosService;
