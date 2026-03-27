import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="bg-white p-6 rounded-xl shadow">

        {users.map((user) => (
          <div key={user._id} className="border-b py-2">
            <p className="font-medium">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminDashboard;