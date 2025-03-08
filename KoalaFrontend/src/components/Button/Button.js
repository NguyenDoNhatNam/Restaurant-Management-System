import React from "react";

const Button = (props) => {
  return (
    <div>
      <button
        className="px-6 py-1 border-2 border-white bg-primary hover:text-white transition-all rounded-full"
        onClick={props.onClick}
      >
        {props.title}
      </button>
    </div>
  );
};

export default Button;
