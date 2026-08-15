import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReservations } from "../../hooks/useReservations";
import { api } from "../../api/axios";

// interface Reservation {
//   _id: string;
//   confirmationNo: string;
//   checkIn: string;
//   checkOut: string;
//   nights: number;
//   status: string;
//   guest: {
//     firstName: string;
//     lastName: string;
//     membershipType: string;
//     phone: string;
//     _id: string;
//   };
//   phone: string;
// }

const Dashboard = () => {
  const { data: arrivals = [], isLoading: arrivalsLoading } =
    useReservations("arrival");

  const { data: inhouse = [], isLoading: inhouseLoading } =
    useReservations("inhouse");

  const { data: reserved = [], isLoading: reservedLoading } =
    useReservations("reserved");

  const queryClient = useQueryClient();

  const { mutate: checkIn, isPending } = useMutation({
    mutationFn: async (reservationId: string) => {
      return await api.patch(`/reservations/${reservationId}/checkin`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });

  if (arrivalsLoading || inhouseLoading || reservedLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">Arrivals</p>
          <p className="text-2xl font-semibold">{arrivals.length}</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">In-house</p>
          <p className="text-2xl font-semibold">{inhouse.length}</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">Reserved</p>
          <p className="text-2xl font-semibold">{reserved.length}</p>
        </div>
      </div>

      {/* Arrivals */}
      <div className="rounded-lg border">
        <div className="border-b p-4">
          <h2 className="font-semibold">Today's Arrivals</h2>
        </div>

        <div className="divide-y">
          {arrivals.length > 0 ? (
            arrivals.map((arrival: any) => (
              <div
                key={arrival.confirmationNo}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="font-medium">
                    {arrival.guest.firstName} {arrival.guest.lastName}
                  </p>
                  <p className="font-medium">{arrival.guest.email}</p>
                  <p className="font-medium">
                    {arrival.roomType.code} {arrival.roomType.name}
                  </p>
                  <p className="font-medium">
                    {arrival.room?.roomNumber} {arrival.room?.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    Confirmation: {arrival.confirmationNo}
                  </p>
                </div>

                <button
                  className="rounded-md border px-3 py-1.5 text-sm"
                  onClick={() => checkIn(arrival._id)}
                  disabled={isPending}
                >
                  Check In
                </button>
              </div>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-500">No arrivals today.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
