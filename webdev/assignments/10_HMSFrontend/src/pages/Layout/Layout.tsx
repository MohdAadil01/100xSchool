import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

function Layout() {
  const { user, activePropertyId, setActivePropertyId } = useAuth();

  if (user?.role === "superadmin" && !activePropertyId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow">
          <h2 className="font-semibold mb-4">Select Property to Manage</h2>
          <input
            type="text"
            placeholder="Enter Property ID"
            className="border rounded px-3 py-2 text-sm w-80 mb-3 block"
            id="propInput"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
            onClick={() => {
              const input = document.getElementById(
                "propInput",
              ) as HTMLInputElement;
              setActivePropertyId(input.value);
            }}
          >
            Continue
          </button>
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
