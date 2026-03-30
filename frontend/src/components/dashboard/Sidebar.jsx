import { FaHome, FaMap, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-orange-100 text-orange-600"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="w-64 bg-white shadow-lg hidden md:flex flex-col">

      <div className="p-6 text-2xl font-bold text-orange-500">
        WanderWhiz
      </div>

      <nav className="flex flex-col gap-2 px-4">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <FaHome /> Dashboard
        </Link>

        <Link to="/trips" className={linkClass("/dashboard")}>
          <FaMap /> My Trips
        </Link>

        <Link to="/profile" className={linkClass("/profile")}>
          <FaUser /> Profile
        </Link>
      </nav>

    </div>
  );
};

export default Sidebar;