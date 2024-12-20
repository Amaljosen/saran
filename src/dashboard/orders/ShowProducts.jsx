import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import { IoCheckmarkCircle } from "react-icons/io5";

function ShowProducts() {
  const [productOrders, setProductOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const navigate = useNavigate();

  // Fetch data from the API
  useEffect(() => {
    axios
      .get(`https://saran-backend-1e62.onrender.com/v1/product-orders`)
      .then((response) => {
        setProductOrders(response.data.productOrders);
      })
      .catch((error) => {
        // console.error("Error fetching product orders:", error);
      });
  }, []);

  // Filter orders based on selected status
  const filteredOrders = productOrders.filter(
    (order) =>
      (filterStatus === "All" || order.status === filterStatus) &&
      (order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.order_id.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Handle status change click
  const handleStatusClick = (order) => {
    setSelectedOrder(order);
    setSelectedStatus(order.status);
    setShowModal(true);
  };

  // Save updated order status
  const handleSaveStatus = () => {
    if (!selectedOrder) return;

    const payload = {
      payment_id: selectedOrder.payment_id,
      status: selectedStatus,
    };

    // Update status locally
    setProductOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.payment_id === selectedOrder.payment_id
          ? { ...order, status: selectedStatus }
          : order
      )
    );

    // Optionally, close the modal before the API call
    setShowModal(false);

    // Post updated status to backend
    axios
      .post(
        `https://saran-backend-1e62.onrender.com/v1/update-myorders`,
        payload
      )
      .then((response) => {
        console.log("Status updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const totalOrders = productOrders.length;
  const totalRevenue = productOrders.reduce(
    (sum, order) => sum + Number(order.totalPrice),
    0
  );
  const today = new Date().toISOString().split("T")[0];
  const todayOrders = productOrders.filter(
    (order) => order.orderDate && order.orderDate.startsWith(today)
  );
  const todayTotalRevenue = todayOrders.reduce(
    (sum, order) => sum + Number(order.totalPrice),
    0
  );

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredOrders.length / ordersPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleView = (permanentId) => {
    navigate(`/dashboard/product/${permanentId}`);
  };

  return (
    <div className="py-6">
      <header className="mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
      </header>
      {/* Stats Section */}
      <div className="flex flex-col gap-2 mx-auto  rounded-md">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-6">
          {/* Total Orders Stats */}
          <div className="flex flex-col gap-3 border rounded-md p-4">
            <h1 className="md:text-lg text-sm text-gray-400">Total stats</h1>
            <div className="flex w-full justify-between gap-2">
              <div className="flex items-center justify-around bg-white shadow rounded-lg p-4 w-full">
                <div>
                  <h2 className="text-sm md:text-base text-gray-600 ">
                    Total Orders
                  </h2>
                  <p className="text-lg md:text-2xl font-bold text-text">
                    {totalOrders}
                  </p>
                </div>
                <img
                  src="https://ik.imagekit.io/cjureug40/track-order%20(1).png?updatedAt=1734514932836"
                  alt=""
                />
              </div>
              <div className="bg-white flex items-center justify-around shadow rounded-md p-4 w-full">
                <div>
                  <h2 className="text-sm md:text-base text-gray-600">
                    Total Revenue
                  </h2>
                  <p className="text-lg md:text-2xl font-bold text-text">
                    ₹{totalRevenue}
                  </p>
                </div>
                <img
                  src="https://ik.imagekit.io/cjureug40/indian.png?updatedAt=1734514932863"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* Today Orders Stats */}
          <div className="flex flex-col gap-3 border rounded-md p-4">
            <h1 className="md:text-lg text-sm  text-gray-400">Today Stats</h1>
            <div className="flex w-full justify-between gap-2">
              <div className="flex items-center justify-around bg-white shadow rounded-lg p-4 w-full">
                <div>
                  <h2 className="text-sm md:text-base text-gray-600">
                    Today Orders
                  </h2>
                  <p className="text-lg md:text-2xl font-bold text-text">
                    {todayOrders.length}
                  </p>
                </div>
                <img
                  src="https://ik.imagekit.io/cjureug40/track-order.png?updatedAt=1734514932865"
                  alt=""
                />
              </div>
              <div className="bg-white flex items-center justify-around shadow rounded-lg p-4 w-full">
                <div>
                  <h2 className="text-sm md:text-base text-gray-600">
                    Today Revenue
                  </h2>
                  <p className="text-lg md:text-2xl font-bold text-text">
                    ₹{todayTotalRevenue}
                  </p>
                </div>
                <img
                  src="https://ik.imagekit.io/cjureug40/indian-rupee.png?updatedAt=1734514932867"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Orders Section */}
      <div className="bg-white border rounded-md ">
        <h2 className="text-lg md:text-xl p-4 font-semibold text-gray-800">
          Product Orders
        </h2>

        {/* Status Buttons */}
        <div className="border-y  flex lg:flex-row flex-col items-center justify-center lg:justify-between p-4  gap-5">
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
              onClick={() => setFilterStatus("Order Placed")}
              className={`px-4 py-2 hidden md:text-base text-sm md:block rounded-md ${
                filterStatus === "Order Placed"
                  ? "bg-black text-white"
                  : " border"
              }`}
            >
              Order placed
            </button>
            <button
              onClick={() => setFilterStatus("Shipped")}
              className={`px-4 py-2 md:text-base text-sm  rounded-md ${
                filterStatus === "Shipped" ? "bg-black text-white" : " border"
              }`}
            >
              Shipped
            </button>
            <button
              onClick={() => setFilterStatus("Delivered")}
              className={`px-4 py-2 md:text-base text-sm rounded-md ${
                filterStatus === "Delivered" ? "bg-black text-white" : "border"
              }`}
            >
              Delivered
            </button>
          </div>
          <div className="lg:w-1/2 w-full">
            <input
              type="text"
              placeholder="Search Items by Name / Product Name /Order ID"
              className="w-full rounded-md px-2 py-2 border outline-none md:placeholder:text-sm placeholder:text-xs"
              value={searchTerm}
              onChange={handleSearchChange} // Handle search input
            />
          </div>
        </div>

        {/* Orders Table */}

        <div className="overflow-x-auto  max-w-full">
          <table className="min-w-full  hidden lg:table">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-2 md:p-3 md:text-base text-sm  border border-l-0 border-t-0 hidden lg:table-cell ">
                  Order ID
                </th>
                <th className="p-2 md:p-3 md:text-base text-sm border border-t-0">
                  Product Name
                </th>
                <th className="p-2 md:p-3 border border-t-0 hidden lg:table-cell">
                  Size
                </th>
                <th className="p-2 md:p-3 border border-t-0 hidden lg:table-cell">
                  Price
                </th>
                <th className="p-2 md:p-3 border border-t-0 hidden lg:table-cell">
                  Shipping
                </th>
                <th className="p-2 md:p-3 border border-t-0 md:text-base text-sm">
                  Total
                </th>
                <th className="p-2 md:p-3 border border-t-0 md:text-base text-sm hidden lg:table-cell">
                  Customer
                </th>
                <th className="p-2 md:p-3 border border-t-0 text-sm md:text-base">
                  Status
                </th>
                <th className="p-2 md:p-3 border border-t-0 border-r-0">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.payment_id} className="">
                  <td className="p-1 md:p-2  border border-l-0 hidden lg:table-cell ">
                    {order.order_id}
                  </td>
                  <td className="p-1 md:p-2 md:text-base text-xs border  ">
                    {order.productName}
                  </td>
                  <td className="p-1 md:p-2 border hidden lg:table-cell ">
                    {order.size}
                  </td>
                  <td className="p-1 md:p-2 border hidden lg:table-cell">
                    ₹{order.price}
                  </td>
                  <td className="p-1 md:p-2 border hidden lg:table-cell">
                    ₹{order.shipping_charges}
                  </td>
                  <td className="p-1 md:p-2  border md:text-base text-xs">
                    ₹{order.totalPrice}
                  </td>
                  <td className="p-1 md:p-2 md:text-base text-xs  hidden lg:table-cell  border">
                    {order.name}
                  </td>
                  <td className="p-1 md:p-2 border md:text-base text-xs  space-x-2">
                    {order.status === "Order Placed" && (
                      <p className="flex items-center">
                        <span className="text-blue-600 font-semibold">
                          {order.status}
                        </span>
                        <p>
                          <IoEyeOutline className="text-blue-600" />
                        </p>
                      </p>
                    )}
                    {order.status === "Shipped" && (
                      <p className="flex items-center">
                        <span className="text-blue-600 font-semibold">
                          {order.status}
                        </span>
                        <p>
                          <TbReport className="text-blue-600" />
                        </p>
                      </p>
                    )}
                    {order.status === "Delivered" && (
                      <p className="flex items-center">
                        <span className="text-green-600 font-semibold">
                          {order.status}
                        </span>
                        <p>
                          <IoCheckmarkCircle className="text-green-600" />
                        </p>
                      </p>
                    )}
                  </td>
                  <td className="p-2 border border-r-0 table-cell  ">
                    {/* Full buttons for large screens */}
                    <div className="hidden lg:flex space-x-2">
                      <button
                        onClick={() => handleView(order.permanent_id)}
                        className="bg-gradient-to-r from-primary to-text text-white text-sm px-4 py-1 rounded hover:bg-blue-600"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleStatusClick(order)}
                        className="bg-gradient-to-r from-green-800 to-green-600 text-white text-sm px-4 py-1 rounded hover:bg-yellow-600"
                      >
                        Status
                      </button>
                    </div>

                    {/* Icon buttons for small screens */}
                    <div className=" table-cell lg:hidden ">
                      <div className="flex">
                        <button
                          onClick={() => handleView(order.permanent_id)}
                          className="bg-blue-500 text-white  px-2 py-1 rounded hover:bg-blue-600"
                        >
                          <IoEyeOutline />
                        </button>
                        <button
                          onClick={() => handleStatusClick(order)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          <TbReport />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="lg:hidden p-4 space-y-6 min-h-screen">
            {currentOrders.map((order) => (
              <div
                key={order.payment_id}
                className="bg-gradient-to-r from-white via-gray-50 to-white border border-gray-200 border-t-primary border-t-4 rounded-xl shadow-lg p-6 hover:shadow-xl"
              >
                {/* Highlight Strip */}
          

                <h3 className="text-xl font-bold text-gray-800 mb-3 truncate">
                  {order.productName}
                </h3>
                <div className="text-sm space-y-2 text-gray-700">
                  <p>
                    <strong>Order ID:</strong> {order.order_id}
                  </p>
                  <p>
                    <strong>Size:</strong> {order.size}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{order.price}
                  </p>
                  <p>
                    <strong>Shipping:</strong> ₹{order.shipping_charges}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{order.totalPrice}
                  </p>
                  <p>
                    <strong>Customer:</strong> {order.name}
                  </p>
                </div>

                {/* Status Section */}
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm flex items-center">
                    <strong>Status:</strong>&nbsp;
                    {order.status === "Order Placed" && (
                      <span className="text-blue-600 font-medium flex items-center">
                        {order.status}
                        <IoEyeOutline className="ml-2 text-lg animate-pulse" />
                      </span>
                    )}
                    {order.status === "Shipped" && (
                      <span className="text-blue-600 font-medium flex items-center">
                        {order.status}
                        <TbReport className="ml-2 text-lg animate-bounce" />
                      </span>
                    )}
                    {order.status === "Delivered" && (
                      <span className="text-green-600 font-medium flex items-center">
                        {order.status}
                        <IoCheckmarkCircle className="ml-2 text-lg animate-wiggle" />
                      </span>
                    )}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                  <button
                    className="bg-gradient-to-r from-text to-primary text-white py-3 text-sm rounded-full font-medium shadow-md hover:bg-blue-700 md:hover:scale-105 transition-transform duration-300 px-5 focus:ring-4 focus:ring-blue-300  w-full sm:w-auto"
                    onClick={() => handleView(order.permanent_id)}
                  >
                    View Details
                  </button>
                  <button
                    className="border-gray-200 border text-black bg-gradient-to-r from-gray-50 to-gray-200 font-medium py-3 text-sm rounded-full shadow-md md:hover:scale-105 transition-transform duration-300 px-5 focus:ring-4 focus:ring-yellow-300  w-full sm:w-auto"
                    onClick={() => handleStatusClick(order)}
                  >
                    Change Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex lg:justify-start justify-center items-center p-2">
          <div className="flex space-x-3 items-center my-4">
            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded hover:bg-gray-200 "
            >
              Prev
            </button>
            <span className="text-gray-700">
              Page {currentPage} of{" "}
              {Math.ceil(productOrders.length / ordersPerPage)}
            </span>
            <button
              onClick={nextPage}
              disabled={
                currentPage === Math.ceil(productOrders.length / ordersPerPage)
              }
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded hover:bg-gray-200 "
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Status Update */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[7]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <h3 className="text-lg font-bold mb-4">Update Order Status</h3>
            <p className="text-gray-600 mb-2">
              <strong>Order ID:</strong> {selectedOrder.order_id}
            </p>
            <label className="block text-gray-700 font-semibold mb-2">
              Status:
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            >
              <option
                value="Order Placed"
                disabled={
                  selectedStatus === "Shipped" || selectedStatus === "Delivered"
                }
              >
                Order Placed
              </option>
              <option value="Shipped" disabled={selectedStatus === "Delivered"}>
                Shipped
              </option>
              <option value="Delivered">Delivered</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStatus}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowProducts;
