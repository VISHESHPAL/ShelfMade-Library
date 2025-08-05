import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/admissions",
          {
            withCredentials: true,
          }
        );
        if (data.success) {
          setUsers(data.users);
        } else {
          toast.error("Failed to fetch users");
        }
      } catch (error) {
        toast.error("Error fetching users");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Update fee status
  const handleFeeToggle = async (userId, currentStatus) => {
    try {
      const { data } = await axios.patch(
        `/api/admin/update-fee/${userId}`,
        { feePaid: !currentStatus }, // ✅ send updated feePaid value
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Fee status updated!");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, feePaid: !currentStatus } : user
          )
        );
      } else {
        toast.error("Failed to update fee status");
      }
    } catch (error) {
      toast.error("Error updating fee status");
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#2c3e50]">All Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-[#d0d4c2] text-left">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Admission Taken</th>
                <th className="py-2 px-4 border-b">Fee Paid</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    {user.addmissionTaken ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {user.feePaid ? "Paid" : "Unpaid"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleFeeToggle(user._id, user.feePaid)} // ✅ pass current status
                      className={`px-3 py-1 rounded ${
                        user.feePaid
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white`}
                    >
                      {user.feePaid ? "Mark Unpaid" : "Mark Paid"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
