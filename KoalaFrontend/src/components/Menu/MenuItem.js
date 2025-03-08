import React from "react";
import { useInView } from "react-intersection-observer";
import { FaCheckSquare, FaTimesCircle } from "react-icons/fa";
import CartButton from "../Button/CartButton";
import { useNavigate } from "react-router-dom";
const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/drm1mr9va/";

const MenuItem = ({ item }) => {
  const { ref, inView } = useInView({ triggerOnce: false });
  const navigate = useNavigate();

  const handleAddToCart = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <div
      ref={ref}
      className={`flex justify-between items-center py-3 border-b border-gray-200 transition-all duration-500 ease-out transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <img
        src={`${CLOUDINARY_BASE_URL}${item.image}`}
        alt={`${item.food_name}`}
        className="w-16 h-16 object-cover rounded mr-4"
      />
      <span className="text-left w-1/4">{item.food_name}</span>
      <span className="text-center w-1/4 px-10">
        {item.stock > 0 ? (
          <FaCheckSquare className="text-green-500" />
        ) : (
          <FaTimesCircle className="text-red-500" />
        )}
      </span>
      <span className="text-center font-semibold w-1/4">{item.price}</span>

      <button onClick={handleAddToCart}>
        <CartButton />
      </button>
    </div>
  );
};

export default MenuItem;