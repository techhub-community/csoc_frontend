import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {teamMembers} from '../data/Teams'



const ITEMS_PER_PAGE = 6;

const Team = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(teamMembers.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedMembers = teamMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center">Team</h1>
      <p className="text-center text-3xl mt-2 mb-8">Collaboration Is Our Strength!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {paginatedMembers.map((member, index) => (
          <div key={index} className="text-center">
            <img
              src={member.image}
              alt={member.name}
              className="rounded-full mx-auto mb-4 w-40 h-40 object-cover"
            />
            <h2 className="text-xl font-medium">{member.name}</h2>
            <div className="mt-2 flex justify-center space-x-4">
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                {/* <FaGithub className="text-2xl" /> */}
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                {/* <FaLinkedin className="text-2xl" /> */}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Team;
