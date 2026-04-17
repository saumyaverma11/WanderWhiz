const AboutHero = () => {
  return (
    <section className="pt-28 pb-16 text-center px-6 md:px-16 bg-white">
      <span className="bg-orange-100 text-orange-500 px-4 py-1 rounded-full text-sm">
        ✨ Our Story
      </span>

      <h1 className="text-3xl md:text-5xl font-bold mt-6 text-gray-900 leading-tight">
        We make travel planning <br />
        <span className="text-orange-500">effortless.</span>
      </h1>

      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        WanderWhiz was born from a simple frustration — planning a trip should
        be exciting, not exhausting. So we built an AI that does it for you.
      </p>
    </section>
  );
};

export default AboutHero;