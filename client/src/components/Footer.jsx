import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo-SaferSpace.jpg"; // or wherever it's stored

const Footer = () => {
  const { t } = useTranslation("footer");

  return (
    <footer className="bg-pink-100 text-gray-700 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About Section with Logo */}
        <div>
          <img
            src={logo}
            alt="SaferSpace Logo"
            className="h-30 mb-2 mx-auto md:mx-0
            w-auto object-contain bg-pink-300 rounded-full shadow-md p-2 md:p-4"

          />
          <h3 className="text-lg font-bold text-green-700 mb-2">
            {t("about_title")}
          </h3>
          <p className="text-sm">{t("about_text")}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-green-700 mb-2">
            {t("quick_links")}
          </h3>
          <ul className="space-y-1">
            <li>
              <Link to="/community" className="hover:text-green-700">
                {t("stories")}
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-green-700">
                {t("services")}
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-green-700">
                {t("support")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-green-700 mb-2">
            {t("contact")}
          </h3>
          <p className="text-sm">{t("email")}: saferspace.kenya@gmail.com</p>
          <p className="text-sm">{t("phone")}: +254 717 796 098</p>
          <p className="text-sm">{t("linkedin")}: SaferSpace Kenya</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 border-t border-pink-200 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} SaferSpace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
