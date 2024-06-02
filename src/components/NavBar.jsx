import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 w-full z-50">
      <div className="container mx-auto px-2">
        <div className="flex justify-between items-center py-4">
          <Link to="/">
            <div className="text-2xl font-bold">{"<CODESHACK>"}</div>
          </Link>
          <div
            className="hidden md:flex space-x-8"
            style={{ alignItems: "center" }}
          >
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Home
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-800">
              About Us
            </a>
            <a href="#timeline" className="text-gray-600 hover:text-gray-800">
              Timeline
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-800">
              Contact Us
            </a>
            <Link
              to="/auth"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          </div>

          <div className="md:hidden">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <IoClose /> : <GiHamburgerMenu />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden" style={{ paddingBottom: "2rem" }}>
            <a
              href="#"
              className="block px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              About Us
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Timeline
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Contact Us
            </a>
            <Link
              to="/auth"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded relative top-2 left-2"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
