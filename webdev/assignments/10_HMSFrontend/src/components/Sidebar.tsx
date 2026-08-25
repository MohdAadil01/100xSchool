import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const frontDeskItems: NavItem[] = [
    {
      label: "Reservations",
      path: "/reservations",
      icon: "▣",
    },
    {
      label: "New Reservation",
      path: "/reservations/new",
      icon: "+",
    },
    {
      label: "Guests",
      path: "/guests",
      icon: "♙",
    },
  ];

  const adminItems: NavItem[] = [
    {
      label: "Rooms",
      path: "/rooms",
      icon: "▤",
    },
    {
      label: "Room Types",
      path: "/room-types",
      icon: "▥",
    },
    {
      label: "Rate Plans",
      path: "/rate-plans",
      icon: "◇",
    },
    {
      label: "Reports",
      path: "/reports",
      icon: "▥",
    },
  ];

  const superAdminItems: NavItem[] = [
    {
      label: "Properties",
      path: "/properties",
      icon: "⌂",
    },
    {
      label: "Staff Registration",
      path: "/staff-registration",
      icon: "♙",
    },
  ];

  const dashboardItem: NavItem = {
    label: "Dashboard",
    path: "/dashboard",
    icon: "⌂",
  };

  const renderNavItem = (item: NavItem) => {
    const isActive =
      location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`);

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
          isActive
            ? "bg-blue-50 font-medium text-blue-700"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        <span
          className={`flex h-5 w-5 items-center justify-center text-sm ${
            isActive ? "text-blue-600" : "text-gray-400"
          }`}
        >
          {item.icon}
        </span>

        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-5">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-gray-900">
            Hotel PMS
          </h1>

          <p className="text-[11px] text-gray-400">
            Property Management System
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-5">
        {/* Front Desk */}
        {user?.role === "frontdesk" && (
          <div className="mb-6">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Front Desk
            </p>

            <nav className="space-y-1">
              {renderNavItem(dashboardItem)}

              {frontDeskItems.map(renderNavItem)}
            </nav>
          </div>
        )}

        {/* Admin */}
        {user?.role === "admin" && (
          <>
            <div className="mb-6">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Operations
              </p>

              <nav className="space-y-1">
                {renderNavItem(dashboardItem)}

                {frontDeskItems.map(renderNavItem)}
                {adminItems
                  .filter((item) => item.label === "Rooms")
                  .map(renderNavItem)}
              </nav>
            </div>

            <div className="mb-6">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Management
              </p>

              <nav className="space-y-1">
                {adminItems
                  .filter((item) => item.label !== "Rooms")
                  .map(renderNavItem)}
              </nav>
            </div>
          </>
        )}

        {/* Super Admin */}

        {user?.role === "superadmin" && (
          <>
            <div className="mb-6">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Operations
              </p>
              <nav className="space-y-1">
                {renderNavItem(dashboardItem)}
                {frontDeskItems.map(renderNavItem)}
                {adminItems
                  .filter((i) => i.label === "Rooms")
                  .map(renderNavItem)}
              </nav>
            </div>
            <div className="mb-6">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Management
              </p>
              <nav className="space-y-1">
                {adminItems
                  .filter((i) => i.label !== "Rooms")
                  .map(renderNavItem)}
              </nav>
            </div>
            <div className="mb-6">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Administration
              </p>
              <nav className="space-y-1">
                {superAdminItems.map(renderNavItem)}
              </nav>
            </div>
          </>
        )}

        {user?.role === "housekeeping" && (
          <div className="mb-6">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Housekeeping
            </p>
            <nav className="space-y-1">
              {renderNavItem(dashboardItem)}
              {renderNavItem({ label: "Rooms", path: "/rooms", icon: "▤" })}
            </nav>
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 px-4 py-3">
        <p className="text-center text-[11px] text-gray-400">Hotel PMS v1.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;
