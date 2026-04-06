import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">

            {/* ✅ SIDEBAR */}
            <div
                className={`
          fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg z-50
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300
        `}
            >
                <AdminSidebar closeSidebar={() => setOpen(false)} />
            </div>

            {/* ✅ OVERLAY (mobile only) */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/30 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* ✅ MAIN CONTENT */}
            <div className="flex-1 flex flex-col">

                {/* 🔥 MOBILE HEADER */}
                <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
                    <button onClick={() => setOpen(true)}>
                        <FaBars size={20} />
                    </button>

                    <h1 className="font-semibold text-gray-800">
                        Admin Panel
                    </h1>
                </div>

                {/* 🔥 PAGE CONTENT */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <Outlet />
                </div>

            </div>

        </div>
    );
};

export default AdminLayout;