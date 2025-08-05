import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const borrowedBooks = user?.borrowedBooks?.length || 0;
  const feePaid = user?.feePaid || false;
  let formattedDate = "N/A";

if (user?.addmissionDate) {
  const dateObj = new Date(user.addmissionDate);
  if (!isNaN(dateObj.getTime())) {
    formattedDate = dateObj.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6e9dc] py-10 px-4">
      <div className="w-full max-w-3xl bg-[#f3f5ec] border border-[#d0d4c2] rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <FaUserCircle size={60} className="text-[#4b4f41]" />
          <div>
            <h1 className="text-2xl font-bold text-[#2c3e50]">
              {user?.name || "Guest"}
            </h1>
            <p className="text-gray-600 text-sm">{user?.email || "Not available"}</p>
          </div>
        </div>

        <hr className="border-t border-[#d0d4c2] mb-6" />

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl border border-[#d0d4c2] shadow-sm">
            <h2 className="text-lg font-semibold text-[#2c3e50] mb-2">Fee Status</h2>
            <p className={`text-md font-medium ${feePaid ? "text-green-600" : "text-red-600"}`}>
              {feePaid ? "Paid" : "Not Paid"}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#d0d4c2] shadow-sm">
            <h2 className="text-lg font-semibold text-[#2c3e50] mb-2">Borrowed Books</h2>
            <p className="text-md text-gray-700">{borrowedBooks}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#d0d4c2] shadow-sm">
            <h2 className="text-lg font-semibold text-[#2c3e50] mb-2">Admission Date</h2>
            <p className="text-md text-gray-700">{formattedDate}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#d0d4c2] shadow-sm">
            <h2 className="text-lg font-semibold text-[#2c3e50] mb-2">Library ID</h2>
            <p className="text-md text-gray-700">{user?._id || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
