import React from "react";
import { LuGift } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { RiHeartsFill } from "react-icons/ri";
import { BsMagic } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const ReturnGift = () => {
  return (
    <div className="py-6 w-[90%] mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col justify-center items-center text-center space-y-3"
      >
        <span className="text-primary font-medium border border-gray-200 rounded-lg p-2 flex items-center space-x-1">
          <LuGift /> <span>Return Gifts</span>
        </span>
        <h1 className="">
          Memorable Return Gifts for Every Occasion
          <p className="text-sm text-gray-600">
            Delight your guests with personalized, handcrafted return gifts that
            add a special touch to your celebrations.
          </p>
          <div className="flex justify-center my-5">
            <Link
              to={"contact"}
              onClick={() => navigate("/gallery")}
              className="lg:flex items-center rounded-full bg-primary p-2 pl-7 hidden w-fit group relative overflow-hidden"
            >
              {/* Hover Background Animation */}
              <div className="absolute rounded-full inset-0 bg-black -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></div>

              <p className="relative z-[2] text-gray-100 text-sm group-hover:text-white transition-colors duration-300">
                Contact Us
              </p>
              <FaArrowUp className="ml-2 bg-gray-100 text-black rotate-45 text-3xl p-2 rounded-full relative z-[2] transition-colors duration-300 group-hover:bg-white group-hover:text-black" />
            </Link>
          </div>
        </h1>
      </motion.div>

      <div className="flex flex-col md:flex-row md:justify-around justify-center md:items-end items-center md:space-x-3">
        <motion.div
          initial={{ opacity: 0, x: -200, y: -200 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full"
        >
          <img
            src={
              "https://ik.imagekit.io/cjureug40/Home/7.Return%20Gift/img1.jpg?updatedAt=1732099215159"
            }
            alt="gift"
            className="w-full h-80 md:h-56 object-cover rounded-lg"
          />
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-2 mt-2 font-medium text-sm">
            <BsStars className="text-white bg-primary p-2 text-4xl rounded-full" />
            <p>Gift Them a Memory</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col-reverse md:flex-col"
        >
          <div className="flex items-center space-x-1 bg-gray-100 rounded-full p-3 my-2 font-medium text-sm justify-center relative">
            <p>Create Cherished Moments</p>
            <img src="https://ik.imagekit.io/cjureug40/Home/7.Return%20Gift/icon1.svg?updatedAt=1732099214101" alt="" className="absolute -top-16 left-2 animate-pulse lg:block hidden"/>
          </div>
          <div className=" bg-[#F4EDFF] rounded-lg p-3 md:mt-2 mt-2 font-medium text-sm">
            <p className="text-2xl pb-2">80%</p>
            <p className="text-sm text-gray-600">
              Over 80% of guests appreciate a thoughtful return gift, making
              your celebration unforgettable
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <img
            src={
              "https://ik.imagekit.io/cjureug40/Home/7.Return%20Gift/img2.jpg?updatedAt=1732099215384"
            }
            alt="gift"
            className="w-full h-80 md:h-56 object-cover rounded-lg"
          />
          <div className="flex items-center space-x-1 bg-gray-100 rounded-full p-3 mt-2 font-medium text-sm justify-center">
            <p>Share the Love</p>
            <RiHeartsFill />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 200, y: -200 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full flex flex-col-reverse md:flex-col"
        >
          <div className="flex items-center space-x-1 bg-gray-100 rounded-full p-3 mt-2 font-medium text-sm justify-center">
            <p>Delight Your Guests</p>
            <BsMagic />
          </div>
          <div className="bg-[#F4EDFF] p-3 mt-2 rounded-lg">
            <img
              src={
                "https://ik.imagekit.io/cjureug40/Home/7.Return%20Gift/img3.jpg?updatedAt=1732099215247"
              }
              alt="gift"
              className="w-full h-80 md:h-44 object-cover rounded-lg"
            />
            <h1 className="px-2 mt-1">Make Your Guests Feel Special </h1>
            <p className="text-gray-600 text-sm px-2">
              A thoughtful return gift creates lasting impressions
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReturnGift;
