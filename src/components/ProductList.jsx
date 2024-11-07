// ProductList.js

function ProductList({ products, onEdit, onDelete }) {
    console.log(products)
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id} className="mb-4 p-4 border rounded flex justify-between items-center bg-gray-50">
                        <div>
                            <h3 className="font-semibold text-lg">{product.productName}</h3>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-gray-700 font-bold">${product.price}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => onEdit(product)}
                                className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(product._id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
