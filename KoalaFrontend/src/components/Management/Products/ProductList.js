import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import submission from "../../../utils/submission";
import { Edit, Trash, SearchIcon } from "lucide-react";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/drm1mr9va/";

const ProductList = ({ handleEditProduct }) => {
  const { tokens } = useAuth();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokens || !tokens.access) {
      navigate("/product-management");
    }
  }, [tokens, navigate]);

  const loadProducts = useCallback(async () => {
    if (!tokens?.access) return;
    try {
      const response = await submission("management_product/", "get", null, {
        Authorization: `Bearer ${tokens.access}`,
      });
      setProducts(response);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }, [tokens?.access]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDeleteProduct = async (productId) => {
    try {
      await submission(`management_product/${productId}`, "delete", null, {
        Authorization: `Bearer ${tokens.access}`,
      });
      setProducts(products.filter((prod) => prod.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Logic for filtering products based on search query
  const filteredProducts = products.filter((product) =>
    `${product.food_name} ${product.category} ${product.price} ${product.stock}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold">Product List</h2>
      <div className="flex items-center p-4">
        <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="p-2 bg-gray-100 rounded-md focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
        />
      </div>
      <table className="w-full table-auto mt-4">
        <thead>
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="border p-2 flex justify-center items-center">
                <img
                  src={`${CLOUDINARY_BASE_URL}${product.image}`}
                  alt={product.food_name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border p-2">{product.food_name}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">{product.price}</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2">{product.status}</td>
              <td className="border p-2">{product.description}</td>
              <td className="border p-2 flex space-x-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
