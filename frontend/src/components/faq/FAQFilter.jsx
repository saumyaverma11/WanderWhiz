const categories = ["All", "Getting Started", "AI Itineraries", "Features & Data", "Account & Privacy"];

const FAQFilter = ({ active, setActive }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center py-6">

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-5 py-2 rounded-full text-sm transition 
            ${active === cat 
              ? "bg-orange-500 text-white shadow-md" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          {cat}
        </button>
      ))}

    </div>
  );
};

export default FAQFilter;