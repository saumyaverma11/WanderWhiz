const images = [
  {
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    category: "Romance",
    location: "Paris, France",
  },
  {
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    category: "Relaxation",
    location: "Maldives",
  },
  {
    url: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
    category: "Urban",
    location: "Dubai",
  },
  {
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    category: "Culture",
    location: "Bali",
  },
  {
    url: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
    category: "Adventure",
    location: "Mountains",
  },
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    category: "Wildlife",
    location: "Amazon Forest",
  },
  {
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
    category: "Urban",
    location: "Tokyo",
  },
];

const GalleryGrid = ({ active }) => {
  const filtered =
    active === "All"
      ? images
      : images.filter((img) => img.category === active);

  return (
    <div className="px-6 md:px-16 pb-20">

      {/* MASONRY */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">

        {filtered.map((img, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-2xl break-inside-avoid"
          >
            <img
              src={`${img.url}?w=800`}
              alt=""
              className="w-full object-cover rounded-2xl transition duration-500 group-hover:scale-105"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition"></div>

            {/* TEXT */}
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition">
              <p className="text-sm font-medium">{img.location}</p>
              <span className="text-xs bg-green-500 px-3 py-1 rounded-full">
                {img.category}
              </span>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default GalleryGrid;