import { useState } from "react";
import { useReservations } from "../../hooks/useReservations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";

function Reservations() {
  const [status, setStatus] = useState("");

  const { data: allReservations = [], isLoading: isReservationLoading } =
    useReservations(status ? status : "");

  const queryClient = useQueryClient();

  const { mutate: cancelReservation } = useMutation({
    mutationFn: async (id: string) => {
      return await api.patch(`/reservations/${id}/cancel`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });

  const { mutate: checkOut } = useMutation({
    mutationFn: async (id: string) => {
      return await api.patch(`/reservations/${id}/checkout`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });

  if (isReservationLoading) return <div>Loading...</div>;
  return (
    <div>
      <div>
        <select onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="">All</option>
          <option value="reserved">Reserved</option>
          <option value="arrival">Arrival</option>
          <option value="inhouse">Inhouse</option>
          <option value="departed">Departed</option>
          <option value="cancelled">Cancelled</option>
          <option value="noshow">No Show</option>
        </select>
      </div>
      {allReservations.map((r: any) => (
        <div
          key={r._id}
          className="flex items-center justify-between border-b p-4"
        >
          <div>
            <p className="font-medium">{r.confirmationNo}</p>
            <p className="text-sm text-gray-500">
              {r.guest?.firstName} {r.guest?.lastName}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(r.checkIn).toLocaleDateString()} →{" "}
              {new Date(r.checkOut).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
              {r.status}
            </span>
            {r.status === "reserved" && (
              <button
                onClick={() => cancelReservation(r._id)}
                className="rounded bg-red-500 px-3 py-1 text-sm text-white"
              >
                Cancel
              </button>
            )}
            {r.status === "inhouse" && (
              <button
                onClick={() => checkOut(r._id)}
                className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reservations;
