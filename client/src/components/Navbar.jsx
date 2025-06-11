import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Logo from "../assets/logo-SaferSpace.jpg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation("navbar");

  const toggleMenu = () => setOpen(!open);

  const switchLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-green-700"
          >
            <img
              src={Logo}
              alt="SaferSpace Logo"
              className="h-12 w-12 object-cover rounded-full"
            />
            <span>{t("SaferSpace")}</span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <Link to="/community" className="hover:text-green-700 transition">
            {t("navbar.stories")}
          </Link>
          <Link to="/services" className="hover:text-green-700 transition">
            {t("navbar.services")}
          </Link>
          <Link to="/education" className="hover:text-green-700 transition">
            {t("navbar.education")}
          </Link>
          <Link to="/support" className="hover:text-green-700 transition">
            {t("navbar.support")}
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2 border border-green-200 rounded-full px-2 py-1 text-sm">
            <button
              onClick={() => switchLang("en")}
              className={`px-2 py-1 rounded-full ${
                i18n.language === "en"
                  ? "bg-green-600 text-white"
                  : "text-green-700"
              }`}
            >
              {t("english")}
            </button>
            <button
              onClick={() => switchLang("sw")}
              className={`px-2 py-1 rounded-full ${
                i18n.language === "sw"
                  ? "bg-green-600 text-white"
                  : "text-green-700"
              }`}
            >
              {t("kiswahili")}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none text-green-700"
          onClick={toggleMenu}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden px-4 pb-4"
          >
            <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
              <Link
                to="/community"
                onClick={() => setOpen(false)}
                className="block text-gray-700 font-medium px-4 py-2 rounded hover:bg-green-100 hover:text-green-700 transition"
              >
                {t("navbar.stories")}
              </Link>
              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className="block text-gray-700 font-medium px-4 py-2 rounded hover:bg-green-100 hover:text-green-700 transition"
              >
                {t("navbar.services")}
              </Link>
              <Link
                to="/support"
                onClick={() => setOpen(false)}
                className="block text-gray-700 font-medium px-4 py-2 rounded hover:bg-green-100 hover:text-green-700 transition"
              >
                {t("navbar.support")}
              </Link>
              <Link
                to="/education"
                onClick={() => setOpen(false)}
                className="block text-gray-700 font-medium px-4 py-2 rounded hover:bg-green-100 hover:text-green-700 transition"
              >
                {t("navbar.education")}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="flex justify-center gap-4 pt-2">
                <button
                  onClick={() => {
                    switchLang("en");
                    setOpen(false);
                  }}
                  className={`px-4 py-1 rounded-full text-sm ${
                    i18n.language === "en"
                      ? "bg-green-600 text-white"
                      : "text-green-700 border border-green-200"
                  }`}
                >
                  {t("navbar.english")}
                </button>
                <button
                  onClick={() => {
                    switchLang("sw");
                    setOpen(false);
                  }}
                  className={`px-4 py-1 rounded-full text-sm ${
                    i18n.language === "sw"
                      ? "bg-green-600 text-white"
                      : "text-green-700 border border-green-200"
                  }`}
                >
                  {t("navbar.kiswahili")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
