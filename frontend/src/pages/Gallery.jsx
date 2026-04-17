import { useState } from "react";
import GalleryHero from "../components/gallery/GalleryHero";
import GalleryFilter from "../components/gallery/GalleryFilter";
import GalleryGrid from "../components/gallery/GalleryGrid";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import GalleryCTA from "../components/gallery/GalleryCTA";

const Gallery = () => {
  const [active, setActive] = useState("All");

  return (
    <>
      <Navbar />
      <GalleryHero />
      <GalleryFilter active={active} setActive={setActive} />
      <GalleryGrid active={active} />
       <GalleryCTA />
      <Footer />
     
    </>
  );
};

export default Gallery;