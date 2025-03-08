import React, { useContext, useEffect, useCallback } from "react";
import { CartContext } from "../components/Order/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import CheckoutModal from "../components/Checkout/CheckoutModal";
import submission from "../utils/submission";
import { jwtDecode } from "jwt-decode";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/drm1mr9va/";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const fetchCartItems = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const decoded = jwtDecode(token);
      const customerId = decoded?.user_id;

      const response = await submission(
        `cart-detail/?customer=${customerId}`,
        "get",
        null,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );

      if (response.data && response.data.items) {
        const formattedCartItems = response.data.items.map((item) => ({
          image: item.menu_item.image,
          food_name: item.menu_item.food_name,
          category: item.menu_item.category,
          price: parseFloat(item.menu_item.price.replace(".", "")),
          quantity: item.quantity,
          stock: item.menu_item.stock,
          description: item.menu_item.description,
        }));
        setCartItems(formattedCartItems);
      } else {
        console.warn("Cart is empty or invalid response structure.");
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setCartItems([]);
    }
  }, [setCartItems]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const calculateTotalPrice = (item) => item.price * item.quantity;

  const calculateGrandTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const incrementQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
  };

  const decrementQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8 px-5 lg:px-20">
        <div className="flex-1">
          {cartItems.length === 0 ? (
            <p className="text-center text-lg">Your cart is empty</p>
          ) : (
            <div className="space-y-8">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start bg-gray-100 shadow-md rounded-lg p-5"
                >
                  <div className="w-1/4">
                    <img
                      src={`${CLOUDINARY_BASE_URL}${item.image}`}
                      alt={item.food_name}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>

                  <div className="ml-5 flex flex-col justify-between w-2/3 space-y-4">
                    <h2 className="text-xl font-semibold text-black">
                      {item.food_name}
                    </h2>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decrementQuantity(index)}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        <FaMinus className="text-black" />
                      </button>
                      <span className="font-semibold text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementQuantity(index)}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        <FaPlus className="text-black" />
                      </button>
                    </div>

                    <p className="font-semibold text-lg text-black">
                      Total: {calculateTotalPrice(item)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:w-1/3">
          <CheckoutModal
            cartItems={cartItems}
            calculateTotalPrice={calculateTotalPrice}
            calculateGrandTotal={calculateGrandTotal}
            closeModal={() => {}}
            confirmPayment={() => alert("Payment confirmed!")}
            alwaysOpen={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
