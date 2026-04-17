import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white py-16 px-10">

      <div className="grid md:grid-cols-3 gap-10">

        {/* Left */}
        <div>
          <h2 className="text-xl font-semibold mb-2">WanderWhiz</h2>
          <p className="text-gray-400 text-sm">
            AI travel planning made easy ✈️
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>

          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-orange-400">About</Link></li>
            <li><Link to="/gallery" className="hover:text-orange-400">Gallery</Link></li>
            <li><Link to="/faq" className="hover:text-orange-400">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-orange-400">Contact</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-3">Connect</h3>

          <ul className="space-y-2 text-gray-300">

            <li>
              <a
                href="https://www.linkedin.com/in/saumyaverma05/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

      </div>

      <p className="text-center text-gray-500 text-sm mt-10">
        © 2026 WanderWhiz
      </p>

    </footer>
  );
};

export default Footer;