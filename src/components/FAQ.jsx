import React, { useState } from 'react';
import { faqs } from "../data/FAQ";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const FAQItem = ({ question, answer, isActive, onClick }) => {
  return (
    <div id='faq' className={`faq-item border-b border-gray-200 p-5 cursor-pointer transition-transform duration-300 ${
        isActive && 'transform scale-105 bg-gray-100 transition-transform'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className={`text-xl font-semibold ${isActive && 'text-coral'}`}>{question}</h3>
        {isActive ? (
          <FaChevronUp className="w-6 h-6 text-gray-500" />
        ) : (
          <FaChevronDown className="w-6 h-6 text-gray-500" />
        )}
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isActive ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <p className="mt-2 text-gray-700">{answer}</p>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container mx-auto my-6 px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold py-10" style={{ textAlign: 'center' }}>FAQ</h1>
      {
        faqs.map((faq, index) => (
          <FAQItem
            key={index}
            answer={faq.answer}
            question={faq.question}
            isActive={activeIndex === index}
            onClick={() => handleClick(index)}
          />
        ))
      }
    </div>
  );
};
