import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddProductForm() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    


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
        imageUrl: '',
        isVegan: false,
        isGlutenFree: false
    });
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/categories");
                setCategories(response.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        const productData = {
            productName: formData.productName,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            stockQuantity: parseInt(formData.stockQuantity, 10),
            sku: formData.sku,
            ingredients: formData.ingredients,
            nutritionalInfo: formData.nutritionalInfo,
            expirationDate: formData.expirationDate,
            imageUrl: formData.imageUrl,
            isVegan: formData.isVegan,
            isGlutenFree: formData.isGlutenFree,
        };

        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('Product added successfully:', data);
            alert("Product added Successfully")
        } catch (error) {
            console.error('Error adding product:', error);
        }


    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Add New Food Product</h2>

            <label>
                Product Name:
                <input type="text" name="productName" value={formData.productName} onChange={handleChange} className="block w-full mb-2 p-2 border rounded text-black" required />
            </label>

            <label>
                Description:
                <textarea name="description" value={formData.description} onChange={handleChange} className="block w-full mb-2 p-2 border rounded text-black" />
            </label>
            <label>
                Category:
                {loading ? (
                    <div className="mb-2 text-gray-500">Loading categories...</div>
                ) : (
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="block w-full mb-2 p-2 border rounded text-black"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                )}
            </label>

            <label>
                Price:
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="block w-full mb-2 p-2 border rounded text-black" required />
            </label>

            <label>
                Category:
                <input type="text" name="category" value={formData.category} onChange={handleChange} className="block w-full mb-2 p-2 border rounded text-black" required />
            </label>

            <label>
                Stock Quantity:
                <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} className="block w-full mb-2 p-2 border rounded text-black" required />
            </label>

            <label>
                SKU:
                <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="block w-full mb-2 p-2 border rounded text-black" required />
            </label>

            <label>
                Ingredients:
                <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} className="block w-full mb-2 p-2 border rounded text-black" />
            </label>

            <label>
                Nutritional Information:
                <textarea name="nutritionalInfo" value={formData.nutritionalInfo} onChange={handleChange} className="block w-full mb-2 p-2 border rounded text-black" />
            </label>

            <label>
                Expiration Date:
                <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} className="block w-full mb-2 p-2 border rounded text-black" />
            </label>

            <label>
                Image URL:
                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="block w-full mb-2 p-2 border rounded text-black" />
            </label>

            <label className="flex items-center mb-2">
                <input type="checkbox" name="isVegan" checked={formData.isVegan} onChange={handleChange} className="mr-2" />
                Is Vegan
            </label>

            <label className="flex items-center mb-4">
                <input type="checkbox" name="isGlutenFree" checked={formData.isGlutenFree} onChange={handleChange} className="mr-2" />
                Is Gluten-Free
            </label>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        </form>
    );
}

export default AddProductForm;