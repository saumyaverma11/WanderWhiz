const steps = [
  {
    year: "24",
    title: "Idea Born",
    desc: "WanderWhiz started as a hackathon project to solve the pain of travel planning.",
  },
  {
    year: "24",
    title: "AI Integration",
    desc: "Integrated Groq’s LLM to generate real, customized day-by-day itineraries.",
  },
  {
    year: "25",
    title: "Public Launch",
    desc: "Opened to the public with weather, places, and full user dashboard.",
  },
  {
    year: "26",
    title: "10K+ Trips",
    desc: "Passed 10,000 planned trips and growing every day.",
  },
];

const JourneyTimeline = () => {
  return (
    <section className="bg-[#f8fafc] px-6 md:px-16 py-20">

      {/* HEADING */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#0f172a] mb-16">
        Our Journey
      </h2>

      <div className="relative max-w-4xl mx-auto">

        {/* Vertical Line */}
        <div className="absolute left-5 top-0 w-[2px] h-full bg-orange-200"></div>

        <div className="space-y-10">

          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-6">

              {/* CIRCLE */}
              <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white text-sm font-semibold shadow-md">
                {step.year}
              </div>

              {/* CARD */}
              <div className="flex-1 bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                
                <h3 className="text-lg font-semibold text-[#0f172a]">
                  {step.title}
                </h3>

                <p className="text-gray-500 text-[15px] mt-2 leading-relaxed">
                  {step.desc}
                </p>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;