import React, { useEffect, useState } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { CiCircleChevRight } from "react-icons/ci";
import { CiCircleChevLeft } from "react-icons/ci";
import { FaArrowUp } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BulkOrders = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const imageUrls = [
    "https://ik.imagekit.io/cjureug40/Home/8.Bulk%20Order%20Section/img2.jpg?updatedAt=1732086297473",
    "https://ik.imagekit.io/cjureug40/Home/8.Bulk%20Order%20Section/img3.jpg?updatedAt=1732086297660",
    "https://ik.imagekit.io/cjureug40/Home/8.Bulk%20Order%20Section/img4.jpg?updatedAt=1732086297605",
    "https://ik.imagekit.io/cjureug40/Home/8.Bulk%20Order%20Section/img5.jpg?updatedAt=1732086297394",
    "https://ik.imagekit.io/cjureug40/Home/8.Bulk%20Order%20Section/img3.jpg?updatedAt=1732086297660",
  ];

  const handleNext = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    setImageIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Change to the next image
    }, 3000); // 2000 milliseconds = 2 seconds

    // Cleanup the interval when the component unmounts or when the interval is reset
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lg:py-10 py-6 grid lg:grid-cols-2 w-[90%] mx-auto gap-2 md:gap-7">
  {/* Left Section */}
  <motion.div
    initial={{ opacity: 0, x: -200 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="space-y-2 md:space-y-5 flex flex-col justify-between"
  >
    <h1 className="text-text text-sm font-medium border border-gray-200 rounded-lg p-2 w-fit flex items-center space-x-1">
      <BsBoxSeam />
      <span>Bulk & Corporate Orders</span>
    </h1>
    <h1 className="text-2xl lg:text-4xl">
      Personalized Handcrafted Gifts for Corporate & Bulk Orders
    </h1>
    <p className="text-sm text-gray-600">
      Make a lasting impression with unique, handcrafted gifts designed for
      corporate events, bulk orders, and special occasions. Whether it’s
      employee appreciation, client gifts, or business branding, our
      customized products add a personal touch.
    </p>
    <img
      src="https://ik.imagekit.io/cjureug40/Home/8.Bulk%20Order%20Section/img1.jpg?updatedAt=1732086297563"
      alt=""
      className="w-full h-80 object-cover rounded-lg hidden lg:block"
      loading="lazy"
    />
    <Link
      to={"contact"}
      onClick={() => navigate("/gallery")}
      className="lg:flex items-center rounded-lg bg-primary p-2 pl-7 hidden w-fit group relative overflow-hidden hover:scale-105 transition-transform will-change-transform duration-300"
    >
      {/* Hover Background Animation */}
      <div className="absolute inset-0 bg-black translate-x-full transition-transform duration-300 group-hover:translate-x-0 rounded-lg"></div>
      <p className="relative z-[2] text-gray-100 text-sm group-hover:text-white transition-colors duration-300">
        Contact Us
      </p>
      <MdOutlineArrowRightAlt className="ml-2 text-gray-100 text-3xl rounded-md relative z-[2] transition-colors duration-300" />
    </Link>
  </motion.div>

  {/* Right Section */}
  <motion.div
    initial={{ opacity: 0, x: 200 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="mt-2 relative"
  >
    <img
      src={imageUrls[imageIndex]}
      alt=""
      className="w-full h-60 md:h-[42rem] object-cover rounded-lg"
      loading="lazy"
    />
    <div className="flex justify-between items-center absolute lg:bottom-5 bottom-3 bg-white lg:p-3 p-1 left-0 right-0 lg:mx-20 mx-10 rounded-full">
  {/* Prev Icon */}
  <FaAngleRight
    className={`text-3xl rotate-180 p-2 rounded-full ${
      imageIndex === 0
        ? "text-primary border border-primary"
        : "text-white bg-primary"
    }`}
    onClick={handlePrev}
  />

  {/* Indicators */}
  <div className="flex flex-grow space-x-2 items-center mx-3">
    {imageUrls.map((url, index) => (
      <hr
        key={index}
        className={`border-2 flex-grow rounded ${
          index === imageIndex ? "border-primary" : "border-gray-200"
        }`}
        onClick={() => setImageIndex(index)} // Update imageIndex on click
      />
    ))}
  </div>

  {/* Next Icon */}
  <FaAngleRight
    className={`text-3xl p-2 rounded-full ${
      imageIndex === imageUrls.length - 1
        ? "text-primary border border-primary"
        : "text-white bg-primary"
    }`}
    onClick={handleNext}
  />
</div>

  </motion.div>

  {/* Contact Button for Small Screens */}
  <Link to={"/contact"}>
    <motion.button
      initial={{ opacity: 0, x: -200 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="flex items-center justify-center rounded-lg bg-primary py-2 w-full my-3 lg:hidden"
    >
      <p className="text-gray-100 text-sm font-medium">Contact Us</p>
      <FaArrowUp className="ml-2 bg-gray-100 text-black rotate-45 text-3xl p-2 rounded-full" />
    </motion.button>
  </Link>
</div>

  );
};

export default BulkOrders;
