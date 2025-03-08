import React from "react";
import { Link } from "react-router-dom";

const Homepart = () => {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center lg:flex-row lg:justify-between items-center lg:px-32 px-5 gap-10"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-orange-900 opacity-90 z-0"></div>

      <div className="w-full lg:w-2/4 space-y-4 mt-14 lg:mt-0 relative z-10">
        <h1
          className="font-semibold text-5xl text-center lg:text-start leading-tight text-white"
          style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)" }}
        >
          Delight in every bite, where flavors meet perfection
        </h1>
        <p
          className="text-white text-center lg:text-start"
          style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)" }}
        >
          Savor fresh ingredients, crafted with passion for every occasion.
        </p>

        <div className="flex flex-row gap-6">
          <Link to="/menu">
            <button className="rounded-2xl border-2 border-dashed border-black bg-orange-400 px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
              Add to cart
            </button>
          </Link>
          <button
            className="rounded-2xl border-2 border-dashed border-black bg-orange-400 px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
            onClick={() => handleScrollTo("menu")}
          >
            More menu
          </button>
        </div>
      </div>

      <img
        src="/images/food.png"
        alt="Spinning Animation"
        className="w-[500px] rounded-full animate-spin relative z-10"
      />
    </div>
  );
};

export default Homepart;
