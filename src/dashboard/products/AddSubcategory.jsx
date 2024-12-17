import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";

function AddSubcategory() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategories, setNewSubcategories] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [poptext, setPoptext] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // New state for deleting

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(subcategories.length / itemsPerPage);

  // Get items for the current page
  const currentItems = subcategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleActionClick = async (subcategoryId) => {
    try {
      setIsDeleting(true); // Set deleting state to true
      setPoptext("loading");
      setShowPopup(true);
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/v1/subcategory/${subcategoryId}`
      );
      fetchSubcategories();
      setPoptext("delete_success");
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      setPoptext("error");
    } finally {
      setTimeout(() => {
        setIsDeleting(false); // Reset deleting state
        setShowPopup(false);
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/v1/category`
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/v1/subcategory`
      );
      setSubcategories(response.data.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleReset = () => {
    setNewSubcategories("");
    setSelectedCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newSubcategories || !selectedCategory) {
      setPoptext("error");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
      return;
    }

    try {
      setPoptext("loading");
      setShowPopup(true);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/v1/subcategory`,
        {
          subcategory_name: newSubcategories,
          category_id: selectedCategory,
        }
      );

      fetchSubcategories();
      setNewSubcategories("");
      setSelectedCategory("");
      setPoptext("add_success");
    } catch (error) {
      console.error("Error creating subcategory:", error);
      setPoptext("error");
    } finally {
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
  };

  return (
    <div>
      <div>
        <div className="container mx-auto text-black">
          <div className="py-5 space-y-3">
            <div className="bg-[#e9e9e9] w-full border-l-4 border-[#8c4cff]">
              <div className="flex space-x-2 text-[#000000] text-sm md:text-base font-semibold p-2 items-center">
                <h1>Add Subcategory</h1>
                <MdEditDocument className="text-xl" />
              </div>
            </div>
            <div className="lg:flex justify-start items-center px-2 lg:space-x-6 lg:space-y-0 space-y-4">
              <div className="text-sm md:text-base">
                <h2>Category</h2>
                <select
                  className="focus:outline-none border rounded p-1 w-full lg:w-[300px] h-[40px]"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-sm md:text-base">
                <h2>Subcategory Name</h2>
                <input
                  type="text"
                  className="focus:outline-none border rounded p-1 w-full lg:w-[350px] h-[40px]"
                  value={newSubcategories}
                  onChange={(e) => setNewSubcategories(e.target.value)}
                  placeholder="Enter Subcategory name"
                />
              </div>
            </div>
            <div className="pb-5 flex justify-center lg:justify-start space-x-4 items-center px-2 text-sm md:text-base">
              <button
                onClick={handleReset}
                className="lg:px-4 px-4 py-2 lg:py-1 md:hover:scale-105 transition-all duration-300 rounded border"
              >
                Reset
              </button>
              <button
                onClick={handleSubmit}
                className="lg:px-4 px-4 py-2 lg:py-1 rounded border md:hover:scale-105 transition-all duration-300 border-[#8c4cff] bg-[#8c4cff] text-white"
              >
                Add Subcategory
              </button>
            </div>

            {/* Subcategory List Table */}
            <table className="mt-6 w-full lg:w-[80%] border-collapse border text-sm md:text-base border-gray-200">
              <thead>
                <tr className="bg-[#FBFBFB]">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    SI/NO
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Title
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((subcategory, index) => (
                  <tr
                    key={subcategory.id || index}
                    className="hover:bg-gray-50"
                  >
                    <td className="border border-gray-300 px-4 py-2 text-center md:text-start">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {subcategory.subcategory_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex justify-center items-center">
                        <button
                          className="bg-red-500 hidden text-sm lg:block hover:bg-red-700 md:hover:scale-105 transition-all duration-300 text-white px-3 py-1 rounded"
                          onClick={() =>
                            handleActionClick(subcategory.subcategory_id)
                          }
                        >
                          Delete Subcategory
                        </button>
                        <button
                          className="bg-red-500 lg:hidden block hover:bg-red-700 md:hover:scale-105 transition-all duration-300 text-white px-3 py-1 rounded"
                          onClick={() =>
                            handleActionClick(subcategory.subcategory_id)
                          }
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex lg:justify-start justify-center items-center">
              <div className="flex space-x-3 items-center mt-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Prev
                </button>
                <span className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 ${
            isDeleting ? "bg-opacity-75" : ""
          }`}
        >
          <div className="bg-white rounded shadow-lg">
            {poptext === "loading" && (
              <div className="flex justify-center items-center space-x-2">
                <span className="text-sm">
                  {isDeleting ? (
                    <div className="fixed inset-0 p-6 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white p-8 rounded flex flex-col items-center justify-center max-w-md w-full">
                        <div>
                          <lord-icon
                            id="success-icon"
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="loop" // Set to loop to repeat the animation
                            style={{ width: "80px", height: "80px" }}
                            colors="primary:#c71f16"
                          ></lord-icon>
                        </div>
                        <p className="text-center md:text-base text-sm text-gray-600 mt-2">
                          Deleting Sub Category Please wait for Sometimes....
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="fixed inset-0 p-6 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white p-8 rounded flex flex-col items-center justify-center max-w-md w-full">
                        <div>
                          <lord-icon
                            id="success-icon"
                            src="https://cdn.lordicon.com/mwikjdwh.json"
                            trigger="loop" // Set to loop to repeat the animation
                            style={{ width: "80px", height: "80px" }}
                            colors="primary:#8C4CFF"
                          ></lord-icon>
                        </div>
                        <p className="text-center md:text-base text-sm text-gray-600 mt-2">
                          Adding Sub Category Please wait for Sometimes....
                        </p>
                      </div>
                    </div>
                  )}
                </span>
              </div>
            )}
            {poptext === "delete_success" && (
              <div className="fixed inset-0 p-6 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded flex flex-col items-center justify-center max-w-md w-full">
                  <h2 className="text-center md:text-xl text-base font-semibold text-gray-700">
                    Your Sub Category was Deleted successfully!
                  </h2>
                  <div>
                    <lord-icon
                      id="success-icon"
                      src="https://cdn.lordicon.com/oqdmuxru.json"
                      trigger="in" // Set to loop to repeat the animation
                      style={{ width: "80px", height: "80px" }}
                      colors="primary:#16c72e"
                    ></lord-icon>
                  </div>
                  <p className="text-center md:text-base text-sm text-gray-600 mt-2">
                    Explore Home Page for More Products
                  </p>
                  <div className="mt-3 w-full">
                    <button
                      onClick={() => setShowPopup(false)}
                      className="bg-red-500 md:hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded w-full"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
            {poptext === "add_success" && (
              <div className="fixed inset-0 p-6 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded flex flex-col items-center justify-center max-w-md w-full">
                  <h2 className="text-center md:text-xl text-base font-semibold text-gray-700">
                    Your Sub Category was Added successfully!
                  </h2>
                  <div>
                    <lord-icon
                      id="success-icon"
                      src="https://cdn.lordicon.com/oqdmuxru.json"
                      trigger="in" // Set to loop to repeat the animation
                      style={{ width: "80px", height: "80px" }}
                      colors="primary:#16c72e"
                    ></lord-icon>
                  </div>
                  <p className="text-center md:text-base text-xs text-gray-600 mt-2">
                    Explore Home Page for More Products
                  </p>
                  <div className="mt-3 w-full">
                    <button
                      onClick={() => setShowPopup(false)}
                      className="bg-red-500 md:hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded w-full"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
            {poptext === "error" && (
              <div className="fixed inset-0 p-6 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded flex flex-col items-center justify-center max-w-md w-full">
                  <div>
                    <lord-icon
                      id="success-icon"
                      src="https://cdn.lordicon.com/vihyezfv.json"
                      trigger="in"
                      state="in-warning" // Set to loop to repeat the animation
                      style={{ width: "80px", height: "80px" }}
                      colors="primary:#c71f16"
                    ></lord-icon>
                  </div>
                  <p className="text-center md:text-base text-xs text-gray-600 mt-2">
                    Please fill all the fields
                  </p>
                  <div className="mt-3 w-full">
                    <button
                      onClick={() => setShowPopup(false)}
                      className="bg-red-500 md:hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded w-full"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddSubcategory;
