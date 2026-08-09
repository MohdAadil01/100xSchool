import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useReservations = (status?: string) => {
  return useQuery({
    queryKey: ["reservations", status],
    queryFn: async () => {
      const res = await api.get("/reservations", {
        params: status ? { status } : {},
      });

      return res.data.data;
    },
  });
};
