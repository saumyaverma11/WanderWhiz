// import { Outlet } from "react-router-dom";
// import { useState } from "react";
// import Sidebar from "../components/dashboard/Sidebar";
// import Navbar from "../components/dashboard/Navbar";

// const DashboardLayout = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div
//       className={`
//     fixed top-0 left-0 h-full w-64 bg-white z-50
//     transform ${open ? "translate-x-0" : "-translate-x-full"}
//     transition-transform duration-300
//     md:translate-x-0 md:static md:block
//   `}
//     >

//       {/* SIDEBAR */}
//       <div
//         className={`
//           fixed md:static top-0 left-0 h-full w-64 bg-white z-50
//           transform ${open ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0 transition-transform duration-300
//         `}
//       >
//         <Sidebar closeSidebar={() => setOpen(false)} />
//       </div>

//       {/* OVERLAY */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/30 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* MAIN */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Navbar openSidebar={() => setOpen(true)} />

//         <div className="p-4 md:p-6 overflow-y-auto">
//           <Outlet />
//         </div>
//       </div>

//     </div>
//   );
// };

// export default DashboardLayout;

import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* ✅ SIDEBAR */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg z-50
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300
        `}
      >
        <Sidebar closeSidebar={() => setOpen(false)} />
      </div>

      {/* ✅ OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ✅ MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* 🔥 NAVBAR */}
        <Navbar openSidebar={() => setOpen(true)} />

        {/* 🔥 PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;