// EditProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Dropdown from './Dropdown';

function EditProductForm() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, changeLoading] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [product, setProduct] = useState({
        _id: '',
        productName: '',
        description: '',
        price: 0,
        category: '',
        stockQuantity: 0,
        sku: '',
        ingredients: '',
        nutritionalInfo: '',
        expirationDate: '',
        imageUrl: '',
        isVegan: false,
        isGlutenFree: false,
    });
    useEffect(() => {

        changeLoading(true)
        fetchProducts();

    }, []);


    const fetchProducts = async () => {

        const fetchCategories = async () => {

            const response = await axios.get(`${process.env.REACT_APP_BACK_END_LINK}/api/categories`);
            setCategories(response.data.data);

        };


        try {
            await fetchCategories()
            const response = await axios.get(`${process.env.REACT_APP_BACK_END_LINK}/api/products`);
            console.log(response)
            setProducts(response.data);
            changeLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACK_END_LINK}/api/products/${product._id}`, {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            if (response.ok) {
                const updatedProduct = await response.json();
            } else {
                console.error('Error updating product:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    console.log(product)

    return (
        <>
            {loading && <Loader></Loader>}
            {!loading &&
                <>
                    <select
                        value={selectedProductId}
                        onChange={
                            (e) => {
                                products.map((single) => {
                                    if (single.productName == e.target.value) {
                                        setProduct(single)
                                    }
                                })
                                setSelectedProductId(e.target.value)
                                

                            }
                        }
                        className="mt-4 text-black mb-4 p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                            <option className='text-black' key={product.id} value={product.productName}>
                                <p className='text-black'>{product.productName}</p>
                            </option>
                        ))}
                    </select>

                    {selectedProductId &&


                        <>
                            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-md rounded-md">
                                <h2 className="text-2xl font-bold mb-4">Edit Food Product</h2>

                                <label>
                                    Product Name:
                                    <input
                                        type="text"
                                        name="productName"
                                        value={product.productName}
                                        onChange={handleChange}
                                        className="block w-full mb-2 p-2 border rounded text-black"
                                        required
                                    />
                                </label>

                                <label>
                                    Description:
                                    <textarea
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}
                                        className="block w-full mb-2 p-2 border rounded text-black"
                                    />
                                </label>

                                <label>
                                    Category:
                                    {loading ? (
                                        <div className="mb-2 text-gray-500">Loading categories...</div>
                                    ) : (
                                        <select
                                            name="category"
                                            value={product.category}
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
                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        className="block w-full mb-2 p-2 border rounded text-black"
                                        required
                                    />
                                </label>

                                <label>
                                    Stock Quantity:
                                    <input
                                        type="number"
                                        name="stockQuantity"
                                        value={product.stockQuantity}
                                        onChange={handleChange}
                                        className="block w-full mb-2 p-2 border rounded text-black"
                                        required
                                    />
                                </label>

                                <label>
                                    SKU:
                                    <input
                                        type="text"
                                        name="sku"
                                        value={product.sku}
                                        onChange={handleChange}
                                        className="block w-full mb-2 p-2 border rounded text-black"
                                        required
                                    />
                                </label>

                                <label>
                                    Ingredients:
                                    <textarea
                                        name="ingredients"
                                        value={product.ingredients}
                                        onChange={handleChange}
                                        className="block w-full mb-2 p-2 border rounded text-black"
                                    />
                                </label>

                                <label>
                                    Nutritional Information:
                                    <textarea
                                        name="nutritionalInfo"
                                        value={product.nutritionalInfo}
                                        onChange={handleChange}
                                        className="block w-full mb-2 p-2 border rounded text-black"
                                    />
                                </label>

                                <label>
                                    Expiration Date:
                                    <input
                                        type="date"
                                        name="expirationDate"
                                        value={product.expirationDate.split('T')[0]} // Format date
                                        onChange={handleChange}
                                        className="block w-full mb-2 p-2 border rounded text-black"
                                    />
                                </label>

                                <label>
                                    Image URL:
                                    <input
                                        type="url"
                                        name="imageUrl"
                                        value={product.imageUrl}
                                        onChange={handleChange}
                                        className="block w-full mb-2 p-2 border rounded text-black"
                                    />
                                </label>

                                <label className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        name="isVegan"
                                        checked={product.isVegan}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Is Vegan
                                </label>

                                <label className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        name="isGlutenFree"
                                        checked={product.isGlutenFree}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Is Gluten-Free
                                </label>

                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Product</button>
                            </form>

                        </>
                    }

                </>

            }
        </>
    );
}

export default EditProductForm;
