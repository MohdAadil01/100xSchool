import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useOccupancyRate = (propertyId: string) => {
  return useQuery({
    queryKey: ["reports", "occupancy"],
    queryFn: async () => {
      const response = await api.get(`/reports/${propertyId}/occupancy-rate`);
      return response.data.data;
    },
  });
};

export const useTodayArrivals = (propertyId: string) => {
  return useQuery({
    queryKey: ["reports", "arrivals"],
    queryFn: async () => {
      const response = await api.get(`/reports/${propertyId}/arrivals`);
      return response.data.data;
    },
  });
};

export const useMonthlyRevenue = (propertyId: string) => {
  return useQuery({
    queryKey: ["reports", "revenue"],
    queryFn: async () => {
      const response = await api.get(`/reports/${propertyId}/revenue`);
      return response.data.data;
    },
  });
};
