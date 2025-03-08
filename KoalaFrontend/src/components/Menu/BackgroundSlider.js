import React, { useEffect, useState } from "react";
import { menuItems } from "../../data/MenuData";

const BackgroundSlider = ({ selectedCategory }) => {
  const images = menuItems
    .filter(
      (item) => selectedCategory === "All" || item.category === selectedCategory
    )
    .map((item) => item.image);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative h-96 w-full overflow-hidden">
      {images.length > 0 && (
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      )}

      <button
        onClick={prevImage}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-orange-500 p-2 rounded-full shadow-md focus:outline-none"
      >
        &#9664;
      </button>

      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-orange-500 p-2 rounded-full shadow-md focus:outline-none"
      >
        &#9654;
      </button>
    </div>
  );
};

export default BackgroundSlider;
