import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../api/axios";

interface Guest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  idType: string;
  membershipType: string;
  nationality: string;
}

function Guests() {
  const [search, setSearch] = useState({
    lastName: "",
    email: "",
  });

  const [activeSearch, setActiveSearch] = useState<{
    type: "lastName" | "email";
    value: string;
  } | null>(null);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const {
    data: guests = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["guests", "search", activeSearch],
    queryFn: async () => {
      const response = await api.get("/guests/search", {
        params:
          activeSearch?.type === "lastName"
            ? { lastName: activeSearch?.value }
            : { email: activeSearch?.value },
      });
      return response.data.data;
    },
    enabled: !!activeSearch,
  });

  const searchHandler = async (type: "lastName" | "email") => {
    const value = type === "lastName" ? search.lastName : search.email;
    if (!value.trim()) return;
    setActiveSearch({ type, value });

    setSearch((prev) => ({
      lastName: type === "lastName" ? prev.lastName : "",
      email: type === "email" ? prev.email : "",
    }));
  };

  return (
    <div className="min-h-full bg-gray-100 p-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-gray-800">Guests</h1>
        <p className="text-sm text-gray-500">
          Search and view guest information
        </p>
      </div>

      {/* Search */}
      <div className="rounded-md border border-gray-300 bg-white">
        <div className="border-b bg-gray-50 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-700">Guest Search</h2>
        </div>

        <div className="flex flex-wrap gap-4 p-4">
          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="mb-1 block text-xs font-medium text-gray-600"
            >
              Last Name
            </label>

            <div className="flex">
              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                value={search.lastName}
                onChange={inputChangeHandler}
                name="lastName"
                className="h-9 w-56 rounded-l border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => searchHandler("lastName")}
                className="h-9 rounded-r border border-l-0 border-gray-300 bg-gray-50 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Search
              </button>
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-medium text-gray-600"
            >
              Email
            </label>

            <div className="flex">
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={search.email}
                onChange={inputChangeHandler}
                name="email"
                className="h-9 w-64 rounded-l border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => searchHandler("email")}
                className="h-9 rounded-r border border-l-0 border-gray-300 bg-gray-50 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {isError && (
          <div className="border-t border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
            {error?.response?.data?.error || "Something went wrong"}
          </div>
        )}
      </div>

      {/* Results */}
      {activeSearch && (
        <div className="mt-4 rounded-md border border-gray-300 bg-white">
          <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-700">
                Search Results
              </h2>

              <p className="text-xs text-gray-500">
                {activeSearch.type === "lastName"
                  ? `Last name: ${activeSearch.value}`
                  : `Email: ${activeSearch.value}`}
              </p>
            </div>

            {!isLoading && guests.length > 0 && (
              <span className="text-xs text-gray-500">
                {guests.length} guest{guests.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="px-4 py-8 text-center text-sm text-gray-500">
              Searching guests...
            </div>
          ) : guests.length > 0 ? (
            <div className="divide-y">
              {guests.map((guest: Guest) => (
                <div key={guest._id} className="px-4 py-3 hover:bg-gray-50">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
                    <div>
                      <p className="text-xs text-gray-500">Guest</p>
                      <p className="text-sm font-medium text-gray-800">
                        {guest.firstName} {guest.lastName}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm text-gray-700">{guest.email}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm text-gray-700">{guest.phone}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">ID</p>
                      <p className="text-sm text-gray-700">{guest.idNumber}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">ID Type</p>
                      <p className="text-sm text-gray-700">{guest.idType}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Membership</p>
                      <p className="text-sm font-medium text-gray-700">
                        {guest.membershipType || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-sm text-gray-500">
              No guests found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Guests;
