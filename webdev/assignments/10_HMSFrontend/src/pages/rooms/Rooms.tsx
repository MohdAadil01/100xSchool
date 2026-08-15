import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useRooms } from "../../hooks/useRooms";
import { useState } from "react";

interface Room {
  _id: string;
  roomNumber: string;
  floor: number;
  status: string;
  roomType: {
    name: string;
  };
}

function Rooms() {
  const [updatingRoomId, setUpdatingRoomId] = useState<string | null>(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: rooms = [],
    isLoading,
    error,
    isError,
  } = useRooms(user?.propertyId!);

  const { mutate: roomStatusHandler } = useMutation({
    mutationFn: async (roomId: string) => {
      setUpdatingRoomId(roomId);
      const response = await api.patch(`/rooms/${roomId}/status`, {
        status: "clean",
      });

      return response.data.data;
    },

    onSuccess: () => {
      setUpdatingRoomId(null);
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
  });

  if (isLoading) {
    return <div className="p-4 text-sm text-gray-500">Loading rooms...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-600">
        {(error as any)?.response?.data?.error}
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-gray-800">Rooms</h1>

        <p className="text-sm text-gray-500">View and manage room status</p>
      </div>

      {/* Status Summary */}
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="rounded border bg-white px-4 py-2">
          <span className="text-xs text-gray-500">Total</span>
          <p className="text-lg font-semibold">{rooms.length}</p>
        </div>

        <div className="rounded border bg-white px-4 py-2">
          <span className="text-xs text-gray-500">Clean</span>
          <p className="text-lg font-semibold text-green-600">
            {rooms.filter((room: Room) => room.status === "clean").length}
          </p>
        </div>

        <div className="rounded border bg-white px-4 py-2">
          <span className="text-xs text-gray-500">Occupied</span>
          <p className="text-lg font-semibold text-red-500">
            {rooms.filter((room: Room) => room.status === "occupied").length}
          </p>
        </div>

        <div className="rounded border bg-white px-4 py-2">
          <span className="text-xs text-gray-500">Dirty</span>
          <p className="text-lg font-semibold text-yellow-600">
            {rooms.filter((room: Room) => room.status === "dirty").length}
          </p>
        </div>

        <div className="rounded border bg-white px-4 py-2">
          <span className="text-xs text-gray-500">Out of Order</span>
          <p className="text-lg font-semibold text-gray-500">
            {rooms.filter((room: Room) => room.status === "outoforder").length}
          </p>
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {rooms.map((room: Room) => (
          <RoomCard
            key={room._id}
            _id={room._id}
            roomNumber={room.roomNumber}
            floor={room.floor}
            status={room.status}
            roomType={room.roomType?.name}
            onStatusChange={roomStatusHandler}
            isUpdating={updatingRoomId === room._id}
          />
        ))}
      </div>
    </div>
  );
}

const RoomCard = ({
  _id,
  roomNumber,
  floor,
  roomType,
  status,
  onStatusChange,
  isUpdating,
}: {
  _id: string;
  roomNumber: string;
  floor: number;
  roomType: string;
  status: string;
  onStatusChange: (roomId: string) => void;
  isUpdating: boolean;
}) => {
  const statusConfig: Record<
    string,
    {
      label: string;
      className: string;
      dot: string;
    }
  > = {
    clean: {
      label: "Clean",
      className: "border-green-200 bg-green-50",
      dot: "bg-green-500",
    },

    occupied: {
      label: "Occupied",
      className: "border-red-200 bg-red-50",
      dot: "bg-red-500",
    },

    dirty: {
      label: "Dirty",
      className: "border-yellow-200 bg-yellow-50",
      dot: "bg-yellow-500",
    },

    outoforder: {
      label: "Out of Order",
      className: "border-gray-300 bg-gray-100",
      dot: "bg-gray-500",
    },
  };

  const currentStatus = statusConfig[status] || {
    label: status,
    className: "border-gray-200 bg-white",
    dot: "bg-gray-400",
  };

  return (
    <div className={`rounded-md border p-3 ${currentStatus.className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-base font-semibold text-gray-800">{roomNumber}</p>

          <p className="text-xs text-gray-500">Floor {floor}</p>
        </div>

        <span
          className={`mt-1 h-2.5 w-2.5 rounded-full ${currentStatus.dot}`}
        />
      </div>

      <div className="mt-3">
        <p className="truncate text-sm font-medium text-gray-700">{roomType}</p>

        <p className="mt-1 text-xs text-gray-600">{currentStatus.label}</p>
      </div>

      {status === "dirty" && (
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => onStatusChange(_id)}
          className="mt-3 w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {isUpdating ? "Updating..." : "Mark Clean"}
        </button>
      )}
    </div>
  );
};

export default Rooms;
