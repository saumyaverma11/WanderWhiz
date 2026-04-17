import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

function AuthLayout({ children, title, subtitle }) {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE (IMAGE) */}
      <div
        className="relative hidden md:flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-white p-10 text-center max-w-md">
          <h2 className="text-4xl font-bold">WanderWhiz</h2>
          <p className="mt-4 text-lg text-gray-200">
            Plan smarter trips with AI powered travel planning.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="relative flex items-center justify-center bg-gray-50 px-4 py-10">

        {/* MOBILE BACKGROUND */}
        <div
          className="absolute inset-0 md:hidden bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop')",
          }}
        ></div>

        {/* MOBILE OVERLAY */}
        <div className="absolute inset-0 md:hidden bg-black/50"></div>

        {/* FORM CARD */}
        <div className="relative z-10 bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">

          {/* ❌ CLOSE BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
          >
            <FaTimes size={18} />
          </button>

          {/* TITLE */}
          <h2 className="text-2xl font-bold text-center text-[#0f172a]">
            {title}
          </h2>

          {/* SUBTITLE */}
          <p className="text-gray-500 text-center mt-2">
            {subtitle}
          </p>

          {/* FORM */}
          <div className="mt-6">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;