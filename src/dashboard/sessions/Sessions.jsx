import React, { useState } from "react";
import AddSessions from "./AddSessions";
import GetSession from "./GetSession"


const Product = () => {
  const [activeComponent, setActiveComponent] = useState("GetSession");

  return (
    <div className="w-[90%] mx-auto container text-black">
   <div className="mt-24">
  <div className="grid grid-cols-2 md:flex md:space-x-6 text-xs md:text-sm gap-2 md:gap-0 w-full md:w-auto justify-between md:justify-start">
    <button
      className={`transition-colors duration-300 ease-in-out px-4 py-2 border rounded-md font-medium ${
        activeComponent === "GetSession"
          ? "text-white border-primary bg-primary"
          : "text-gray-700 border-gray-300 hover:text-primary hover:border-primary"
      }`}
      onClick={() => {
        setActiveComponent("GetSession");
        window.scrollTo(0, 0); // Scroll to the top
      }}
    >
      Get Session
    </button>
    <button
      className={`transition-colors duration-300 ease-in-out px-4 py-2 border rounded-md font-medium ${
        activeComponent === "AddSession"
          ? "text-white border-primary bg-primary"
          : "text-gray-700 border-gray-300 hover:text-primary hover:border-primary"
      }`}
      onClick={() => {
        setActiveComponent("AddSession");
        window.scrollTo(0, 0); // Scroll to the top
      }}
    >
      Add Session
    </button>
  
  </div>
</div>



      {/* Product */}
      <div className="">
        {activeComponent === "GetSession" && <GetSession/>}
        {activeComponent === "AddSession" && <AddSessions />}
      </div>
    </div>
  );
};

export default Product;
