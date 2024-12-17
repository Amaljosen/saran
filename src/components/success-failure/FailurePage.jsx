import React from 'react';
import { motion } from 'framer-motion';

const FailurePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-5">
      <motion.div initial={{ opacity: 0,scale:0.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}  className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <div className="flex flex-col items-center">
          <div className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-6">
            Unfortunately, your transaction could not be processed. Please try again later.
          </p>
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium md:hover:scale-105 transition-transform will-change-transform duration-300"
            onClick={() => {
              window.location.href = '/'; // Replace '/' with your home page route
            }}
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FailurePage;
