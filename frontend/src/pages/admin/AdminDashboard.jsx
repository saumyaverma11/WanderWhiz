import { useEffect, useState } from "react";
import { getAllUsers, getAllTrips } from "../../services/admin.service";
import { FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";


const AdminDashboard = () => {

  // ✅ STATES
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);

  const [stats, setStats] = useState({
    users: 0,
    trips: 0,
    admins: 0
  });

  // ✅ FETCH DATA
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersData = await getAllUsers();
      const tripsData = await getAllTrips();

      setUsers(usersData);
      setTrips(tripsData);

      setStats({
        users: usersData.length,
        trips: tripsData.length,
        admins: usersData.filter(u => u.role === "admin").length
      });

    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <div>

      {/* 🔥 TITLE */}
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Admin Dashboard
      </h1>

      <p className="text-sm text-gray-400 mb-4">
        Platform overview and management
      </p>


      {/* 🔥 STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white rounded-2xl p-5 shadow border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-2xl font-semibold text-gray-800">
            {stats.users}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Total Admins</p>
          <h2 className="text-2xl font-semibold text-gray-800">
            {stats.admins}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow border-l-4 border-orange-500">
          <p className="text-sm text-gray-500">Total Trips</p>
          <h2 className="text-2xl font-semibold text-gray-800">
            {stats.trips}
          </h2>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* ✅ Recent Users */}
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">

          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-gray-700">            <FaUserCircle className="text-orange-500" />
            Recent Users
          </h2>

          {users.slice(0, 4).map((u) => (
            <div
              key={u._id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-medium">
                  {u.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </div>

              </div>

              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${u.role === "admin"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-gray-100 text-gray-600"
                  }`}
              >
                {u.role}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Recent Trips */}
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">

          <h2 className="font-bold mb-4 flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt className="text-orange-500" />
            Recent Trips
          </h2>

          {trips.slice(0, 4).map((t) => (
            <div
              key={t._id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition"
            >

              {/* LEFT */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">{t.destination}</p>
                  <p className="text-xs text-gray-400">by {t.user?.name}</p>
                </div>
              </div>

              {/* RIGHT BADGE */}
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-600">
                {t.travelType}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;