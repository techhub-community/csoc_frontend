import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import useSmoothScroll from "../hooks/useSmoothScroll";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const scroll = useSmoothScroll();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 w-full z-50">
      <div className="container mx-auto px-2">
        <div className="flex justify-between items-center py-4">
          <Link to="/" onClick={() => scroll("/", "hero")}>
            <div className="text-2xl font-bold">{"<CODESHACK>"}</div>
          </Link>
          <div
            className="hidden md:flex space-x-6"
            style={{ alignItems: "center" }}
          >
            <a onClick={() => scroll("/", "hero")} className="text-gray-600 cursor-pointer hover:text-gray-800">
              Home
            </a>
            <a onClick={() => scroll("/", "about")} className="text-gray-600 cursor-pointer hover:text-gray-800">
              About Us
            </a>
            <a onClick={() => scroll("/", "timeline")} className="text-gray-600 cursor-pointer hover:text-gray-800">
              Timeline
            </a>
            <a onClick={() => scroll("/", "contact")} className="text-gray-600 cursor-pointer hover:text-gray-800">
              Contact Us
            </a>
            {
              isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  >
                    <BiLogOut className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </Link>
              )
            }
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
              onClick={() => scroll("/", "hero")}
              className="block w-fit px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Home
            </a>
            <a
              onClick={() => scroll("/", "about")}
              className="block w-fit px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              About Us
            </a>
            <a
              onClick={() => scroll("/", "timeline")}
              className="block w-fit px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Timeline
            </a>
            <a
              onClick={() => scroll("/", "contact")}
              className="w-fit block px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Contact Us
            </a>
            {
              isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="px-4 text-white py-2 mx-4 my-2 flex items-center w-fit rounded bg-sky-500 font-bold hover:bg-sky-600 cursor-pointer"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="mx-4 my-2 flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  >
                    <BiLogOut className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="ml-3 block w-fit bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </Link>
              )
            }
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
