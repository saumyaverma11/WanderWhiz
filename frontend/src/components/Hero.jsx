function Hero() {
  return (
    <section
      className="relative h-[85vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">

        <h1 className="text-5xl font-bold leading-tight">
          Plan Your Perfect Trip
        </h1>

        <p className="mt-6 max-w-xl text-lg">
          AI powered travel planner that creates personalized itineraries
          with weather insights and location recommendations.
        </p>

        <button className="mt-8 bg-orange-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600">
          Start Planning
        </button>

      </div>
    </section>
  );
}

export default Hero;