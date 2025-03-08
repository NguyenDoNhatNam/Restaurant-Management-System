import React, { useState } from "react";
import PaymethodButton from "../Button/PaymethodButton";
import GobackButton from "../Button/GobackButton";
import InvoiceModal from "./InvoiceModal";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../utils/Axios";

const Payment = ({ cartItems, calculateGrandTotal, onGoBack }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showInvoice, setShowInvoice] = useState(false);
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: "",
    expirationDate: "",
  });
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setValidationError("");
  };

  const validateInputs = () => {
    const cardNumberRegex = /^[0-9]{16}$/;
    const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;

    if (paymentMethod === "creditCard") {
      if (!cardNumberRegex.test(creditCardDetails.cardNumber)) {
        return "Card Number must be 16 digits.";
      }
      if (!expirationDateRegex.test(creditCardDetails.expirationDate)) {
        return "Expiration Date must be in MM/YYYY format.";
      }
    }
    return "";
  };

  const handleConfirmPayment = async () => {
    setShowInvoice(true);
    const error = validateInputs();
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError("");

    const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
    let customerId;
    try {
      const userResponse = await AxiosInstance.get("/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      customerId = userResponse.data.id;
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      return;
    }

    const orderData = {
      customer: customerId,
      status: "Pending",
      items: cartItems.map((item) => ({
        menu_item: item.id, // Assuming each item has an `id` field
        quantity: item.quantity,
      })),
    };

    try {
      // Send order data to backend
      const response = await AxiosInstance.post("/api/orders/", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Redirect to PaymentManagement page with the new order data
      navigate("/history", {
        state: { order: response.data },
      });
    } catch (err) {
      console.error("Failed to confirm payment:", err);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
  };

  const handleCreditCardChange = (field, value) => {
    setCreditCardDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white shadow-lg z-50 p-8 rounded-lg">
      {!showInvoice ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-black">
            Payment Options
          </h2>

          <h3 className="text-lg font-semibold mb-4 text-black">
            Order Summary:
          </h3>
          <ul className="mb-4">
            {cartItems.map((item, index) => (
              <li key={index} className="mb-2 text-black">
                {item.title} - {item.quantity} x {item.price} =
                {item.quantity * item.price}
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mb-6 text-black">
            Grand Total: {calculateGrandTotal()}
          </h3>

          <h3 className="text-lg font-semibold mb-4 text-black">
            Choose Payment Method:
          </h3>
          <div className="flex flex-col gap-2 mb-6">
            <label className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => handlePaymentMethodChange("cash")}
              />
              <span className="ml-2 text-black">Cash</span>
            </label>
            <label className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg">
              <input
                type="radio"
                name="payment"
                value="bankTransfer"
                checked={paymentMethod === "bankTransfer"}
                onChange={() => handlePaymentMethodChange("bankTransfer")}
              />
              <span className="ml-2 text-black">Bank</span>
            </label>
            <label className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg">
              <input
                type="radio"
                name="payment"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={() => handlePaymentMethodChange("creditCard")}
              />
              <span className="ml-2 text-black">Credit Card</span>
            </label>
          </div>

          {paymentMethod === "bankTransfer" && (
            <div className="mb-4 text-black">
              <p className="font-medium">Bank Transfer Instructions:</p>
              <p>Bank Name: TP Bank</p>
              <p>Account Number: 123456789</p>
              <p>Account Name: Koala Restaurant</p>
            </div>
          )}

          {paymentMethod === "creditCard" && (
            <div className="mb-4">
              <label className="block text-black">Card Number:</label>
              <input
                type="text"
                className="text-black shadow-lg focus:border-2 border-gray-300 px-3 py-2 rounded-xl w-56"
                value={creditCardDetails.cardNumber}
                onChange={(e) =>
                  handleCreditCardChange(
                    "cardNumber",
                    e.target.value.replace(/[^0-9]/g, "")
                  )
                }
                maxLength={16}
              />
              <label className="block text-black mt-4">
                Expiration Date (MM/YYYY):
              </label>
              <input
                type="text"
                className="text-black shadow-lg focus:border-2 border-gray-300 px-3 py-2 rounded-xl w-56"
                value={creditCardDetails.expirationDate}
                onChange={(e) =>
                  handleCreditCardChange("expirationDate", e.target.value)
                }
                placeholder="MM/YYYY"
              />
            </div>
          )}

          {validationError && (
            <p className="text-red-500 font-semibold mb-4">{validationError}</p>
          )}

          <div className="flex justify-between">
            <button onClick={onGoBack}>
              <GobackButton />
            </button>
            <button onClick={handleConfirmPayment}>
              <PaymethodButton />
            </button>
          </div>
        </>
      ) : (
        <InvoiceModal
          cartItems={cartItems}
          grandTotal={calculateGrandTotal()}
          paymentMethod={paymentMethod}
          onClose={handleCloseInvoice}
          onPrint={handlePrintInvoice}
        />
      )}
    </div>
  );
};

export default Payment;
