// import { useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { FaChevronDown } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { auth, logout } = useContext(AuthContext);
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white shadow px-4 md:px-6 py-3 flex justify-between items-center relative">

//       {/* LEFT */}
//       <h1 className="text-lg font-semibold text-gray-800">
//         WanderWhiz
//       </h1>

//       {/* RIGHT */}
//       <div className="relative">

//         {/* PROFILE BUTTON */}
//         <div
//           onClick={() => setOpen(!open)}
//           className="flex items-center gap-2 cursor-pointer"
//         >
//           <img
//             src={
//               auth?.user?.profileImage
//                 ? `http://localhost:5000/${auth.user.profileImage}`
//                 : "https://via.placeholder.com/40"
//             }
//             className="h-9 w-9 rounded-full object-cover border"
//           />

//           <FaChevronDown className="text-gray-500 text-sm" />
//         </div>

//         {/* DROPDOWN */}
//         {open && (
//           <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border z-50">

//             <button
//               onClick={() => {
//                 navigate("/dashboard/profile");
//                 setOpen(false);
//               }}
//               className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//             >
//               Profile
//             </button>

//             <button
//               onClick={logout}
//               className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
//             >
//               Logout
//             </button>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaChevronDown, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ openSidebar }) => {
  const { auth, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow px-4 md:px-6 py-3 flex justify-between items-center">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* ✅ MOBILE MENU BUTTON */}
        <button
          onClick={openSidebar}
          className="md:hidden text-gray-600"
        >
          <FaBars size={18} />
        </button>

        <h1 className="text-lg font-semibold text-gray-800">
          WanderWhiz
        </h1>
      </div>

      {/* RIGHT */}
      <div className="relative">

        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={
              auth?.user?.profileImage
                ? `http://localhost:5000/${auth.user.profileImage}`
                : "https://via.placeholder.com/40"
            }
            className="h-9 w-9 rounded-full object-cover border"
          />

          <FaChevronDown className="text-gray-500 text-sm" />
        </div>

        {open && (
          <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border z-50">

            <button
              onClick={() => {
                navigate("/dashboard/profile");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Profile
            </button>

            <button
              onClick={() => {
                logout();
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;