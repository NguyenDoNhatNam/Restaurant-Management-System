import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext"; // Assuming the same AuthContext is used for authentication
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import submission from "../../../utils/submission"; // Assuming there's a utility for handling API requests

const ProductManagement = () => {
    const { tokens } = useAuth();
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        food_name: "",
        category: "",
        price: 0,
        stock: 0,
        status: "Available",
        imageFile: null,
    });

    const [editingId, setEditingId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!tokens?.access) return;
            try {
                const data = await submission("management_product/", "get", null, {
                    Authorization: `Bearer ${tokens.access}`,
                });
                setProducts(data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchProducts();
    }, [tokens]);

    const handleAddOrUpdateProduct = (newProduct) => {
        if (editingId !== null) {
            setProducts(
                products.map((prod) =>
                    prod.id === editingId ? { ...prod, ...formData } : prod
                )
            );
        } else {
            setProducts([...products, newProduct]);
        }

        setFormData({
            food_name: "",
            category: "",
            price: 0,
            stock: 0,
            status: "Available",
            imageFile: null,
        });
        setEditingId(null);
        setIsFormVisible(false);
    };

    const handleEditProduct = (id) => {
        const product = products.find((prod) => prod.id === id);
        setFormData({ ...product });
        setEditingId(id);
        setIsFormVisible(true);
    };

    const handleDeleteProduct = async (id) => {
        try {
            await submission(`management_product/${id}/`, "delete", null, {
                Authorization: `Bearer ${tokens.access}`,
            });
            setProducts(products.filter((prod) => prod.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setFormData({
            food_name: "",
            category: "",
            price: 0,
            stock: 0,
            status: "Available",
            imageFile: null,
        });
        setEditingId(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>

            <button
                onClick={() => {
                    setIsFormVisible(!isFormVisible);
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-700 focus:outline-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Product
            </button>


            {isFormVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-[550px]">
                        <ProductForm
                            formData={formData}
                            setFormData={setFormData}
                            handleAddProduct={handleAddOrUpdateProduct}
                            isEditing={editingId !== null}
                            handleCancel={handleCancel}
                        />
                    </div>
                </div>
            )}

            <ProductList
                products={products}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
            />
        </div>
    );
};

export default ProductManagement;
