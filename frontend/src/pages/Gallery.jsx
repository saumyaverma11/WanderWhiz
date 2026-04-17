import { useState } from "react";
import { useLocation } from "react-router-dom";

import GalleryHero from "../components/gallery/GalleryHero";
import GalleryFilter from "../components/gallery/GalleryFilter";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryCTA from "../components/gallery/GalleryCTA";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Gallery = () => {
  const [active, setActive] = useState("All");

  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}

      {/* ❌ Hide Hero */}
      {/* {!isDashboard && <GalleryHero />} */}
      <GalleryHero />
      <GalleryFilter active={active} setActive={setActive} />
      <GalleryGrid active={active} />

      {/* ❌ Hide CTA */}
      {!isDashboard && <GalleryCTA />}

      {!isDashboard && <Footer />}
    </>
  );
};

export default Gallery;