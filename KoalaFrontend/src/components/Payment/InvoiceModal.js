import React from "react";

const InvoiceModal = ({ cartItems, grandTotal, paymentMethod, onClose, onPrint }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[550px]">
        <h2 className="text-2xl font-bold mb-4 text-black">Invoice</h2>
        <ul className="mb-4 text-black">
          {cartItems.map((item, index) => (
            <li key={index} className="mb-2">
              {item.title} - {item.quantity} x {item.price} =
              {item.quantity * item.price}
            </li>
          ))}
        </ul>
        <p className="font-semibold text-black mb-4">
          Grand Total: {grandTotal}
        </p>
        <p className="font-semibold text-black mb-6">
          Payment Method: {paymentMethod}
        </p>
        <div className="flex justify-between">
          <button
            onClick={onPrint}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Print Invoice
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;