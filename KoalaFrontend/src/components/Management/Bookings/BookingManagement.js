import React, { useState, useEffect } from "react";
import submission from "../../../utils/submission";
import { useAuth } from "../../../contexts/AuthContext";

const BookingManagement = () => {
  const { tokens } = useAuth();
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await submission("customer_booking/", "get", null, {
          Authorization: `Bearer ${tokens?.access}`,
        });
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Failed to load bookings.");
      }
    };

    fetchBookings();
  }, [tokens]);

  // Handle deleting a booking
  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }
    try {
      await submission(`customer_booking/${id}/`, "delete", null, {
        Authorization: `Bearer ${tokens?.access}`,
      });
      setBookings(bookings.filter((booking) => booking.id !== id));
      alert("Booking deleted successfully.");
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Booking Management</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-md shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Time</th>
                <th className="px-4 py-2 border">Guests</th>
                <th className="px-4 py-2 border">Note</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{booking.customer_name}</td>
                  <td className="px-4 py-2 border">{booking.phone_number}</td>
                  <td className="px-4 py-2 border">{booking.date}</td>
                  <td className="px-4 py-2 border">{booking.time}</td>
                  <td className="px-4 py-2 border">{booking.number_of_guest}</td>
                  <td className="px-4 py-2 border">{booking.note || "None"}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteBooking(booking.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
