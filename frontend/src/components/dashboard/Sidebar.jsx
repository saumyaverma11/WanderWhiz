import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaHome, FaMap, FaUser, FaImages, FaQuestionCircle, FaEnvelope } from "react-icons/fa";


const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${location.pathname.startsWith(path)
      ? "bg-orange-100 text-orange-600"
      : "text-gray-600 hover:bg-gray-100"
    }`;
  const { auth } = useContext(AuthContext);
  const user = auth.user;
  return (
    <div className=" h-screen w-64 bg-white shadow-lg flex-col">
      <div className="p-6 text-2xl font-bold text-orange-500">
        WanderWhiz
      </div>
      <nav className="flex flex-col gap-2 px-4">
        <Link to="/dashboard" onClick={closeSidebar} className={linkClass("/dashboard")}>
          <FaHome /> Dashboard
        </Link>

        <Link to="/dashboard/trips" onClick={closeSidebar} className={linkClass("/dashboard/trips")}>
          <FaMap /> My Trips
        </Link>

        <Link to="/dashboard/profile" onClick={closeSidebar} className={linkClass("/dashboard/profile")}>
          <FaUser /> Profile
        </Link>
        <Link to="/dashboard/gallery" onClick={closeSidebar} className={linkClass("/dashboard/gallery")}>
          <FaImages /> Gallery
        </Link>

        <Link to="/dashboard/faq" onClick={closeSidebar} className={linkClass("/dashboard/faq")}>
          <FaQuestionCircle /> FAQ
        </Link>

        <Link to="/dashboard/contact" onClick={closeSidebar} className={linkClass("/dashboard/contact")}>
          <FaEnvelope /> Contact
        </Link>
        {user?.role === "admin" && (
          <Link to="/admin" onClick={closeSidebar} className={linkClass("/dashboard/admin")}>
            Admin Panel
          </Link>
        )}
      </nav>

    </div>
  );
};

export default Sidebar;