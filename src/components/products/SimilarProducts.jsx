import React, { useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { BsArrowRight } from 'react-icons/bs';
import { IoLogoWhatsapp } from 'react-icons/io';
import { VscDiffAdded } from "react-icons/vsc";
import { MdOutlineVerified } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";

const SimilarProducts = () => {
    const products = [
        {
            id: 1,
            title: "Any Theme Recreation",
            price: 2999,
            description: "Whether it’s a hobby or special event, we can recreate it in beautiful detail",
            image: "https://m.media-amazon.com/images/I/61Ex+RiZ68L.jpg",
            isRecommended: true,
            features: ["3-4 Day Delivery", "Personalized", "Free Shipping"],
        },
        {
            id: 2,
            title: "Resin Artwork",
            price: 1999,
            description: "Whether it’s a hobby or special event, we can recreate it in beautiful detail",
            image: "https://m.media-amazon.com/images/I/61Ex+RiZ68L.jpg",
            isRecommended: false,
            features: ["3-4 Day Delivery", "Handcrafted", "free shipping"],
        },
        {
            id: 3,
            title: "Any Theme Recreation",
            price: 2999,
            description: "Whether it’s a hobby or special event, we can recreate it in beautiful detail",
            image: "https://m.media-amazon.com/images/I/61Ex+RiZ68L.jpg",
            isRecommended: true,
            features: ["3-4 Day Delivery", "Personalized", "Free Shipping"],
        },
        {
            id: 4,
            title: "Any Theme Recreation",
            price: 2999,
            description: "Whether it’s a hobby or special event, we can recreate it in beautiful detail",
            image: "https://m.media-amazon.com/images/I/61Ex+RiZ68L.jpg",
            isRecommended: true,
            features: ["3-4 Day Delivery", "Personalized", "Free Shipping"],
        },
    ];
    const reviews = [
        {
            name: "Karthik R",
            rating: 3,
            title: "Perfect Anniversary Gift!",
            description:
                "Ordered the anniversary theme frame as a surprise for my wife, and she loved it! The attention to detail made it feel so personal.",
            verified: true,
        },
        // {
        //   name: "Anjali S",
        //   rating: 3,
        //   title: "Good but could be better",
        //   description:
        //     "The product was decent, but I expected more detail. Delivery was fast, though!",
        //   verified: false,
        // },
        // {
        //   name: "Rahul T",
        //   rating: 4,
        //   title: "Loved it!",
        //   description:
        //     "It was a great gift option. My friend appreciated it a lot. Just wish there were more color choices.",
        //   verified: true,
        // },
    ];

    // Function to generate star icons based on the rating
    const generateStars = (rating) => {
        return Array(5)
            .fill("")
            .map((_, index) =>
                index < rating ? (
                    <FaStar key={index} className="text-yellow-500 w-4 h-4" /> // Filled star
                ) : (
                    <FaRegStar key={index} className="text-gray-300 w-4 h-4" /> // Empty star
                )
            );
    };
    const [rating, setRating] = useState(0);
    const handleStarClick = (index) => {
        // Toggle the rating. If it's the same as the clicked index, reset to 0 (deselect).
        setRating(prevRating => (prevRating === index + 1 ? 0 : index + 1));
      };
    const [showPopup, setShowPopup] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const[name,setname]=useState("")
    const[about,setabout]=useState("")
    const[comment,setcomment]=useState("")

    const [currentPage, setCurrentPage] = useState(1);
    const [transitioning, setTransitioning] = useState(false);
    const productsPerPage = 3;

    // Pagination logic
    const paginatedProducts = products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    // Handle page change with smooth transition
    const handlePageChange = (page) => {
        if (page > 0 && page <= Math.ceil(products.length / productsPerPage)) {
            setTransitioning(true);  // Trigger transition
            setTimeout(() => {
                setCurrentPage(page);  // Change page after the transition duration
                setTransitioning(false);
            }, 100);  // Set timeout to match transition duration
        }
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowPopup(false);
        setShowConfirmation(true); // Show confirmation popup
        console.log(name,about,comment)
        setname("")
        setabout("")
        setcomment("")
      
      };

    return (
        <div className="container mx-auto mt-9 lg:mt-14">
            <div className="lg:w-[85%] w-full mx-auto ">
                <div className="w-full h-[90px] border-b-2 border-sky-200 flex justify-between items-end pb-4 px-2">
                    <h1 className="font-semibold text-sm lg:text-lg">Similar products</h1>
                    <div className="flex items-center">
                        <div
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`flex items-center gap-1 border-r pr-1 text-gray-500 hover:text-black text-xs lg:text-base cursor-pointer ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                        >
                            <GoArrowLeft /> Previous
                        </div>
                        <div
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`flex items-center gap-1 text-gray-500 p-1 hover:text-black text-xs lg:text-base cursor-pointer ${currentPage === Math.ceil(products.length / productsPerPage) && 'opacity-50 cursor-not-allowed'}`}
                        >
                            Next <BsArrowRight />
                        </div>
                    </div>
                </div>

                {/* Display paginated products with smooth transition */}
                <div className={`grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-5 p-4 lg:p-1  mt-4 transition-transform duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
                    {paginatedProducts.map((product) => (
                        <div key={product.id} className="border rounded-lg overflow-hidden">
                            <img
                                src={product.image}
                                className="object-cover w-full h-[250px]"
                                alt={product.title}
                            />
                            <div className="py-5 px-3 bg-white text-center">
                                <div className="flex justify-between items-center lg:mb-3">
                                    <h2 className="lg:text-lg text-sm text-left font-semibold">{product.title}</h2>
                                    {product.isRecommended && (
                                        <span className="bg-yellow-400 text-white text-xs px-3 py-1 rounded-full">
                                            Recommended
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col items-start gap-2 w-full">
                                    <h1 className="text-purple-800 text-2xl font-bold">₹{product.price}</h1>
                                    <p className="text-gray-600 text-sm text-left">{product.description}</p>
                                </div>
                                <div className="flex md:flex-row  flex-col  gap-1 items-center justify-between w-full py-1 lg:mt-4 mt-2 border-t border-t-sky-200">
                                    {product.features.map((feature, i) => (
                                        <span
                                            key={i}
                                            className="text-gray-800 text-xs  w-full  py-1 lg:px-2 lg:py-2 border border-gray-200 bg-gray-200 rounded-md"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-col md:flex-row gap-1 mt-3">
                                    <button className="flex-1 flex items-center text-xs justify-center gap-2 bg-purple-700 text-white font-semibold py-2 rounded-md">
                                        <IoLogoWhatsapp className="text-xl" />
                                        WhatsApp Us
                                    </button>
                                    <button className="flex-1 bg-purple-700 text-xs text-white font-semibold py-2 rounded-md">
                                        Buy Now
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* popup section */}
            <div>
                <div className='border-b-2 mt-10 lg:w-[85%] mx-auto w-[95%]'>
                    <div className='flex justify-between'>
                        <div><h1 className=' text-sm lg:text-lg font-semibold'>Customer Reviews </h1></div>
                        <div
                            className="flex items-center gap-1 bg-black p-2 rounded-md text-white cursor-pointer"
                            onClick={() => setShowPopup(true)}
                        >
                            <VscDiffAdded />
                            <h1>Post Your Review</h1>
                        </div>
                        
                    </div>
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className=" bg-white mt-5  p-4 border-y border-blue-200"
                            >
                                {/* Reviewer name and rating */}
                                <div className=" flex flex-col gap-2">
                                    <div className="text-base font-semibold text-gray-800">{review.name}</div>
                                    <div className="flex items-center">{generateStars(review.rating)}</div>
                                </div>
                                {/* Review title and description */}
                                <h3 className="mt-4  font-medium text-gray-900">{review.title}</h3>
                                <p className="mt-2 text-gray-600">{review.description}</p>
                                {/* Verified badge */}
                                {review.verified && (
                                    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                                        <MdOutlineVerified className="w-5 h-5 mr-1" />
                                        Verified
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>
                    {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-sm mx-4 md:mx-auto">
      {/* Close Icon */}
      <div className="flex justify-end">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setShowPopup(false)}
        >
          ✕
        </button>
      </div>
      {/* Header */}
      <div className="w-full flex items-center justify-center">
        <h1>
          <LuMessagesSquare className="text-4xl md:text-5xl text-red-500" />
        </h1>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-3 md:mt-5">
        <h2 className="text-base md:text-lg font-semibold text-center">
          Post Your Ratings & Review Here
        </h2>
        <p className="text-gray-500 text-xs md:text-sm text-center">
          Your feedback means so much and helps us improve.
        </p>
      </div>
      {/* Star Rating */}
      <div className="flex justify-center gap-1 my-3 md:my-4">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`text-xl md:text-2xl cursor-pointer ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => handleStarClick(i)}
          >
            ★
          </span>
        ))}
      </div>
      {/* Form */}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Enter Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            One Word About the Product
          </label>
          <input
            type="text"
            placeholder="E.g., Excellent!"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            required
            onChange={(e) => setabout(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Share Some Words
          </label>
          <textarea
            placeholder="Write your feedback"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            rows="3"
            required
            onChange={(e) => setcomment(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white rounded-full py-2 hover:bg-purple-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
)}

{showConfirmation && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-sm mx-4 md:mx-auto flex flex-col items-center">
      <button
        className="text-gray-500 hover:text-gray-700 self-end"
        onClick={() => setShowConfirmation(false)}
      >
        ✕
      </button>
      <h1 className="text-4xl md:text-5xl mb-3 md:mb-4">😊</h1>
      <h2 className="text-base md:text-lg font-semibold text-center">
        Thanks for your valuable feedback!
      </h2>
      <p className="text-gray-500 text-xs md:text-sm text-center mt-2">
        Your review has been submitted successfully. It will be visible
        once verified by an admin.
      </p>
    </div>
  </div>
)}

                </div>
            </div>
        </div>
    );
};

export default SimilarProducts;