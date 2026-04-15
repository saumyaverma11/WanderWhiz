function Stats() {
  const stats = [
    { value: "10K+", label: "Trips Planned" },
    { value: "180+", label: "Destinations" },
    { value: "4.9★", label: "User Rating" },
    { value: "<10s", label: "Avg. Plan Time" },
  ];

  return (
    <section className="bg-[#0b1a2b] text-white py-12">

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6">

        {stats.map((s, i) => (
          <div key={i}>
            <h2 className="text-3xl font-bold text-orange-500">{s.value}</h2>
            <p className="text-sm text-gray-300">{s.label}</p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Stats;