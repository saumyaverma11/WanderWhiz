

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
  ];

  return (
    <>
      <Navbar />

      <div className="py-16 px-6 max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-10">
          Travel Gallery 🌍
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="rounded-2xl shadow hover:scale-105 transition"
            />
          ))}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Gallery;