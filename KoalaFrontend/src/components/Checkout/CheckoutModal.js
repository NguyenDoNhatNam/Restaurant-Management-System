import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PaymentButton from "../Button/PaymentButton";
import Payment from "../Payment/Payment";

const CheckoutModal = ({
  cartItems,
  calculateTotalPrice,
  calculateGrandTotal,
  alwaysOpen,
}) => {
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showEmptyCartMessage, setShowEmptyCartMessage] = useState(false);

  const handleConfirmPaymentClick = () => {
    if (cartItems.length === 0) {
      setShowEmptyCartMessage(true);
    } else {
      setShowEmptyCartMessage(false);
      setShowPaymentPage(true);
    }
  };

  const handleGoBack = () => {
    setShowPaymentPage(false);
  };

  return (
    <AnimatePresence>
      {alwaysOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="bg-white shadow-lg z-50 p-8 rounded-lg"
        >
          {showPaymentPage ? (
            <Payment
              cartItems={cartItems}
              calculateGrandTotal={calculateGrandTotal}
              onGoBack={handleGoBack}
            />
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4 text-black">
                Order Summary
              </h2>
              {showEmptyCartMessage && (
                <p className="text-red-500 font-semibold mb-4">
                  Your cart is empty.
                </p>
              )}
              <ul className="mb-4">
                {cartItems.map((item, index) => (
                  <li key={index} className="mb-2 text-black">
                    {item.title} - {item.quantity} x {item.price} =
                    {calculateTotalPrice(item)}
                  </li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold mb-6 text-black">
                Grand Total: {calculateGrandTotal()}
              </h3>
              <div className="flex justify-center gap-4">
                <button onClick={handleConfirmPaymentClick}>
                  <PaymentButton />
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default CheckoutModal;
