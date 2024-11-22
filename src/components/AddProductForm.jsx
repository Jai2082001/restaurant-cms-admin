import React, { useEffect, useState } from 'react';
import axios from 'axios';
import aws from 'aws-sdk';


function AddProductForm() {
    const [categories, setCategories] = useState(['Main Course', 'Appteizers', 'Desert']);
    const [loading, setLoading] = useState(false);
    const S3Bucket = process.env.REACT_APP_S3;
    const Region = process.env.REACT_APP_REGION;
    const AccessKey = process.env.REACT_APP_ACCESS_KEY;
    const SecretAccessKey = process.env.REACT_APP_SECRET_ACCESS
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');


    aws.config.update({
        accessKeyId: AccessKey,
        secretAccessKey: SecretAccessKey,
        region: Region
    })


    const s3 = new aws.S3();

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
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('No file selected!');
            return;
        }

        setLoading(true);
        
        const params = {
            Bucket: S3Bucket,
            Key: selectedFile.name, // You can add unique naming logic here if needed
            Body: selectedFile,
            ContentType: selectedFile.type,
            ACL: 'public-read', // Set file access permission
        };

        try {
            const data = await s3.upload(params).promise();
            console.log('File uploaded successfully:', data.Location);
            setUploadedUrl(data.Location); // This is the URL of the uploaded file in S3
        } catch (err) {
            console.error('Error uploading file:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors


        // Input validation for product name (at least 6 characters)
        if (formData.productName.length < 6) {
            setError('Product name must be at least 6 characters long.');
            return;
        }
        if (!formData.category) {
            setError('Need an Category')
        }


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
            imageUrl: uploadedUrl,
            isVegan: formData.isVegan,
            isGlutenFree: formData.isGlutenFree,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BACK_END_LINK}/api/products`, {
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
            alert("Product added Successfully");
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Add New Food Product</h2>

            {error && <div className="text-red-500 mb-4">{error}</div>}

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
                        {categories.map((category, idx) => (
                            <option key={idx} value={category}>
                                {category}
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
                    value={formData.price}
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
                    value={formData.stockQuantity}
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
                    value={formData.sku}
                    onChange={handleChange}
                    className="block w-full mb-2 p-2 border rounded text-black"
                    required
                />
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
            </label>

            {/* <label>
                Image URL:
                <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="block w-full mb-2 p-2 border rounded text-black"
                />
            </label> */}

            <h2>Upload a file</h2>

            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>

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

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        </form>
    );
}

export default AddProductForm;
