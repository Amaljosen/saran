import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiBox2Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import Hamburger from "hamburger-react";

const Nav = ({ activeButton, setActiveButton }) => {
  const [isOpen, setOpen] = useState(false); // Hamburger menu state
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // Popup state

  const handleLogout = () => {
    // console.log("Logged out");
    setShowLogoutPopup(false); // Close the popup after logout
  };

  return (
    <div className="fixed w-full top-0 bg-white">
      <div className="relative">
        <div className="bg-white shadow relative z-[10]">
          <nav className="flex flex-wrap justify-between items-center py-4 text-gray-800 container mx-auto w-[90%]">
            {/* Left Section */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="flex items-center space-x-2">
                <RiBox2Fill className="text-2xl text-gray-800" />
                {/* <img src="https://ik.imagekit.io/cjureug40/Saran%20castle%20%20logo.png?updatedAt=1733905567440" alt="" className="w-8"/> */}
                <span className="text-lg font-medium text-gray-800">
                  Saran Castle
                </span>
              </div>
              {/* Navigation Links */}
              <ul className="lg:flex space-x-2 md:space-x-4 hidden">
                {["My Orders", "Products", "Sessions", "Reviews"].map(
                  (buttonName) => (
                    <NavLink
                      key={buttonName}
                      to={`/dashboard/${buttonName
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className={`text-sm font-medium px-4 py-2 rounded-md cursor-pointer block w-auto transition-all duration-200 ${
                        activeButton === buttonName
                          ? "bg-gray-700 text-white"
                          : "text-gray-800 border hover:bg-gray-100 hover:border-gray-800"
                      }`}
                      onClick={() => setActiveButton(buttonName)}
                    >
                      <li className="flex items-center justify-center">
                        {buttonName}
                      </li>
                    </NavLink>
                  )
                )}
              </ul>
            </div>

            {/* Right Section */}
            <div className="lg:flex items-center space-x-2 mt-4 md:mt-0 hidden">
              <img
                src="https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Students%20Profile%20Avatar/Avatar%20Image%201.png?updatedAt=1732086187255"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-sm font-medium text-gray-800">
                Saranya Durairajan
              </span>
              <button
                className="text-xl pl-2"
                onClick={() => setShowLogoutPopup(true)} // Show logout popup
              >
                <FiLogOut />
              </button>
            </div>

            {/* Hamburger Menu (Mobile) */}
            <div className="lg:hidden">
              <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
            </div>
          </nav>
        </div>

        {showLogoutPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20] text-sm">
            <div className="bg-white p-6 md:w-1/3 w-4/5 sm:w-1/2 rounded-lg shadow-lg">
              <h3 className="font-medium text-center text-gray-800">
                Are you sure you want to logout?
              </h3>
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  className="bg-gray-300 text-black p-2 rounded-lg w-24 hover:bg-gray-400 transition duration-200"
                  onClick={() => setShowLogoutPopup(false)} // Close popup
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-lg w-24 hover:bg-red-600 transition duration-200"
                  onClick={handleLogout} // Trigger logout
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed z-[10] top-20 w-[80%] h-screen bg-[#3C3F46] text-white text-sm transition-all duration-300 ${
            isOpen ? "left-0 " : "-left-[65rem]"
          }`}
        >
        <div
          className={` py-8 flex flex-col justify-between h-[75%]`}
        >
          <ul className="space-y-2 w-[90%] mx-auto">
            {["My Orders", "Products", "Sessions", "Reviews"].map(
              (buttonName) => (
                <li
                  key={buttonName}
                  className={`text-sm font-medium px-4 py-2 rounded-md cursor-pointer ${
                    activeButton === buttonName
                      ? "bg-primary text-white"
                      : "border hover:bg-gray-100"
                  }`}
                >
                  <NavLink
                    to={`/dashboard/${buttonName
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    className="block w-full h-full"
                    onClick={() => {
                      setActiveButton(buttonName);
                      setOpen(false); // Close mobile menu
                    }}
                  >
                    {buttonName}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center space-x-2 mt-4 md:mt-0 lg:hidden w-[90%] mx-auto">
            <img
              src="https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Students%20Profile%20Avatar/Avatar%20Image%201.png?updatedAt=1732086187255"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm font-medium">Saranya Durairajan</span>
            <button
              className="text-xl"
              onClick={() => setShowLogoutPopup(true)} // Show logout popup
            >
              <FiLogOut />
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
