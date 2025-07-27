import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/users/Home";

function App() {
  return (
    <div>
       <Navbar />
       <Routes>
        <Route path="/" element={<Home />} />
       </Routes>
      
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </div>
  );
}

export default App;

          
