import React from "react";
import Slider from "../data/Slider.jsx";
import "../gallery.css";

const Gallery = () => {
  const sliders = [
    {
      id: "slider1",
      images: [
        "image/gallery/img-1.jpg",
        "image/gallery/img-2.jpg",
        "image/gallery/img-3.jpg",
        "image/gallery/img-4.jpg",
        "image/gallery/img-5.jpg",
      ],
      direction: "left",
    },
    {
      id: "slider2",
      images: [
        "image/gallery/img-6.jpg",
        "image/gallery/img-7.jpg",
        "image/gallery/img-8.jpg",
        "image/gallery/img-9.jpg",
        "image/gallery/img-10.jpg",
      ],
      direction: "right",
    },
  ];

  return (
    <section
      id="gallery"
      className="flex justify-center align-middle sliders-container h-[80vh]  "
    >
      <h1 className="text-4xl font-bold py-10 text-center">Gallery</h1>{" "}
      {sliders.map((slider) => (
        <Slider
          key={slider.id}
          id={slider.id}
          images={slider.images}
          direction={slider.direction}
        />
      ))}
    </section>
  );
};

export default Gallery;
