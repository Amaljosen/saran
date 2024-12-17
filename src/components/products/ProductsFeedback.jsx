import React from "react";

const ProductsFeedback = () => {
  const steps = [
    {
      title: "Choose Your Session",
      description: "Browse and select the session that interests you.",
      image: "https://ik.imagekit.io/cjureug40/Product%20moreInfo/e162ecd158f8a918085802a87d82f8cb.jpg?updatedAt=1733213732851", // Replace with actual image paths
    },
    {
      title: "Enter Your Details",
      description: "Fill in your personal information to confirm your booking",
      image: "https://ik.imagekit.io/cjureug40/Product%20moreInfo/6a9baa74da16757b09eeed7f00f41e9c.jpg?updatedAt=1733213804225",
    },
    {
      title: "Pick a Convenient Slot",
      description: "Select a date and time that works best for you.",
      image: "https://ik.imagekit.io/cjureug40/Product%20moreInfo/a5851fae044fe6a9042b8887b8dfc6b7.jpg?updatedAt=1733213802136",
    },
    {
      title: "Customize Your Kit & Join",
      description: "Upload photos, book, and get ready to join!",
      image: "https://ik.imagekit.io/cjureug40/Product%20moreInfo/09df97f14250d9949e5ec06e76a56bc2.jpg?updatedAt=1733213810588",
    },
  ];

  return (
    <div className="container mx-auto">
    <div className="w-[90%] mx-auto mt-5 md:mt-10">
      
      <div className=" flex items-center py-4 justify-center flex-col">
       <div>
       <h2 className=" rounded-full border px-3 text-sm lg:text-base mb-2  border-primary text-primary bg-gray-50 py-1"> How Its Work </h2>
       </div>
        <h2 className="lg:text-2xl font-bold text-gray-800 text-md text-center">Your Custom Creation in 4 Simple Steps</h2>
        <p className="text-gray-600 mt-2 lg:text-base text-sm text-center">
          Follow these easy steps to order your personalized miniature design.
        </p>
      </div>
      <div className="md:mt-10 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white border  md:p-5 p-5 rounded-lg  flex flex-col items-center text-center"
          >
            <img
              src={step.image}
              alt={step.title}
              className="lg:w-full lg:h-36 w-48 h-36  object-cover rounded-lg"
            />
            <h3 className="mt-4 md:text-lg text-md h-12 font-semibold text-gray-700">{step.title}</h3>
            <p className="mt-1 md:text-base text-sm text-gray-500">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default ProductsFeedback;