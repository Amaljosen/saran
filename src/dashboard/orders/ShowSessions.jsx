import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShowSessions() {
  const [sessionOrders, setSessionOrders] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Fetch data from the API
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/v1/session-orders`)
      .then((response) => {
        setSessionOrders(response.data.sessionOrders);
      })
      .catch((error) => {
        console.error("Error fetching session orders:", error);
      });
  }, []);

  const totalSessions = sessionOrders.length;
  const totalRevenue = sessionOrders.reduce(
    (sum, session) => sum + Number(session.price),
    0
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentSessions = sessionOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(sessionOrders.length / ordersPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleView = (permanentSessionId) => {
    navigate(`/dashboard/session/${permanentSessionId}`);
  };

  return (
    <div className="py-6">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Session Dashboard
        </h1>
      </header>

      {/* Stats Section */}
      <div className="grid  grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h2 className="text-sm md:text-lg font-semibold text-gray-600">
            Total Sessions
          </h2>
          <p className="text-xl md:text-2xl font-bold text-blue-600">
            {totalSessions}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h2 className="text-sm md:text-lg font-semibold text-gray-600">
            Total Revenue
          </h2>
          <p className="text-xl md:text-2xl font-bold text-green-600">
            ₹{totalRevenue}
          </p>
        </div>
      </div>

      {/* Session Orders Section */}
      <div className="bg-white shadow rounded-lg p-2 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Session Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-700">
                <th className="p-2 md:p-3 border text-sm md:text-base">
                  Order ID
                </th>
                <th className="p-2 md:p-3 border text-sm md:text-base">
                  Session Name
                </th>
                <th className="p-2 md:p-3 border hidden lg:table-cell">
                  Platform
                </th>
                <th className="p-2 md:p-3 border hidden lg:table-cell">
                  Session Mode
                </th>
                <th className="p-2 md:p-3 border hidden lg:table-cell">
                  Date & Time
                </th>
                <th className="p-2 md:p-3 border hidden lg:table-cell ">
                  Price
                </th>
                <th className="p-2 md:p-3 border hidden lg:table-cell ">
                  Customer
                </th>
                <th className="p-2 md:p-3 border text-sm md:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentSessions.map((session) => (
                <tr key={session.order_id} className="hover:bg-gray-100">
                  <td className="p-2 border text-sm md:text-base">
                    {session.order_id}
                  </td>
                  <td className="p-2 border text-sm md:text-base">
                    {session.sessionName}
                  </td>
                  <td className="p-2 border hidden lg:table-cell">
                    {session.platform}
                  </td>
                  <td className="p-2 border hidden lg:table-cell">
                    {session.session_mode}
                  </td>
                  <td className="p-2 border hidden lg:table-cell">
                    {session.date} | {session.time}
                  </td>
                  <td className="p-2 border hidden lg:table-cell">
                    ₹{session.price}
                  </td>
                  <td className="p-2 border hidden lg:table-cell">
                    {session.name}
                  </td>
                  <td className="p-2 border text-sm md:text-base">
                    <button
                      onClick={() => handleView(session.permanentSession_id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex lg:justify-start justify-center items-center">
          <div className="flex space-x-3 items-center mt-4">
            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
            >
              Prev
            </button>
            <span className="text-gray-700">
              Page {currentPage} of{" "}
              {Math.ceil(sessionOrders.length / ordersPerPage)}
            </span>
            <button
              onClick={nextPage}
              disabled={
                currentPage === Math.ceil(sessionOrders.length / ordersPerPage)
              }
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowSessions;
