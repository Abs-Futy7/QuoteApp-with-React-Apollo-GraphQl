import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <div className="flex justify-between m-3 p-3 items-center">
      <div className="text-3xl font-black text-orange-600">
        <Link to="/">Quote App</Link>
      </div>
      <div className="flex">
        <ul className="flex gap-3 p-2 text-white">
          {token ? (
            <>
              <li className="rounded-full border px-2 py-1 cursor-pointer hover:text-orange-500">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="rounded-full border px-2 py-1 cursor-pointer hover:text-orange-500">
                <Link to="/create">Create</Link>
              </li>
              <li>
                <button
                  className="rounded-full border px-2 py-1 cursor-pointer hover:text-orange-500"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="rounded-full border px-2 py-1 cursor-pointer hover:text-orange-500">
                <Link to="/login">Login</Link>
              </li>
              <li className="rounded-full border px-2 py-1 cursor-pointer hover:text-orange-500">
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
