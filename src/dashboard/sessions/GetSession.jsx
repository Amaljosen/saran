import React, { useState, useEffect } from "react";
import axios from "axios";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // New state for deleting
  const [showDeletingModal, setShowDeletingModal] = useState(false); // New state for deleting modal
  const itemsPerPage = 3;

  // Fetch session data from the API
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/v1/session`)
      .then((response) => {
        if (response.data?.data?.sessions) {
          setSessions(response.data.data.sessions);
        }
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(sessions.length / itemsPerPage);

  const paginatedSessions = sessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle session deletion
  const handleDelete = async (sessionId) => {
    setShowDeleteConfirm(false)
    setIsDeleting(true);
    setShowDeletingModal(true); // Show the deleting modal

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/v1/session/${sessionId}`
      );

      const updatedSessions = sessions.filter(
        (session) => session.session_id !== sessionId
      );
      setSessions(updatedSessions);
    } catch (error) {
      console.error("Error deleting session:", error);
    } finally {
      setIsDeleting(false);
      setShowDeletingModal(false); // Hide the deleting modal
      setShowDeleteConfirm(false);
    }
  };

  const openDeleteConfirm = (sessionId) => {
    setSessionId(sessionId);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="bg-white py-4 text-black">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[35rem] md:h-[30rem] w-full">
          <div
            className="md:w-16 w-12 md:h-16 h-12 bg-no-repeat bg-center mb-4"
            style={{
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="%238C4CFF" stroke-width="15" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>')`,
            }}
          ></div>
          <p className="text-center text-sm md:text-base text-gray-700">
            Loading please wait ...
          </p>
        </div>
      ) : sessions.length === 0 ? (
        <div className="flex items-center justify-center h-[50vh] text-center text-gray-700">
          No Sessions Available.
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-gray-700 mb-4">All Sessions</h1>

          <div className="block md:hidden">
            {paginatedSessions.map((session, index) => (
              <div
                key={session.session_id}
                className="p-4 mb-4 border border-gray-200 rounded shadow-md"
              >
                <img
                  src={session.session_image}
                  alt={session.session_name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <div className="text-base font-bold mb-1">
                  {index + 1 + (currentPage - 1) * itemsPerPage}.{" "}
                  {session.session_name}
                </div>
                <div className="text-gray-600 text-sm mb-2">{session.description}</div>
                <div className="text-sm">
                  <strong>Mode:</strong> {session.session_mode}
                </div>
                <div className="text-sm">
                  <strong>Kit:</strong> {session.session_kit}
                </div>
                <div className="text-sm">
                  <strong>Date:</strong> {session.date}
                </div>
                <div className="text-sm">
                  <strong>Time:</strong> {session.time}
                </div>
                <div className="text-base font-bold mt-2">₹{session.price}</div>
                <button
                  onClick={() => openDeleteConfirm(session.session_id)}
                  className="mt-3 px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-200 text-sm">S.No</th>
                  <th className="px-4 py-2 border border-gray-200 text-sm">Image</th>
                  <th className="px-4 py-2 border border-gray-200 text-sm">Session Name</th>
                  <th className="px-4 py-2 border border-gray-200 text-sm">Description</th>
                  <th className="px-4 py-2 border border-gray-200 text-sm">Details</th>
                  <th className="px-4 py-2 border border-gray-200 text-sm">Price</th>
                  <th className="px-4 py-2 border border-gray-200 text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSessions.map((session, index) => (
                  <tr
                    key={session.session_id}
                    className="hover:bg-gray-50 text-center"
                  >
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      <img
                        src={session.session_image}
                        alt={session.session_name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {session.session_name}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {session.description}
                    </td>
                    <td className="px-2 py-2 border border-gray-200 text-sm text-start">
                      <div>
                        <strong>Mode:</strong> {session.session_mode}
                      </div>
                      <div>
                        <strong>Kit:</strong> {session.session_kit}
                      </div>
                      <div>
                        <strong>Date:</strong> {session.date}
                      </div>
                      <div>
                        <strong>Time:</strong> {session.time}
                      </div>
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm font-bold">
                      ₹{session.price}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      <button
                        onClick={() => openDeleteConfirm(session.session_id)}
                        className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              className="px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              className="px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
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
              Deleting Your Session Please wait <p>for Sometimes...</p>
            </p>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center bg-gray-500 bg-opacity-50  justify-center z-50">
          <div className="bg-white rounded mx-5 shadow-lg p-4 w-full max-w-md">
            <p className="text-gray-700 text-center">Are you sure you want to delete this session?</p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 mr-2 text-sm bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(sessionId)}
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

export default Sessions;
