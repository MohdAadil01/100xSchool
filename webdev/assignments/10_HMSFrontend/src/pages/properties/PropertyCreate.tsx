import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PropertyData {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  currency: string;
  timezone: string;
}
function PropertyCreate() {
  const [propertyData, setPropertyData] = useState<PropertyData>({
    name: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    currency: "",
    timezone: "",
  });

  const navigate = useNavigate();

  const {
    mutate: createPropertyHandler,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/properties", propertyData);
      return response.data.data;
    },
    onSuccess: (data) => {
      const { name, address, city, country, phone, email, currency, timezone } =
        data;
      setPropertyData({
        name,
        address,
        city,
        country,
        phone,
        email,
        currency,
        timezone,
      });
      console.log("Property Created...");
      navigate("/properties");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const onChangeInputHandler = (e: any) => {
    setPropertyData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Create Property
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter the details to create a new property.
          </p>
        </div>

        <form className="rounded-lg border border-gray-200 bg-white shadow-sm">
          {/* Basic Information */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Basic Information
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Basic details about the property.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* Property Name */}
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Property Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter property name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                value={propertyData.name}
                onChange={onChangeInputHandler}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Property Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="property@example.com"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                value={propertyData.email}
                onChange={onChangeInputHandler}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                value={propertyData.phone}
                onChange={onChangeInputHandler}
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter street address"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                value={propertyData.address}
                onChange={onChangeInputHandler}
              />
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter city"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                value={propertyData.city}
                onChange={onChangeInputHandler}
              />
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter country"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                value={propertyData.country}
                onChange={onChangeInputHandler}
              />
            </div>
          </div>

          {/* Property Settings */}
          <div className="border-y border-gray-200 px-6 py-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Property Settings
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Configure currency, timezone and operating times.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* Currency */}
            <div>
              <label
                htmlFor="currency"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                value={propertyData.currency}
                onChange={onChangeInputHandler}
              >
                <option value="">Select Currency</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="AED">AED - Dubai</option>
                <option value="SDG">SDG - Singapore</option>
              </select>
            </div>

            {/* Timezone */}
            <div>
              <label
                htmlFor="timezone"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Timezone
              </label>
              <select
                id="timezone"
                name="timezone"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                value={propertyData.timezone}
                onChange={onChangeInputHandler}
              >
                <option value="">Select Timezone</option>
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="America/New_York">America/New_York (EST)</option>
              </select>
            </div>
          </div>
          {error && <p>{(error as any).response?.data?.error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
              onClick={() => createPropertyHandler()}
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropertyCreate;
