import { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  updateUserRole
} from "../../services/admin.service";

import {
  FaUserCircle,
  FaBan,
  FaBars
} from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleRoleChange = async (user, newRole) => {
    try {
      await updateUserRole(user._id, newRole);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating role");
    }
  };

  return (
    <div className="p-4 md:p-6">

      {/* 🔥 TITLE */}
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
        User Management
      </h1>

      {/* 🔥 TABLE CONTAINER */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="min-w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-center">Role</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50 transition"
              >

                {/* USER */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-semibold">
                      {user.name.charAt(0)}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Traveler
                      </p>
                    </div>
                  </div>
                </td>

                {/* EMAIL */}
                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>

                {/* ROLE */}
                <td className="px-6 py-4 text-center">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user, e.target.value)
                    }
                    className={`px-3 py-1 rounded-full text-xs font-medium border
                      ${user.role === "admin"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* STATUS */}
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                    ● Active
                  </span>
                </td>

                {/* ACTION */}
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="inline-flex items-center gap-1 text-red-500 hover:text-red-600 transition text-sm font-medium"
                  >
                    <FaBan size={12} />
                    Deactivate
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Users;