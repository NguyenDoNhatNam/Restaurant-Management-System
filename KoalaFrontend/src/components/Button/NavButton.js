import React from "react";

const NavButton = () => {
  return (
    <button className="overflow-hidden relative w-32 h-10 border-2 border-slate-300 rounded-md text-xl font-bold cursor-pointer z-10 group">
      Login
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left" />
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-orange-300 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left" />
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-orange-500 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left" />
      <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute left-9 z-10">
        Login
      </span>
    </button>
  );
};

export default NavButton;
