import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
    const [siteName, setSiteName] = useState('');
    const [logoDataUrl, setLogoDataUrl] = useState('');
    const [bannerDataUrl, setBannerDataUrl] = useState('');
    const [products, setProducts] = useState('');
    const [availableProducts, setAvailableProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentLogo, setCurrentLogo] = useState('');
    const [currentBanner, setCurrentBanner] = useState('');

    // Fetch current images and products on component mount
    useEffect(() => {
        // Mock fetch for current images and available products
        const fetchData = async () => {
            // Simulated current images
            const currentData = {
                siteName: 'My E-commerce Site',
                logo: 'https://via.placeholder.com/330', // Replace with your actual URL
                banner: 'https://via.placeholder.com/330', // Replace with your actual URL
                products: ['Product A', 'Product B'], // Replace with actual product names from your DB
            };
            // Simulated available products
            const productsData = ['Product A', 'Product B', 'Product C', 'Product D'];

            setSiteName(currentData.siteName);
            setCurrentLogo(currentData.logo);
            setCurrentBanner(currentData.banner);
            setAvailableProducts(productsData);
            setSelectedProducts(currentData.products);
            setLogoDataUrl(currentData.logo);
            setBannerDataUrl(currentData.banner);
        };

        fetchData();
    }, []);

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoDataUrl(reader.result); // Set the Data URL for the logo
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBannerChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerDataUrl(reader.result); // Set the Data URL for the banner
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProductSelection = (product) => {
        if (selectedProducts.includes(product)) {
            setSelectedProducts(selectedProducts.filter((p) => p !== product));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Site Name:', siteName);
        console.log('Logo Data URL:', logoDataUrl);
        console.log('Banner Data URL:', bannerDataUrl);
        console.log('Selected Products:', selectedProducts);

        // Here you can save the data to your database or send it to your server
        // Example: saveData({ siteName, logoDataUrl, bannerDataUrl, selectedProducts });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <div>
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name:</label>
                    <input
                        type="text"
                        id="siteName"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        required
                        className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2"
                    />
                </div>
                <div>
                    <label htmlFor="logoUpload" className="block text-sm font-medium text-gray-700">Upload Logo:</label>
                    <input
                        type="file"
                        id="logoUpload"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                    />
                </div>
                <div>
                    <label htmlFor="bannerUpload" className="block text-sm font-medium text-gray-700">Upload Banner Image:</label>
                    <input
                        type="file"
                        id="bannerUpload"
                        accept="image/*"
                        onChange={handleBannerChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                    />
                </div>
                <div>
                    <h2 className="block text-sm font-medium text-gray-700">Available Products:</h2>
                    <ul className="mt-2 space-y-1">
                        {availableProducts.map((product) => (
                            <li key={product} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={product}
                                    checked={selectedProducts.includes(product)}
                                    onChange={() => handleProductSelection(product)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor={product} className="ml-2 block text-sm text-gray-700">{product}</label>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-md">
                    Save Changes
                </button>
            </form>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Preview</h2>
                {bannerDataUrl && (
                    <div className="banner-preview mb-4">
                        <h3 className="text-lg font-medium">Banner Preview</h3>
                        <img src={bannerDataUrl} alt="Banner" className="mt-2 rounded-md shadow-md" />
                    </div>
                )}
                {logoDataUrl && (
                    <div className="logo-preview mb-4">
                        <h3 className="text-lg font-medium">Logo Preview</h3>
                        <img src={logoDataUrl} alt="Logo" className="mt-2 rounded-md shadow-md" />
                    </div>
                )}
                <h3 className="text-lg font-medium">Site Name: {siteName}</h3>
                <h3 className="text-lg font-medium">Selected Products:</h3>
                <ul>
                    {selectedProducts.map((product) => (
                        <li key={product} className="text-gray-700">{product}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPanel;
