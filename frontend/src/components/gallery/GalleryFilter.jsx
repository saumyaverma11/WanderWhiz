const categories = [
  "All",
  "Romance",
  "Adventure",
  "Culture",
  "Relaxation",
  "Wildlife",
  "Urban",
];

const GalleryFilter = ({ active, setActive }) => {
  return (
    <div className="flex flex-wrap gap-3 px-6 md:px-16 pb-10">

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition
          ${
            active === cat
              ? "bg-orange-500 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}

    </div>
  );
};

export default GalleryFilter;