import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Topbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="relative flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <p className="text-sm font-medium text-gray-800">Welcome back</p>

        <p className="text-xs text-gray-400">Manage your property operations</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        >
          <span className="text-lg">♢</span>

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-gray-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-gray-800">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-xs capitalize text-gray-400">{user?.role}</p>
          </div>

          <span className="text-xs text-gray-400">▼</span>
        </button>

        {showMenu && (
          <div className="absolute right-6 top-14 z-50 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            <button
              type="button"
              onClick={() => {
                setShowMenu(false);
                navigate("/profile");
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
            >
              My Profile
            </button>

            <button
              type="button"
              onClick={() => {
                setShowMenu(false);
                navigate("/settings");
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
            >
              Settings
            </button>

            <div className="my-1 border-t border-gray-100" />

            <button
              type="button"
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Topbar;
