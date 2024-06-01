import React, { useRef } from 'react';
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";

const testimonials = [
  {
    image: 'https://csoc.codeshack.codes/static/assets/img/clients/anushka.jpg',
    qualification: 'Web Development',
    name: 'Anushka Singh',
    message: 'During my Mentorship Program I got to learn a lot about my domain of interest Web Development. Being a part of Hackathon I got the practical knowledge of this field which will help me in future endeavors.',
  },
  {
    image: 'https://csoc.codeshack.codes/static/assets/img/clients/NIKUNJ1.jpg',
    qualification: 'Web Development',
    name: 'Nikunj Dwivedi',
    message: 'My journey in the tech team has been transformative, and I am grateful for the opportunities I have had to learn, grow, and collaborate with exceptional professionals.',
  },
  {
    image: 'https://csoc.codeshack.codes/static/assets/img/clients/arvind.jpg',
    qualification: 'Web Development',
    name: 'Arvind Panda',
    message: 'It was a wonderful experience gaining hands-on knowledge. It made me feel like a "coder" for the first time. I explored the basics of web dev and came to realize that tech is an ever-evolving field; there is always a next step. The mentors allowed me to progress at my own pace and were always ready to address any doubts I had!',
  },
  {
    image: 'https://csoc.codeshack.codes/static/assets/img/clients/utkarsh6.jpg',
    qualification: 'App Development',
    name: 'Utkarsh Kumar',
    message: 'During my CSOC mentorship program, I learned Flutter and developed a product for CSOC Hackathon. It was a great learning experience. We built a project that addressed a specific challenge and showcased it at the hackathon. The program helped me enhance my skills and gain practical experience.',
  },
  {
    image: 'https://csoc.codeshack.codes/static/assets/img/clients/om1.jpg',
    qualification: 'Web Development',
    name: 'Om Singh',
    message: 'Joining the mentorship program and participating in the club\'s hackathon made me really happy and excited. Working with fellow tech-loving students, we had limited time to solve a challenge, but the mentors and my teammates were always there to help, and the community was friendly and encouraging',
  },
];

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
