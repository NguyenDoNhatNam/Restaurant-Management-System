import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import submission from '../../../utils/submission';
import { jwtDecode } from "jwt-decode";
const ProductForm = ({ formData, setFormData, handleAddProduct, isEditing, handleCancel }) => {
    const { tokens } = useAuth();
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (isEditing && formData.food_name) {
            if (formData.imageFile) {
                setPreviewImage(URL.createObjectURL(formData.imageFile));
            } else if (formData.image) {
                setPreviewImage(formData.image);
            }
        }
    }, [isEditing, formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                imageFile: file,
            });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const accessToken = tokens?.access;
        if (!accessToken) {
            console.error("Access token not found.");
            return;
        }


        try {
            const formDataToSend = new FormData();
            const decoded = jwtDecode(accessToken);
            const userId = decoded.user_id;
            if (formData.imageFile) {
                formDataToSend.append('image', formData.imageFile);
            } else if (formData.image) {
                formDataToSend.append('image', formData.image);
            }
            formDataToSend.append('description', formData.description);
            formDataToSend.append('food_name', formData.food_name);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('stock', formData.stock);
            formDataToSend.append('status', formData.status);
            formDataToSend.append('manager', userId)
            for (let [key, value] of formDataToSend.entries()) {
                console.log(`${key}:`, value);
            }
            const method = isEditing ? 'put' : 'post';
            const url = isEditing ? `management_product/${formData.id}/` : 'management_product/';

            const response = await submission(url, method, formDataToSend, {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            });

            if (response) {
                handleAddProduct(response.data);
            } else {
                console.error('Failed to add product:', response);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const fields = [
        { name: 'food_name', type: 'text', placeholder: 'Product Name' },
        { name: 'category', type: 'text', placeholder: 'Category' },
        { name: 'price', type: 'number', placeholder: 'Price', min: 0, step: '0.01' },
        { name: 'stock', type: 'number', placeholder: 'Stock', min: 0, step: '1' },
        { name: 'description', type: 'text', placeholder: 'Description' },
    ];

    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4 max-h-[80vh] w-[500px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">
                {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>

            {fields.map((field) => (
                <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder || ''}
                    className="border p-2 rounded mb-4 w-full"
                />
            ))}

            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 rounded mb-4 w-full"
            >
                <option value="Available">Available</option>
                <option value="Stock Out">Stock Out</option>
            </select>

            <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="border p-2 rounded mb-4 w-full"
                accept="image/*"
            />
            {previewImage && (
                <img
                    src={previewImage}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded mb-4"
                />
            )}

            <div className="flex justify-between">
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    {isEditing ? 'Update Product' : 'Add Product'}
                </button>
                <button
                    onClick={handleCancel}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ProductForm;
