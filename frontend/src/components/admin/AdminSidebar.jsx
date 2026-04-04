import { Link, useLocation } from "react-router-dom";
import { FaChartBar, FaUsers, FaMap, FaSignOutAlt } from "react-icons/fa";

const AdminSidebar = ({ closeSidebar }) => {
    const location = useLocation();

    const linkClass = (path) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition ${location.pathname === path
            ? "bg-orange-500 text-white shadow-lg"
            : "text-gray-300 hover:bg-gray-800"
        }`;

    return (
        <div className="w-64 bg-[#0f172a] text-white min-h-screen p-5 flex flex-col">

            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
                <div className="bg-orange-500 p-2 rounded-full"></div>
                <h1 className="text-xl font-bold">WanderWhiz</h1>
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-3">

                <Link
                    to="/admin"
                    onClick={closeSidebar}
                    className={linkClass("/admin")}
                >
                    <FaChartBar /> Stats
                </Link>

                <Link
                    to="/admin/users"
                    onClick={closeSidebar}
                    className={linkClass("/admin/users")}
                >                    <FaUsers /> Users
                </Link>

                <Link
                    to="/admin/trips"
                    onClick={closeSidebar}
                    className={linkClass("/admin/trips")}
                >                <FaMap /> Trips
                </Link>

            </nav>

            {/* Bottom */}
            <div className="mt-auto">
                <Link
                    to="/dashboard"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 text-gray-400"
                >                    <FaSignOutAlt /> Back to App
                </Link>
            </div>

        </div>
    );
};

export default AdminSidebar;