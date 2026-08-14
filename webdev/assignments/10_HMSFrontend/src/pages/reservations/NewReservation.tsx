import { useState } from "react";
import { api } from "../../api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface RoomType {
  _id: string;
  code: string;
  name: string;
}

interface RatePlanRoomType {
  _id: string;
  pricePerNight: number;
  roomType: RoomType;
}

interface RatePlan {
  _id: string;
  code: string;
  name: string;
  roomTypes: RatePlanRoomType[];
}

interface Guest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  idNumber: string;
  membershipType: string;
}

function NewReservation() {
  const today = new Date();
  const defaultCheckOut = new Date();
  defaultCheckOut.setDate(today.getDate() + 1);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [checkIn, setCheckin] = useState(formatDate(today));
  const [checkOut, setCheckout] = useState(formatDate(defaultCheckOut));
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [search, setSearch] = useState({ lastName: "", email: "" });
  const [guest, setGuest] = useState<Guest | null>(null);
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [lastSearch, setLastSearch] = useState<Guest[]>([]);

  const [selectedRate, setSelectedRate] = useState({
    ratePlan: "",
    roomType: "",
  });

  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    mutate: fetchAvailability,
    data: availability = [],
    isPending,
    error: availabilityError,
  } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/reservations/availability", {
        checkIn,
        checkOut,
        adults,
        children,
        property: user?.propertyId,
      });

      return response.data.data;
    },
  });

  const { refetch: searchByName, data: nameResults } = useQuery({
    queryKey: ["guests", "search", "lastname", search.lastName],
    queryFn: async () => {
      const response = await api.get("/guests/search", {
        params: {
          lastName: search.lastName,
        },
      });
      return response.data.data;
    },
    enabled: false,
  });

  const { refetch: searchByEmail, data: emailResults } = useQuery({
    queryKey: ["guests", "search", "email", search.email],
    queryFn: async () => {
      const response = await api.get("/guests/search", {
        params: {
          email: search.email,
        },
      });
      return response.data.data;
    },
    enabled: false,
  });

  const openGuestSearch = async (type: "name" | "email") => {
    if (type === "name") {
      if (!search.lastName.trim()) return;
      const res = await searchByName();
      setLastSearch(res.data || []);
    } else {
      if (!search.email.trim()) return;
      const res = await searchByEmail();
      setLastSearch(res.data || []);
    }

    setGuestModalOpen(true);
  };

  const onSelectRateHandler = (ratePlan: string, roomType: string) => {
    setSelectedRate({ ratePlan, roomType });
  };

  const queryClient = useQueryClient();

  const {
    mutate: bookReservation,
    error: reservationError,
    data: reservationData,
  } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/reservations", {
        guest: guest?._id,
        property: user?.propertyId,
        ratePlan: selectedRate.ratePlan,
        roomType: selectedRate.roomType,
        checkIn,
        checkOut,
        adults,
        children,
        source: "website",
      });

      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });
      navigate("/dashboard");
    },
  });

  return (
    <div className="min-h-full bg-gray-100 p-4">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-gray-800">New Reservation</h1>
        <p className="text-sm text-gray-500">
          Search availability and create a reservation
        </p>
      </div>
      {reservationError && (
        <p className="text-red-500 text-sm">
          {reservationError?.response?.data?.error}
        </p>
      )}
      {/* Search / Stay Details */}
      <div className="rounded-md border border-gray-300 bg-white">
        <div className="border-b border-gray-300 bg-gray-50 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-700">Stay Details</h2>
        </div>

        <div className="flex flex-wrap items-end gap-4 p-4">
          {/* Check In */}
          <div>
            <label
              htmlFor="check-in"
              className="mb-1 block text-xs font-medium text-gray-600"
            >
              Check-in
            </label>

            <input
              type="date"
              id="check-in"
              value={checkIn}
              onChange={(e) => setCheckin(e.target.value)}
              className="h-9 rounded border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Check Out */}
          <div>
            <label
              htmlFor="check-out"
              className="mb-1 block text-xs font-medium text-gray-600"
            >
              Check-out
            </label>

            <input
              type="date"
              id="check-out"
              value={checkOut}
              onChange={(e) => setCheckout(e.target.value)}
              className="h-9 rounded border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Adults */}
          <div>
            <label
              htmlFor="adults"
              className="mb-1 block text-xs font-medium text-gray-600"
            >
              Adults
            </label>

            <input
              type="number"
              min={1}
              id="adults"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="h-9 w-20 rounded border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Children */}
          <div>
            <label
              htmlFor="children"
              className="mb-1 block text-xs font-medium text-gray-600"
            >
              Children
            </label>

            <input
              type="number"
              min={0}
              id="children"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="h-9 w-20 rounded border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Search */}
          <button
            type="button"
            onClick={() => fetchAvailability()}
            disabled={isPending}
            className="h-9 rounded bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Searching..." : "Search Availability"}
          </button>
        </div>

        {availabilityError && (
          <div className="border-t border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
            {availabilityError?.response?.data?.error}
          </div>
        )}
      </div>

      {/* Availability */}
      {availability.length > 0 && (
        <div className="mt-4 rounded-md border border-gray-300 bg-white">
          <div className="border-b border-gray-300 bg-gray-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-700">
                  Availability
                </h2>

                <p className="text-xs text-gray-500">
                  Select a rate and room type
                </p>
              </div>

              {selectedRate.ratePlan && selectedRate.roomType && (
                <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                  Rate Selected
                </span>
              )}
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {availability.map((ratePlan: RatePlan) => (
              <div key={ratePlan._id}>
                {/* Rate Plan */}
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {ratePlan.name}
                  </span>

                  <span className="text-xs text-gray-500">{ratePlan.code}</span>
                </div>

                {/* Room Types */}
                <div className="grid grid-cols-2 border-t border-gray-200 md:grid-cols-4 lg:grid-cols-6">
                  {ratePlan.roomTypes.map((roomType) => {
                    const selected =
                      selectedRate.ratePlan === ratePlan._id &&
                      selectedRate.roomType === roomType.roomType._id;

                    return (
                      <button
                        type="button"
                        key={roomType._id}
                        onClick={() =>
                          onSelectRateHandler(
                            ratePlan._id,
                            roomType.roomType._id,
                          )
                        }
                        className={`min-h-[115px] border-r border-b border-gray-200 p-3 text-left transition ${
                          selected
                            ? "bg-blue-50 ring-2 ring-inset ring-blue-500"
                            : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {roomType.roomType.name}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-500">
                              {roomType.roomType.code}
                            </p>
                          </div>

                          {selected && (
                            <span className="text-xs font-bold text-blue-600">
                              ✓
                            </span>
                          )}
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-semibold text-gray-800">
                            ₹{roomType.pricePerNight}
                          </p>

                          <p className="mt-0.5 text-xs text-green-600">
                            Available
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guest Section */}
      {selectedRate.ratePlan && selectedRate.roomType && (
        <div className="mt-4 rounded-md border border-gray-300 bg-white">
          <div className="border-b border-gray-300 bg-gray-50 px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-700">Guest</h2>

            <p className="text-xs text-gray-500">
              Search for an existing guest
            </p>
          </div>

          <div className="p-4">
            <div className="flex flex-wrap gap-3">
              {/* Last Name */}
              <div className="flex">
                <input
                  type="text"
                  placeholder="Guest last name"
                  value={search.lastName}
                  onChange={(e) =>
                    setSearch((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  className="h-9 w-52 rounded-l border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() => openGuestSearch("name")}
                  className="h-9 rounded-r border border-l-0 border-gray-300 bg-gray-50 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Search
                </button>
              </div>

              {/* Email */}
              <div className="flex">
                <input
                  type="email"
                  placeholder="Guest email"
                  value={search.email}
                  onChange={(e) =>
                    setSearch((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="h-9 w-60 rounded-l border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() => openGuestSearch("email")}
                  className="h-9 rounded-r border border-l-0 border-gray-300 bg-gray-50 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Selected Guest */}
            {guest?._id && (
              <div className="mt-4 border border-blue-200 bg-blue-50 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {guest.firstName} {guest.lastName}
                    </p>

                    <div className="mt-1 flex flex-wrap gap-4 text-xs text-gray-600">
                      <span>{guest.email}</span>
                      <span>ID: {guest.idNumber}</span>
                      <span>{guest.membershipType}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setGuest(null)}
                    className="text-xs font-medium text-blue-600 hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Guest Search Modal */}
      {guestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-md bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-800">
                  Select Guest
                </h2>

                <p className="text-xs text-gray-500">
                  Select a guest for this reservation
                </p>
              </div>

              <button
                type="button"
                onClick={() => setGuestModalOpen(false)}
                className="text-lg text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[450px] overflow-y-auto p-4">
              {lastSearch?.length > 0 ? (
                <div className="divide-y divide-gray-200 rounded border border-gray-200">
                  {lastSearch.map((g: Guest) => (
                    <div
                      key={g._id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {g.firstName} {g.lastName}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {g.email}
                        </p>

                        <div className="mt-1 flex gap-4 text-xs text-gray-400">
                          <span>ID: {g.idNumber}</span>

                          <span>{g.membershipType}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setGuest(g);
                          setGuestModalOpen(false);
                        }}
                        className="rounded border border-blue-600 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm font-medium text-gray-600">
                    No guests found
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Try searching with a different name or email
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-gray-200 px-5 py-3">
              <button
                type="button"
                onClick={() => setGuestModalOpen(false)}
                className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Footer */}
      {guest?._id && selectedRate.ratePlan && selectedRate.roomType && (
        <div className="sticky bottom-0 mt-4 flex items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-3 shadow-sm">
          <div>
            <p className="text-xs text-gray-500">Reservation for</p>

            <p className="text-sm font-semibold text-gray-800">
              {guest.firstName} {guest.lastName}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              bookReservation();
            }}
            className="rounded bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Book Reservation
          </button>
        </div>
      )}
    </div>
  );
}

export default NewReservation;
