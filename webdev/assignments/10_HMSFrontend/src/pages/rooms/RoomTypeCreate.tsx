import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { api } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface RoomType {
  code: string;
  name: string;
  description: string;
  bedType: "king" | "queen" | "double" | "twin" | "single";
  maxOccupancy: number;
}
const availableFeatures = [
  {
    value: "wifi",
    label: "WiFi",
    description: "Complimentary wireless internet",
  },
  {
    value: "air_conditioning",
    label: "Air Conditioning",
    description: "Individually controlled AC",
  },
  {
    value: "tv",
    label: "Television",
    description: "Smart or cable television",
  },
  {
    value: "mini_bar",
    label: "Mini Bar",
    description: "In-room minibar",
  },
  {
    value: "room_service",
    label: "Room Service",
    description: "In-room dining and service",
  },
  {
    value: "balcony",
    label: "Balcony",
    description: "Private room balcony",
  },
  {
    value: "bathtub",
    label: "Bathtub",
    description: "Private bathtub",
  },
  {
    value: "parking",
    label: "Parking",
    description: "Complimentary parking",
  },
];

function RoomTypeCreate() {
  const [formData, setFormData] = useState<RoomType>({
    code: "",
    name: "",
    description: "",
    bedType: "king",
    maxOccupancy: 2,
  });
  const [showFeatures, setShowFeatures] = useState(false);

  const [features, setFeatures] = useState<string[]>([]);

  const { user, activePropertyId } = useAuth();
  const navigate = useNavigate();

  const toggleFeatures = (feature: string) => {
    setFeatures((prev) => {
      if (prev.includes(feature)) {
        return prev.filter((f) => f !== feature);
      }

      return [...prev, feature];
    });
  };

  const removeFeature = (feature: string) => {
    setFeatures((prev) => prev.filter((f) => f !== feature));
  };

  const {
    mutate: createRoomType,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/room-types", {
        ...formData,
        property:
          user?.role === "superadmin" ? activePropertyId : user?.propertyId,
        features,
      });
      return response.data.data;
    },
    onSuccess: (data) => {
      console.log("Room Type created.");
      console.log(data);
      navigate("/room-types");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const value =
      e.target.name === "maxOccupancy"
        ? Number(e.target.value)
        : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const createRoomTypeHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createRoomType();
  };

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Create Room Type
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add the details and features for a new room type.
          </p>
        </div>

        {/* Form */}
        <form
          className="rounded-lg border border-gray-200 bg-white shadow-sm"
          onSubmit={createRoomTypeHandler}
        >
          {/* Basic Information Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Basic Information
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Define the basic details of the room type.
            </p>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* Code */}
            <div>
              <label
                htmlFor="code"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Room Type Code
              </label>

              <input
                type="text"
                id="code"
                name="code"
                value={formData?.code}
                onChange={onChangeHandler}
                placeholder="e.g. DLXK"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm uppercase outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <p className="mt-1 text-xs text-gray-400">
                Short unique code for the room type.
              </p>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Room Type Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={formData?.name}
                onChange={onChangeHandler}
                placeholder="e.g. Deluxe King Room"
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
                value={formData?.description}
                onChange={onChangeHandler}
                rows={3}
                placeholder="Describe the room type..."
                required
                className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Bed Type */}
            <div>
              <label
                htmlFor="bedType"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Bed Type
              </label>

              <select
                id="bedType"
                name="bedType"
                value={formData?.bedType}
                onChange={onChangeHandler}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Bed Type</option>
                <option value="king">King</option>
                <option value="queen">Queen</option>
                <option value="double">Double</option>
                <option value="twin">Twin</option>
                <option value="single">Single</option>
              </select>
            </div>

            {/* Maximum Occupancy */}
            <div>
              <label
                htmlFor="maxOccupancy"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Maximum Occupancy
              </label>

              <input
                type="number"
                id="maxOccupancy"
                name="maxOccupancy"
                value={formData?.maxOccupancy}
                onChange={onChangeHandler}
                min="1"
                placeholder="e.g. 2"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Features Header */}
          <div className="border-y border-gray-200 px-6 py-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Room Features
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Select the features and amenities available in this room type.
            </p>
          </div>

          {/* Feature Selector */}
          <div className="p-6">
            <button
              type="button"
              onClick={() => setShowFeatures(true)}
              className="min-h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-left transition hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {features.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {features.map((feature) => {
                    const selectedFeature = availableFeatures.find(
                      (item) => item.value === feature,
                    );

                    return (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                      >
                        {selectedFeature?.label}

                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFeature(feature);
                          }}
                          className="cursor-pointer rounded-full px-1 text-blue-500 hover:bg-blue-100 hover:text-blue-700"
                        >
                          ×
                        </span>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <span className="text-sm text-gray-400">
                  Select room features...
                </span>
              )}
            </button>

            {features.length > 0 && (
              <p className="mt-2 text-xs text-gray-400">
                {features.length} feature
                {features.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          {error && <p>{(error as any)?.response?.data?.error}</p>}
          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={() => navigate("/room-types")}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {isPending ? "Creating..." : "Create Room Type"}
            </button>
          </div>
        </form>
      </div>

      {/* Feature Modal */}
      {showFeatures && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="font-semibold text-gray-800">
                  Select Room Features
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Select all features available for this room type.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowFeatures(false)}
                className="rounded-md px-2 py-1 text-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            {/* Features */}
            <div className="max-h-100 overflow-y-auto p-4">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {availableFeatures.map((availableFeature) => {
                  const isAlreadySelected = features.includes(
                    availableFeature.value,
                  );

                  return (
                    <button
                      type="button"
                      key={availableFeature.value}
                      onClick={() => toggleFeatures(availableFeature.value)}
                      className={`rounded-md border p-3 text-left transition ${
                        isAlreadySelected
                          ? "border-blue-300 bg-blue-50"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Selection indicator */}
                        <div
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                            isAlreadySelected
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isAlreadySelected && (
                            <span className="text-xs">✓</span>
                          )}
                        </div>

                        {/* Feature information */}
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              isAlreadySelected
                                ? "text-blue-700"
                                : "text-gray-700"
                            }`}
                          >
                            {availableFeature.label}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            {availableFeature.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-5 py-4">
              <p className="text-sm text-gray-500">
                {features.length} selected
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowFeatures(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => setShowFeatures(false)}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomTypeCreate;
