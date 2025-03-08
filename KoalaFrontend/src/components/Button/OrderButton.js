import React, { useState, useContext } from "react";
import { CartContext } from "../Order/CartContext";

const OrderButton = ({ product, quantity, buttonTitle }) => {
    const { addToCart } = useContext(CartContext);
    const [message, setMessage] = useState("");

    const handleAddToCart = () => {
        const productToAdd = {
            ...product,
            quantity: parseInt(quantity),
        };
        addToCart(productToAdd);
        console.log(productToAdd)
        setMessage("Added to cart successfully!");

        setTimeout(() => {
            setMessage("");
        }, 700);
    };

    return (
        <div>
            <button
                onClick={handleAddToCart}
                className="mt-2 px-10 py-2 bg-primary hover:bg-primary-dark text-white transition-all rounded-full"
            >
                {buttonTitle}
            </button>

            {message && (
                <div className="mt-3 text-green-500 font-semibold text-sm">
                    {message}
                </div>
            )}
        </div>
    );
};

export default OrderButton;
