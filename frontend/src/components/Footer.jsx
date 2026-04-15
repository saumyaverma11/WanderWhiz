function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-white text-xl font-bold">WanderWhiz</h2>
          <p className="text-sm mt-2">
            AI travel planning made easy ✈️
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <p className="hover:text-white cursor-pointer">Home</p>
          <p className="hover:text-white cursor-pointer">About</p>
          <p className="hover:text-white cursor-pointer">Gallery</p>
          <p className="hover:text-white cursor-pointer">FAQ</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Connect</h3>
          <p>Instagram</p>
          <p>LinkedIn</p>
        </div>

      </div>

      <p className="text-center text-xs mt-8 text-gray-500">
        © 2026 WanderWhiz
      </p>
    </footer>
  );
}

export default Footer;