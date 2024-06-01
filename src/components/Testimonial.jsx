import React, { useRef } from 'react';
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { testimonials } from "../data/Testimonial";

const TestimonialCard = ({ image, qualification, name, message, isActive }) => {
  return (
    <div
      className={`testimonial-card bg-white shadow-lg rounded-lg p-6 m-4 flex-shrink-0 w-80 transform hover:rotate-1 hover:scale-105 transition-transform duration-200 ${
        isActive ? 'scale-105 rotate-2' : ''
      }`}
    >
      <img
        alt={name}
        src={image}
        className="w-24 h-24 rounded-full mx-auto mb-4 transform transition-transform duration-500"
      />
      <p className="text-gray-500 italic opacity-75 mb-2">{qualification}</p>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-700 line-clamp-4">{message}</p>
      <div className="border-b-4 border-orange-500 mt-4"></div>
    </div>
  );
};

const Testimonial = () => {
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
  };

  return (
    <div className="testimonial-section relative bg-gray-100 py-12">
      <h1 className="text-4xl font-bold py-10 text-center">Testimonials</h1>
      <button
        onClick={() => scroll(-300)}
        className="absolute left-1 bottom-60 bg-gray-800 text-white p-2 z-10 rounded-full focus:outline-none"
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        onClick={() => scroll(300)}
        className="absolute right-1 bottom-60 bg-gray-800 text-white p-2 z-10 rounded-full focus:outline-none"
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
                {
                  ...{
                    ...testimonial,
                    isActive: false
                  }
                }
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
