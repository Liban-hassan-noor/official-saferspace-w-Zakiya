import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-pink-100 text-gray-700 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold text-green-700 mb-2">SaferSpace</h3>
          <p className="text-sm">
            A safe, anonymous platform for girls and women in Northern Kenya to
            heal, connect, and grow stronger together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-green-700 mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/community" className="hover:text-green-700">
                Stories
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-green-700">
                Health Services
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-green-700">
                Professional Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact or Social (optional) */}
        <div>
          <h3 className="text-lg font-bold text-green-700 mb-2">Contact</h3>
          <p className="text-sm">Email: support@saferspace.co.ke</p>
          <p className="text-sm">Phone: +254 700 000 000</p>
          <div className="mt-2 space-x-3">
            {/* You can add social icons here */}
            <a href="#" className="text-green-700 hover:underline text-sm">
              Instagram
            </a>
            <a href="#" className="text-green-700 hover:underline text-sm">
              WhatsApp
            </a>
          </div>
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
