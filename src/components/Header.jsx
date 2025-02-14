import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfo,
  FaBookOpen,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { StudentContext } from "../context/StudentContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setStudent } = useContext(StudentContext);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Courses", href: "/courses", icon: FaBookOpen },
    { name: "My Profie", href: "/home", icon: FaHome },
    { name: "Help", href: "/help", icon: FaEnvelope },
  ];

  const NavLink = ({ href, icon: Icon, name }) => {
    const isActive = window.location.pathname === href;
    return (
      <Link
        to={href}
        className={`flex items-center space-x-2 px-4 py-2 font-semibold rounded-lg transition-colors duration-200
          ${isActive ? "text-green-950" : "text-white hover:text-green-950"}`}
      >
        <span>{name}</span>
      </Link>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setStudent(null);
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-green-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/home"
              className="flex items-center space-x-2 text-white font-bold text-xl hover:text-green-950 transition-colors duration-200"
            >
              <span>EduX</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <NavLink key={link.name} {...link} />
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:text-green-950 transition-colors duration-200"
            >
              <FaSignOutAlt size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-white 
                hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? "Close main menu" : "Open main menu"}
              </span>
              {isOpen ? (
                <FaTimes className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden transition-all duration-200 ease-in-out`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-700">
          {navLinks.map((link) => (
            <NavLink key={link.name} {...link} />
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:text-green-9Zz50 transition-colors duration-200 w-full"
          >
            <FaSignOutAlt size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
