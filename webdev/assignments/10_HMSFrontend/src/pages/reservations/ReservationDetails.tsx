import { useState } from "react";
import { useReservations } from "../../hooks/useReservations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";

function ReservationDetails() {
  const [status, setStatus] = useState("");

  const { data: allReservations, isLoading: isReservationLoading } =
    useReservations(status ? status : "");

  const queryClient = useQueryClient();

  const { mutate: cancelReservation } = useMutation({
    mutationFn: async (id: string) => {
      return await api.patch(`/reservations/${id}/cancel`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [status] });
    },
  });

  const { mutate: checkOut } = useMutation({
    mutationFn: async (id: string) => {
      return await api.patch(`/reservations/${id}/checkout`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [status] });
    },
  });

  if (isReservationLoading) return <div>Loading...</div>;
  return (
    <div>
      <div>
        <select onChange={(e) => setStatus(e.target.value)}>
          <option>Status</option>
          <option value="inhouse">Inhouse</option>
          <option value="cancelled">cancelled</option>
          <option value="departures">departures</option>
          <option value="reserved">Reserved</option>
        </select>
      </div>
      {allReservations.map((r: any) => (
        <>
          <p>{r.confirmationNo}</p>
          <div>
            {r.status === "reserved" && (
              <button onClick={() => cancelReservation(r._id)}>Cancel</button>
            )}
            {r.status === "inhouse" && (
              <button onClick={() => checkOut(r._id)}>CheckOut</button>
            )}
          </div>
        </>
      ))}
    </div>
  );
}

export default ReservationDetails;
