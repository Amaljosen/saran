import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShowSessions() {
  const [sessionOrders, setSessionOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Fetch data from the API
  useEffect(() => {
    axios
      .get("https://saran-backend-1e62.onrender.com/v1/session-orders")
      .then((response) => {
        setSessionOrders(response.data.sessionOrders);
      })
      .catch((error) => {
        // console.error("Error fetching session orders:", error);
      });
  }, []);

  const filteredOrders = sessionOrders.filter(
    (session) =>
      (filterStatus === "All" || session.session_mode === filterStatus) &&
      (session.sessionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.order_id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const totalSessions = sessionOrders.length;
  const totalRevenue = sessionOrders.reduce(
    (sum, session) => sum + Number(session.price),
    0
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentSessions = filteredOrders.slice(
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
      <div className="">
        <header className="mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">
            Session Dashboard
          </h1>
        </header>

        {/* Stats Section */}
        <div className="grid  lg:grid-cols-2 grid-cols-1 gap-4 mb-6">
          <div className="flex flex-col border gap-2  rounded-lg p-4 ">
            <h1 className="md:text-base text-gray-500 text-sm">Total stats</h1>
            <div className="flex gap-2">
              <div className="w-full flex items-center justify-between bg-white shadow rounded-lg md:p-3 p-1 ">
                <div className=" w-full ">
                  <h2 className="text-sm md:text-lg font-semibold text-gray-600">
                    Total Sessions
                  </h2>
                  <p className="text-lg md:text-2xl font-bold text-text">
                    {totalSessions}
                  </p>
                </div>
                <div className="">
                  <img
                    src="https://ik.imagekit.io/cjureug40/track-order%20(1).png?updatedAt=1734514932836"
                    alt=""
                  />
                </div>
              </div>

              <div className=" w-full flex items-center justify-between bg-white shadow rounded-lg p-1 lg:p-3 ">
                <div>
                  <h2 className="text-sm md:text-lg font-semibold text-gray-600">
                    Total Revenue
                  </h2>
                  <p className="text-lg md:text-2xl font-bold text-text">
                    ₹{totalRevenue}
                  </p>
                </div>

                <div>
                  <img
                    src="https://ik.imagekit.io/cjureug40/indian.png?updatedAt=1734514932863"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col border gap-2  rounded-lg p-4 ">
            <h1 className="md:text-base text-gray-500 text-sm ">
              Current Day Stats
            </h1>
            <div className="flex gap-2">
              <div className="w-full flex items-center border  bg-white  rounded-lg md:p-3 p-1 ">
                <div className=" w-full">
                  <h2 className="text-sm md:text-lg font-semibold text-gray-600">
                    Total Sessions
                  </h2>
                  <p className="text-lg md:text-2xl font-bold text-text">
                    {totalSessions}
                  </p>
                </div>
                <div className="">
                  <img
                    src="https://ik.imagekit.io/cjureug40/track-order.png?updatedAt=1734514932865"
                    alt=""
                  />
                </div>
              </div>

              <div className=" w-full flex items-center justify-between bg-white shadow rounded-lg p-1 lg:p-3 ">
                <div>
                  <h2 className="text-sm md:text-lg font-semibold text-gray-600">
                    Total Revenue
                  </h2>
                  <p className="text-lg md:text-2xl font-bold text-text">
                    ₹{totalRevenue}
                  </p>
                </div>

                <div>
                  <img
                    src="https://ik.imagekit.io/cjureug40/indian-rupee.png?updatedAt=1734514932867"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Session Orders Section */}
        <div className="bg-white border rounded-lg ">
          <h2 className="text-lg md:text-xl p-4 font-semibold text-gray-800 ">
            Session Orders
          </h2>
          <div className="border-y p-4 flex lg:flex-row flex-col items-center justify-center lg:justify-between py-4  gap-5">
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("All")}
                className={` px-4 py-2   md:text-base text-sm rounded-md ${
                  filterStatus === "All" ? "bg-black text-white" : " border"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("Online")}
                className={`px-4 py-2 md:text-base text-sm rounded-md ${
                  filterStatus === "Online" ? "bg-black text-white" : " border"
                }`}
              >
                Online
              </button>
              <button
                onClick={() => setFilterStatus("Offline")}
                className={`px-4 py-2 md:text-base text-sm rounded-md ${
                  filterStatus === "Offline" ? "bg-black text-white" : " border"
                }`}
              >
                Offline
              </button>
            </div>
            <div className="lg:w-1/2 w-full">
              <input
                type="text"
                placeholder="Search Items by Name / Product Name /Order ID"
                className="w-full rounded-md px-2 py-2 border outline-none md:placeholder:text-sm placeholder:text-xs "
                value={searchTerm}
                onChange={handleSearchChange} // Handle search input
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse hidden lg:table">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                  <th className="p-2 md:p-3 border border-l-0 border-t-0 text-sm md:text-base">
                    Order ID
                  </th>
                  <th className="p-2 md:p-3 border border-l-0 border-t-0 text-sm md:text-base">
                    Session Name
                  </th>
                  <th className="p-2 md:p-3 border border-l-0 border-t-0 hidden lg:table-cell">
                    Platform
                  </th>
                  <th className="p-2 md:p-3 border border-l-0 border-t-0 hidden lg:table-cell">
                    Session Mode
                  </th>
                  <th className="p-2 md:p-3 border border-l-0 border-t-0 hidden lg:table-cell">
                    Date & Time
                  </th>
                  <th className="p-2 md:p-3 border border-l-0 border-t-0 hidden lg:table-cell ">
                    Price
                  </th>
                  <th className="p-2 md:p-3 border border-l-0 border-t-0 hidden lg:table-cell ">
                    Customer
                  </th>
                  <th className="p-2 md:p-3 border border-l-0 border-t-0 border-r-0 text-sm md:text-base">
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

            <div className="lg:hidden p-4 space-y-6 min-h-screen">
              {currentSessions.map((session) => (
                <div
                  key={session.order_id}
                  className="bg-gradient-to-r from-white via-gray-50 to-white border border-gray-200 border-t-primary border-t-4 rounded-xl shadow-lg p-6 hover:shadow-xl"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3 truncate">
                    {session.sessionName}
                  </h3>
                  <div className="text-sm space-y-2 text-gray-700">
                  <p>
                    <strong>Order ID:</strong> {session.order_id}
                  </p>
                  <p>
                    <strong>Platform:</strong> {session.platform}
                  </p>
                  <p>
                    <strong>Session Mode:</strong> {session.session_mode}
                  </p>
                  <p>
                    <strong>Date & Time:</strong> {session.date} |{" "}
                    {session.time}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{session.price}
                  </p>
                  <p>
                    <strong>Customer:</strong> {session.name}
                  </p>
                  </div>
                  <button
                    onClick={() => handleView(session.permanentSession_id)}
                    className="bg-gradient-to-r from-text to-primary text-white py-3 text-sm rounded-full font-medium shadow-md hover:bg-blue-700 md:hover:scale-105 transition-transform duration-300 px-5 focus:ring-4 focus:ring-blue-300  w-full sm:w-auto"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex lg:justify-start justify-center items-center  p-2">
            <div className="flex space-x-3  items-center my-4">
              <button
                onClick={previousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded hover:bg-gray-200 "
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
                  currentPage ===
                  Math.ceil(sessionOrders.length / ordersPerPage)
                }
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded hover:bg-gray-200 "
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowSessions;
