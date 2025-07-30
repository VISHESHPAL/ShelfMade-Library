import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/users/Home";
import Profile from "./pages/users/Profile";
import Admission from "./pages/users/Admission";
import BorrowedBooks from "./pages/users/BorrowedBooks";
import Login from "./pages/users/Login";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admission" element={<Admission />} />
                <Route path="/borrowed" element={<BorrowedBooks />} />
                <Route path="/login" element={<Login />} />

      </Routes>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </div>
  );
}

export default App;
