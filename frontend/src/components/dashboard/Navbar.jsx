import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <div className="flex items-center gap-3">

        <img
          src={
            auth?.user?.profileImage
              ? `http://localhost:5000/${auth.user.profileImage}`
              : "https://via.placeholder.com/40"
          }
          className="h-10 w-10 rounded-full object-cover border"
        />

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