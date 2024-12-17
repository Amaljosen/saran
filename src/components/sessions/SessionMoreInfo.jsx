import React from "react";

const SessionMoreInfo = () => {
  const steps = [
    {
      title: "Select Your Miniature Theme",
      description: "Choose the miniature theme that fits your occasion",
      image: "https://ik.imagekit.io/cjureug40/session%20MoreInfo/e656e6759a677f1c16a0cbbf8deb787e.jpg?updatedAt=1733213991921", // Replace with actual image paths
    },
    {
      title: "Submit Your Details & Assets",
      description: "Upload necessary information and photos",
      image: "https://ik.imagekit.io/cjureug40/session%20MoreInfo/904c56fb69e6c091a26f55b5fd0707bf.jpg?updatedAt=1733213987472",
    },
    {
      title: "Pay & Place Your Order",
      description: "Complete your payment to confirm your order",
      image: "https://ik.imagekit.io/cjureug40/session%20MoreInfo/44451f0e9323258399bc7b51bf4efc76.jpg?updatedAt=1733213991572",
    },
    {
      title: "Get Your Custom Miniature",
      description: "Your custom miniature will be delivered in a few days!",
      image: "https://ik.imagekit.io/cjureug40/session%20MoreInfo/0f6d2935e370168b5841b96bcced909a.jpg?updatedAt=1733213991658",
    },
  ];

  return (
   <div className="container mx-auto">
     <div className="w-[90%] mx-auto ">
       
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
             <h3 className="mt-4 md:text-lg text-md font-semibold text-gray-700">{step.title}</h3>
             <p className="mt-1 md:text-base text-sm text-gray-500">{step.description}</p>
           </div>
         ))}
       </div>
     </div>
   </div>
  );
};

export default SessionMoreInfo;