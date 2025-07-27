import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {user , setUser , navigate ,setShowUserLogin ,} = useAuthContext();

  const logout = () =>{
    setUser(null)
    navigate("/")

  }
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 py-4 border-b border-gray-300 bg-white relative">
      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)}>
          <h1>Shelf Made </h1>
      </NavLink>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-8 text-sm">
        <NavLink to="/">Home</NavLink>
        {user && <NavLink to="/profile">Profile</NavLink>}
        <NavLink to="/admission">Take Admission</NavLink>
        {user && <NavLink to="/borrowed">Books Borrowed</NavLink>}

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-8 py-3 bg-primary text-black rounded-full bg-[#F7F8F3] transition"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
              <CgProfile  className="h-10 w-8 cursor-pointer"/>
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
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col gap-2 px-6 text-sm sm:hidden flex">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          {user && <NavLink to="/profile" onClick={() => setOpen(false)}>Profile</NavLink>}
          <NavLink to="/admission" onClick={() => setOpen(false)}>Take Admission</NavLink>
          {user && <NavLink to="/borrowed" onClick={() => setOpen(false)}>Books Borrowed</NavLink>}
          {!user ? (
            <button
              onClick={() => {
                setShowUserLogin(true);
                setOpen(false);
              }}
              className="mt-2 bg-[#F7F8F3]  text-black w-20 py-1.5 rounded-full"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="mt-2 bg-[#F7F8F3]  text-black w-20 py-1.5 rounded-full"
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
