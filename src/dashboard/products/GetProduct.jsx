import React, { useState, useEffect } from "react";
import axios from "axios";

const GetProduct = () => {
  const [activeTab, setActiveTab] = useState("Products");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productId, setProductId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // New state for deleting
  const [showDeletingModal, setShowDeletingModal] = useState(false);
  const itemsPerPage = 5; // Number of items per page

  // Fetch Product Data
  const fetchData = () => {
    setLoading(true);
  
    // Fetch Products
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/v1/product`)
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  
    // Fetch Categories
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/v1/product-variations`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };
  
  useEffect(() => {
    fetchData(); // Call the fetchData function on mount
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(
    activeTab === "Products"
      ? products.length / itemsPerPage
      : categories.length / itemsPerPage
  );

  const paginatedData =
    activeTab === "Products"
      ? products.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : categories.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

  const handleDelete = (id) => {
    setShowDeleteConfirm(false);
    setIsDeleting(true);
    setShowDeletingModal(true);

    const deleteRequest =
      activeTab === "Products"
        ? axios.delete(`${import.meta.env.VITE_BACKEND_API}/v1/product/${id}`)
        : axios.delete(
            `${import.meta.env.VITE_BACKEND_API}/v1/product-variations/${id}`
          );

    deleteRequest
        .then(() => {
          fetchData(); // Refresh data after delete without refresh
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsDeleting(false);
          setShowDeletingModal(false);
        });
  };

  const openDeleteConfirm = (productId) => {
    setProductId(productId);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="py-6 text-black">
      {/* Tabs */}
      <div className="flex gap-6 mb-6">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "Products"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => {
            setActiveTab("Products");
            setCurrentPage(1); // Reset to first page
          }}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "Categories"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => {
            setActiveTab("Categories");
            setCurrentPage(1); // Reset to first page
          }}
        >
          Products Variation
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-[35rem] md:h-[30rem] w-full">
          {/* SVG Loader */}
          <div
            className="md:w-16 w-12 md:h-16 h-12 bg-no-repeat bg-center mb-4"
            style={{
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="%238C4CFF" stroke-width="15" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>')`,
            }}
          ></div>
          {/* Loading Message */}
          <p className="text-center text-sm md:text-base text-gray-700">
            Loading please wait ...
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center h-[50vh] text-center text-gray-700">
          No Product Available.
        </div>
      ) : (
        <div>
          {/* Products Section */}
          {activeTab === "Products" && (
            <div>
              {/* Large Screen (Table) */}
              <div className="hidden sm:block">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border border-gray-200">S.NO</th>
                      <th className="px-4 py-2 border border-gray-200">
                        Image
                      </th>
                      <th className="px-4 py-2 border border-gray-200">
                        Product Name
                      </th>
                      <th className="px-4 py-2 border border-gray-200">
                        Description
                      </th>
                      <th className="px-4 py-2 border border-gray-200">
                        Price
                      </th>
                      <th className="px-4 py-2 border border-gray-200">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((product, index) => (
                      <tr key={product.product_id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-center border border-gray-200">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          <img
                            src={
                              product.productVariation[0]
                                ?.productVariation_image || ""
                            }
                            alt="Product"
                            className="w-16 h-16 object-cover"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          {product.product_name}
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          {product.productVariation[0]?.description || "N/A"}
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          ₹
                          {product.productVariation[0]
                            ?.productVariation_price || "N/A"}
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          <button
                            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                            onClick={() =>
                              openDeleteConfirm(product.product_id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View (Box/Card Layout) */}
              <div className="sm:hidden">
                {paginatedData.map((product) => (
                  <div
                    key={product.product_id}
                    className="border p-4 rounded shadow mb-4"
                  >
                    <img
                      src={
                        product.productVariation[0]?.productVariation_image ||
                        ""
                      }
                      alt="Product"
                      className="w-full h-32 object-cover rounded"
                    />
                    <h2 className="mt-2 font-semibold">
                      Product Name: {product.product_name}
                    </h2>
                    <p>{product.productVariation[0]?.description || "N/A"}</p>
                    <p className="font-semibold text-purple-600">
                      Price:{" "}
                      {product.productVariation[0]?.productVariation_price ||
                        "N/A"}
                    </p>
                    <button
                      className="mt-2 px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      onClick={() => openDeleteConfirm(product.product_id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Section */}
          {activeTab === "Categories" && (
            <div>
              {/* Large Screen (Table) */}
              <div className="hidden sm:block">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border border-gray-200">S.NO</th>
                      <th className="px-4 py-2 border border-gray-200">
                        Image
                      </th>
                      <th className="px-4 py-2 border border-gray-200">
                        Theme
                      </th>
                      <th className="px-4 py-2 border border-gray-200">Size</th>
                      <th className="px-4 py-2 border border-gray-200">
                        Price
                      </th>
                      <th className="px-4 py-2 border border-gray-200">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((category, index) => (
                      <tr
                        key={category.productVariation_id}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-2 text-center border border-gray-200">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          <img
                            src={category.productVariation_image}
                            alt="Category"
                            className="w-16 h-16 object-cover"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          {category.theme}
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          {category.size}
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          ₹{category.productVariation_price}
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          <button
                            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                            onClick={() =>
                              openDeleteConfirm(category.productVariation_id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View (Box/Card Layout) */}
              <div className="sm:hidden">
                {paginatedData.map((category) => (
                  <div
                    key={category.productVariation_id}
                    className="border p-4 rounded shadow mb-4"
                  >
                    <img
                      src={category.productVariation_image}
                      alt="Category"
                      className="w-full h-32 object-cover rounded"
                    />
                    <h2 className="mt-2 font-semibold">
                      Theme: {category.theme}
                    </h2>
                    <p>Size: {category.size}</p>
                    <p className="font-semibold text-purple-600">
                      Price: {category.productVariation_price}
                    </p>
                    <button
                      className="mt-2 px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      onClick={() =>
                        openDeleteConfirm(category.productVariation_id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex space-x-2 items-center mt-6">
            <button
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded hover:bg-gray-200"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded hover:bg-gray-200"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {showDeletingModal && (
        <div className="fixed inset-0 p-6 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded flex flex-col items-center justify-center max-w-md w-full">
            <lord-icon
              id="success-icon"
              src="https://cdn.lordicon.com/wpyrrmcq.json"
              trigger="loop"
              style={{ width: "80px", height: "80px" }}
              colors="primary:#c71f16"
            ></lord-icon>
            <p className="text-center text-sm text-gray-600 mt-2">
              Deleting Your Product Please wait <p>for Sometimes...</p>
            </p>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center bg-gray-500 bg-opacity-50  justify-center z-50">
          <div className="bg-white rounded mx-5 shadow-lg p-4 w-full max-w-md">
            <p className="text-gray-700 text-center">
              Are you sure you want to delete this Product?
            </p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 mr-2 text-sm bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(productId)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm bg-red-500 rounded text-white hover:bg-red-600"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetProduct;
