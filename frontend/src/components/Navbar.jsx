import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoIcon from "../assets/logos/logo-icon.png";
import logoText from "../assets/logos/logo-text.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 
      ${scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"}`}
    >
      <div className="flex justify-between items-center px-10">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">

          <img
            src={logoIcon}
            alt="logo icon"
            className="h-12 w-12 object-contain"
          />

          <img
            src={logoText}
            alt="WanderWhiz"
            className="h-7 object-contain"
          />

        </Link>

        {/* Links */}
        <div className="space-x-6 hidden md:flex">
          {["Home", "About", "Gallery", "FAQ", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className={`font-medium hover:text-orange-500 transition 
              ${scrolled ? "text-black" : "text-white"}`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Button */}
        <Link
          to="/login"
          className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600"
        >
          Login
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;