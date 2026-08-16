import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface GuestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  idType: string;
  idNumber: string;
  dateOfBirth: string;
  membershipType: string;
}
export default function GuestCreate() {
  const [guestData, setGuestData] = useState<GuestData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    idType: "",
    idNumber: "",
    dateOfBirth: "",
    membershipType: "",
  });

  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setGuestData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const { user, activePropertyId } = useAuth();

  const propertyId =
    user?.role === "superadmin" ? activePropertyId : user?.propertyId;

  const {
    mutate: createGuestHandler,
    error: guestCreateError,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/guests", {
        ...guestData,
        property: propertyId,
      });
      console.log(response.data.data);
    },
    onSuccess: () => {
      navigate("/guests");
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error);
    },
  });

  const onSubmitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!propertyId) return;

    createGuestHandler();
  };

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Create Guest Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add the guest's personal, contact, and identification details.
          </p>
        </div>

        {/* Error */}
        {guestCreateError && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {(guestCreateError as any).response?.data?.error ||
              "Unable to create guest."}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={onSubmitFormHandler}
          className="rounded-lg border border-gray-200 bg-white shadow-sm"
        >
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Guest Information
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                First Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                onChange={onChangeHandler}
                value={guestData.firstName}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Last Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                onChange={onChangeHandler}
                value={guestData.lastName}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                onChange={onChangeHandler}
                value={guestData.email}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Phone <span className="text-red-500">*</span>
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                onChange={onChangeHandler}
                value={guestData.phone}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Nationality */}
            <div>
              <label
                htmlFor="nationality"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Nationality <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                id="nationality"
                name="nationality"
                placeholder="Enter nationality"
                onChange={onChangeHandler}
                value={guestData.nationality}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dateOfBirth"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Date of Birth <span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                onChange={onChangeHandler}
                value={guestData.dateOfBirth}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* ID Type */}
            <div>
              <label
                htmlFor="idType"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                ID Type <span className="text-red-500">*</span>
              </label>

              <select
                id="idType"
                name="idType"
                value={guestData.idType}
                onChange={onChangeHandler}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select ID Type</option>
                <option value="passport">Passport</option>
                <option value="national_id">National ID</option>
                <option value="driving_license">Driving License</option>
              </select>
            </div>

            {/* ID Number */}
            <div>
              <label
                htmlFor="idNumber"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                ID Number <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                id="idNumber"
                name="idNumber"
                placeholder="Enter ID number"
                onChange={onChangeHandler}
                value={guestData.idNumber}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm uppercase outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Membership */}
            <div>
              <label
                htmlFor="membershipType"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Membership
              </label>

              <select
                id="membershipType"
                name="membershipType"
                value={guestData.membershipType}
                onChange={onChangeHandler}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Membership</option>
                <option value="none">None</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={() => navigate("/guests")}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending || !propertyId}
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Creating..." : "Create Guest"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
