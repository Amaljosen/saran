import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import axios from "axios";

const Review = () => {
  const [productReviews, setProductReviews] = useState([]);
  const [sessionReviews, setSessionReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("product"); // Default to "product"
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [id, setId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // New state for deleting
  const [showDeletingModal, setShowDeletingModal] = useState(false);
  const itemsPerPage = 5;

  // Fetch product reviews
  const fetchProducts = () => {
    setLoading(true); // Start loading
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/v1/review`)
      .then((response) => {
        if (response.data) {
          setProductReviews(response.data); // Set product reviews
        }
      })
      .catch((error) => {
        // console.error("Error fetching product reviews:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  // Fetch session reviews
  const fetchSessions = () => {
    setLoading(true); // Start loading
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/v1/reviewsessions`)
      .then((response) => {
        if (response.data?.message === "Reviews fetched successfully") {
          setSessionReviews(response.data.data || []); // Set session reviews
        }
      })
      .catch((error) => {
        // console.error("Error fetching session reviews:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  // useEffect to load the data based on activeTab
  useEffect(() => {
    if (activeTab === "product") {
      fetchProducts();
    } else {
      fetchSessions();
    }
  }, [activeTab]);

  // Calculate total pages for pagination
  const totalPages =
    activeTab === "sessions"
      ? Math.ceil(sessionReviews.length / itemsPerPage)
      : Math.ceil(productReviews.length / itemsPerPage);

  // Get the reviews for the current page
  const reviewsToDisplay =
    activeTab === "sessions" ? sessionReviews : productReviews;

  // Slice the reviews array based on current page
  const paginatedReviews = reviewsToDisplay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApprove = (id) => {
    // console.log(id);
    const baseUrl =
      activeTab === "product"
        ? `${import.meta.env.VITE_BACKEND_API}/v1/review`
        : `${import.meta.env.VITE_BACKEND_API}/v1/reviewsessions`;

    axios
      .put(`${baseUrl}/${id}`, { isApproved: true })
      .then(() => {
        // console.log(`Review with ID: ${id} has been approved.`);
        // Re-fetch the data
        activeTab === "product" ? fetchProducts() : fetchSessions();
      })
      .catch((err) =>{
        //  console.error("Error approving review:", err)
        });
  };

  const handleDelete = (id) => {
    setShowDeleteConfirm(false);
    setIsDeleting(true);
    setShowDeletingModal(true);

    const baseUrl =
        activeTab === "product"
            ? `${import.meta.env.VITE_BACKEND_API}/v1/review`
            : `${import.meta.env.VITE_BACKEND_API}/v1/reviewsessions`;

    // console.log("Delete Request URL:", `${baseUrl}/${id}`);

    axios
        .delete(`${baseUrl}/${id}`)
        .then(() => {
            // console.log(`Review with ID: ${id} has been deleted.`);
            activeTab === "product" ? fetchProducts() : fetchSessions();
        })
        .catch((err) =>{ 
          // console.error("Error deleting review:", err)
        })
        .finally(() => {
            setIsDeleting(false);
            setShowDeletingModal(false); // Hide the deleting modal
        });
};

  
  // console.log("Active Tab:", activeTab);

  const openDeleteConfirm = (id) => {
    setId(id);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="py-4 w-[90%] mx-auto bg-white mt-20">
      {/* Tab Navigation */}
      <div className="mb-4">
        {/* Button Navigation */}
        <div className="grid grid-cols-2 md:flex md:space-x-4 text-xs md:text-sm gap-2 md:gap-0 w-full md:w-auto justify-between md:justify-start">
          <button
            className={`transition-colors duration-300 ease-in-out px-4 py-2 border rounded-md font-medium ${
              activeTab === "product"
                ? "text-white border-primary bg-gradient-to-r from-primary to-text"
                : "text-gray-700 border-gray-300 hover:text-primary hover:border-primary"
            }`}
            onClick={() => {
              setActiveTab("product");
              setCurrentPage(1); // Reset to first page when switching tabs
              window.scrollTo(0, 0); // Scroll to the top
            }}
          >
            Product
          </button>
          <button
            className={`transition-colors duration-300 ease-in-out px-4 py-2 border rounded-md font-medium ${
              activeTab === "sessions"
                ? "text-white border-primary bg-gradient-to-r from-primary to-text"
                : "text-gray-700 border-gray-300 hover:text-primary hover:border-primary"
            }`}
            onClick={() => {
              setActiveTab("sessions");
              setCurrentPage(1); // Reset to first page when switching tabs
              window.scrollTo(0, 0); // Scroll to the top
            }}
          >
            Sessions
          </button>
        </div>
      </div>

      {/* Review Display (Box Card on Mobile, Table on Desktop) */}

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
      ) : activeTab === "product" && productReviews.length === 0 ? (
        <div className="flex items-center justify-center h-[60vh] text-center text-gray-700">
          No Product Reviews Available.
        </div>
      ) : activeTab === "sessions" && sessionReviews.length === 0 ? (
        <div className="flex items-center justify-center h-[60vh] text-center text-gray-700">
          No Session Reviews Available.
        </div>
      ) : (
        <div>
          {/* Mobile View: Box Cards */}
          <div className="block md:hidden">
            {paginatedReviews.map((review) => (
              <div
                key={review.reviewsession_id || review.review_id}
                className="p-4 mb-4 border border-gray-200 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="font-bold text-lg">{review.reviewer}</div>
                  <div className="text-sm text-gray-500">
                    {review.isApproved ? "Approved" : "Not Approved"}
                  </div>
                </div>
                <div className="text-sm mb-2">{review.comment}</div>
                <div className="flex space-x-2">
                  {!review.isApproved && (
                    <button
                      onClick={() =>
                        handleApprove(
                          review.reviewsession_id || review.review_id
                        )
                      }
                      className="bg-green-500 text-white px-3 py-1 text-xs rounded"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() =>
                      openDeleteConfirm(review.reviewsession_id || review.review_id)
                    }
                    className="bg-red-500 text-white px-3 py-1 text-xs rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-200 text-sm">
                    S.NO
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-sm">
                    Reviewer
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-sm">
                    Rating
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-sm">
                    Comment
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-sm">
                    Status
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedReviews.map((review, index) => (
                  <tr
                    key={review.reviewsession_id || review.review_id}
                    className="hover:bg-gray-50 text-center"
                  >
                    <td className="px-4 py-2 text-center border border-gray-200 text-sm">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {review.reviewer}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {/* Displaying stars instead of number */}
                      {Array.from({ length: review.rating }, (_, index) => (
                        <FaStar
                          key={index}
                          className="inline text-yellow-400"
                        />
                      ))}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {review.comment}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          review.isApproved
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {review.isApproved ? "Approved" : "Not Approved"}
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-gray-200 space-x-2 text-sm">
                      {!review.isApproved && (
                        <button
                          onClick={() =>
                            handleApprove(
                              review.reviewsession_id || review.review_id
                            )
                          }
                          className="bg-green-500 text-white px-3 py-1 text-xs rounded"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() =>
                          openDeleteConfirm(
                            review.reviewsession_id || review.review_id
                          )
                        }
                        className="bg-red-500 text-white px-3 py-1 text-xs rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center md:justify-start md:space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-sm rounded"
            >
              Prev
            </button>
            <span className="px-4 py-2 text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-sm rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {showDeletingModal && (
        <div className="fixed inset-0 p-6 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl flex flex-col items-center justify-center max-w-md w-full">
            <lord-icon
              id="success-icon"
              src="https://cdn.lordicon.com/wpyrrmcq.json"
              trigger="loop"
              style={{ width: "80px", height: "80px" }}
              colors="primary:#c71f16"
            ></lord-icon>
            <p className="text-center text-sm text-gray-600 mt-2">
              Deleting Your Session Please wait <p>for Sometimes...</p>
            </p>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center bg-gray-500 bg-opacity-50  justify-center z-50">
          <div className="bg-white rounded-lg mx-5 shadow-lg p-4 w-full max-w-md">
            <p className="text-gray-700 text-center">
              Are you sure you want to delete this Review?
            </p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 mr-2 text-sm bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(id)}
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

export default Review;
