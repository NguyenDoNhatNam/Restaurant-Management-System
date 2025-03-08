import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import submission from "../../utils/submission";
import Rating from "./Rating";
import Button from "../Button/Button";
import Accordion from "../../components/ui/Accordion";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/drm1mr9va/";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const isLoggedIn = !!localStorage.getItem("authToken");

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await submission(`show_item/${id}`, "get");
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Product not found or failed to load.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    const getCustomerIdFromToken = () => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decoded = jwtDecode(token);
            return decoded?.user_id;
        }
        return null;
    };

    const handleAddToCart = async () => {
        const customerId = getCustomerIdFromToken();
        if (!customerId) {
            alert("Customer not logged in. Please login first.");
            navigate("/login");
            return;
        }

        const cartData = {
            customer: customerId,
            menu_item: product.id,
            quantity: quantity,
        };

        try {
            const response = await submission("cart/", "post", cartData,
                {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Retrieve the token
                    // Use the current token
                    "Content-Type": "application/json", // Ensure the correct content type
                }
            );
            console.log("Add to cart success:", response);




        } catch (error) {
            console.error("Failed to add to cart:", error);
            alert("Failed to add item to cart.");
        }
    };

    if (loading) {
        return <h1>Loading product...</h1>;
    }

    if (error) {
        return <h1 className="text-3xl font-bold text-red-500">{error}</h1>;
    }

    return (
        <div className="container mx-auto p-5">
            <div className="flex items-start">
                <div className="w-1/3 pr-4">
                    <img
                        src={`${CLOUDINARY_BASE_URL}${product.image}`}
                        alt={`${product.food_name}`}
                        className="w-full h-full object-contain rounded-lg"
                    />
                </div>

                <div className="w-2/3 pl-6">
                    <h1 className="text-4xl font-bold mb-4">{product.food_name}</h1>
                    <Rating rating={product.rating} />
                    <p className="mt-4">{product.description}</p>
                    <h2 className="text-2xl font-semibold text-green-600 mt-4">
                        Price: {product.price}
                    </h2>

                    <div className="mt-6 flex items-center">
                        <Button
                            title="-"
                            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                            className="px-4 py-2 text-lg border rounded-l border-gray-400 bg-gray-100 hover:bg-gray-200"
                        />
                        <input
                            type="number"
                            value={quantity}
                            readOnly
                            className="w-16 text-center text-black border-y p-2"
                        />
                        <Button
                            title="+"
                            onClick={() => setQuantity((prev) => prev + 1)}
                            className="px-4 py-2 text-lg border rounded-r border-gray-400 bg-gray-100 hover:bg-gray-200"
                        />
                    </div>

                    <div className="mt-6">
                        <Button
                            title={`Add to Cart - ${(product.price * quantity).toFixed(3)}`}
                            onClick={handleAddToCart}
                            className="px-6 py-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                        />
                    </div>

                    <div className="mt-6">
                        <Accordion title="Product Details">
                            <ul>
                                <li>High-quality ingredients</li>
                                <li>Prepared fresh daily</li>
                                <li>Authentic taste</li>
                                <li>Serving suggestion: 1-2 people</li>
                            </ul>
                        </Accordion>

                        <Accordion title="Nutritional Information">
                            <p>Calories: 200 per serving</p>
                            <p>Protein: 15g</p>
                            <p>Fat: 10g</p>
                        </Accordion>

                        <Accordion title="Serving Suggestions">
                            <p>Best served with soy sauce and wasabi.</p>
                            <p>Pair with a glass of chilled white wine.</p>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
