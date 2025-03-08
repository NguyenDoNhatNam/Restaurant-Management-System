import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AxiosInstance from "../../../utils/Axios";

const PaymentManagement = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await AxiosInstance.get("/api/orders/");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Include the latest order if navigated from Payment
  useEffect(() => {
    if (location.state && location.state.order) {
      setOrders((prevOrders) => [location.state.order, ...prevOrders]);
    }
  }, [location.state]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Payment Management</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-3 text-left">Order ID</th>
            <th className="border p-3 text-left">User Name</th>
            <th className="border p-3 text-left">Total Price</th>
            <th className="border p-3 text-left">Payment Method</th>
            <th className="border p-3 text-left">Order Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="border p-3">{order.id || "New Order"}</td>
              <td className="border p-3">{order.user_name}</td>
              <td className="border p-3">${order.total_price}</td>
              <td className="border p-3">{order.payment_method}</td>
              <td className="border p-3">
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.title} - {item.quantity} x ${item.price}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentManagement;
