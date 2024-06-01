import React, { useState } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-100">
      <div className="container mx-auto px-2">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold">{"<CODESHACK>"}</div>

          <div className="hidden md:flex space-x-8" style={{ alignItems: "center" }}>
            <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">About Us</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Timeline</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Contact Us</a>
            <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">Login</a>
          </div>

          <div className="md:hidden">
            <button className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded' onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "X" : "Menu"}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden" style={{ paddingBottom: "2rem" }}>
            <a href="#" className="block px-4 py-2 text-gray-600 hover:text-gray-800">Home</a>
            <a href="#" className="block px-4 py-2 text-gray-600 hover:text-gray-800">About Us</a>
            <a href="#" className="block px-4 py-2 text-gray-600 hover:text-gray-800">Timeline</a>
            <a href="#" className="block px-4 py-2 text-gray-600 hover:text-gray-800">Contact Us</a>
            <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded" style={{ position: "relative", top: "10px", left: "10px" }}>Login</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
