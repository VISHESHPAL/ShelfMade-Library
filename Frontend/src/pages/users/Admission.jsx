import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Admission = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Step 1: If user is not logged in
    if (!user) {
      toast.error("⚠️ Please login to take admission!");
      navigate("/login");
      return;
    }

    // Step 2: If already taken admission, go to profile
    if (user.addmissionTaken) {
      navigate("/profile");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleAdmission = async () => {
    try {
      const res = await axios.post(
        "/api/user/admission",
        {},
        {
          withCredentials: true, // ensures JWT cookie is sent
        }
      );

      if (res.data?.success) {
        toast.success("🎉 Admission successful!");

        // Step 3: Update user context with latest data from backend
        setUser(res.data.updatedUser); // Make sure backend returns updated user object

        // Step 4: Navigate to profile page (context now updated, no reload needed)
        navigate("/profile");
      } else {
        toast.error("❌ Admission failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error during admission. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6e8dd] to-[#f3f5ec] flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-2xl p-8 bg-white/80 backdrop-blur-md border border-[#d0d4c2] rounded-2xl shadow-2xl transition-all">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#2c3e50]">
          Confirm Your Admission
        </h2>

        <div className="text-center mb-6">
          <p className="text-lg text-gray-800">
            👋 Hello <span className="font-semibold">{user.name}</span>,
          </p>
          <p className="text-md text-gray-600 mt-2">
            Please confirm your admission to proceed further in the system.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleAdmission}
            className="bg-[#bdc1b0] hover:bg-[#aeb2a1] text-white text-lg font-semibold py-3 px-8 rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            ✅ Confirm Admission
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admission;
