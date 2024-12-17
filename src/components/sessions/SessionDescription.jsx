import React, { useState, useEffect, useContext } from "react";
import { useProductContext } from "../../Context";

import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

import { CiLaptop } from "react-icons/ci";
import { BsBox } from "react-icons/bs";
import axios from "axios";
import { MdOutlineVerified } from "react-icons/md";
import { VscDiffAdded } from "react-icons/vsc";
import { IoLanguageOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import SessionMoreInfo from "./SessionMoreInfo";
import { VscSmiley } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";

const SessionDescription = () => {
  const { sessionDetails, setSessionDetails } = useProductContext();
  const navigate = useNavigate();
  const { SessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewer, setReviewer] = useState("");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch session data from the API
    const fetchSessionData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/v1/session/${SessionId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch session data");
        }
        const data = await response.json();
        setSessionData(data.paticularsection);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/v1/session/${SessionId}`
        );
        const reviewsData =
          response.data?.paticularsection?.Reviewsession || [];
        setReviews(reviewsData);
        // console.log(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      }
    };

    fetchSessionData();
    fetchReviews();
  }, []);
  const handleStarClick = (index) => {
    setRating(index + 1); // Update the rating (1-based index)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      setErrorMessage("Please select a star rating before submitting!");
      return;
    }
    // Simulate form submission
    setShowPopup(false); // Close review popup
    setShowSuccess(true); // Show success popup
    // Auto-hide success popup after 3 seconds

    const review = {
      reviewer: reviewer,
      rating: rating,
      comment: comment,
      session_id: SessionId, // Include the productId
    };

    try {
      // Send POST request using Axios
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/v1/reviewsessions`,
        review
      );

      if (response.status === 200 || response.status === 201) {
        // Success response
        console.log("Review submitted successfully:", response.data);

        setShowPopup(false); // Close review popup
        setShowSuccess(true); // Show success popup
        setErrorMessage("");

        // Auto-hide success popup after 3 seconds
        // setTimeout(() => setShowSuccess(false), 3000);
      } else {
        // Handle unexpected response status
        console.error("Unexpected response status:", response.status);
        setErrorMessage(
          "Failed to submit your review. Please try again later."
        );
      }
    } catch (error) {
      // Handle errors during the request
      console.error("Error while submitting review:", error);
      setErrorMessage(
        "An error occurred while submitting your review. Please try again."
      );
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        {/* SVG Loader */}
        <div
          className="w-24 h-24 bg-no-repeat bg-center mb-4"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="%238C4CFF" stroke-width="15" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>')`,
          }}
        ></div>
        {/* Loading Message */}
        <p className="text-center text-xl text-gray-700">
          Loading Please Wait ...
        </p>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  const {
    session_image,
    session_name,
    session_mode,
    price,
    description,
    date,
    time,
    session_platform,
    session_kit,
    sessiondescription,
    session_id
  } = sessionData;

  const handleEnroll = () => {
    // console.log(`Session Name:${session_name}`);
    // console.log(`Session Prize :${price}`);
    // console.log(`Session Date :${date}`);
    // console.log(`Session Time :${time}`);
    // console.log(`Session Platform :${session_platform}`);
    // console.log(`Session Kit :${session_kit}`);
    // console.log(`description:${description}`);
    // console.log(`Session Id:${session_id}`);
    // console.log(`Session Mode:${session_mode}`);
    // Set session data
    setSessionDetails({
      sessionName: session_name,
      price: price,
      date: date,
      time: time,
      platform: session_platform,
      kit: session_kit,
      description: description,
      sessionId: session_id,
      sessionMode:session_mode,
    });
    console.log("Sesessiondescription.kit_info",sessiondescription.kit_info)
    console.log(sessionDetails, "complete data");
    navigate("/session-form");
  };

  return (
    <div className="container mx-auto mt-32 md:mt-40 text-black">
      <div className="w-full lg:w-[90%] mt-10 mx-auto rounded-md">
        {/* Header Section */}
        <div className="grid grid-cols-1 w-[90%] lg:w-full  mx-auto lg:grid-cols-2 lg:gap-10 space-y-5 lg:space-y-0  ">
          {/* Left Section */}
          <div>
            <div className="w-full">
              <img
                src={session_image}
                className="  w-full h-[25rem] md:h-[30rem] lg:h-[25rem] object-cover  rounded-lg"
                alt={session_name}
                loading="lazy"
              />
            </div>
            <div className="flex flex-col items-start justify-between space-y-3 mt-3">
              <span className="text-green-400 border border-green-400 bg-[gray-50] rounded-full px-6 py-1">
                {session_mode}
              </span>
              <h2 className="text-3xl font-semibold">{session_name}</h2>
              <p className="text-gray-500">{description}</p>
            </div>
            <div className="flex gap-2 items-center mt-5">
              <img
                src="https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Students%20Profile%20Avatar/Avatar%20Image%201.png?updatedAt=1732086187255"
                className="w-12 h-12 object-cover rounded-full"
                alt="Host"
              />
              <div className="flex flex-col  ">
                <h3>Saranya Durairanjan</h3>
                <span className="text-gray-500 text-sm">Hosted By</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="border border-sky-200  rounded-lg p-4">
          <div className="flex flex-col items-center justify-between space-y-10">
              <div className="mt-3 flex flex-col items-center">
                <h1 className="text-3xl font-semibold text-text">₹{price}</h1>
                <p className="text-lg">Workshop Details</p>
              </div>
              <div className="w-full">
                <h3 className="text-lg font-semibold px-2 py-3 bg-gray-50 border-l-2 border-primary">
                  Session Highlights
                </h3>
                <ul className="space-y-3 flex flex-wrap items-center md:gap-3 gap-2 mt-3">
                  <li className="flex items-start  gap-1">
                    <span>
                      <CiCalendarDate className="text-2xl" />{" "}
                    </span>
                    <span>Date: {date}</span>
                  </li>
                  <li className="flex items-center  gap-1">
                    <span>
                      <IoMdTime className="text-xl" />
                    </span>
                    <span>Time: {time}</span>
                  </li>
                  <li className="flex items-center  gap-1">
                    <span>
                      <CiLaptop className="text-xl" />
                    </span>
                    <span>Platform: {session_platform}</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span>
                      <BsBox className="text-xl" />
                    </span>
                    <span>Kit: {session_kit}</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span>
                      <IoLanguageOutline className="text-xl" />
                    </span>
                    <span>Language: {sessiondescription.language}</span>
                  </li>
                </ul>
              </div>
              <div className="w-full space-y-4">
                <h3 className="text-lg font-semibold px-2 py-3 bg-gray-50 border-l-2 border-primary">
                  Kit Info
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {sessiondescription.kit_info}
                </p>
              </div>
              <p className="text-gray-600">{description}</p>
              <button
                className="bg-primary text-white py-3 rounded-md hover:bg-black transition-all duration-300 w-full"
                onClick={handleEnroll}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="grid lg:grid-cols-2 gap-8 mt-10 px-6 py-4 mx-5 bg-[#FCFAFF] border rounded-lg">
          <div>
            <h3 className="text-lg font-semibold text-primary">
              What You Will Learn?
            </h3>
            <ul className="list-decimal pl-7 mt-4 space-y-5 border border-[#F1F1F3] text-gray-600 rounded-lg bg-white py-2">
              <li>{sessiondescription.learn1}</li>
              <li>{sessiondescription.learn2}</li>
              <li>{sessiondescription.learn3}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">
              Other Benefits
            </h3>
            <ul className="list-decimal pl-7 mt-4 space-y-5 text-gray-600 bg-white border border-[#F1F1F3] py-2 rounded-md">
              <li>{sessiondescription.other_benefits_1}</li>
              <li>{sessiondescription.other_benefits_2}</li>
              <li>{sessiondescription.other_benefits_3}</li>
            </ul>
          </div>
        </div>
        <div className="mt-5">
          <SessionMoreInfo />
        </div>
        <div className="w-[90%] mx-auto">
          <div className="flex items-center justify-between mb-5 border-b py-5">
            <h2 className="lg:text-lg text-md font-semibold">
              Customer Reviews
            </h2>
            <button
              className=" lg:px-4 px-3 lg:py-2 py-2 flex items-center md:gap-2 space-x-1 md:space-x-0  bg-black md:rounded-md rounded-sm text-white md:text-sm text-xs lg:text-base"
              onClick={() => setShowPopup(true)}
            >
              Post Your Review
              <span>
                <VscDiffAdded className="lg:text-lg text-base" />
              </span>
            </button>

            {showPopup && (
              <div className=" fixed inset-0 p-4 bg-black bg-opacity-50 flex items-center justify-center z-[20]">
                <div className="  bg-white rounded-lg shadow-lg p-6 w-96 relative">
                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPopup(false)}
                  >
                    <IoMdClose className="text-lg" />
                  </button>
                  <span className="w-full">
                    <HiOutlineChatBubbleLeftRight className="text-7xl w-full text-red-400" />
                  </span>
                  <h2 className="text-sm md:text-base  font-semibold text-center ">
                    Post Your Ratings & Review Here
                  </h2>
                  <p className="text-gray-500 mb-4 md:text-sm text-xs text-center">
                    Your feedback means so much and helps us improve.
                  </p>

                  {/* Star Rating */}
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`text-4xl cursor-pointer ${
                          i < rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => handleStarClick(i)} // Set the selected rating
                      >
                        <IoStarSharp />
                      </span>
                    ))}
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="text-xs md:text-sm">
                    <div className="mb-4">
                      <label className="block font-medium text-gray-700">
                        Enter Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        onChange={(e) => setReviewer(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium text-gray-700">
                        One Word About the Product
                      </label>
                      <input
                        type="text"
                        placeholder="E.g., Excellent!"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium text-gray-700">
                        Share Some Words
                      </label>
                      <textarea
                        placeholder="Write your feedback"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        rows="3"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700 transition"
                    >
                      Submit
                    </button>
                    {errorMessage && (
                      <p className="text-sm text-red-500 mt-4 text-center">
                        {errorMessage}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            )}
            {showSuccess && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                  <div className="flex w-full items-center justify-center mb-4">
                    <VscSmiley className="text-yellow-300 text-5xl" />
                  </div>
                  <h2 className="text-lg font-semibold mb-2">
                    Thanks for your valuable feedback!
                  </h2>
                  <p className="text-gray-500 text-xs">
                    Your review has been submitted successfully. It will be
                    visible once verified by an admin.
                  </p>
                  <button
                    className="bg-red-500 text-white p-2 px-5 mt-3 rounded-lg md:hover:scale-105 hover:bg-red-600 transition-transform will-change-transform duration-300"
                    onClick={() => setShowSuccess(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews
                .filter((review) => review.isApproved) // Only show approved reviews
                .map((review) => (
                  <div
                    key={review.review_id}
                    className="border p-4 rounded-md space-y-2 "
                  >
                    <p className="font-semibold">{review.reviewer}</p>
                    <p className="flex items-center text-yellow-500">
                      <span className="flex items-center gap-2">
                        {Array.from({ length: review.rating }, (_, index) => (
                          <FaStar key={index} />
                        ))}
                      </span>
                    </p>
                    <p className="text-gray-600">{review.comment}</p>
                    <div className="flex items-center gap-2 text-blue-500">
                      {review.isApproved && (
                        <MdOutlineVerified
                          className="text-blue-500 text-lg"
                          title="Verified"
                        />
                      )}
                      Verified
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDescription;
