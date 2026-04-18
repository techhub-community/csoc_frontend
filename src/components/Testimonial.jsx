import React, { useRef } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { testimonials } from "../data/Testimonial";
import { useState, useEffect } from "react";

const TestimonialCard = ({ image, qualification, name, message, isActive }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClipped, setIsClipped] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    // Check if the message is clipped
    if (messageRef.current) {
      setIsClipped(messageRef.current.scrollHeight > messageRef.current.clientHeight);
    }
  }, [message]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`testimonial-card bg-zinc-900 shadow-lg rounded-lg p-6 m-4 flex-shrink-0 w-80 transform hover:scale-105 transition-transform duration-200 ${
        isActive ? "scale-105 rotate-2" : ""
      }`}
    >
      <img
        alt={name}
        src={image}
        className="w-24 h-24 rounded-full mx-auto mb-4 transform transition-transform duration-500"
      />
      <p className="text-zinc-400 italic opacity-75 mb-2">{qualification}</p>
      <h3 className="text-xl font-bold mb-2 text-white">{name}</h3>
      <p ref={messageRef} className={`text-zinc-100 ${isExpanded ? "" : "line-clamp-4"}`}>{message}</p>
      {isClipped ? (
        <button
          onClick={toggleExpand}
          className="text-neon hover:underline mt-2"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      ): (<></>)}
      <div className="border-b-4 border-neon mt-4"></div>
    </div>
  );
};

const Testimonial = () => {
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  return (
    <div className="testimonial-section relative bg-zinc-950 py-12">
      <h1 className="text-4xl font-bold py-10 text-center text-white">Testimonials</h1>
      <button
        onClick={() => scroll(-300)}
        className="absolute left-1 bottom-60 bg-zinc-800 text-white p-2 z-10 rounded-full focus:outline-none"
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        onClick={() => scroll(300)}
        className="absolute right-1 bottom-60 bg-zinc-800 text-white p-2 z-10 rounded-full focus:outline-none"
      >
        <FaAngleDoubleRight />
      </button>
      <div
        ref={scrollRef}
        className="flex items-center overflow-x-auto z-2 snap-x px-8 snap-mandatory scroll-smooth no-scrollbar"
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="snap-center">
            {
              <TestimonialCard
                key={index}
                {...{
                  ...testimonial,
                  isActive: false,
                }}
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
