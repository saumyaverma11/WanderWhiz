function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* Left Image Section */}
      <div
        className="hidden md:flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800')",
        }}
      >
        <div className="bg-black/50 text-white p-10 rounded-xl">
          <h2 className="text-4xl font-bold">WanderWhiz</h2>
          <p className="mt-4 text-lg">
            Plan smarter trips with AI powered travel planning.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center bg-gray-50">

        <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">

          <h2 className="text-2xl font-bold text-center">{title}</h2>

          <p className="text-gray-500 text-center mt-2">
            {subtitle}
          </p>

          <div className="mt-6">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;