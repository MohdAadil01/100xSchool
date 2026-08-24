import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";

interface RatePlan {
  code: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface RoomType {
  _id: string;
  code: string;
  name: string;
  description: string;
  bedType: string;
  maxOccupancy: number;
  features: string[];
}

interface SelectedRoomType {
  roomType: RoomType;
  pricePerNight: number;
}

function RatePlanCreate() {
  const [formData, setFormData] = useState<RatePlan>({
    code: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [showRoomTypes, setShowRoomTypes] = useState(false);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<
    SelectedRoomType[]
  >([]);

  const { user, activePropertyId } = useAuth();
  const propertyId =
    user?.role === "superadmin" ? activePropertyId : user?.propertyId;

  const navigate = useNavigate();

  const {
    data: fetchedRoomTypes = [],
    isLoading,
    isError,
    error: roomTypeError,
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
    mutate: createRatePlan,
    isError: isRatePlanCreateError,
    error: ratePlanError,
    isPending: createRatePlanPending,
  } = useMutation({
    mutationFn: async () => {
      const roomTypes = selectedRoomTypes.map((r) => ({
        roomType: r.roomType._id,
        pricePerNight: r.pricePerNight,
      }));
      const response = await api.post("/rate-plans", {
        code: formData.code,
        name: formData.name,
        description: formData.description,
        property: propertyId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        roomTypes,
      });

      return response.data.data;
    },
    onSuccess: (data) => {
      console.log("Rate Plan created.");
      navigate("/rate-plans");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const toggleRoomTypeSelect = (roomT: RoomType) => {
    setSelectedRoomTypes((prev) => {
      const alreadySelected = prev.some((p) => p.roomType._id === roomT._id);

      if (alreadySelected) {
        return prev.filter((p) => p.roomType._id !== roomT._id);
      }

      return [...prev, { roomType: roomT, pricePerNight: 0 }];
    });
  };

  const onChangePriceInputHandler = (roomTypeId: string, price: number) => {
    setSelectedRoomTypes((prev) =>
      prev.map((item) =>
        item.roomType._id === roomTypeId
          ? { ...item, pricePerNight: price }
          : item,
      ),
    );
  };

  const onChangeInputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const createRatePlanHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!propertyId) return;
    if (selectedRoomTypes.length === 0) return;

    const invalidPrice = selectedRoomTypes.some(
      (room) => room.pricePerNight <= 0,
    );
    if (invalidPrice) return;

    createRatePlan();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isError && <p>{(roomTypeError as any)?.response?.data?.error}</p>}
      <form onSubmit={createRatePlanHandler}>
        <input
          type="text"
          name="code"
          placeholder="Enter code"
          value={formData.code}
          onChange={onChangeInputHandler}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={onChangeInputHandler}
          required
        />
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={onChangeInputHandler}
          rows={3}
          required
        />
        <input
          type="date"
          name="startDate"
          placeholder="Enter start Date"
          value={formData.startDate}
          onChange={onChangeInputHandler}
          required
        />
        <input
          type="date"
          name="endDate"
          placeholder="Enter end Date"
          value={formData.endDate}
          onChange={onChangeInputHandler}
          required
        />

        <div>
          <button type="button" onClick={() => setShowRoomTypes(true)}>
            {selectedRoomTypes.length > 0 ? (
              <div>
                {selectedRoomTypes.map((selectedRoomType) => (
                  <div>
                    <p>
                      {selectedRoomType.roomType.name} -{" "}
                      {selectedRoomType.pricePerNight}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              "Enter room Type"
            )}
          </button>

          {showRoomTypes && (
            <div>
              <div>
                {fetchedRoomTypes.map((roomT: RoomType) => {
                  const isSelectedRoom = selectedRoomTypes.some(
                    (r) => r.roomType._id === roomT._id,
                  );
                  const selectedRoom = selectedRoomTypes.find(
                    (r) => r.roomType._id === roomT._id,
                  );
                  return (
                    <div key={roomT._id}>
                      <button
                        type="button"
                        onClick={() => toggleRoomTypeSelect(roomT)}
                      >
                        <span>{isSelectedRoom ? "Tick" : "Not Tick"}</span>
                        <div>
                          <p>
                            {roomT.code} - {roomT.name}
                          </p>
                          <p>{roomT.bedType}</p>
                          <p>{roomT.maxOccupancy}</p>
                          <p>{JSON.stringify(roomT.features)}</p>
                        </div>
                      </button>

                      {selectedRoom && (
                        <input
                          type="number"
                          required
                          placeholder="Enter Price per Night"
                          value={selectedRoom?.pricePerNight}
                          onChange={(e) =>
                            onChangePriceInputHandler(
                              selectedRoom.roomType._id,
                              Number(e.target.value),
                            )
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div>
                <button type="button" onClick={() => setShowRoomTypes(false)}>
                  Cancel
                </button>
                <button type="button" onClick={() => setShowRoomTypes(false)}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          {isRatePlanCreateError && (
            <p>{(ratePlanError as any).response.data.error}</p>
          )}
        </div>
        <button type="button" onClick={() => navigate("/rate-plans")}>
          Cancel
        </button>
        <button type="submit">
          {createRatePlanPending ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}

export default RatePlanCreate;
