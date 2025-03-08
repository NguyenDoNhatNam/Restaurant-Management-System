import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import submission from "../utils/submission";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { tokens } = useAuth();
  const [products, setProducts] = useState([]);

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

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
