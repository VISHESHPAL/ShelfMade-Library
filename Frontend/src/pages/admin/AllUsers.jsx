import React from "react";

// Dummy user data
const dummyUsers = [
  { id: 1, name: "Vishesh Pal", email: "vishesh@example.com", role: "User" },
  { id: 2, name: "Riya Sharma", email: "riya@example.com", role: "User" },
  { id: 3, name: "Aman Singh", email: "aman@example.com", role: "User" },
];

const AllUsers = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#2c3e50]">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-[#d0d4c2] text-left">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
