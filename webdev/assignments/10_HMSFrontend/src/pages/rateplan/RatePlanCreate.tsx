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
  const [validationError, setValidationError] = useState("");

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

    onSuccess: () => {
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

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const createRatePlanHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidationError("");

    if (!propertyId) return;
    if (selectedRoomTypes.length === 0) {
      setValidationError("Please select at least one room type");
      return;
    }
    const invalidPrice = selectedRoomTypes.some((r) => r.pricePerNight <= 0);
    if (invalidPrice) {
      setValidationError(
        "Please enter a valid price for all selected room types",
      );
      return;
    }

    createRatePlan();
  };

  if (isLoading)
    return (
      <div className="flex min-h-full items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-500">Loading room types...</div>
      </div>
    );

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Create Rate Plan
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create a rate plan and assign pricing to available room types.
          </p>
        </div>

        {/* Room Type Error */}
        {isError && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {(roomTypeError as any)?.response?.data?.error ||
              "Unable to load room types."}
          </div>
        )}

        <form
          onSubmit={createRatePlanHandler}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
        >
          {/* Basic Information */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Basic Information
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Enter the basic information for this rate plan.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* Code */}
            <div>
              <label
                htmlFor="code"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Rate Plan Code
              </label>

              <input
                type="text"
                id="code"
                name="code"
                placeholder="e.g. INKPCM"
                value={formData.code}
                onChange={onChangeInputHandler}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm uppercase outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <p className="mt-1 text-xs text-gray-400">
                A short unique code for this rate plan.
              </p>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Rate Plan Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Corporate King Rate"
                value={formData.name}
                onChange={onChangeInputHandler}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Describe this rate plan..."
                value={formData.description}
                onChange={onChangeInputHandler}
                rows={3}
                required
                className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Start Date */}
            <div>
              <label
                htmlFor="startDate"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>

              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={onChangeInputHandler}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="endDate"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                End Date
              </label>

              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={onChangeInputHandler}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Room Types Header */}
          <div className="border-y border-gray-200 px-6 py-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Room Type Pricing
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Select the room types included in this rate plan and define their
              nightly prices.
            </p>
          </div>

          {/* Room Type Selection */}
          <div className="p-6">
            <button
              type="button"
              onClick={() => setShowRoomTypes(true)}
              className="min-h-12 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-left transition hover:border-blue-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedRoomTypes.length > 0 ? (
                <div className="space-y-2">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Selected Room Types
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {selectedRoomTypes.map((selectedRoomType) => (
                      <span
                        key={selectedRoomType.roomType._id}
                        className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
                      >
                        {selectedRoomType.roomType.name} — ₹
                        {selectedRoomType.pricePerNight}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Select Room Types
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Click here to select rooms and add pricing.
                  </p>
                </div>
              )}
            </button>

            {/* Room Type Modal */}
            {showRoomTypes && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        Select Room Types
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Select rooms and enter their price per night.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowRoomTypes(false)}
                      className="rounded-md px-2 py-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Room Type List */}
                  <div className="flex-1 space-y-3 overflow-y-auto p-6">
                    {fetchedRoomTypes.map((roomT: RoomType) => {
                      const isSelectedRoom = selectedRoomTypes.some(
                        (r) => r.roomType._id === roomT._id,
                      );

                      const selectedRoom = selectedRoomTypes.find(
                        (r) => r.roomType._id === roomT._id,
                      );

                      return (
                        <div
                          key={roomT._id}
                          className={`rounded-lg border p-4 transition ${
                            isSelectedRoom
                              ? "border-blue-400 bg-blue-50/50"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleRoomTypeSelect(roomT)}
                            className="flex w-full items-start gap-3 text-left"
                          >
                            {/* Selection Indicator */}
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs font-bold ${
                                isSelectedRoom
                                  ? "border-blue-600 bg-blue-600 text-white"
                                  : "border-gray-300 bg-white text-transparent"
                              }`}
                            >
                              ✓
                            </span>

                            {/* Room Information */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-sm font-semibold text-gray-800">
                                  {roomT.code} — {roomT.name}
                                </p>

                                <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
                                  {roomT.bedType}
                                </span>
                              </div>

                              <p className="mt-1 text-xs text-gray-500">
                                Max occupancy: {roomT.maxOccupancy}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                {roomT.features.join(", ")}
                              </p>
                            </div>
                          </button>

                          {/* Price Input */}
                          {selectedRoom && (
                            <div className="mt-4 border-t border-gray-200 pt-4">
                              <label
                                htmlFor={`price-${roomT._id}`}
                                className="mb-1.5 block text-xs font-medium text-gray-700"
                              >
                                Price Per Night
                              </label>

                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                  ₹
                                </span>

                                <input
                                  id={`price-${roomT._id}`}
                                  type="number"
                                  min="1"
                                  required
                                  placeholder="Enter price per night"
                                  value={selectedRoom.pricePerNight}
                                  onChange={(e) =>
                                    onChangePriceInputHandler(
                                      selectedRoom.roomType._id,
                                      Number(e.target.value),
                                    )
                                  }
                                  className="w-full rounded-md border border-gray-300 py-2 pl-8 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {fetchedRoomTypes.length === 0 && (
                      <div className="rounded-md border border-dashed border-gray-300 p-8 text-center">
                        <p className="text-sm text-gray-500">
                          No room types found.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <button
                      type="button"
                      onClick={() => setShowRoomTypes(false)}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowRoomTypes(false)}
                      className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Create Error */}
          {isRatePlanCreateError && (
            <div className="mx-6 mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {(ratePlanError as any)?.response?.data?.error ||
                "Unable to create rate plan."}
            </div>
          )}

          {validationError && (
            <div className="mx-6 mb-4 text-sm text-red-600">
              {validationError}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={() => navigate("/rate-plans")}
              className="rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createRatePlanPending}
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createRatePlanPending ? "Creating..." : "Create Rate Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RatePlanCreate;
