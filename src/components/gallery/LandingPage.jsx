import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LandingPage = () => {
  const [currentIndexes, setCurrentIndexes] = useState([0, 1, 2, 3, 4]);

  const images = [
    "https://ik.imagekit.io/cjureug40/gallery/62b115a4c6b0027b80dde0f4d8d24639.jpeg?updatedAt=1733808793097",
    "https://ik.imagekit.io/cjureug40/gallery/063b5d5411c092dbebea87522279a05d.jpeg?updatedAt=1733808794014",
    "https://ik.imagekit.io/cjureug40/gallery/546f0113de12e96d9771ec560d5c7c36.jpeg?updatedAt=1733808802868",
    "https://ik.imagekit.io/cjureug40/gallery/12fe125c12ff6f76905654f7ac026e49.jpeg?updatedAt=1733808793073",
    "https://ik.imagekit.io/cjureug40/gallery/7ca59e4fd81b54327eb0596379b579ef.jpeg?updatedAt=1733808793965",
  ];

  const positions = ["center", "left1", "left2", "right2", "right1"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-100%", scale: 0.8, zIndex: 3 },
    left2: { x: "-180%", scale: 0.6, zIndex: 1 },
    right1: { x: "100%", scale: 0.8, zIndex: 3 },
    right2: { x: "180%", scale: 0.6, zIndex: 1 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexes((prevIndexes) => {
        const newIndexes = prevIndexes.map(
          (index) => (index + 1) % images.length
        );
        return newIndexes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="container">
      <div className="w-full py-10 px-4 relative overflow-hidden">
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">
            A Showcase of Cherished Moments ❤️
          </h1>
          <p className="w-[90%] md:w-[40%] mx-auto text-gray-500 lg:text-sm text-xs">
            Explore our gallery of personalized creations, each capturing a
            unique story and crafted with care
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative h-60 md:h-96 flex justify-center mt-8">
          {currentIndexes.map((imageIndex, posIndex) => (
            <motion.img
              key={imageIndex}
              src={images[imageIndex]}
              alt={`Carousel image ${imageIndex}`}
              className="absolute rounded-lg shadow-lg w-40 h-60 md:w-72 md:h-96 object-cover"
              variants={imageVariants}
              initial="center"
              animate={positions[posIndex]}
              transition={{ duration: 0.7 }}
            />
          ))}
        </div>
      </div>

      {/* ********* Handcrafted Treasures Tailored Just for You ********* */}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-2 my-10 w-[90%] mx-auto"
      >
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">
          Handcrafted Treasures Tailored Just for You
        </h1>
        <p className="w-[90%] md:w-[40%] mx-auto text-gray-500 lg:text-sm text-xs">
          Experience a curated collection of unique, custom-made pieces designed
          to tell your story.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[40rem] w-[90%] mx-auto">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-[20rem] md:h-[40rem]"
        >
          <img
            src="https://ik.imagekit.io/cjureug40/gallery/deluxe%20pen%20stand.jpg?updatedAt=1733465367001"
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>

        {/* Middle Section */}
        <div className="flex flex-col h-auto md:h-[40rem] overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, translateY: -20 }}
            whileInView={{ opacity: 1, scale: 1, translateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="h-[10rem] md:h-[50%] pb-2 md:pb-3"
          >
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/8e2e40a72f3dd67ac1f51c9c44b94195.jpeg?updatedAt=1733808794075"
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6, translateY: -20 }}
            whileInView={{ opacity: 1, scale: 1, translateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="h-[10rem] md:h-[50%] pt-2 md:pt-3"
          >
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/15e5dc671efa5a6f4870627563574094.jpeg?updatedAt=1733808793153"
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
        </div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, translateX: 20 }}
          whileInView={{ opacity: 1, scale: 1, translateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="h-[20rem] md:h-[40rem]"
        >
          <img
            src="https://ik.imagekit.io/cjureug40/gallery/Moon%20lamp.jpg?updatedAt=1733465366168"
            alt=""
            className="w-full h-full object-cover object-right rounded-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
