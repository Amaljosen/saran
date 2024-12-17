import React, { useState, useEffect, useContext } from "react";
import { useProductContext } from "../../Context";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HiShoppingBag } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { MdOutlineVerified } from "react-icons/md";
import { VscDiffAdded } from "react-icons/vsc";
import ProductsFeedback from "./ProductsFeedback";
import { IoStarSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import FAQ from "./Faq";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { VscSmiley } from "react-icons/vsc";


const ProductDescriptionPage = () => {
  const {setProductData } = useProductContext();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [fourRandomProducts, setFourRandomProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0); // To store the selected star rating
  const [showSuccess, setShowSuccess] = useState(false);
  const [reviewer,setReviewer]=useState("")
  const [comment,setComment]=useState("")
  const [errorMessage, setErrorMessage] = useState("");
  
  

  const handleStarClick = (index) => {
    setRating(index + 1); // Update the rating (1-based index)
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    // Simulate form submission
    if (!rating) {
      setErrorMessage("Please select a star rating before submitting!");
      return;
    }
    
    setShowPopup(false); // Close review popup
    setShowSuccess(true); // Show success popup
    // Auto-hide success popup after 3 seconds
    
    
    const review = {
      reviewer: reviewer,
      rating: rating,
      comment: comment,
      product_id: productId, // Include the productId
    };
    
  
    try {
      // Send POST request using Axios
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/v1/review`, review);
  
      if (response.status === 200 || response.status === 201) {
        // Success response
       
        
  
        setShowPopup(false); // Close review popup
        setShowSuccess(true); // Show success popup
        setRating(0);
        setErrorMessage("")
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

  const [reviews, setReviews] = useState([]); // State for reviews
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product and related data
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/v1/product/${productId}`
        );
        const fetchedProduct = response.data?.data?.paticularproduct;
        const relatedProducts = response.data?.data?.fourRandomProducts;

        if (fetchedProduct?.product_id === productId) {
          setProduct(fetchedProduct);
          setSelectedVariation(fetchedProduct.productVariation[0] || null);
          setMainImage(fetchedProduct.productVariation[0]?.productVariation_image || "");
        } else {
          setProduct(null);
        }

        setFourRandomProducts(relatedProducts || []);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };


    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/v1/review/${productId}`
        );
        setReviews(response.data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      }
    };

    fetchProductData();
    fetchReviews();
  }, [productId]);
  useEffect(() => {
    // Fetch the subcategory data from the API
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/v1/subcategory`);
        const data = await response.json();
        setSubcategories(data.data); // Store the subcategory array
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
      }
    };

    fetchSubcategories();
  }, []);
  const getSubcategoryName = (id) => {
    const subcategory = subcategories.find((item) => item.subcategory_id === id);
    return subcategory ? subcategory.subcategory_name : id; // Fallback to ID if not found
  };

  const handleVariationChange = (variation) => {
    setSelectedVariation(variation);
    setMainImage(variation.productVariation_image);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full text-black">
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
  }
  
  

  if (!product) {
    return <p className="text-center text-red-600 mt-10">No results found!</p>;
  }
  console.log(selectedVariation.requirements1)

  const handleBuyNowClick = (ProductId) => {
    navigate(`/description/${ProductId}`);
    window.scrollTo(0, 0);
    console.log(`Navigating to product ID: ${ProductId}`);
  };
