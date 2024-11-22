import axios from "axios";
import { useEffect, useState } from "react"

export default function DeleteProduct() {
    const [products, setProducts] = useState([])
    const [selectedProductId, setSelectedProductId] = useState(false);
    const [loading, changeLoading] = useState(false);
    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACK_END_LINK}/api/products`);
            console.log(response)
            setProducts(response.data);
            changeLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteProduct = () => {

        try{
            const response = axios.post(`${process.env.REACT_APP_BACK_END_LINK}/api/products/delete`, {productName: selectedProductId} )
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="flex justify-center items-center">
            <select
                value={selectedProductId}
                onChange={
                    (e) => {
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
                <button onClick={deleteProduct} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400">
                    Delete
                </button>
            }
        </div>
    )
}