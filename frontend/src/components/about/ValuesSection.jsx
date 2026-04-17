import { Zap, Shield, Users, Sparkles } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Speed First",
    desc: "We believe travel planning should be instant, not a 3-hour ordeal.",
  },
  {
    icon: Shield,
    title: "Privacy Matters",
    desc: "Your trips are yours. We never sell data or show ads.",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    desc: "Solo backpacker or family of 5 — WanderWhiz adapts to you.",
  },
  {
    icon: Sparkles,
    title: "AI at the Core",
    desc: "Not a static template — genuinely intelligent planning every time.",
  },
];

const ValuesSection = () => {
  return (
    <section className="bg-[#f8fafc] px-6 md:px-16 py-20 text-center">

      {/* HEADING */}
      <h2 className="text-3xl md:text-4xl font-semibold text-[#0f172a] mb-3">
        What we stand for
      </h2>

      <p className="text-gray-500 mb-12 text-[15px]">
        Our principles guide every decision we make.
      </p>

      {/* CARDS */}
      <div className="grid md:grid-cols-4 gap-6">

        {values.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300"
            >
              
              {/* ICON */}
              <div className="w-14 h-14 flex items-center justify-center mx-auto rounded-full bg-orange-50 group-hover:bg-orange-500 transition duration-300">
                <Icon className="text-orange-500 group-hover:text-white w-6 h-6 transition duration-300" />
              </div>

              {/* TITLE */}
              <h3 className="mt-6 text-lg font-semibold text-[#0f172a]">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">
                {item.desc}
              </p>

            </div>
          );
        })}

      </div>
    </section>
  );
};

export default ValuesSection;