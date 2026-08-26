import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  property?: string;
}
export const Register = () => {
  const [data, setData] = useState<RegisterUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(data);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Register</h1>
      <div>
        {error && <p>{error}</p>}
        <form className="space-y-4" onSubmit={onSubmitHandler}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block mb-1 text-sm">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                id="firstName"
                className="w-full border rounded-md px-3 py-2"
                value={data.firstName}
                onChange={handleChange}
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block mb-1 text-sm">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                id="lastName"
                className="w-full border rounded-md px-3 py-2"
                value={data.lastName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-sm">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                id="email"
                className="w-full border rounded-md px-3 py-2"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-1 text-sm">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                id="password"
                className="w-full border rounded-md px-3 py-2"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-1 text-sm">
                Phone
              </label>
              <input
                type="tel"
                placeholder="Enter phone number"
                id="phone"
                className="w-full border rounded-md px-3 py-2"
                value={data.phone}
                onChange={handleChange}
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block mb-1 text-sm">
                Role
              </label>
              <select
                id="role"
                value={data.role}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Select role</option>
                <option value="superadmin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="frontdesk">Front Desk</option>
                <option value="housekeeping">Housekeeping</option>
              </select>
            </div>

            {data.role && data.role != "superadmin" && (
              <div>
                <label htmlFor="property" className="block mb-1 text-sm">
                  Property ID
                </label>
                <input
                  type="text"
                  placeholder="Enter property ID"
                  id="property"
                  className="w-full border rounded-md px-3 py-2"
                  value={data.property || ""}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
