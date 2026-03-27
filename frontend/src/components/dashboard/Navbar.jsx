import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <div className="flex items-center gap-3">
        <FaUserCircle className="text-2xl text-orange-500" />
        <h1 className="text-lg font-semibold">
          {auth?.user?.name || "User"}
        </h1>
      </div>

      <button
        onClick={logout}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>

    </div>
  );
};

export default Navbar;