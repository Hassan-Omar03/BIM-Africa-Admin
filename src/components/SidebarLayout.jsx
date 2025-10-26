import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function SidebarLayout() {
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
      localStorage.removeItem("BIMAdminToken");
      localStorage.removeItem("BIMAdmin");
      setPopup(false);
      navigate("/login");
  }

  const navItems = [
    { to: "/", label: "Dashboard", exact: true },
    { to: "/blogs", label: "Blogs" },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium
     ${
       isActive
         ? "bg-blue-600 text-white shadow"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  return (
    <div className="flex h-screen bg-gray-50">
        {popup && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-50" >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" >
                    <div className="bg-white p-6 rounded-md shadow-md" >
                        <p className="text-gray-700" >Are you sure you want to logout?</p>
                        <div className="flex justify-end mt-4" >
                            <button onClick={() => setPopup(false)} className="mr-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300" >Cancel</button>
                            <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" >Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <button
          onClick={() => setOpen((s) => !s)}
          className="p-2 bg-white shadow rounded-md focus:outline-none"
          aria-label="Toggle menu"
        >
          {/* simple hamburger */}
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M3 6h14M3 10h14M3 14h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          bg-white border-r border-gray-200 w-64 p-6 space-y-6
          md:static md:translate-x-0 flex flex-col justify-between transform transition-transform
          ${
            open
              ? "translate-x-0 fixed z-30 inset-y-0 left-0"
              : "translate-x-[-110%] md:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col gap-6" >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              BA
            </div>
            <div>
              <div className="text-lg font-semibold">BIM Africa</div>
              <div className="text-xs text-gray-500">Admin Panel</div>
            </div>
          </div>
          <div>
            <nav className="flex flex-col mt-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={linkClass}
                  onClick={() => setOpen(false)} // close on mobile after click
                >
                  {/* icon placeholder */}
                  <span className="w-5 h-5 flex items-center justify-center text-sm">
                    {item.label === "Dashboard" ? (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M21 15V6a2 2 0 0 0-2-2H7L3 6v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 10h10"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* optional footer / small text */}
        <div>
            <div>
              {/* logout button same as others */}
              <button
                className="flex items-center gap-3 w-full flex justify-center py-2 rounded-md transition-all text-sm font-medium text-gray-700 hover:bg-gray-200"
                onClick={() => setPopup(true)}
              >
                {/* icon placeholder */}
                <span className="w-5 h-5 flex items-center justify-center text-sm">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Logout</span>
              </button>
            </div>
          <div className="mt-auto text-xs text-gray-400">
            © {new Date().getFullYear()} BIM Africa
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Top header */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">BIM Africa</h1>
              <p className="text-sm text-gray-500">
                Welcome to the admin dashboard
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* simple profile block */}
              <div className="text-right">
                <div className="text-sm font-medium text-gray-800">Admin</div>
                <div className="text-xs text-gray-500">administrator</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content area where pages render */}
        <section className="max-w-7xl  px-6 py-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
