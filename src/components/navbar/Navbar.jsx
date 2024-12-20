import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { TbCalendarHeart } from "react-icons/tb";
import { LuGalleryVerticalEnd, LuContact2 } from "react-icons/lu";
import Hamburger from "hamburger-react";
import SideBar from "./SideBar";

const Navbar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [isOpen, setOpen] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    if (location.pathname === "/") {
      setActivePath("home");
    } else if (location.pathname.includes("/products")) {
      setActivePath("products");
    } else if (location.pathname.includes("/sessions")) {
      setActivePath("sessions");
    } else if (location.pathname.includes("/gallery")) {
      setActivePath("gallery");
    } else if (location.pathname.includes("/contact")) {
      setActivePath("contact");
    } 
    scrollToTop();
    console.log(activePath)
  }, [location.pathname]);
  

  return (
    <nav className="fixed w-full top-0 z-[20]">
      <div className="">
        <div className="relative">
          <div className="relative z-[10] ">
            <div className="bg-[#3C3F46]">
            <div className="text-white lg:text-sm relative text-xs container mx-auto">
              <div className="flex justify-between items-center w-[90%] mx-auto font-medium py-3">
                <div className="flex items-center space-x-1 md:hover:scale-105 transition-transform will-change-transform duration-300">
                  <img src={'https://ik.imagekit.io/cjureug40/Home/1.Top%20CTA/Frame.svg?updatedAt=1732086051129'} alt="contact" />
                  <a
                    href="tel:+9894010363"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Call Us: +91 9894010363</span>
                  </a>
                </div>
                <div className="text-xs md:flex items-center space-x-3 opacity-85 hidden ">
                  <span>Click Here to Join Saran Castle Community</span>
                  <a href="https://www.instagram.com/saran_castle/profilecard/?igsh=amtsMzFxNWs3ZDV0" target="_blank" className="border md:hover:scale-105 rounded-full px-3 py-1 flex items-center space-x-1 transition-transform will-change-transform duration-300">
                    <span>Join Now</span>
                    <FaLongArrowAltRight />
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href="https://www.instagram.com/saran_castle/profilecard/?igsh=amtsMzFxNWs3ZDV0"
                    target="_blank"
                    className="flex items-center space-x-1 md:hover:scale-105 transition-transform will-change-transform duration-300"
                  >
                    <img
                      src={
                        "https://ik.imagekit.io/cjureug40/Home/1.Top%20CTA/instagram.svg?updatedAt=1732086051108"
                      }
                      alt="Insta"
                    />
                    <span className="hidden lg:block">@sarancastle</span>
                  </a>
                  <div className="w-[1px] h-5 bg-white"></div>{" "}
                  <div>
                    <a
                      href="https://wa.me/9894010363"
                      target="_blank"
                      className="flex items-center space-x-2 md:hover:scale-105 transition-transform will-change-transform duration-300"
                    >
                      <img
                        src={
                          "https://ik.imagekit.io/cjureug40/Home/1.Top%20CTA/whatsapp.svg?updatedAt=1732086051072"
                        }
                        alt="whatsapp"
                      />
                      <span className="hidden lg:block">9894010363</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            </div>

            <div className="bg-white">
            <div className="relative z-[10] container mx-auto">
              <div className="flex items-center justify-between md:py-5 py-1 text-gray-800 w-[90%] mx-auto text-sm">
                <div className="flex items-center">
                  <div className="lg:hidden">
                    <Hamburger toggled={isOpen} toggle={setOpen} size={22} />
                  </div>
                  <img src={'https://ik.imagekit.io/cjureug40/Saran%20castle%20%20logo.png?updatedAt=1733905567440'} alt="Logo" className="w-10" />
                  <h1 className="text-lg font-medium ml-2">Saran Castle</h1>
                </div>
                <div className="lg:flex items-center space-x-5 hidden">
                  <Link
                    to="/"
                    className={`flex items-center space-x-1 ${
                      activePath == "home"
                        ? "border border-primary bg-secondary py-2 px-3 rounded-lg"
                        : ""
                    } `}
                  >
                    <HiOutlineHome className="text-2xl text-gray-700" />
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/products"
                    className={`flex items-center space-x-1 ${
                      activePath == "products"
                        ? "border border-primary bg-secondary py-2 px-3 rounded-lg"
                        : ""
                    }`}
                  >
                    <RiShoppingBasket2Line className="text-2xl text-gray-700" />
                    <span>Products</span>
                  </Link>
                  <Link
                    to="/sessions"
                    className={`flex items-center space-x-1 ${
                      activePath == "sessions"
                        ? "border border-primary bg-secondary py-2 px-3 rounded-lg"
                        : ""
                    }`}
                  >
                    <TbCalendarHeart className="text-2xl text-gray-700" />
                    <span>Sessions</span>
                  </Link>
                  <Link
                    to="/gallery"
                    className={`flex items-center space-x-1  ${
                      activePath == "gallery"
                        ? "border border-primary bg-secondary py-2 px-3 rounded-lg"
                        : ""
                    }`}
                  >
                    <LuGalleryVerticalEnd className="text-2xl text-gray-700" />
                    <span>Gallery</span>
                  </Link>
                  <Link
                    to="/contact"
                    className={`flex items-center space-x-1  ${
                      activePath == "contact"
                        ? "border border-primary bg-secondary py-2 px-3 rounded-lg"
                        : ""
                    }`}
                  >
                    <LuContact2 className="text-2xl text-gray-700" />
                    <span>Contact Us</span>
                  </Link>
                </div>
                <Link to={'/products'} className="bg-[#3C3F46] text-white px-4 py-2 rounded-md shadow-lg hover:scale-110 transition-transform will-change-transform duration-300 hidden md:block">
                  Shop Now
                </Link>
              </div>
            </div>
            </div>
            <hr />
          </div>

          <div
            className={`${
              isOpen ? "left-0" : "-left-[75rem]"
            } absolute top-24 md:top-32 w-full z-[8] transition-all duration-500`}
          >
            <SideBar setOpen={setOpen} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
