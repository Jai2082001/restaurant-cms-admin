import axios from 'axios';
import React, { useState, useEffect } from 'react';
import aws from 'aws-sdk';

const AdminPanel = () => {
    const [siteName, setSiteName] = useState('');
    const [currentLogo, setCurrentLogo] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('');
    const [bannerNumber, setBannerNumber] = useState(0);
    const S3Bucket = process.env.REACT_APP_S3;
    const Region = process.env.REACT_APP_REGION;
    const AccessKey = process.env.REACT_APP_ACCESS_KEY;
    const SecretAccessKey = process.env.REACT_APP_SECRET_ACCESS
    const [logoFile, setLogoFile] = useState('');
    const [oldInfo, changeOldInfo] = useState({})
    const [products, changeProducts] = useState([])
    const [bannerFiles, setBannerFiles] = useState([])
    const [bannerLinks, setBannerLinks] = useState([]);

    // Fetch current images and products on component mount
    useEffect(() => {
        // Mock fetch for current images and available products
        const fetchData = async () => {
            // Simulated current images

            const response = await axios.get(`${process.env.REACT_APP_BACK_END_LINK}/api/get_info`).data
            const response2 = await axios.get(`${process.env.REACT_APP_BACK_END_LINK}/api/products`);

            console.log(response2.data);

            let currentData;

            if (!response) {
                currentData = {
                    siteName: 'My E-commerce Site',
                    carouselLength: 0,
                    // banner: 'https://via.placeholder.com/330', // Replace with your actual URL
                    products: [], // Replace with actual product names from your DB
                };
            } else {
                // currentData = {
                //     siteName: response.Name,
                //     Logo: response.Logo,
                //     products: response.ProductDisplays,
                //     carouselLength: response.BannerImages.length
                // }
                changeOldInfo(response)
            }

            setSiteName(currentData.siteName);
            setBannerNumber(currentData.carouselLength);
            changeProducts(response2.data)
        };

        fetchData();
    }, []);

    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleCheckboxChange = (product) => {
        if (selectedProducts.includes(product)) {
            // Uncheck the product
            setSelectedProducts((prev) =>
                prev.filter((item) => item !== product)
            );
        } else if (selectedProducts.length < 4) {
            // Add the product if below limit
            setSelectedProducts((prev) => [...prev, product]);
        }
    };


    aws.config.update({
        accessKeyId: AccessKey,
        secretAccessKey: SecretAccessKey,
        region: Region
    })
    const s3 = new aws.S3();

    const handleLogoChange = (e) => {
        setLogoFile(e.target.files[0])
    };

    const handleUpload = async (e) => {
        if (!logoFile) {
            setError('No file selected!');
            return;
        }

        setLoading(true);

        const params = {
            Bucket: S3Bucket,
            Key: logoFile.name, // You can add unique naming logic here if needed
            Body: logoFile,
            ContentType: logoFile.type,
            ACL: 'public-read', // Set file access permission
        };

        try {
            const data = await s3.upload(params).promise();
            console.log('File uploaded successfully:', data.Location);
            setCurrentLogo(data.Location);
        } catch (err) {
            console.error('Error uploading file:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadBanner = async (e) => {
        console.log(parseInt(bannerNumber), bannerFiles.length)
        if (bannerFiles.length == 0) {
            setError('No file selected!');
            return;
        }
        if (parseInt(bannerNumber, 10) != bannerFiles.length) {
            setError('Not Selected the required Number')
            return;
        }
        console.log(bannerFiles)
        setLoading(true);
        bannerFiles.map(async (singleFile) => {
            const params = {
                Bucket: S3Bucket,
                Key: singleFile.name, // You can add unique naming logic here if needed
                Body: singleFile,
                ContentType: singleFile.type,
                ACL: 'public-read', // Set file access permission
            };

            try {
                const data = await s3.upload(params).promise();
                console.log('File uploaded successfully:', data.Location);
                // setCurrentLogo(data.location);
                setBannerLinks((prev) => {
                    let prvarray = prev;
                    prvarray.push(data.Location);
                    return prvarray
                })
            } catch (err) {
                console.error('Error uploading file:', err);
            } finally {
                setLoading(false);
            }
        })

    }

    const handleBannerNumber = (e) => {
        setBannerNumber(e.target.value)
    }

    const handleBannerChange = (e) => {
        setBannerFiles(Array.from(e.target.files));
    }

   
    const saveChanges  = async () => {
        let updatedBody = {}
        
        updatedBody = {
            Name: siteName ? siteName : oldInfo.Name,
            Logo: currentLogo ? currentLogo : oldInfo.Logo,
            BannerImages: bannerLinks.length > 0 ? bannerLinks :  oldInfo.BannerImages,
            ProductDisplays: selectedProducts.length == 4 ? selectedProducts : oldInfo.ProductDisplays  
        }

        const response = await axios.post('http://localhost:5000/api/update_info', {
            updatedBody
        })

        console.log(response)
        
    }




    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

            <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                {error && <p className='text-red-500'>{error}</p>}
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



                    <input accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                        type="file" onChange={handleLogoChange} />
                    <button id='logo' className='text-black' onClick={handleUpload} disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>

                <div>

                    <h3>Carousel Preview</h3>

                    {

                    }

                    <label htmlFor="logoUpload" className="block text-sm font-medium text-gray-700">Carousel Editor</label>


                    <input
                        type="text"
                        accept="image/*"
                        value={bannerNumber}
                        onChange={handleBannerNumber}
                        className="border-slate-950 w-full text-black p-1 mt-2"
                    />
                    <label htmlFor="logoUpload" className="block text-sm font-medium text-gray-700">Add Images</label>

                    <h3 className='text-black mt-2'>Upload {bannerNumber} Images</h3>
                    <input accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                        type="file" multiple onChange={handleBannerChange} />


                    <button id='logo' className='text-black' onClick={handleUploadBanner} disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>

                </div>

                <div>
                    <div className="relative">
                        <div className="dropdown">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                Select Products
                            </button>
                            <div className=" mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-w-sm">
                                <ul className="p-4 space-y-2">
                                    {products.map((product) => (
                                        <li key={product._id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={product._id}
                                                value={product._id}
                                                checked={selectedProducts.includes(product._id)}
                                                onChange={() => handleCheckboxChange(product._id)}
                                                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <label
                                                htmlFor={product.productName}
                                                className="ml-2 text-gray-700 cursor-pointer"
                                            >
                                                {product.productName}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                {selectedProducts.length >= 4 && (
                                    <div className="p-2 text-sm text-red-500">
                                        Maximum 4 products can be selected.
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-black">Selected Products:</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {selectedProducts.map((product) => (
                                    <li key={product}>{product}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>


                <div className='text-black'>
                    New Preview

                    Logo Preview
                    <img src={currentLogo}></img>

                    Banner Links
                    {bannerLinks.length > 0 && <>
                        {bannerLinks.map((single) => {
                            return (
                                <img src={single}></img>
                            )
                        })}
                    </>}

                </div>

                {/* <div>
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
                </div> */}
                <button type="submit" onClick={saveChanges} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-md">
                    Save Changes
                </button>
            </div>

            {/* <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Preview</h2>
                <div className="banner-preview mb-4">
                    <h3 className="text-lg font-medium">Banner Preview</h3>
                    <img src={bannerDataUrl} alt="Banner" className="mt-2 rounded-md shadow-md" />
                </div>
                <div className="logo-preview mb-4">
                    <h3 className="text-lg font-medium">Logo Preview</h3>
                    <img src={logoDataUrl} alt="Logo" className="mt-2 rounded-md shadow-md" />
                </div>
                <h3 className="text-lg font-medium">Site Name: {siteName}</h3>
                <h3 className="text-lg font-medium">Selected Products:</h3>
                <ul>
                    {selectedProducts.map((product) => (
                        <li key={product} className="text-gray-700">{product}</li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default AdminPanel;
