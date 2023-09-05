import React, { useContext } from "react";

import { NavLink, Outlet } from "react-router-dom";

//   import "../App.css";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userID = localStorage.getItem("userID");

  console.log("Estoy conectado con el rol", role);
  console.log("Conectado con id", userID);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userID");
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/home" className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7963/7963920.png"
              className="h-8 mr-3"
              alt="WaterWise Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              WaterWise
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
              {role==="user" &&(<NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white hover:text-gray-400"
                      : "text-white hover:text-gray-400"
                  }
                >
                  <span>Inicio</span>
                </NavLink>)}
                {!token && (
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    {" "}
                    <span>Login</span>{" "}
                  </NavLink>
                )}
              </li>
              <li>
                <NavLink
                  to="/parcel"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white hover:text-gray-400"
                      : "text-white hover:text-gray-400"
                  }
                >
                  <span>Parcelas</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/invoice"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white hover:text-gray-400"
                      : "text-white hover:text-gray-400"
                  }
                >
                  <span>Facturas</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white hover:text-gray-400"
                      : "text-white hover:text-gray-400"
                  }
                >
                  <span>Usuario</span>
                </NavLink>
              </li>
              <li>
                {!token && (
                  <NavLink
                    to="/register"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    {" "}
                    <span> Register </span>
                  </NavLink>
                )}
                {token && (
                  <NavLink
                    to="/"
                    onClick={logout}
                    className={({ isActive }) =>
                    isActive
                      ? "text-white hover:text-gray-400"
                      : "text-white hover:text-gray-400"
                  }
                  >
                    {" "}
                    <span> Cerrar sesión </span>
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default NavBar;