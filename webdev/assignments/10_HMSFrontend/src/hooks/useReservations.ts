import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export const useReservations = (status?: string) => {
  const { user, activePropertyId } = useAuth();
  const propertyId = user?.role === "superadmin" && activePropertyId;

  return useQuery({
    queryKey: ["reservations", status],
    queryFn: async () => {
      const res = await api.get("/reservations", {
        params: {
          ...(status && { status }),
          ...(propertyId && { propertyId }),
        },
      });

      return res.data.data;
    },
    enabled: !!propertyId || user?.role != "superadmin",
  });
};
