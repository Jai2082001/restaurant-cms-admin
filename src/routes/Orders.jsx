import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderTable() {


    useEffect(() => {

        axios.get(`${process.env.REACT_APP_BACK_END_LINK}/all-orders`).then((response) => {
            setOrders(response.data)

        })
        // setOrders(response.data);
    }, [])

    const [orders, setOrders] = useState(false);

    const handleStatusChange = async (id, status) => {
        // setOrders((prevOrders) =>
        //     prevOrders.map((order) =>
        //         order.id === id ? { ...order, status } : order
        //     )
        // );
        console.log(id, status)
        const response = await axios.get(`${process.env.REACT_APP_BACK_END_LINK}/order-action`, {
            headers: {
                id: id,
                status: status
            }
        })
        
        console.log(response)

    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">
                Order Management
            </h1>
            <table className="w-full border border-gray-200 shadow-lg rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-4 px-6 text-left font-semibold text-gray-600">Order ID</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-600">Customer</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-600">Order Details</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-600">Total Price</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-600">Status</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-600">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders &&

                        <>
                            {orders.map((order) => {
                                const totalPrice = order.items.reduce(
                                    (acc, item) => acc + item.product.price * item.quantity,
                                    0
                                );
                                return (
                                    <tr
                                        key={order.id}
                                        className="border-b hover:bg-black-50 transition duration-150"
                                    >
                                        <td className="py-4 px-6">{order.id}</td>
                                        <td className="py-4 px-6">{order.userId}</td>
                                        <td className="py-4 px-6">
                                            <ul className="list-disc ml-4">
                                                {order.items.map((item, idx) => (
                                                    <li key={idx}>
                                                        {item.product.productName} (x{item.quantity}) - $
                                                        {(item.product.price * item.quantity).toFixed(2)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="py-4 px-6 font-semibold text-gray-700">
                                            ${totalPrice.toFixed(2)}
                                        </td>
                                        <td
                                            className={`py-4 px-6 font-medium ${order.status === "Pending"
                                                ? "text-yellow-600"
                                                : order.status === "Accepted"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            {order.status}
                                        </td>
                                        <td className="py-4 px-6">
                                            {order.status === "Pending" ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleStatusChange(order._id, "Accepted")}
                                                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(order._id, "Rejected")}
                                                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-gray-400 italic">No actions available</div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}

                        </>}

                </tbody>
            </table>
        </div>
    );
}

export default OrderTable;
