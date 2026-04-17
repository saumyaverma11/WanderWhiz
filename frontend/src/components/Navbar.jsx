import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoIcon from "../assets/logos/logo-icon.png";
import logoText from "../assets/logos/logo-text.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation(); // ✅ detect route

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ MAIN LOGIC
  const isHome = location.pathname === "/";

  const textColor =
    isHome && !scrolled ? "text-white" : "text-black";

  const iconColor =
    isHome && !scrolled ? "text-white" : "text-black";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 
      ${
        scrolled || !isHome
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-10">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoIcon} alt="logo icon" className="h-10 w-10" />
          <img src={logoText} alt="WanderWhiz" className="h-6" />
        </Link>

        {/* Desktop Links */}
        <div className="space-x-6 hidden md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium hover:text-orange-500 transition ${textColor}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Button */}
        <Link
          to="/login"
          className="hidden md:block bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600"
        >
          Login
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? (
            <X size={28} className={iconColor} />
          ) : (
            <Menu size={28} className={iconColor} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-5 space-y-4">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 font-medium hover:text-orange-500"
            >
              {item.name}
            </Link>
          ))}

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block bg-orange-500 text-white text-center py-2 rounded-full"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;