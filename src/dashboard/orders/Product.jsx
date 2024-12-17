import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";

const Product = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading
    const { permanentId } = useParams();

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_API}/v1/product-orders/${permanentId}`
                );
                const data = await response.json();

                // Ensure productOrders exists in the response
                if (data && data.productOrders) {
                    setOrders([data.productOrders]);
                } else {
                    console.error("No product orders found");
                    setOrders([]); // Set to empty array on failure
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setOrders([]); // Handle error state
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [permanentId]);

    const previousClick = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="w-[90%] mx-auto container mt-24 py-6">
            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <div className="">
                    <div className="bg-white rounded-lg">
                        {orders.map((order) => (
                            <div key={order.permanent_id} className="">
                                {/* Header */}
                                <div
                                    className="flex items-center cursor-pointer"
                                    onClick={previousClick}
                                >
                                    <p className="text-gray-400">
                                        <SlArrowLeft />
                                    </p>
                                    <p className="text-gray-400">Back</p>
                                </div>

                                {/* Order ID */}
                                <div className="flex items-end justify-end w-full mt-3">
                                    <h2 className="md:text-xl text-base font-semibold text-gray-800">
                                        Order Id
                                    </h2>
                                    <h2 className="md:text-xl text-base text-gray-400">
                                        #{order.order_id}
                                    </h2>
                                </div>

                                {/* Order Details */}
                                <div className="grid mx-auto gap-6 mt-3 mb-8">
                                    <div>
                                        <div className="bg-[#e9e9e9] w-full border-l-4 border-[#8c4cff] py-2">
                                            <h3 className="text-lg font-medium text-gray-700">
                                                Order Details
                                            </h3>
                                        </div>
                                        <ul className="text-gray-600 flex flex-wrap md:flex-row gap-6 items-center mt-4">
                                            <li className="flex flex-col">
                                                <p className="text-gray-400">Order ID:</p>
                                                <p>{order.order_id}</p>
                                            </li>
                                            <li className="flex flex-col">
                                                <p className="text-gray-400">Order Date:</p>
                                                <p>
                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString()}
                                                </p>
                                            </li>
                                            <li className="flex flex-col">
                                                <p className="text-gray-400">Order Amount:</p>
                                                <p>₹{order.totalPrice}</p>
                                            </li>
                                            <li className="flex flex-col">
                                                <p className="text-gray-400">Payment Mode:</p>
                                                <p>Online</p>
                                            </li>
                                            <li className="flex flex-col">
                                                <p className="text-gray-400">
                                                    Payment Status:
                                                </p>
                                                <p>Completed</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Product Overview */}
                                <div className="w-full">
                                    <div className="bg-[#e9e9e9] w-full border-l-4 border-[#8c4cff] py-2">
                                        <h3 className="text-lg font-medium text-gray-700">
                                            Product Overview
                                        </h3>
                                    </div>
                                    <ul className="flex w-full gap-6 text-gray-600 mt-3">
                                        <li className="flex flex-col">
                                            <p className="text-gray-400">Product Name:</p>
                                            <p>{order.productName}</p>
                                        </li>
                                        <li className="flex flex-col">
                                            <p className="text-gray-400">Size:</p>
                                            <p>{order.size}</p>
                                        </li>
                                        <li className="flex flex-col">
                                            <p className="text-gray-400">Price:</p>
                                            <p>₹{order.price}</p>
                                        </li>
                                        <li className="flex flex-col">
                                            <p className="text-gray-400">
                                                Shipping Charges:
                                            </p>
                                            <p>₹{order.shipping_charges}</p>
                                        </li>
                                    </ul>
                                </div>

                                {/* Customer Details */}
                                <div>
                                    <div className="mt-4 bg-[#e9e9e9] w-full border-l-4 border-[#8c4cff] py-2">
                                        <h3 className="text-lg font-medium text-gray-700">
                                            Customer Details
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-gray-600 mt-3">
                                        {/* Column 1 */}
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                <p className="text-gray-400">Name:</p>
                                                <p>{order.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400">Email:</p>
                                                <p>{order.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400">
                                                    Phone Number:
                                                </p>
                                                <p>{order.phoneNumber}</p>
                                            </div>
                                        </div>

                                        {/* Column 2 */}
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                <p className="text-gray-400">Address Line 1:</p>
                                                <p>{order.address1}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400">Address Line 2:</p>
                                                <p>{order.address2}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400">
                                                    Nearest Landmark:
                                                </p>
                                                <p>{order.landmark}</p>
                                            </div>
                                        </div>

                                        {/* Column 3 */}
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                <p className="text-gray-400">City/Pincode:</p>
                                                <p>
                                                    {order.city} - {order.pincode}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400">State:</p>
                                                <p>{order.state}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Assets Provided */}
                                <div className="mt-5">
                                    <div className="bg-[#e9e9e9] w-full border-l-4 border-[#8c4cff] py-2">
                                        <h3 className="text-lg font-medium text-gray-700">
                                            Assets Provided
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        {order.photo && order.photo.length > 0 ? (
                                            order.photo.map((photoUrl, index) => (
                                                <div
                                                    key={index}
                                                    className="relative rounded-lg overflow-hidden shadow-sm lg:w-44 w-32 lg:h-44 h-32 group"
                                                >
                                                    <img
                                                        src={photoUrl}
                                                        alt={`Asset ${index + 1}`}
                                                        className="object-cover"
                                                    />
                                                    <a
                                                        href={photoUrl}
                                                        download={`Asset-${index + 1}`}
                                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6 text-white"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                            />
                                                        </svg>
                                                    </a>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No assets provided</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
