import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Bookmark, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    {
      name: "Watchlist",
      path: "/watchlist",
      icon: <Bookmark className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
           <Link to={"/"}>  <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-extrabold text-xl">🎬</span>
            </div>
            <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-500">
              CineMax
            </h1>
          </div></Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 text-lg font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-black border-b-2 border-cyan-400"
                    : "text-cyan-600 hover:text-black"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-cyan-500 hover:text-black transition-all duration-300"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  location.pathname === link.path
                    ? "bg-cyan-700 text-white"
                    : "text-cyan-600 hover:bg-gray-200"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
