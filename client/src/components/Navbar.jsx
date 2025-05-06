import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import Logo from '../assets/logo-SaferSpace.jpg'; 
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold text-green-700"
        >
          <img
            src={Logo}
            //"src/assets/logo-SaferSpace.jpg" // Replace with your actual logo path
            alt="SaferSpace Logo"
            className="h-16 w-18 object-cover rounded-full"
          />
          <span>SaferSpace</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/community" className="hover:text-green-700">
            Stories
          </Link>
          <Link to="/services" className="hover:text-green-700">
            Services
          </Link>
          <Link to="/support" className="hover:text-green-700">
            Support
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="bg-white rounded-xl shadow-lg p-4 space-y-3 animate-slide-down">
            <Link
              to="/community"
              onClick={() => setOpen(false)}
              className="block text-gray-700 font-medium px-4 py-2 rounded hover:bg-green-100 hover:text-green-700 transition"
            >
              📖 Stories
            </Link>
            <Link
              to="/services"
              onClick={() => setOpen(false)}
              className="block text-gray-700 font-medium px-4 py-2 rounded hover:bg-green-100 hover:text-green-700 transition"
            >
              🏥 Services
            </Link>
            <Link
              to="/support"
              onClick={() => setOpen(false)}
              className="block text-gray-700 font-medium px-4 py-2 rounded hover:bg-green-100 hover:text-green-700 transition"
            >
              🤝 Support
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
