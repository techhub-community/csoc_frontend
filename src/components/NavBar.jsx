import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import useSmoothScroll from "../hooks/useSmoothScroll";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, role } = useAuthStore();
  const scroll = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "About Us", id: "about" },
    { name: "Timeline", id: "timeline" },
    { name: "Resources", id: "resources" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact Us", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 shadow-lg py-3"
          : "bg-zinc-950/0 py-5"
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" onClick={() => scroll("/", "hero")} className="group flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-500 group-hover:from-white group-hover:to-neon transition-all duration-500">
              {"<CODESHACK/>"}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                onClick={() => scroll("/", link.id)}
                className="relative text-sm lg:text-base font-medium text-zinc-300 hover:text-white px-3 py-2 rounded-md transition-colors group cursor-pointer"
              >
                {link.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-neon transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            ))}

            {/* Auth section desktop */}
            <div className="flex items-center pl-4 border-l border-zinc-700 ml-2 space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to={`/${role || 'mentee'}/dashboard`}
                    className="text-zinc-300 hover:text-neon text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={`/${role || 'mentee'}/assignments`}
                    className="text-zinc-300 hover:text-neon text-sm font-medium transition-colors"
                  >
                    Assignments
                  </Link>
                  <Link
                    to={`/${role || 'mentee'}/quizzes`}
                    className="text-zinc-300 hover:text-neon text-sm font-medium transition-colors"
                  >
                    Quizzes
                  </Link>
                  <Link
                    to="/profile"
                    className="text-zinc-300 hover:text-neon text-sm font-medium transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-zinc-800 hover:bg-red-500/20 text-zinc-300 hover:text-red-500 border border-zinc-700 hover:border-red-500/50 text-sm font-semibold py-2 px-4 rounded-full transition-all duration-300"
                  >
                    <BiLogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="relative overflow-hidden group bg-neon hover:bg-green-400 text-zinc-950 font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)]"
                >
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              className="text-zinc-300 hover:text-neon transition-colors p-2 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <IoClose size={28} /> : <GiHamburgerMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-xl mt-3" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.id}
              onClick={() => {
                scroll("/", link.id);
                setIsOpen(false);
              }}
              className="text-lg font-medium text-zinc-300 hover:text-neon transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-4 mt-2 border-t border-zinc-800 flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <Link
                  to={`/${role || 'mentee'}/dashboard`}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-zinc-300 hover:text-neon transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to={`/${role || 'mentee'}/assignments`}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-zinc-300 hover:text-neon transition-colors"
                >
                  Assignments
                </Link>
                <Link
                  to={`/${role || 'mentee'}/quizzes`}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-zinc-300 hover:text-neon transition-colors"
                >
                  Quizzes
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-zinc-300 hover:text-neon transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                >
                  <BiLogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="text-center bg-neon hover:bg-green-400 text-zinc-950 font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.2)]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;