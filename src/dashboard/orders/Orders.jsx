import React, { useState } from "react";
import ShowProducts from "./ShowProducts";
import ShowSessions from "./ShowSessions";

const Orders = () => {
  const [activeComponent, setActiveComponent] = useState("Product");

  const components = {
    Product: <ShowProducts/>,
    Session: <ShowSessions/>,
  };

  const tabs = [
    { name: "Product", label: "Product" },
    { name: "Session", label: "Session" },
  ];

  return (
    <div className="w-[90%] mx-auto container text-black ">
      <div className="mt-24">
        <div className="grid grid-cols-2 md:flex md:space-x-6 text-xs md:text-sm gap-2 md:gap-0 w-full md:w-auto justify-between md:justify-start">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`transition-colors duration-300 ease-in-out px-4 py-2 border rounded-md font-medium ${
                activeComponent === tab.name
                  ? "text-white border-primary bg-gradient-to-r from-primary to-text"
                  : "text-gray-700 border-gray-300 hover:text-primary hover:border-primary"
              }`}
              onClick={() => {
                setActiveComponent(tab.name);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Component Rendering */}
      <div>{components[activeComponent]}</div>
    </div>
  );
};

export default Orders;
