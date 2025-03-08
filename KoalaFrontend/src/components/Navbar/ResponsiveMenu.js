import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const ResponsiveMenu = ({ open, handleScrollTo }) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20"
        >
          <div className="text-xl font-semibold bg-primary text-white py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-10">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-gray-300">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-gray-300">
                  Booking
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
