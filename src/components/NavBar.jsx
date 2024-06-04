import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

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
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  <BiLogOut className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
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
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 ml-3 flex items-center py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded"
                >
                  <BiLogOut className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="block px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  About Us
                </a>
                <a
                  href="#timeline"
                  className="block px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Timeline
                </a>
                <a
                  href="#contact"
                  className="block px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Contact Us
                </a>
                <Link
                  to="/auth"
                  className="ml-3 block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
