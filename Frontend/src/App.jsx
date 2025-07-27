import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
       <Navbar />
      
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </div>
  );
}

export default App;

          
