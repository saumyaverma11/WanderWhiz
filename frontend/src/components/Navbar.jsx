import { Link } from "react-router-dom";

import logoIcon from "../assets/logos/logo-icon.png";
import logoText from "../assets/logos/logo-text.png";

function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">

          {/* Icon Logo */}
          <img
            src={logoIcon}
            alt="logo icon"
            className="h-15 w-12 object-contain"
          />

          {/* Text Logo */}
          <img
            src={logoText}
            alt="WanderWhiz"
            className="h-7 object-contain"
          />

        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8 font-medium text-gray-700">

          <Link
            to="/"
            className="hover:text-orange-500 transition"
          >
            Home
          </Link>

          <Link
            to="/create-trip"
            className="hover:text-orange-500 transition"
          >
            Plan Trip
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-orange-500 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;

