import React from 'react';
import { motion } from 'framer-motion';
import { ImWhatsapp } from "react-icons/im";
import { useProductContext } from "../../Context";

const SuccessPageSession = () => {
  const { link } = useProductContext();
  console.log("link:",link)
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-5">
      <motion.div 
        initial={{ opacity: 0, scale: 0.3 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }} 
        className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center"
      >
        <div className="flex flex-col items-center">
          <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your transaction has been completed successfully.
          </p>

          {link === '' || link === null ? (
            <button
            className="bg-green-500 md:hover:scale-105 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-transform will-change-transform duration-300"
            onClick={() => {
              window.location.href = '/'; // Redirect to the home page
            }}
          >
            Continue Shopping
          </button>
          ) : (
            <div className="flex flex-col items-center">
            <p className="text-green-600 mb-4">Click to Access your online class Link  </p>
            <motion.button
              onClick={() => {
                // Logic to reveal the link or special offer
                window.open(link, '_blank', 'noopener,noreferrer');
              }}
              className="bg-green-500 md:hover:scale-105 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-transform will-change-transform duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ImWhatsapp className='text-xl animate-bounce'/>
              <span>Open Now</span>
            </motion.button>
          </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPageSession;
