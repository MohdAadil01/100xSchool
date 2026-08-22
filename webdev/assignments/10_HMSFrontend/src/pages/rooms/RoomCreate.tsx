import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function RoomCreate() {
  const [formData, setFormData] = useState({
    roomNumber: "",
    floor: 1,
    roomType: "",
  });
  const { user, activePropertyId } = useAuth();

  const propertyId =
    user?.role === "superadmin" ? activePropertyId : user?.propertyId;

  const navigate = useNavigate();

  const {
    data: roomTypes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["roomTypes", propertyId],
    queryFn: async () => {
      const response = await api.get("/room-types", {
        params: {
          propertyId,
        },
      });

      return response.data.data;
    },
    enabled: !!propertyId,
  });

  const {
    mutate: createRoom,
    isPending,
    isError: isRoomCreationError,
    error: roomCreationError,
  } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/rooms", {
        ...formData,
        property: propertyId,
      });
      return response.data.data;
    },
    onSuccess: (data) => {
      console.log("Room Created");
      console.log(data);
      navigate("/rooms");
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading room types...</p>
      </div>
    );
  }

  const createRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createRoom();
  };

  const onChangeInputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value =
      e.target.name === "floor" ? Number(e.target.value) : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };
  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Create Room</h1>

          <p className="mt-1 text-sm text-gray-500">
            Add a new physical room to the property.
          </p>
        </div>

        {/* Error */}
        {isError && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {(error as any)?.response?.data?.error ||
              "Unable to load room types."}
          </div>
        )}

        {/* Form */}
        <form
          className="rounded-lg border border-gray-200 bg-white shadow-sm"
          onSubmit={createRoomHandler}
        >
          {/* Section Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Room Information
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Enter the basic information for this room.
            </p>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* Room Number */}
            <div>
              <label
                htmlFor="roomNumber"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Room Number
              </label>

              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                placeholder="e.g. 101"
                value={formData.roomNumber}
                onChange={onChangeInputHandler}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <p className="mt-1 text-xs text-gray-400">
                Unique room number within the property.
              </p>
            </div>

            {/* Floor */}
            <div>
              <label
                htmlFor="floor"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Floor
              </label>

              <input
                type="number"
                id="floor"
                name="floor"
                min="0"
                value={formData.floor}
                onChange={onChangeInputHandler}
                placeholder="e.g. 1"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Room Type */}
            <div className="md:col-span-2">
              <label
                htmlFor="roomType"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Room Type
              </label>

              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={onChangeInputHandler}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select room type</option>

                {roomTypes?.map((roomType: any) => (
                  <option value={roomType._id} key={roomType._id}>
                    {roomType.code} - {roomType.name}
                  </option>
                ))}
              </select>

              <p className="mt-1 text-xs text-gray-400">
                Select the room category this room belongs to.
              </p>
            </div>
            {isRoomCreationError && (
              <p>{(roomCreationError as any)?.response?.data?.error}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              onClick={() => navigate("/rooms")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              {isPending ? "Creating..." : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoomCreate;
