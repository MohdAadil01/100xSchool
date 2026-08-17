import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";

function Layout() {
  const { user, activePropertyId, setActivePropertyId } = useAuth();
  const location = useLocation();

  const noPropertyRequired = ["/properties", "/properties/create", "/register"];

  const needsPropertySelector =
    user?.role === "superadmin" &&
    !activePropertyId &&
    !noPropertyRequired.includes(location.pathname);

  const { data: properties = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await api.get("/properties");
      return response.data.data;
    },
    enabled: user?.role === "superadmin",
  });

  if (needsPropertySelector) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow">
          <h2 className="font-semibold mb-4">Select Property to Manage</h2>
          <select onChange={(e) => setActivePropertyId(e.target.value)}>
            <option value="">Select Property</option>
            {properties.map((p: any) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
