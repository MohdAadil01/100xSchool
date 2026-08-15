import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useRooms = (propertyId: string) => {
  return useQuery({
    queryKey: ["rooms", propertyId],
    queryFn: async () => {
      const response = await api.get("/rooms", {
        params: {
          propertyId,
        },
      });
      return response.data.data;
    },
  });
};
