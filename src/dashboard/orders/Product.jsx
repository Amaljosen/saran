import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";


const Product = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([]);
    const { permanentId } = useParams();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    `https://saran-backend-1e62.onrender.com/v1/product-orders/${permanentId}`
                );
                setOrders([response.data.productOrders]);
            } catch (error) {
                // console.error("Error fetching data:", error);
            }
        };
    
        fetchOrders();
    }, [permanentId]);
    
    const previousclick = () => {
        navigate("/dashboard/my-orders");
    };

    return (
        <div className="container w-[90%] mt-20 mx-auto text-black">
            <div className="  mx-auto py-3 ">
                <div className="  rounded-lg ">
                    {orders.map((order) => (
                        <div key={order.permanent_id} className="">
                            {/* Header */}
                           
                            <div className=" flex  items-center justify-between mb-6">
                            <div className="flex bg-gray-100 items-center space-x-1 cursor-pointer border border-gray-200 rounded px-3 py-2 hover:bg-gray-200 transition-all duration-300 " onClick={previousclick} >
                                <p className=""><TbLogout2 className="" /> </p>
                                <p className="text-sm">Back</p>
                            </div>

                                <div className="flex space-x-1 items-center ">
                                    <h2 className="md:text-lg text-base font-semibold text-gray-800">
                                        Order Id:
                                    </h2>
                                    <h2 className="md:text-base text-sm text-gray-400 ">#{order.order_id}</h2>

                                </div>
                            </div>

                            {/* Order Details */}
                            <div className="grid mx-auto gap-6 mt-3 mb-8">
                                <div>
                                    <div className="bg-gray-100 w-full flex items-center space-x-1 border-l-4 border-[#8c4cff] py-2">
                                        <h3 className="text-lg font-medium text-gray-700 px-1 ">
                                            Order Details
                                        </h3>
                                        <span>
                                            <FiEdit />
                                        </span>

                                    </div>
                                    <ul className=" text-gray-600 flex flex-wrap md:flex-row gap-6 item-center mt-4">
                                        <li className="flex flex-col ">
                                            <p className="text-gray-400">  Order ID:</p>
                                            <p>
                                                {order.order_id}
                                            </p>
                                        </li>
                                        <li className="flex flex-col">
                                            <p className="text-gray-400"> Order Date:</p>{" "}
                                            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </li>
                                        <li className="flex flex-col">
                                            <p className="text-gray-400">Order Amount:</p> <p>₹{order.totalPrice}</p>
                                        </li>
                                        <li className="flex flex-col">
                                            <p className="text-gray-400"> Payment Mode:</p><p> Online</p>
                                        </li>
                                        <li className="flex flex-col">
                                            <p className="text-gray-400">Payment Status:</p> <p>Completed</p>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                            <div className="w-full">
                                <div className="bg-gray-100 flex space-x-1 items-center w-full border-l-4 border-[#8c4cff] py-2">
                                    <h3 className="text-lg font-medium text-gray-700 px-1 ">
                                        Product Overview
                                    </h3>
                                    <span>
                                        <FiEdit />
                                    </span>

                                </div>
                                <ul className=" flex  w-full gap-6 text-gray-600 mt-3">
                                    <li className="flex flex-col">
                                        <p className="text-gray-400">Product Name:</p> <p>{order.productName}</p>
                                    </li>
                                    <li className="flex flex-col">
                                        <p className="text-gray-400">Size:</p> <p>{order.size}</p>
                                    </li>
                                    <li className="flex flex-col">
                                        <p className="text-gray-400">Price:</p> <p>₹{order.price}</p>
                                    </li>
                                    <li className="flex flex-col">
                                        <p className="text-gray-400">Shipping Charges:</p> <p>₹{order.shipping_charges}</p>
                                    </li>
                                </ul>
                            </div>

                            {/* Customer Details */}
                            <div>
                                <div className="mt-4 flex space-x-1 items-center bg-gray-100 w-full border-l-4 border-[#8c4cff] py-2">
                                    <h3 className="text-lg font-medium text-gray-700 px-1 ">
                                        Customer Details
                                    </h3>
                                    <span>
                                        <FiEdit />
                                    </span>

                                </div>
                                <div className="flex flex-wrap gap-4 text-gray-600 mt-3">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col">
                                            <p className="text-gray-400">Name:</p> <p>{order.name}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-400">Email:</p> <p>{order.email}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-400">Phone Number:</p><p>{order.phoneNumber}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col">
                                            <p className="text-gray-400">Address Line 1:</p> <p>{order.address1}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-400">Address Line 2:</p> <p>{order.address2}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-400">Nearest Landmark:</p> <p>{order.landmark}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <p className="text-gray-400">City/Pincode:</p><p> {order.city} - {order.pincode}</p>
                                        </div>


                                        <div>
                                            <p className="text-gray-400">State:</p> <p>{order.state}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Assets Provided */}
                            <div className="mt-5">
                                <div className="bg-gray-100 flex space-x-1 items-center w-full border-l-4 border-[#8c4cff] py-2 ">
                                    <h3 className="text-lg font-medium text-gray-700 px-1">
                                        Assets Provided
                                    </h3>
                                    <span>
                                        <FiEdit />
                                    </span>
                                </div>
                                <div className="flex flex-col gap-4 mt-4">
                                    {order.photo.map((photoUrl, index) => (
                                        <div
                                            key={index}
                                            className="relative  rounded-lg overflow-hidden shadow-sm lg:w-44 w-32 lg:h-44 h-32 group"
                                        >
                                            <img
                                                src={photoUrl}
                                                alt={`Asset ${index + 1}`}
                                                className="object-cover "
                                            />
                                            {/* Download Icon */}
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
                                    ))}
                                </div>

                            </div>

                            {/* Custom Instructions */}
                            <div className="border border-gray-300 rounded-lg p-6 bg-white mt-5  mb-3 ">
                                <h2 className="text-lg font-semibold mb-4">Custom Message/Instructions</h2>
                                <ol className="list-decimal list-inside space-y-3 text-gray-500">
                                    <li>
                                        <span className="font-medium">Full length image</span> (To be used as main picture)
                                    </li>
                                    <li>
                                        <span className="font-medium">4 to 8 other pictures.</span>
                                    </li>
                                    <li>
                                        <span className="font-medium">Couple's interests, hobbies, likings</span> around which other
                                        elements will be crafted (please be specific while providing details).
                                    </li>
                                    <li>
                                        <span className="font-medium">Any other specific detail/names/miniature</span> you want to get
                                        added in it.
                                    </li>
                                </ol>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;