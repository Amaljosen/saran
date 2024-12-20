import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquarePhone } from "react-icons/fa6";
import { IoIosArrowRoundUp } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import { BsChatLeftHeart } from "react-icons/bs";
import { PiHandHeart } from "react-icons/pi";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="container mx-auto text-black">
      <div className="w-[90%] mx-auto my-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center items-center text-center space-y-4 my-10"
        >
          <div className="space-y-3 flex flex-col items-center">
            <h2 className="md:text-3xl text-lg font-semibold text-text text-center flex space-x-2 items-center">
              <span>
                Turn Your Memories <span className="text-black">into Art</span>
              </span>{" "}
              <span>
                <PiHandHeart />
              </span>
            </h2>
            <div>
              <p className="text-center text-gray-600 text-xs md:text-sm">
                Discover the exceptional qualities that set our handcrafted
                creations apart and enhance your gifting experience
              </p>
            </div>
          </div>
          <div className="md:space-x-4 space-x-2 flex">
            <Link to={"/sessions"}>
              <button className="bg-primary text-gray-50 px-4 py-3 rounded-lg md:text-sm text-xs flex space-x-2 items-center md:hover:scale-105 hover:bg-black transition-transform will-change-transform duration-300">
                <BsHandbag />
                <span>Explore Sessions</span>
              </button>
            </Link>
            <a href="https://wa.me/9894010363">
              <button className="border text-gray-700 px-4 py-3 rounded-lg md:text-sm text-xs flex space-x-2 items-center md:hover:scale-105 hover:text-primary hover:border-primary transition-transform will-change-transform duration-300">
                <BsChatLeftHeart />
                <span>Chat With Us</span>
              </button>
            </a>
          </div>
        </motion.div>

        <div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-1 items-center">
              <img
                src="https://ik.imagekit.io/cjureug40/Saran%20castle%20%20logo.png?updatedAt=1733905567440"
                alt="Castle"
                className="w-8"
              />
              <h1 className="font-bold text-sm md:text-lg">Saran Castle</h1>
            </div>
            {/* Social Media Icons */}
            <div className="flex">
              <motion.a
                href="tel:+919150172615"
                className="bg-purple-100 text-gray-800 p-2 rounded-lg mx-1 transition-all duration-300 hover:bg-black hover:text-gray-100"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5, y: -100, rotate: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FaSquarePhone className="text-xl md:text-2xl " />
              </motion.a>
              <motion.a
                href="https://wa.me/919150172615"
                className="bg-purple-100 text-gray-800 p-2 rounded-lg mx-1 transition-all duration-300 hover:bg-black hover:text-gray-100"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5, y: -100, rotate: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <IoLogoWhatsapp className="text-xl md:text-2xl" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com"
                className="bg-purple-100 text-gray-800 p-2 rounded-lg mx-1 transition-all duration-300 hover:bg-black hover:text-gray-100"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5, y: -100, rotate: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <AiFillInstagram className="text-xl md:text-2xl " />
              </motion.a>
            </div>
          </div>

          <div className="border rounded-lg md:p-10 p-5 mt-5">
            {/* Links Section */}
            <div className="gap-8 md:text-sm text-xs text-gray-700 w-full flex justify-between tracking-wider">
              <div className="space-y-2">
                <h3 className="font-semibold mb-3 text-sm">Home</h3>
                <RouterLink
                  to="/"
                  className="block hover:text-purple-500"
                  onClick={scrollToTop}
                >
                  Home
                </RouterLink>
                <ScrollLink
                  to="about-section"
                  smooth={true}
                  duration={500}
                  offset={-120}
                  className="block hover:text-purple-500 cursor-pointer"
                >
                  About Us
                </ScrollLink>
                <ScrollLink
                  to="miniature-section"
                  smooth={true}
                  duration={500}
                  offset={-120}
                  className="block hover:text-purple-500 cursor-pointer"
                >
                  Miniature
                </ScrollLink>
                <ScrollLink
                  to="resin-section"
                  smooth={true}
                  duration={500}
                  offset={-120}
                  className="block hover:text-purple-500 cursor-pointer"
                >
                  Resin
                </ScrollLink>
                <ScrollLink
                  to="return-gifts-section"
                  smooth={true}
                  duration={500}
                  offset={-120}
                  className="block hover:text-purple-500 cursor-pointer"
                >
                  Return Gifts
                </ScrollLink>
                <ScrollLink
                  to="bulk-orders-section"
                  smooth={true}
                  duration={500}
                  offset={-120}
                  className="block hover:text-purple-500 cursor-pointer"
                >
                  Bulk Orders
                </ScrollLink>
                <ScrollLink
                  to="testimonials-section"
                  smooth={true}
                  duration={500}
                  offset={-120}
                  className="block hover:text-purple-500 cursor-pointer"
                >
                  Testimonials
                </ScrollLink>
                <ScrollLink
                  to="how-it-works-section"
                  smooth={true}
                  duration={500}
                  offset={-120}
                  className="block hover:text-purple-500 cursor-pointer"
                >
                  How it works?
                </ScrollLink>
                <ScrollLink
                  to="features-section"
                  smooth={true}
                  duration={500}
                  offset={-120}
                  className="block hover:text-purple-500 cursor-pointer"
                >
                  Features
                </ScrollLink>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold mb-3 text-sm">Products</h3>
                <Link
                  to="/products"
                  onClick={scrollToTop}
                  className="block hover:text-purple-500"
                >
                  Miniature Theme
                </Link>
                <Link
                  to="/products"
                  onClick={scrollToTop}
                  className="block hover:text-purple-500"
                >
                  Resin Art
                </Link>
                <Link
                  to="/products"
                  onClick={scrollToTop}
                  className="block hover:text-purple-500"
                >
                  Miniature Clay
                </Link>
                <Link
                  to="/products"
                  onClick={scrollToTop}
                  className="block hover:text-purple-500"
                >
                  All Customized Gifts
                </Link>
                <h3 className="font-semibold md:hidden text-sm">Session</h3>
                <Link
                  to="/sessions"
                  onClick={scrollToTop}
                  className="block hover:text-purple-500 md:hidden"
                >
                  Resin
                </Link>
                <Link
                  to="/sessions"
                  onClick={scrollToTop}
                  className="block hover:text-purple-500 md:hidden"
                >
                  Miniature
                </Link>
              </div>

              <div className="hidden md:block space-y-2">
                <h3 className="font-semibold mb-3 text-sm">Session</h3>
                <Link
                  to="/sessions"
                  onClick={scrollToTop}
                  className="block hover:text-purple-500"
                >
                  Resin
                </Link>
                <Link
                  to="/sessions"
                  onClick={scrollToTop}
                  className="block hover:text-purple-500"
                >
                  Miniature
                </Link>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold mb-3 text-sm">Gallery</h3>
                <Link
                  to="/gallery"
                  onClick={scrollToTop}
                  className="block hover:text-purple-500"
                >
                  Product Showcase
                </Link>
                <Link
                  to="/gallery"
                  onClick={scrollToTop}
                  className="block hover:text-purple-500"
                >
                  Online Workshop
                </Link>
                <Link
                  to="/gallery"
                  onClick={scrollToTop}
                  className="block hover:text-purple-500"
                >
                  Offline Workshop
                </Link>
              </div>

              {/* Contact Us - Hidden on Small Screens */}
              <div className="hidden md:block space-y-2">
                <h3 className="font-semibold mb-3 text-sm">Contact Us</h3>
                <a
                  href="https://wa.me/9894010363"
                  className="block hover:text-purple-500"
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:saranyadurairajan92@gmail.com"
                  className="block hover:text-purple-500"
                >
                  Email
                </a>
                <a
                  href="tel:+9894010363"
                  className="block hover:text-purple-500"
                >
                  Call Us
                </a>
              </div>

              {/* <div className="space-y-2">
                <h3 className="font-semibold mb-3 text-sm">Address</h3>
                <p className="block hover:text-purple-500">No:8, 11th Cross</p>
                <p className="block hover:text-purple-500">Kailash Nagar</p>
                <p className="block hover:text-purple-500">Kattur - Trichy</p>
                <p className="block hover:text-purple-500">
                  Tamil Nadu - 620019
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className=" ">
          <a
            href="mailto:sarancastle@gmail.com"
            className="text-text hover:underline"
          >
            sarancastle@gmail.com
          </a>{" "}
          |{" "}
          <Link to={"/terms"} className="hover:underline text-text">
            Terms & Conditions
          </Link>
        </div>
      </div>

      {/* Bottom Text and Go to Top Button */}
      <div className="flex flex-col md:flex-row md:justify-between items-center border-t border-gray-200 pt-6 mt-6 text-xs md:text-base m-6">
        <p className=" text-gray-500 text-center md:text-left mb-2 md:mb-0 text-sm">
          © {year} Saran Castle - All rights reserved.
        </p>
        <a
          href="https://webzspot.com"
          target="_blank"
          className=" text-gray-500 text-center md:text-right mb-3 md:mb-0"
        >
          Design & Developed by{" "}
          <span className="text-purple-500 underline">Webzspot</span>{" "}
          <span className="animate-pulse">💜</span>
        </a>
        <button
          onClick={scrollToTop}
          className="bg-[#F7F7F8] text-xs md:text-sm border border-[#F1F1F3] hover:border-purple-200 text-gray-900 rounded-lg md:px-4 px-3 md:py-3 py-2 hover:shadow-lg hover:bg-purple-200 transition flex space-x-2 items-center"
        >
          <IoIosArrowRoundUp className="text-2xl p-1 bg-white rounded" />
          <span>Go to top</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
