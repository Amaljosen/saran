import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import { IoCheckmarkCircle } from "react-icons/io5";

function ShowProducts() {
  const [productOrders, setProductOrders] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Fetch data from the API
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/v1/product-orders`)
      .then((response) => {
        setProductOrders(response.data.productOrders);
      })
      .catch((error) => {
        console.error("Error fetching product orders:", error);
      });
  }, []);

  const handleStatusClick = (order) => {
    setSelectedOrder(order);
    setSelectedStatus(order.status);
    setShowModal(true);
    console.log(order.status)
    console.log(selectedStatus)
  };


  const handleSaveStatus = () => {
    if (!selectedOrder) return;
  
    const payload = {
      payment_id: selectedOrder.payment_id,
      status: selectedStatus,
    };
  
    // Update the status locally
    setProductOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.payment_id === selectedOrder.payment_id
          ? { ...order, status: selectedStatus }
          : order
      )
    );
  
    // Optionally, close the modal before the API call
    setShowModal(false);
  
    // Post the updated status to the backend
    axios
      .post(`${import.meta.env.VITE_BACKEND_API}/v1/update-myorders`, payload)
      .then((response) => {
        console.log("Status updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        // Optionally, handle the error by showing a message or reverting the local update
      });
  };
  

  const totalOrders = productOrders.length;
  const totalRevenue = productOrders.reduce(
    (sum, order) => sum + Number(order.totalPrice),
    0
  );
  const totalShippingCharges = productOrders.reduce(
    (sum, order) => sum + Number(order.shipping_charges),
    0
  );

  const handleView = (permanentId) => {
    navigate(`/dashboard/product/${permanentId}`);
  };
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = productOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const nextPage = () => {
    if (currentPage < Math.ceil(productOrders.length / ordersPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    console.log("Selected status:", selectedStatus);
  }, [selectedStatus]);

  return (
    <div className="py-6">
     
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Dashboard
          </h1>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-sm md:text-lg font-semibold text-gray-600">
              Total Orders
            </h2>
            <p className="text-xl md:text-2xl font-bold text-blue-600">
              {totalOrders}
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
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-sm md:text-lg font-semibold text-gray-600">
              Shipping Charges
            </h2>
            <p className="text-xl md:text-2xl font-bold text-red-600">
              ₹{totalShippingCharges}
            </p>
          </div>
        </div>

        {/* Product Orders Section */}
        <div className="bg-white   ">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
            Product Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left text-gray-700">
                  <th className="p-2 md:p-3 md:text-base text-sm  border hidden lg:table-cell ">Order ID</th>
                  <th className="p-2 md:p-3 md:text-base text-sm border ">Product Name</th>
                  <th className="p-2 md:p-3 border hidden lg:table-cell">Size</th>
                  <th className="p-2 md:p-3 border hidden lg:table-cell">Price</th>
                  <th className="p-2 md:p-3 border hidden lg:table-cell">Shipping</th>
                  <th className="p-2 md:p-3 border md:text-base text-sm">Total</th>
                  <th className="p-2 md:p-3 border md:text-base text-sm hidden lg:table-cell">Customer</th>
                  <th className="p-2 md:p-3 border text-sm md:text-base">Status</th>
                  <th className="p-2 md:p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.order_id} className="hover:bg-gray-100">
                    <td className="p-1 md:p-2  border hidden lg:table-cell ">{order.order_id}</td>
                    <td className="p-1 md:p-2 md:text-base text-xs border  ">{order.productName}</td>
                    <td className="p-1 md:p-2 border hidden lg:table-cell ">{order.size}</td>
                    <td className="p-1 md:p-2 border hidden lg:table-cell">₹{order.price}</td>
                    <td className="p-1 md:p-2 border hidden lg:table-cell">
                      ₹{order.shipping_charges}
                    </td>
                    <td className="p-1 md:p-2  border md:text-base text-xs">₹{order.totalPrice}</td>
                    <td className="p-1 md:p-2 md:text-base text-xs  hidden lg:table-cell  border">{order.name}</td>
                    <td className="p-1 md:p-2 border md:text-base text-xs  space-x-2">
                      {order.status === "Order Placed" && (
                        <p className="flex items-center">
                          <span className="text-blue-600 font-semibold">{order.status}</span>
                          <p><IoEyeOutline className="text-blue-600" /></p>
                        </p>
                      )}
                      {order.status === "Shipped" && (
                        <p className="flex items-center">
                          <span className="text-blue-600 font-semibold">{order.status}</span>
                          <p><TbReport className="text-blue-600" /></p>
                        </p>
                      )}
                      {order.status === "Delivered" && (
                        <p className="flex items-center">
                          <span className="text-green-600 font-semibold">{order.status}</span>
                          <p><IoCheckmarkCircle className="text-green-600" /></p>
                        </p>
                      )}
                      
                    </td>

                    <td className="p-2 border table-cell  ">
                      {/* Full buttons for large screens */}
                      <div className="hidden lg:flex space-x-2">
                        <button
                          onClick={() => handleView(order.permanent_id)}
                          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleStatusClick(order)}
                          className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                        >
                          Status
                        </button>
                      </div>

                      {/* Icon buttons for small screens */}
                      <div className=" table-cell lg:hidden ">
                       <div className="flex">
                       <button
                          onClick={() => handleView(order.permanent_id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
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
          </div>
          <div className="flex lg:justify-start justify-center items-center">
            <div className="flex space-x-3 items-center mt-4">
            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded "
            >
              Prev
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {Math.ceil(productOrders.length / ordersPerPage)}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(productOrders.length / ordersPerPage)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded "
            >
              Next
            </button>
            </div>
          </div>
        </div>

        {/* Status Modal */}
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
  <option value="Order Placed" disabled={selectedStatus === "Shipped" || selectedStatus === "Delivered"}>
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