const handleBuy = () => {
  console.log(`Product name : ${product.product_name}`);
  console.log(`Subcategory name : ${getSubcategoryName(product.subcategory_id)}`);
  console.log(`Product variation price : ${selectedVariation.productVariation_price}`);
  console.log(`Shipping charges : ${selectedVariation.shipping_charges}`);
  console.log(`Selected size: ${selectedVariation.size}`);
  console.log(`description :${selectedVariation.about}`);
  setProductData({
    productName: product.product_name,
    subcategoryName: getSubcategoryName(product.subcategory_id),
    price: selectedVariation.productVariation_price,
    shipping_charges: selectedVariation.shipping_charges,
    size: selectedVariation.size,
    description:selectedVariation.about,
    req1:selectedVariation.requirements1,
    req2:selectedVariation.requirements2,
    req3:selectedVariation.requirements3
  });
//   console.log("Data being set:", {
//     productName: product.product_name,
//     subcategoryId: product.subcategory_id,
//     price: selectedVariation.productVariation_price,
//     shipping: selectedVariation.shipping_charges,
//     size: selectedVariation.size,
//     description:selectedVariation.about
//   });

navigate("/product-form");

};

  return (
    <div className="container mx-auto mt-[7rem] md:mt-40">
      <div className="lg:w-[90%] w-full mx-auto p-3 lg:p-0 bg-white rounded-lg">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product Images */}
          <div className="w-full h-full flex flex-col justify-between mx-auto">
            <div className="relative">
              <img
                src={mainImage}
                alt="Main product"
                className="w-full md:h-[570px] h-96  object-cover rounded-lg"
                loading="lazy"
              />
              <div className="lg:absolute bottom-5 left-6 flex lg:flex-col flex-row gap-2 lg:bg-white rounded-md lg:p-2 mt-2 lg:mt-0">
                {product.productVariation.map((variation, idx) => (
                  <img
                    key={idx}
                    src={variation.productVariation_image}
                    alt={`Variation thumbnail ${idx + 1}`}
                    className={`w-16 h-12 object-cover rounded-md bg-white border ${mainImage === variation.productVariation_image
                      ? "border-primary"
                      : "border-gray-200"
                      } cursor-pointer`}
                      loading="lazy"
                    onClick={() => handleVariationChange(variation)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full h-full flex flex-col justify-between">
            <div className="w-full md:space-y-5 space-y-2">
              <div className="flex lg:flex-row   items-center gap-3 justify-between w-full">
                <div className="w-auto">
                  <div className="flex gap-2 items-center w-auto">
                    <p className="text-gray-500 md:text-base text-sm">{getSubcategoryName(product.subcategory_id)}</p>
                    {product.overallRating > "3" && (
                      <span className="bg-[#FFE566] text-xs lg:text-sm px-3 py-1 rounded-full">
                        Best Selling
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-md md:text-xl font-semibold">{product.product_name}</h2>
                  </div>
                </div>
               <div className=" hidden lg:block">
               <button className=" px-8 w-auto text-xs  py-3 md:text-base bg-black text-white flex items-center  md:hover:scale-105 gap-1 border rounded-full transition-transform will-change-transform duration-300" onClick={handleBuy}>
                  <span>
                    <HiShoppingBag className="text-2xl"/>
                  </span>
                  Buy Now
                </button>
               </div>
               <button className=" md:px-6 lg:hidden px-4 w-auto text-xs md:text-sm py-2 lg:text-base bg-black  text-white flex items-center gap-1 border font-semibold rounded-full transition" onClick={handleBuy}>
                  <span>
                    <HiShoppingBag />
                  </span>
                  Buy Now
                </button>
              </div>
              <div className="flex items-center space-x-2 ">
                <p className="text-2xl lg:text-3xl font-bold">₹{selectedVariation.productVariation_price}</p>
                <p className="text-gray-500">{`(Include All Tax)`}</p>
              </div>
              
              <div className="mt-4 space-y-3 border  px-3 py-2 rounded-lg">
                <h3 className="font-semibold text-sm md:text-base ">Select Size</h3>
                <div className="flex flex-wrap lg:flex-row gap-2">
                  {product.productVariation.map((variation, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleVariationChange(variation)}
                      className={`rounded-md text-xs md:text-sm px-2 py-2 border bg-[#F1F1F3] ${selectedVariation.size === variation.size
                        ? "text-black border-primary"
                        : "bg-white text-gray-800 border-gray-300"
                        }`}
                    >
                      {variation.size}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <p className="text-xs md:text-base">
                    <strong>Delivery:</strong>{" "}
                    <span className="text-gray-600">{selectedVariation.delivery_details}</span>
                  </p>
                  <p className="text-xs md:text-base">
                    <strong>Shipping:</strong>{" "}
                    <span className="text-gray-600">₹{selectedVariation.shipping_charges}</span>
                  </p>
                </div>
              </div>
              <div className="space-y-3 border px-3 py-2 rounded-lg">
                <h1 className="font-semibold text-sm  md:text-base  ">About the product</h1>
                <h1 className="text-gray-600 text-sm  md:text-base ">{selectedVariation.about}</h1>
              </div>
              <div className="border px-3 py-2 rounded-lg">
                <h3 className=" text-sm md:text-lg font-semibold">Requirements</h3>
                <ul className="list-decimal list-inside md:text-base text-sm space-y-2 mt-2 text-gray-600">
                  {/* {Object.entries(selectedVariation.requirements || {}).map(([key, value], idx) => (
                    <li key={idx} className="text-gray-600">
                       {value}
                    </li>
                  ))} */}
                  <li>{selectedVariation.requirements1}</li>
                  <li>{selectedVariation.requirements2}</li>
                  <li>{selectedVariation.requirements3}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
      <ProductsFeedback/>
      </div>

      {/* Similar Products */}
      <div className="mt-8 w-[90%] mx-auto">
        <h2 className="text-sm lg:text-lg font-semibold mb-5 pb-4 border-b">Similar Products</h2>
        {fourRandomProducts && fourRandomProducts.length > 0 ? (
          <div className="grid lg:grid-cols-3 grid-cols-2  md:gap-8 gap-[5px] mt-5">
            {fourRandomProducts.map((product) => (
             <div
             key={product.product_id}
             className="border flex flex-col justify-between p-2 md:p-5 border-[#E5EFFF] rounded-md relative"
           >
             {/* Conditional Recommended Tag */}
             {product.overallRating > "4" && (
               <span className="bg-[#FFE566] font-medium px-2 py-1 md:text-xs text-[8px] text-gray-800 rounded-r-full absolute left-0 md:top-2">
                 Recommended
               </span>
             )}
             {/* Display the first image from productVariation */}
             <div className="flex flex-col justify-between w-full">
               <img
                 src={product.productVariation[0].productVariation_image}
                 className="md:h-[250px] h-[100px] text-text rounded-lg object-cover w-full"
                 alt={product.product_name}
                 loading="lazy"
               />
               <div className="flex justify-between gap-2 mt-1 md:mt-2 items-center">
                 <h2 className="lg:text-lg md:text-sm text-text text-[10px] line-clamp-1 text-left font-semibold">
                   {product.product_name}
                 </h2>
               </div>
             </div>
             <div className="text-center">
               <div className="flex flex-col items-start md:gap-2 gap-[2px] w-full">
                 <h1 className="text-gray-500 md:text-base sm:text-sm text-[10px] line-clamp-2  text-left">
                   {product.productVariation[0].description}
                 </h1>
               </div>

               <div className="text-start md:mt-2 mt-1">
                 <h1 className="text-text md:text-3xl text-[13px] font-bold">
                   ₹{product.productVariation[0].productVariation_price}
                   <span className="text-gray-400 line-through text-[11px] md:text-xl ml-2">
                     ₹
                     {Math.round(
                       parseFloat(
                         product.productVariation[0].productVariation_price
                       ) * 1.2
                     )}
                   </span>
                 </h1>
               </div>

               <div className="md:flex hidden  gap-[2px]  justify-between   w-full  md:pb-3 pb-[5px] lg:mt-4 md:mt-2 mt-0 ">
                 {/* Features can be added dynamically */}
                 <span className="text-gray-800 md:text-xs text-[8px] flex items-center justify-center border border-background bg-gray-200 md:rounded-l-md w-1/3 ">
                   {product.productVariation[0].theme}
                 </span>
                 <span className="text-gray-800  md:text-xs text-[8px]  py-[5px]  md:py-3  lg:flex items-center gap-1 justify-center  border border-background bg-gray-200 w-1/3 ">
                   <span className="md:block hidden">Shipping:</span>₹{product.productVariation[0].shipping_charges}
                 </span>
                 <span className="text-gray-800 md:text-xs text-[8px]   py-[5px]  md:py-3  flex items-center justify-center  border border-background bg-gray-200 md:rounded-r-md w-1/3">
                   {product.productVariation[0].delivery_details}
                 </span>
               </div>

               <div className="flex md:flex-row mt-1 md:mt-0 flex-col lg:gap-2 gap-1">
                 <button
                   className="w-full flex items-center justify-center gap-2 bg-primary text-[#F7F7F8] font-medium md:text-xs text-[10px] md:py-3 py-2 md:rounded-md rounded-sm text-md md:hover:scale-105 md:hover:bg-black transition-transform will-change-transform duration-300"
                   onClick={() => {
                     const phoneNumber = "9894010363"; // Replace with your phone number
                     const message = `Hi, I am interested in the product ${product.product_name} . Can you share more details?`; // Custom message
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
                   />
                   WhatsApp Us
                 </button>

                 <button
                   className="w-full bg-primary text-[#F7F7F8] font-medium md:py-3 py-2 md:text-xs text-[10px] md:rounded-md rounded-sm md:hover:scale-105 md:hover:bg-black transition-transform will-change-transform duration-300"
                   onClick={() => handleBuyNowClick(product.product_id)} // Use product.product_id
                 >
                   Buy Now
                 </button>
               </div>
             </div>
           </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-5">
            No products available.
          </div>
        )}
      </div>


      <div className="w-[90%] mx-auto">
        <div className="flex items-center justify-between mb-5 border-b py-5">
        <h2 className="lg:text-lg text-sm font-semibold">Customer Reviews</h2>
        <button className=" lg:px-4 px-3 lg:py-2 py-2 flex items-center md:gap-2 space-x-1 md:space-x-0  bg-black md:rounded-md rounded-sm text-white md:text-sm text-xs lg:text-base" onClick={() => setShowPopup(true)}>
         <span> Post Your Review</span>
          <span><VscDiffAdded  className="lg:text-lg text-base"/></span>
        </button>

      {showPopup && (
        <div className="fixed inset-0 p-2 bg-black bg-opacity-50 flex items-center justify-center z-[20]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
           
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPopup(false)}
            >
              <IoMdClose className="text-lg"/>
            </button>
            <span  className="w-full">
            <HiOutlineChatBubbleLeftRight className="text-7xl w-full text-red-400"/>
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
                  <IoStarSharp/>
                </span>
              ))}
            </div>
            {/* <p className="text-sm text-center text-gray-500 mb-4">
              Selected Rating: {rating} star{rating > 1 ? "s" : ""}
            </p> */}

            {/* Form */}
            <form onSubmit={handleSubmit} className="text-xs md:text-sm">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Enter Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  onChange={(e)=>setReviewer(e.target.value)}
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
                <label className="block text-sm font-medium text-gray-700">
                  Share Some Words
                </label>
                <textarea
                  placeholder="Write your feedback"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  rows="3"
                  onChange={(e)=>setComment(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700 md:hover:scale-105 transition-transform will-change-transform duration-300"
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
            <div className=" flex w-full items-center justify-center mb-2"><VscSmiley className="text-primary text-6xl"/></div>
            <h2 className="text-lg font-semibold ">
              Thanks for your valuable feedback!
            </h2>
            <p className="text-gray-500 text-xs">
              Your review has been submitted successfully. It will be visible
              once verified by an admin.
            </p>
            <button className="bg-red-500 text-white p-2 px-5 mt-3 rounded-lg md:hover:scale-105 hover:bg-red-600 transition-transform will-change-transform duration-300" onClick={()=>setShowSuccess(false)}>Close</button>
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
                <IoStarSharp key={index} />
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

      <FAQ/>

    </div>
  );
};

export default ProductDescriptionPage;

