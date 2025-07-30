import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, navigate, setShowUserLogin } = useAuthContext();

  const logout = () => {
    setUser(null);
    navigate("/");
  };
const handleAdmissionClick = () => {
  if (!user) {
    toast.error("Please login to take admission");
    navigate("/login");
  } else {
    navigate("/admission");
  }

  setOpen(false); 
};



  return (
    <nav className="flex items-center justify-between px-6 md:px-16 py-4 border-b border-gray-300 bg-white relative">
      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)}>
        <h1 className="text-2xl font-bold">Shelf Made</h1>
      </NavLink>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-8 text-sm">
        <NavLink to="/">Home</NavLink>

        {user && <NavLink to="/profile">Profile</NavLink>}

        {user && !user.hasTakenAdmission && (
          <button onClick={handleAdmissionClick}>Take Admission</button>
        )}

        {user && <NavLink to="/borrowed">Books Borrowed</NavLink>}

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-8 py-3 bg-[#F7F8F3] text-black rounded-full transition"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <CgProfile className="h-10 w-8 cursor-pointer" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-32 rounded-md text-sm z-50">
              <li
                onClick={() => navigate("/profile")}
                className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
              >
                Profile
              </li>
              <li
                onClick={logout}
                className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden">
        <button onClick={() => setOpen(!open)}>
          <GiHamburgerMenu />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col gap-2 px-6 text-sm sm:hidden flex z-50">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="px-2 py-1.5 hover:bg-[#f3f5ec] rounded-md"
          >
            Home
          </NavLink>

          {user && (
            <NavLink
              to="/profile"
              onClick={() => setOpen(false)}
              className="px-2 py-1.5 hover:bg-[#f3f5ec] rounded-md"
            >
              Profile
            </NavLink>
          )}

          {user && !user.hasTakenAdmission && (
            <button
              onClick={handleAdmissionClick}
              className="text-left w-full px-2 py-1.5 text-[#333] hover:bg-[#f3f5ec] rounded-md transition-all"
            >
              Take Admission
            </button>
          )}

          {user && (
            <NavLink
              to="/borrowed"
              onClick={() => setOpen(false)}
              className="px-2 py-1.5 hover:bg-[#f3f5ec] rounded-md"
            >
              Books Borrowed
            </NavLink>
          )}

          {!user ? (
            <button
              onClick={() => {
                setShowUserLogin(true);
                setOpen(false);
              }}
              className="mt-2 bg-[#F7F8F3] text-black w-20 py-1.5 rounded-full"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="mt-2 bg-[#F7F8F3] text-black w-20 py-1.5 rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
