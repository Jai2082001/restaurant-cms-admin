import React, { useState } from 'react';
import axios from 'axios';

function AddProductForm() {
    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        price: '',
        category: '',
        stockQuantity: '',
        sku: '',
        ingredients: '',
        nutritionalInfo: '',
        expirationDate: '',
        imageFile: null,
        isVegan: false,
        isGlutenFree: false
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const categories = ["Main Course", "Appetizers", "Desserts", "Drinks"];

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        });
    };

    const validateForm = () => {
        let errors = {};

        if (!formData.productName.trim()) {
            errors.productName = 'Product name is required and should only contain letters';
        } else if (!/^[A-Za-z\s]+$/.test(formData.productName)) {
            errors.productName = 'Product name should contain only letters and spaces';
        }

        if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            errors.price = 'Price must be a positive number';
        }

        if (!formData.category) {
            errors.category = 'Category is required';
        }

        if (!formData.stockQuantity || isNaN(formData.stockQuantity) || parseInt(formData.stockQuantity, 10) < 0) {
            errors.stockQuantity = 'Stock Quantity must be a non-negative integer';
        }

        if (!formData.sku.trim()) {
            errors.sku = 'SKU is required';
        }

        if (formData.imageFile && !formData.imageFile.type.startsWith("image/")) {
            errors.imageFile = "Uploaded file must be an image (jpg, jpeg, png, etc.)";
        }

        if (formData.expirationDate && new Date(formData.expirationDate) < new Date()) {
            errors.expirationDate = 'Expiration date must be in the future';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setSuccessMessage("");

        const productData = new FormData();
        productData.append('productName', formData.productName);
        productData.append('description', formData.description);
        productData.append('price', parseFloat(formData.price));
        productData.append('category', formData.category);
        productData.append('stockQuantity', parseInt(formData.stockQuantity, 10));
        productData.append('sku', formData.sku);
        productData.append('ingredients', formData.ingredients);
        productData.append('nutritionalInfo', formData.nutritionalInfo);
        productData.append('expirationDate', formData.expirationDate);
        productData.append('isVegan', formData.isVegan);
        productData.append('isGlutenFree', formData.isGlutenFree);
        
        if (formData.imageFile) {
            productData.append('image', formData.imageFile);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/products', productData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setSuccessMessage("Product added successfully!");
            setFormData({
                productName: '',
                description: '',
                price: '',
                category: '',
                stockQuantity: '',
                sku: '',
                ingredients: '',
                nutritionalInfo: '',
                expirationDate: '',
                imageFile: null,
                isVegan: false,
                isGlutenFree: false
            });
        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Add New Food Product</h2>
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <label>
                Product Name:
                <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="block w-full mb-2 p-2 border rounded text-black"
                    required
                />
                {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
            </label>

            <label>
                Description:
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full mb-2 p-2 border rounded text-black"
                />
            </label>

            <label>
                Category:
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="block w-full mb-2 p-2 border rounded text-black"
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </label>

            <label>
                Price:
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="block w-full mb-2 p-2 border rounded text-black"
                    required
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </label>

            <label>
                Stock Quantity:
                <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    className="block w-full mb-2 p-2 border rounded text-black"
                    required
                />
                {errors.stockQuantity && <p className="text-red-500 text-sm">{errors.stockQuantity}</p>}
            </label>

            <label>
                SKU:
                <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className="block w-full mb-2 p-2 border rounded text-black"
                    required
                />
                {errors.sku && <p className="text-red-500 text-sm">{errors.sku}</p>}
            </label>

            <label>
                Ingredients:
                <textarea
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    className="block w-full mb-2 p-2 border rounded text-black"
                />
            </label>

            <label>
                Nutritional Information:
                <textarea
                    name="nutritionalInfo"
                    value={formData.nutritionalInfo}
                    onChange={handleChange}
                    className="block w-full mb-2 p-2 border rounded text-black"
                />
            </label>

            <label>
                Expiration Date:
                <input
                    type="date"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    className="block w-full mb-2 p-2 border rounded text-black"
                />
                {errors.expirationDate && <p className="text-red-500 text-sm">{errors.expirationDate}</p>}
            </label>

            <label>
                Image:
                <input
                    type="file"
                    name="imageFile"
                    onChange={handleChange}
                    className="block w-full mb-2 p-2 border rounded text-black"
                />
                {errors.imageFile && <p className="text-red-500 text-sm">{errors.imageFile}</p>}
            </label>

            <label className="flex items-center mb-2">
                <input
                    type="checkbox"
                    name="isVegan"
                    checked={formData.isVegan}
                    onChange={handleChange}
                    className="mr-2"
                />
                Is Vegan
            </label>

            <label className="flex items-center mb-4">
                <input
                    type="checkbox"
                    name="isGlutenFree"
                    checked={formData.isGlutenFree}
                    onChange={handleChange}
                    className="mr-2"
                />
                Is Gluten-Free
            </label>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? 'Adding Product...' : 'Add Product'}
            </button>
        </form>
    );
}

export default AddProductForm;
