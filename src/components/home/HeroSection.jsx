import React, { useState, useEffect } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const carouselData = [
  {
    id: 1,
    image:
      "https://ik.imagekit.io/cjureug40/Home/2.Hero%20Section/profile1.jpg?updatedAt=1732086081164",
    title1: "Miniature Shadow Box",
    heading1: "Tiny Details, Big Memories",
    content1: "Crafted to Capture Life's Most Precious Moments",
    title2: "Why Miniature?",
    heading2: "Memories in Miniature",
    content2: "Transforming Your Special Moments into Lasting Art",
    btnContent: "Miniature Shadow Box",
    btnText: "Shop Now",
    link: "products",
  },
  {
    id: 2,
    image:
      "https://ik.imagekit.io/cjureug40/Home/2.Hero%20Section/profile2.jpg?updatedAt=1732086081273",
    title1: "Resin Art",
    heading1: "Preserve Moments in Resin",
    content1: "Crafted to Capture & Cherish Your Memories",
    title2: "Why Resin Art?",
    heading2: "Memories Preserved in Resin",
    content2: "Transforming Moments into Elegant, Lasting Pieces",
    btnContent: "Timeless Resin Art",
    btnText: "Shop Now",
    link: "products",
  },
  {
    id: 3,
    image:
      "https://ik.imagekit.io/cjureug40/Home/2.Hero%20Section/profile3.jpg?updatedAt=1732086081084",
    title1: "Courses",
    heading1: "Learn the Art of Crafting",
    content1: "Expert Workshops to Unlock Your Creativity",
    title2: "Why Courses?",
    heading2: "Learn, Create, Inspire",
    content2: "Join Our Courses to Master the Art of Handcrafted Creations",
    btnContent: "Join Our Community",
    btnText: "Join Now",
    link: "sessions",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % carouselData.length);
  };

  const handlePrev = () => {
    setCurrentSlide(
      (currentSlide - 1 + carouselData.length) % carouselData.length
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselData.length);
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [carouselData.length]);

  return (
    <div className="w-full py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Text */}

        

        <motion.div
          className="text-center mb-8 relative"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="lg:w-12 w-6 h-2 lg:h-4 rounded-full bg-[#D1B7FF]"></div>
            <h1 className="text-xl lg:text-3xl font-medium space-y-1 text-gray-800">
              Discover the Art of Exquisite
            </h1>
          </div>
          <div className="text-xl lg:text-3xl lg:mt-2 mt-1 font-medium space-y-1 text-gray-800">
            <h1>
              Handcrafted Creations at
              <span className="text-[#8C4CFF]"> Saran Castle!</span>
            </h1>
          </div>
          <p className="lg:text-sm text-xs text-gray-500 mt-2">
            Explore a World of Personalized, Handcrafted Products, Thoughtfully
            Designed to Reflect Your Unique Style and Preferences!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col lg:flex-row justify-between items-center lg:h-[20rem] h-auto lg:mt-56 mt-5 border border-[#EFE5FF] bg-[#FCFAFF] rounded-2xl relative p-5 lg:mx-5"
        >
          <div className="lg:space-y-3 space-y-2 px-4 lg:px-6 lg:w-[30%] h-36 lg:h-auto text-center lg:text-start">
            <h3 className="text-[#562CA0] font-semibold text-lg">
              {carouselData[currentSlide].title1}
            </h3>
            <h2 className="text-2xl font-medium">
              {carouselData[currentSlide].heading1}
            </h2>
            <p className="text-gray-500 text-sm">
              {carouselData[currentSlide].content1}
            </p>
          </div>

          {/* Centered Absolute Div */}
          <div className="lg:absolute my-5 lg:my-0 relative lg:w-[22rem] h-[30rem] lg:h-[28rem] w-full lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:bottom-7">
            <img
              src={carouselData[currentSlide].image}
              alt={carouselData[currentSlide].heading1}
              className="w-full h-full object-cover object-top rounded-lg shadow-lg"
              loading="lazy"
            />
            <div className="absolute w-full rounded-b-lg bottom-0 flex items-center h-1/6 justify-between p-4 bg-primary bg-opacity-25 backdrop-blur-sm text-xs">
              <p className="text-white font-medium">
                {carouselData[currentSlide].btnContent}
              </p>
              <Link
                to={`/${carouselData[currentSlide].link}`}
                className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg hover:bg-purple-700"
              >
                {carouselData[currentSlide].btnText}
              </Link>
            </div>
          </div>

          <div className="lg:space-y-3 space-y-2 px-4 lg:px-6 lg:w-[30%] h-36 lg:h-auto text-center lg:text-start flex flex-col justify-end lg:block">
            <h3 className="text-[#562CA0] font-semibold text-lg">
              {carouselData[currentSlide].title2}
            </h3>
            <h2 className="text-2xl font-medium">
              {carouselData[currentSlide].heading2}
            </h2>
            <p className="text-gray-500 text-sm">
              {carouselData[currentSlide].content2}
            </p>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 lg:top-auto lg:-right-6 p-2 lg:p-3 bg-primary text-white rounded-full z-[1]"
            aria-label="Next Slide"
          >
            <FaAngleRight className="lg:text-2xl text-xl" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 lg:top-auto lg:-left-6 p-2 lg:p-3 bg-primary text-white rounded-full z-[1]"
            aria-label="Previous Slide"
          >
            <FaAngleLeft className="lg:text-2xl text-xl" />
          </button>
        </motion.div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {carouselData.map((_, index) => (
            <div
              key={index}
              className={`w-6 h-2 rounded-full ${
                currentSlide === index ? "bg-purple-600" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
