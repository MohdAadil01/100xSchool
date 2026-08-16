import { useAuth } from "../../context/AuthContext";
import {
  useMonthlyRevenue,
  useOccupancyRate,
  useTodayArrivals,
} from "../../hooks/useReports";

interface Arrival {
  _id: string;
  confirmationNo: string;
  checkIn: string;
  checkOut: string;
  guestDetails: { firstName: string; lastName: string }[];
  roomTypeDetails: { code: string; name: string }[];
  roomDetails: { roomNumber: string; floor: number }[];
}

function Reports() {
  const { user, activePropertyId } = useAuth();

  const propertyId =
    user?.role === "superadmin" ? activePropertyId : user?.propertyId;

  return (
    <div className="min-h-full bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-lg font-semibold text-gray-800">Reports</h1>

        <p className="text-sm text-gray-500">
          Property performance and daily operational overview
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <OccupancyRate propertyId={propertyId!} />

        <Revenue propertyId={propertyId!} />

        <ArrivalCard propertyId={propertyId!} />
      </div>
    </div>
  );
}

const ArrivalCard = ({ propertyId }: { propertyId: string }) => {
  const {
    data: arrivals = [],
    isLoading,
    isError,
    error,
  } = useTodayArrivals(propertyId);

  return (
    <div className="rounded-lg border bg-white p-4 md:col-span-3">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Today's Arrivals</p>

          <p className="text-xs text-gray-500">
            Guests expected to arrive today
          </p>
        </div>

        {!isLoading && (
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
            {arrivals.length} arrivals
          </span>
        )}
      </div>

      {isError ? (
        <p className="text-sm text-red-600">
          {(error as any)?.response?.data?.error || "Something went wrong"}
        </p>
      ) : isLoading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : arrivals.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-500">
          No arrivals today.
        </p>
      ) : (
        <div className="divide-y">
          {arrivals.map((arrival: Arrival) => (
            <div
              key={arrival._id}
              className="grid grid-cols-1 gap-2 py-3 md:grid-cols-5 md:items-center"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {arrival.guestDetails?.[0]?.firstName}{" "}
                  {arrival.guestDetails?.[0]?.lastName}
                </p>

                <p className="text-xs text-gray-500">
                  {arrival.confirmationNo}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Room Type</p>

                <p className="text-sm text-gray-700">
                  {arrival.roomTypeDetails?.[0]?.code}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Room</p>

                <p className="text-sm text-gray-700">
                  {arrival.roomDetails?.[0]?.roomNumber || "Unassigned"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Check-in</p>

                <p className="text-sm text-gray-700">
                  {new Date(arrival.checkIn).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="md:text-right">
                <span className="inline-block rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
                  Arrival
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const OccupancyRate = ({ propertyId }: { propertyId: string }) => {
  const {
    data: occupancyRate,
    isLoading,
    isError,
    error,
  } = useOccupancyRate(propertyId);

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Occupancy</p>
        <p className="text-xs text-gray-500">Current property occupancy</p>
      </div>

      {isError ? (
        <p className="text-sm text-red-600">
          {(error as any)?.response?.data?.error || "Something went wrong"}
        </p>
      ) : isLoading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <div>
          <p className="text-3xl font-semibold text-gray-800">
            {occupancyRate?.occupancyRate?.toFixed(1)}%
          </p>

          <div className="mt-4 flex gap-6">
            <div>
              <p className="text-xs text-gray-500">Total Rooms</p>
              <p className="text-lg font-medium">{occupancyRate?.totalRooms}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Occupied</p>
              <p className="text-lg font-medium">
                {occupancyRate?.occupiedRooms}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Revenue = ({ propertyId }: { propertyId: string }) => {
  const {
    data: revenue,
    isLoading,
    isError,
    error,
  } = useMonthlyRevenue(propertyId);

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Monthly Revenue</p>

        <p className="text-xs text-gray-500">
          Revenue and reservation performance
        </p>
      </div>

      {isError ? (
        <p className="text-sm text-red-600">
          {(error as any)?.response?.data?.error || "Something went wrong"}
        </p>
      ) : isLoading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <div>
          <p className="text-3xl font-semibold text-gray-800">
            ₹{revenue?.totalRevenue?.toLocaleString("en-IN")}
          </p>

          <div className="mt-4">
            <p className="text-xs text-gray-500">Reservations</p>

            <p className="text-lg font-medium">{revenue?.totalReservations}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
