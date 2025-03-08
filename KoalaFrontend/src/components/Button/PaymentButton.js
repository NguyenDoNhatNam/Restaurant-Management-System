import React from "react";

const PaymentButton = () => {
  return (
    <button className="cursor-pointer bg-orange-500 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-orange-600 hover:ring-2 hover:ring-orange-700 hover:shadow-xl hover:shadow-orange-500 focus:ring-orange-300 focus:shadow-orange-400 px-5 py-2">
      Confirm Products
    </button>
  );
};

export default PaymentButton;
