import React, { useEffect, useState } from "react";
import "../gallery.css";

function Slider({ id, images, direction }) {
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    setSlides([...images, ...images]);
  }, [images]);
  return (
    <div className="slider" id={id}>
      <div
        className={`slider-track ${
          direction === "right" ? "scrollRight" : "scrollLeft"
        }`}
      >
        {slides.map((src, index) => (
          <div className="slide" key={index}>
            <img src={src} alt={`Slides ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Slider;
