import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrRestaurant } from "react-icons/gr";
import { PiShoppingCartThin } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
import { SlideNav } from "./SlideNav";
import ResponsiveMenu from "./ResponsiveMenu";
import SwitchMode from "../Switchmode/SwitchMode";
import NavButton from "../Button/NavButton"; // Assuming this is the login button

const Navbar = ({ theme, setTheme }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("authToken");

    // Redirect to the login page after logging out
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <>
      {/* Fixed Navbar */}
      <nav>
        <div className="container flex justify-between items-center py-2">
          {/* Logo Section */}
          <Link
            to="/"
            className="text-2xl flex items-center gap-2 font-bold uppercase"
          >
            <GrRestaurant />
            <p>Restaurant</p>
            <p className="text-secondary">Koala</p>
          </Link>

          {/* SlideNav Section for Desktop */}
          <div className="hidden md:block">
            <SlideNav />
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-4">
            <SwitchMode selected={theme} setSelected={setTheme} />
            {/* Cart Link */}
            <Link
              to="/cart"
              className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200"
            >
              <PiShoppingCartThin />
            </Link>

            {/* Conditional rendering of Login/Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="font-medium text-base text-orange-500"
              >
                Log Out
              </button>
            ) : (
              <Link to="/login">
                <NavButton /> {/* Your Login Button Component */}
              </Link>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <MdMenu className="text-4xl" />
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Section */}
      <ResponsiveMenu open={open} handleScrollTo={handleScrollTo} />
    </>
  );
};

export default Navbar;
