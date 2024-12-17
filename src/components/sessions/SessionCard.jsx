import React, { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
const SessionCard = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [filter, setFilter] = useState("All Sessions");
  const [sortDropdown, setSortDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState("Select Option");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6; // Limit to 6 cards per page

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/v1/session`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSessions(data.data.sessions);
        setFilteredSessions(data.data.sessions);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    setDropdown(false);
    setCurrentPage(1); // Reset to first page
    if (filterType === "All Sessions") {
      setFilteredSessions(sessions);
    } else {
      setFilteredSessions(
        sessions.filter(
          (session) =>
            session.session_mode.toLowerCase() === filterType.toLowerCase()
        )
      );
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setSortDropdown(false);

    const sortedSessions = [...filteredSessions].sort((a, b) => {
      if (order === "Low to High") {
        return a.price - b.price;
      } else if (order === "High to Low") {
        return b.price - a.price;
      }
      return 0;
    });
    setFilteredSessions(sortedSessions);
  };

  const handleDropdownClick = () => {
    setDropdown(!dropdown);
  };

  const handleSortDropdownClick = () => {
    setSortDropdown(!sortDropdown);
  };

  // Pagination handlers
  const totalPages = Math.ceil(filteredSessions.length / cardsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Slice sessions based on current page
  const currentSessions = filteredSessions.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );
  const handleBuyNowClick = (SessionId) => {
    navigate(`/sessionDescription/${SessionId}`);
    window.scrollTo(0, 0);
    console.log(`Navigating to product ID: ${SessionId}`);
  };
  const truncateText = (text, wordLimit) => {
    if (!text) return ""; // Handle undefined or null cases
    const words = text.split(" "); // Split text by spaces
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + " ..."; // Truncate and append ellipsis
    }
    return text; // Return full text if within the limit
  };

  return (
    <div className="container mx-auto mt-[7.4rem] md:mt-36 text-black">
      {/* Filters */}

      <div>
        {/* Content Area */}

        <div className=" mx-auto">
          <div className=" w-[90%] mx-auto flex items-center justify-between mb-3">
            <div className=" py-2 px-1 hidden lg:block">
              <div className="flex border p-4 rounded-full text-sm gap-4">
                <button
                  className={`px-4 py-2 border rounded-full hover:bg-primary hover:text-white transition-all duration-300 ${
                    filter === "All Sessions"
                      ? "bg-primary text-white"
                      : " text-gray-800"
                  }`}
                  onClick={() => handleFilterChange("All Sessions")}
                >
                  All Workshops
                </button>
                <button
                  className={`px-4 py-2 border rounded-full hover:bg-primary hover:text-white transition-all duration-300 ${
                    filter === "Online"
                      ? "bg-primary text-white"
                      : " text-gray-800"
                  }`}
                  onClick={() => handleFilterChange("Online")}
                >
                  Online Workshops
                </button>
                <button
                  className={`px-4 py-2 border rounded-full hover:bg-primary hover:text-white transition-all duration-300 ${
                    filter === "Offline"
                      ? "bg-primary text-white"
                      : " text-gray-800"
                  }`}
                  onClick={() => handleFilterChange("Offline")}
                >
                  Offline Workshops
                </button>
              </div>
            </div>
            <div className="relative lg:hidden block text-sm">
              <div
                className="border px-4 py-2 flex items-center gap-2 rounded-full cursor-pointer"
                onClick={handleDropdownClick}
              >
                <span> {filter} </span>
                <span>{dropdown ? <SlArrowUp /> : <SlArrowDown />}</span>
              </div>
              {dropdown && (
                <div className="absolute mt-2 w-36 bg-white border rounded ">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleFilterChange("All Sessions")}
                    >
                      All Sessions
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleFilterChange("Online")}
                    >
                      Online
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleFilterChange("Offline")}
                    >
                      Offline
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {/* Sorting Dropdown */}
            <div className="relative">
              <div
                className=" px-4 py-2 cursor-pointer flex items-center md:text-base text-xs  "
                onClick={handleSortDropdownClick}
              >
                Sort By: {sortOrder}
                {sortDropdown ? (
                  <SlArrowUp className="ml-2" />
                ) : (
                  <SlArrowDown className="ml-2" />
                )}
              </div>

              {sortDropdown && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-36">
                  <ul>
                    <li
                      className={`px-4 py-2 cursor-pointer lg:text-base text-xs ${
                        sortOrder === "Low to High"
                          ? "bg-sky-200"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleSortChange("Low to High")}
                    >
                      Low to High
                    </li>
                    <li
                      className={`px-4 py-2 cursor-pointer lg:text-base text-xs ${
                        sortOrder === "High to Low"
                          ? "bg-sky-200"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleSortChange("High to Low")}
                    >
                      High to Low
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <hr className=" w-[100%]" />

          {/* ........Sessions Card Boxes........ */}

          {loading ? (
            <div className="flex flex-col items-center justify-center h-[37rem] md:h-[32rem] w-full">
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
          ) : error ? (
            <p className="flex items-center justify-center h-[70vh] text-center text-gray-700">
              Error: {error}
            </p>
          ) : currentSessions.length === 0 ? (
            <div className="flex items-center justify-center h-[70vh] md:h-[60vh] text-center text-gray-700">
              No sessions available.
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between w-[90%] mx-auto border-b">
                <div>
                  <h1 className="text-sm md:text-xl font-semibold  ">
                    {filter} Workshops
                  </h1>
                </div>
                <div className="flex  py-3">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 flex items-center text-sm md:text-base border-r ${
                      currentPage === 1 ? "text-gray-400 " : "text-black"
                    }`}
                  >
                    <span>
                      <IoIosArrowRoundBack />
                    </span>
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 flex items-center text-sm md:text-base gap-1  ${
                      currentPage === totalPages
                        ? " text-gray-400"
                        : "text-black"
                    }`}
                  >
                    <span>Next</span>
                    <span>
                      <IoIosArrowRoundForward />
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4 mt-5 w-[90%] mx-auto">
                {currentSessions.map((session) => (
                  <div
                    key={session.session_id}
                    className="bg-white rounded-lg border p-2 md:p-5 overflow-hidden"
                  >
                    <img
                      src={session.session_image}
                      alt={session.session_name}
                      className="w-full md:h-[250px] h-[100px] rounded-md object-cover"
                      loading="lazy"
                    />
      
                    <div className="py-1 md:py-2">
                      <div className="flex gap-1 items-start justify-between">
                        <h2 className="lg:text-lg text-text md:text-sm text-[10px] text-left line-clamp-1 font-semibold">
                          {session.session_name}
                        </h2>
                        <span
                          className={`md:px-3 md:rounded-full rounded-md  md:text-sm text-[10px] px-1 font-semibold   ${
                            session.session_mode === "Online"
                              ? "bg-[#FFE566] text-black"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {session.session_mode}
                        </span>
                      </div>

                      <p className="text-gray-500 md:text-base sm:text-sm text-[10px]  text-left lg:line-clamp-2 line-clamp-3 overflow-hidden">
                        {session.description}
                      </p>

                      <p className="text-[#562CA0] md:text-3xl text-[13px] font-bold mt-1 md:mt-2">
                        ₹{session.price}
                        <span className="text-gray-400 line-through text-[11px] md:text-xl ml-2">
                          ₹{Math.round(parseFloat(session.price) * 1.2)}
                        </span>
                      </p>

                      <div className="md:flex hidden justify-center gap-[2px]   w-full  py-3">
                        <p className="text-gray-800 md:text-xs text-[8px] text-center  px-3 md:py-1 lg:px-2 lg:py-2 flex items-center justify-center border border-background bg-gray-200 md:rounded-l-md  w-1/3 ">
                          {session.session_mode}
                        </p>
                        <p className="text-gray-800 md:text-xs text-[8px] text-center py-3 flex items-center justify-center border border-background bg-gray-200  w-1/3">
                          {session.session_kit}
                        </p>
                        <p className="text-gray-800 md:text-xs text-[8px] text-center px-3 flex items-center justify-center border border-background bg-gray-200 md:rounded-r-md  w-1/3 ">
                          {session.session_platform}
                        </p>
                      </div>
                      <div className="flex md:flex-row mt-1 md:mt-0 flex-col md:gap-2 gap-1">
                        <button
                          className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold md:text-xs text-[10px] md:py-3 py-2 md:rounded-md rounded-sm text-md md:hover:scale-105 md:hover:bg-black transition-transform will-change-transform duration-300"
                          onClick={() => {
                            const phoneNumber = "9894010363"; // Replace with your phone number
                            const message = `Hi, I am interested in the Session ${session.session_name} . Can you share more details?`; // Custom message
                            const whatsappLink = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(
                              message
                            )}`;
                            window.open(whatsappLink, "_blank"); // Opens in a new tab
                          }}
                        >
                          <img
                            src="https://ik.imagekit.io/cjureug40/Home/1.Top%20CTA/whatsapp.svg?updatedAt=1732086051072"
                            alt=""
                            className="w-[15px]"
                            loading="lazy"
                          />
                          WhatsApp Us
                        </button>
                        <button
                          className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold md:text-xs text-[10px] md:py-3 py-2 md:rounded-md rounded-sm text-md md:hover:scale-105 md:hover:bg-black transition-transform will-change-transform duration-300"
                          onClick={() => handleBuyNowClick(session.session_id)}
                        >
                          Book A Seat Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
    </div>
  );
};

export default SessionCard;
