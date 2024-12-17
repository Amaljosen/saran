import React, { useState } from "react";
import AddSubcategory from "./AddSubcategory";
import AddProduct from "./AddProduct";
import ProductVariation from "./ProductVariation";
import GetProduct from "./GetProduct";

const Product = () => {
  const [activeComponent, setActiveComponent] = useState("GetProduct");

  return (
    <div className="w-[90%] mx-auto container text-black">
   <div className="mt-24">
  <div className="grid grid-cols-2 md:flex md:space-x-6 text-xs md:text-sm gap-2 md:gap-0 w-full md:w-auto justify-between md:justify-start">
    <button
      className={`transition-colors duration-300 ease-in-out px-4 py-2 border rounded-md font-medium ${
        activeComponent === "GetProduct"
          ? "text-white border-primary bg-primary"
          : "text-gray-700 border-gray-300 hover:text-primary hover:border-primary"
      }`}
      onClick={() => {
        setActiveComponent("GetProduct");
        window.scrollTo(0, 0); // Scroll to the top
      }}
    >
      Get Product
    </button>
    <button
      className={`transition-colors duration-300 ease-in-out px-4 py-2 border rounded-md font-medium ${
        activeComponent === "AddSubcategory"
          ? "text-white border-primary bg-primary"
          : "text-gray-700 border-gray-300 hover:text-primary hover:border-primary"
      }`}
      onClick={() => {
        setActiveComponent("AddSubcategory");
        window.scrollTo(0, 0); // Scroll to the top
      }}
    >
      Add Subcategory
    </button>

    <button
      className={`transition-colors duration-300 ease-in-out px-4 py-2 border rounded-md font-medium ${
        activeComponent === "AddProduct"
          ? "text-white border-primary bg-primary"
          : "text-gray-700 border-gray-300 hover:text-primary hover:border-primary"
      }`}
      onClick={() => {
        setActiveComponent("AddProduct");
        window.scrollTo(0, 0); // Scroll to the top
      }}
    >
      Add Product
    </button>
    <button
      className={`transition-colors duration-300 ease-in-out px-4 py-2 border rounded-md font-medium ${
        activeComponent === "ProductVariation"
          ? "text-white border-primary bg-primary"
          : "text-gray-700 border-gray-300 hover:text-primary hover:border-primary"
      }`}
      onClick={() => {
        setActiveComponent("ProductVariation");
        window.scrollTo(0, 0); // Scroll to the top
      }}
    >
      Add Product Variation
    </button>
  </div>
</div>



      {/* Product */}
      <div className="">
        {activeComponent === "AddSubcategory" && <AddSubcategory />}
        {activeComponent === "AddProduct" && <AddProduct />}
        {activeComponent === "ProductVariation" && <ProductVariation />}
        {activeComponent === "GetProduct" && <GetProduct />}
      </div>
    </div>
  );
};

export default Product;
