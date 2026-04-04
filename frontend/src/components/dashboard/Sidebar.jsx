import { FaHome, FaMap, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // adjust path if needed

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${location.pathname.startsWith(path)
      ? "bg-orange-100 text-orange-600"
      : "text-gray-600 hover:bg-gray-100"
    }`;
  const { auth } = useContext(AuthContext);
  const user = auth.user;
  return (
    <div className="w-64 bg-white shadow-lg hidden md:flex flex-col">

      <div className="p-6 text-2xl font-bold text-orange-500">
        WanderWhiz
      </div>

      <nav className="flex flex-col gap-2 px-4">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <FaHome /> Dashboard
        </Link>

        <Link to="/dashboard/trips" className={linkClass("/dashboard/trips")}>
          <FaMap /> My Trips
        </Link>

        <Link to="/dashboard/profile" className={linkClass("/dashboard/profile")}>
          <FaUser /> Profile
        </Link>
        {user?.role === "admin" && (
          <Link to="/admin" className={linkClass("/dashboard/admin")}>
            Admin Panel
          </Link>
        )}
      </nav>

    </div>
  );
};

export default Sidebar;