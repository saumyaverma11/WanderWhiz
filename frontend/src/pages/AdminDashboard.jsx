import { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  updateUserRole
} from "../services/admin.service";


function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const handleRoleChange = async (id, newRole) => {
    try {
      await updateUserRole(id, newRole);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, role: newRole } : u
        )
      );

    } catch (error) {
      console.error(error);
    }
  };




  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const makeAdmin = async (id) => {
    await updateUserRole(id, "admin");
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {users.map((user) => (
        <div key={user._id} className="border p-3 mb-3 rounded">
          <p><b>{user.name}</b></p>
          <p>{user.email}</p>
          <p>Role: {user.role}</p>

          <div className="mt-2 space-x-2">
            <button
              onClick={() => handleDelete(user._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

            <button
              onClick={() =>
                handleRoleChange(
                  user._id,
                  user.role === "admin" ? "user" : "admin"
                )
              }
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {user.role === "admin" ? "Make User" : "Make Admin"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;