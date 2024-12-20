import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";

import axios from "axios";


const Session = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const { permanentId } = useParams();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(
          `https://saran-backend-1e62.onrender.com/v1/session-orders/${permanentId}`
        );
        setSession(response.data.sessionOrders);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };
  
    fetchSession();
  }, [permanentId]);
  
  const handleBackClick = () => {
    navigate("/dashboard/my-orders");
  };

  return (
    <div className="container w-[90%] mt-20 mx-auto">
      <div className="">
        <div className="bg-white rounded-lg">
          {session && (
            <div key={session.permanent_id}>
              {/* Header */}
              <div className=" flex  items-center justify-between mb-6">
                            <div className="flex bg-gray-100 items-center space-x-1 cursor-pointer border border-gray-200 rounded px-3 py-2 hover:bg-gray-100 transition-all duration-300 " onClick={previousclick} >
                                <p className=""><TbLogout2 className="" /> </p>
                                <p className="">Back</p>
                            </div>

                                <div className="flex space-x-1 items-center  ">
                                    <h2 className="md:text-lg text-base font-semibold text-gray-800">
                                        Order Id:
                                    </h2>
                                    <h2 className="md:text-lg text-base text-gray-400 ">#{order.order_id}</h2>

                                </div>
                            </div>

              {/* Session Details */}
              <div className="grid gap-6 mb-8">
                <div>
                  <div className="bg-[#e9e9e9] flex space-x-1 w-full border-l-4 border-[#8c4cff] py-2">
                    <h3 className="text-lg font-medium text-gray-700">
                      Session Details
                    </h3>
                    <span>
                      <FiEdit />
                    </span>
                  </div>
                  <ul className="text-gray-600 flex flex-wrap md:flex-row gap-6 mt-4">
                    <li className="flex flex-col">
                      <p className="text-gray-400">Session Name:</p>
                      <p>{session.sessionName}</p>
                    </li>
                    <li className="flex flex-col">
                      <p className="text-gray-400">Platform:</p>
                      <p>{session.platform}</p>
                    </li>
                    <li className="flex flex-col">
                      <p className="text-gray-400">Mode:</p>
                      <p>{session.session_mode}</p>
                    </li>
                    <li className="flex flex-col">
                      <p className="text-gray-400">Kit Info:</p>
                      <p>{session.kit_info}</p>
                    </li>
                    <li className="flex flex-col">
                      <p className="text-gray-400">Date:</p>
                      <p>{session.date}</p>
                    </li>
                    <li className="flex flex-col">
                      <p className="text-gray-400">Time:</p>
                      <p>{session.time}</p>
                    </li>
                    <li className="flex flex-col">
                      <p className="text-gray-400">Price:</p>
                      <p>₹{session.price}</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Customer Details */}
              <div>
                <div className="bg-[#e9e9e9] flex space-x-1 w-full border-l-4 border-[#8c4cff] py-2">
                  <h3 className="text-lg font-medium text-gray-700">
                    Customer Details
                  </h3>
                  <span>
                    <FiEdit />
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-gray-600 mt-3">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <p className="text-gray-400">Name:</p>
                      <p>{session.name}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-400">Email:</p>
                      <p>{session.email}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-400">Phone Number:</p>
                      <p>{session.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <p className="text-gray-400">Address Line 1:</p>
                      <p>{session.address1}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-400">Address Line 2:</p>
                      <p>{session.address2}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-400">Nearest Landmark:</p>
                      <p>{session.landmark}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-gray-400">City/Pincode:</p>
                      <p>
                        {session.city} - {session.pincode}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">State:</p>
                      <p>{session.state}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assets Provided */}
              <div className="mt-5">
                <div className="bg-[#e9e9e9] flex space-x-1 w-full border-l-4 border-[#8c4cff] py-2">
                  <h3 className="text-lg font-medium text-gray-700">
                    Assets Provided
                  </h3>
                  <span>
                    <FiEdit />
                  </span>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  {session.photo.map((photoUrl, index) => (
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
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Session;