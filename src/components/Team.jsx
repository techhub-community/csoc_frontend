import React, { useState } from "react";
import { teamMembers } from '../data/Teams';

const ITEMS_PER_PAGE = 6;

const Team = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imageLoaded, setImageLoaded] = useState({});

  const totalPages = Math.ceil(teamMembers.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  const paginatedMembers = teamMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-warm mx-auto py-8">
      <h1 className="text-4xl font-bold text-center">Team</h1>
      <p className="text-center text-3xl mt-2 mb-8">Collaboration Is Our Strength!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {
          paginatedMembers.map((member, index) => (
            <div key={`${member.name}-${index}`} className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                { !imageLoaded[(currentPage - 1) * ITEMS_PER_PAGE + index] && (
                  <div className="absolute inset-0 bg-gray-400 animate-pulse rounded-full"></div>
                )}
                <img
                  loading="lazy"
                  alt={member.name}
                  src={member.image}
                  onLoad={() => handleImageLoad((currentPage - 1) * ITEMS_PER_PAGE + index)}
                  className={`rounded-full object-cover w-40 h-40`}
                />
              </div>
              <h2 className="text-xl font-medium">{member.name}</h2>
            </div>
          ))
        }
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        {
          Array.from({ length: totalPages }, (_, index) => (
            <button
              key={`b-${index}`}
              className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default Team;
