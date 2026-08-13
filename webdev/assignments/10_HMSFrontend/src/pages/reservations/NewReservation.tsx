import { useState } from "react";
import { api } from "../../api/axios";
import { useMutation } from "@tanstack/react-query";

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
  firstName: string;
  lastName: string;
  email: string;
  idNumber: string;
  membershipType: string;
}

function NewReservation() {
  const today = new Date();
  const eoy = new Date();
  eoy.setDate(today.getDate() + 30);
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const [checkIn, setCheckin] = useState(formatDate(today));
  const [checkOut, setCheckout] = useState(formatDate(eoy));
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);
  const [search, setSearch] = useState({ lastName: "", email: "" });
  const [guest, setGuest] = useState<Guest>({
    firstName: "",
    lastName: "",
    email: "",
    idNumber: "",
    membershipType: "",
  });

  const [guestList, setGuestList] = useState<Guest[]>([]);

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
      });

      return response.data.data;
    },
  });

  const { mutate: searchByName, error: guestError } = useMutation({
    mutationFn: async () => {
      const response = await api.get("/guests/search", {
        params: {
          lastName: search.lastName,
        },
      });
      setGuestList(response.data.data);
    },
  });

  const { mutate: searchByEmail, error: emailError } = useMutation({
    mutationFn: async () => {
      const response = await api.get("/guests/search", {
        params: {
          email: search.email,
        },
      });
      setGuestList(response.data.data);
    },
  });
  const onSelectRateHandler = (ratePlan: string, roomType: string) => {
    console.log(ratePlan, roomType);
  };

  console.log(guest);

  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="check-in" className="mb-1 block text-sm font-medium">
            Check-in
          </label>
          <input
            type="date"
            id="check-in"
            value={checkIn}
            onChange={(e) => setCheckin(e.target.value)}
            className="rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="check-out" className="mb-1 block text-sm font-medium">
            Check-out
          </label>
          <input
            type="date"
            id="check-out"
            value={checkOut}
            onChange={(e) => setCheckout(e.target.value)}
            className="rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="adults" className="mb-1 block text-sm font-medium">
            Adults
          </label>
          <input
            type="number"
            id="adults"
            placeholder="Adults"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="w-28 rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="children" className="mb-1 block text-sm font-medium">
            Child
          </label>
          <input
            type="number"
            id="children"
            placeholder="Child"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="w-28 rounded-md border px-3 py-2"
          />
        </div>

        <button
          type="button"
          className="rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          onClick={() => fetchAvailability()}
        >
          Search
        </button>
      </div>
      <div>
        {availabilityError && <div>{guestError?.response?.data.error}</div>}
      </div>
      <div>{guestError && <div>{guestError?.response?.data.error}</div>}</div>
      <div>{isPending && <div>Loading...</div>}</div>
      <div className="mt-6 space-y-4">
        {availability.map((r: any) => (
          <div key={r._id} className="border rounded-md">
            {/* Rate Plan */}
            <div className="border-b px-4 py-3">
              <p className="font-medium">{r.name}</p>
              <p className="text-sm text-gray-500">{r.code}</p>
            </div>

            {/* Room Types */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {r.roomTypes.map((roomType: any) => (
                <div key={roomType._id} className="border-r border-b p-3">
                  <p className="font-medium">{roomType.roomType.name}</p>

                  <p className="text-xs text-gray-500">
                    {roomType.roomType.code}
                  </p>

                  <p className="mt-2 font-semibold">
                    ₹{roomType.pricePerNight}
                  </p>

                  <p className="text-xs text-green-600">Available</p>
                  <button
                    className="hover: cursor-pointer"
                    onClick={() => onSelectRateHandler(r._id, roomType._id)}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* guest details goes here */}
        <div>
          <input
            type="text"
            placeholder="Enter Guest Last name"
            value={search?.lastName}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
          <button onClick={() => searchByName()}>icon1</button>
          <input
            type="email"
            placeholder="Enter Guest Email"
            value={search?.email}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <button onClick={() => searchByEmail()}>icon2</button>
          <div>
            {guestList.map((g) => (
              <div>
                <p>
                  {g.firstName} {g.lastName}
                </p>
                <p>{g.email}</p>
                <p>{g.idNumber}</p>
                <p>{g.membershipType}</p>
                <button
                  onClick={() =>
                    setGuest({
                      firstName: g.firstName,
                      lastName: g.lastName,
                      email: g.email,
                      idNumber: g.idNumber,
                      membershipType: g.membershipType,
                    })
                  }
                >
                  Select
                </button>
              </div>
            ))}
          </div>
          <p>
            {guest?.firstName} {guest?.lastName}
          </p>
          <p>{guest?.email}</p>
          <p>{guest?.idNumber}</p>
          <p>{guest?.membershipType}</p>
        </div>
      </div>
    </div>
  );
}

export default NewReservation;
