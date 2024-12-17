import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { RiCheckboxBlankFill, RiCheckboxFill } from "react-icons/ri";
import { PiCheckLight } from "react-icons/pi";

import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";

const ExploreProducts = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  // Initial State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState("Select Option");
  const [open, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalProducts, setOriginalProducts] = useState([]); // Always keep unfiltered data
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState({});

  const navigate = useNavigate();
  const productsPerPage = 6;

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [categoryResponse, subcategoryResponse, productResponse] =
          await Promise.all([
            axios.get(`${import.meta.env.VITE_BACKEND_API}/v1/category`),
            axios.get(`${import.meta.env.VITE_BACKEND_API}/v1/subcategory`),
            axios.get(`${import.meta.env.VITE_BACKEND_API}/v1/product`),
          ]);

        const categoriesFromBackend = categoryResponse.data.data || [];

        // Add "All Products" as the first category
        const allProductsCategory = {
          category_id: "all", // Unique ID
          category_name: "All Products",
        };

        setCategories([allProductsCategory, ...categoriesFromBackend]);
        setSubcategories(subcategoryResponse.data.data || []);
        setOriginalProducts(productResponse.data.data || []);
        setProducts(productResponse.data.data || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Dropdown Toggle
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    
  };

  // Handle Category Click
  const handleCategoryClick = (category) => {
    // Check if "All Products" is clicked
    if (category.category_id === "all") {
      setSelectedCategory("All Products");
      setProducts(originalProducts); // Reset to show all products
      setSelectedSubcategory(null);
      setShowSubcategories(false);
      setExpandedCategory(null);
      return;
    }

    console.log("Selected Category:", category.category_name);
    setExpandedCategory(
      expandedCategory === category.category_id ? null : category.category_id
    );

    const filteredSubcategories = subcategories.filter(
      (subcategory) => subcategory.category_id === category.category_id
    );

    setSelectedCategory(category.category_name);
    setSelectedSubcategory(null); // Reset subcategory selection
    setShowSubcategories(category.category_name); // Toggle visibility of subcategories
    setProducts(
      originalProducts.filter((product) =>
        filteredSubcategories.some(
          (subcategory) => subcategory.subcategory_id === product.subcategory_id
        )
      )
    );
  };

  // Handle Subcategory Click
  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategories((prevState) => {
      // Check if the clicked subcategory is already selected
      const isAlreadySelected = prevState[subcategory.subcategory_id];

      // If already selected, unselect it (reset the selection)
      if (isAlreadySelected) {
        setProducts(originalProducts); // Reset product list to show all products
        return {}; // Return an empty selection
      }
         
      // Otherwise, select the clicked subcategory
      const updatedSelection = {
        [subcategory.subcategory_id]: true, // Mark the clicked subcategory as selected
      };

      // Filter products based on the selected subcategory
      const selectedIds = Object.keys(updatedSelection).filter(
        (id) => updatedSelection[id]
      );

      setProducts(
        selectedIds.length
          ? originalProducts.filter((product) =>
              selectedIds.includes(String(product.subcategory_id))
            )
          : originalProducts // If none selected, show all products
      );

      // Reset expanded category and dropdowns
      setShowSubcategories(false);
      setIsDropdownOpen(false);
      setExpandedCategory(null);

      return updatedSelection; // Update the selected subcategories
    });
  };

  // Sort and Filter Logic
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  // Pagination Logic

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      scrollToTop();
    }
  };

  // Dropdown Button Toggle
  const ButtonDropdown = () => {
    setIsOpen(!open);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    const cleanPrice = (priceString) => {
      return parseInt(
        priceString.replace("/-", "").trim().replace(",", ""),
        10
      );
    };

    const getProductPrice = (product) => {
      if (
        product.productVariation &&
        product.productVariation[0] &&
        product.productVariation[0].productVariation_price
      ) {
        return cleanPrice(product.productVariation[0].productVariation_price);
      }
      return 0;
    };

    const sorted = [...filteredProducts]; // Use originalProducts to sort, so filters can reset properly

    if (option === "Low to High") {
      sorted.sort((a, b) => getProductPrice(a) - getProductPrice(b));
    } else if (option === "High to Low") {
      sorted.sort((a, b) => getProductPrice(b) - getProductPrice(a));
    }

    setProducts(sorted); // Update the products to display
    setIsOpen(false); // Close dropdown
  };

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Navigate to Product Details
  const handleBuyNowClick = (ProductId) => {
    navigate(`/description/${ProductId}`);
    window.scrollTo(0, 0);
    // console.log(`Navigating to product ID: ${ProductId}`);
  };

  return (
    <div className="container mx-auto mt-[7.4rem] md:mt-36 text-black">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[35rem] md:h-[30rem] w-full">
          {/* SVG Loader */}
          <div
            className="md:w-16 w-12 md:h-16 h-12 bg-no-repeat bg-center mb-4"
            style={{
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="%238C4CFF" stroke-width="15" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>')`,
            }}
          ></div>
          {/* Loading Message */}
          <p className="text-center text-sm md:text-base text-gray-700">
            Loading please wait ...
          </p>
        </div>
      ) : categories.length === 0 ? (
        <div className="flex items-center justify-center h-[70vh] text-center text-gray-700">
          No Product Available.
        </div>
      ) : (
        <div className="">
          <div className="w-[90%] mx-auto flex flex-col  lg:flex-row items-center justify-between  lg:py-4 py-1">
            <div className="border rounded-full flex  items-center gap-1  p-3  lg:w-auto w-full justify-between ">
              {/* Category Buttons */}
              <div className="hidden lg:block">
                <div className="flex gap-5 w-full">
                  {categories.map((category, index) => (
                    <div key={index} className="relative">
                      {/* Category Button */}
                      <button
                        onClick={() => handleCategoryClick(category)}
                        className={`px-4 py-2  rounded-full border text-sm  hover:bg-primary hover:text-white transition-all duration-300 ${
                          selectedCategory === category.category_name
                            ? "bg-primary text-white"
                            : ""
                        }`}
                      >
                        {category.category_name}
                        {/* Show arrow only for categories other than 'All Products' */}
                        {category.category_name !== "All Products" &&
                          (expandedCategory === category.category_id ? (
                            <SlArrowUp className="inline-block ml-2" />
                          ) : (
                            <SlArrowDown className="inline-block ml-2" />
                          ))}
                      </button>

                      {/* Subcategories */}
                      {expandedCategory === category.category_id &&
                        showSubcategories === category.category_name && (
                          <div className="absolute top-full left-0 mt-2  text-sm bg-white  border  w-56 z-10 ">
                            {subcategories
                              .filter(
                                (subcategory) =>
                                  subcategory.category_id ===
                                  category.category_id
                              )
                              .map((subcategory, subIndex) => (
                                <button
                                  key={subIndex}
                                  onClick={() =>
                                    handleSubcategoryClick(subcategory)
                                  }
                                  className={`flex p-2 text-left w-full ${
                                    selectedSubcategories[
                                      subcategory.subcategory_id
                                    ]
                                      ? "bg-gray-100"
                                      : ""
                                  }`}
                                >
                                  {/* Icon for Checkbox */}
                                  <span className="mr-2">
                                    {selectedSubcategories[
                                      subcategory.subcategory_id
                                    ] ? (
                                      <RiCheckboxFill className=" text-text text-2xl" />
                                    ) : (
                                      <RiCheckboxBlankFill className="text-[#F9F6FF] text-2xl" />
                                    )}
                                  </span>
                                  {subcategory.subcategory_name}
                                  <span className=" ml-6">
                                    {selectedSubcategories[
                                      subcategory.subcategory_id
                                    ] ? (
                                      <PiCheckLight className=" text-text text-xl" />
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                </button>
                              ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Small screen "All Products" button with dropdown */}
              <div className="block lg:hidden">
                {/* Dropdown Trigger */}
                <div
                  onClick={toggleDropdown}
                  className="border rounded-full flex items-center justify-center hover:bg-primary hover:text-white px-4 py-2 cursor-pointer"
                >
                  <h1 className="text-sm">
                    {selectedSubcategory || selectedCategory || "All Products"}
                  </h1>
                  {isDropdownOpen ? (
                    <SlArrowUp className="ml-2" />
                  ) : (
                    <SlArrowDown className="ml-2" />
                  )}
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className=" absolute mt-2 bg-white text-xs border rounded-lg z-10 ">
                    {categories.map((category, index) => (
                      <div key={index} className="flex flex-col ">
                        <button
                          onClick={() => {
                            handleCategoryClick(category);
                            if (category.category_name === "All Products") {
                              setIsDropdownOpen(false); // Close the dropdown
                            }
                          }}
                          
                          className={` text-left  w-full p-2 flex items-center justify-between ${
                            selectedCategory === category.category_name
                              ? "bg-primary text-white"
                              : ""
                          }`}
                        >
                          {category.category_name}
                          {/* Hide the arrow icon for "All Products" */}
                          {category.category_name !== "All Products" &&
                            (expandedCategory === category.category_id ? (
                              <SlArrowUp className="inline-block ml-2" />
                            ) : (
                              <SlArrowDown className="inline-block ml-2" />
                            ))}
                        </button>

                        {/* Subcategories */}
                        {expandedCategory === category.category_id &&
                          showSubcategories === category.category_name && (
                            <div className="">
                              {subcategories
                                .filter(
                                  (subcategory) =>
                                    subcategory.category_id ===
                                    category.category_id
                                )
                                .map((subcategory, subIndex) => (
                                  <div
                                    key={subIndex}
                                    onClick={() =>
                                      handleSubcategoryClick(subcategory)
                                    }
                                    className={`w-full   flex  items-center p-3   ${
                                      selectedSubcategory ===
                                      subcategory.subcategory_name
                                        ? "bg-[#562CA0] text-white"
                                        : ""
                                    }`}
                                  >
                                    <span className="mr-2">
                                      {selectedSubcategories[
                                        subcategory.subcategory_id
                                      ] ? (
                                        <RiCheckboxFill className=" text-text text-2xl" />
                                      ) : (
                                        <RiCheckboxBlankFill className="text-[#F9F6FF] text-2xl" />
                                      )}
                                    </span>
                                    {subcategory.subcategory_name}
                                    <span className=" ml-6">
                                      {selectedSubcategories[
                                        subcategory.subcategory_id
                                      ] ? (
                                        <PiCheckLight className=" text-text text-xl" />
                                      ) : (
                                        ""
                                      )}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:hidden block w-auto  ">
                <div className="flex gap-3 w-auto">
                  <div className="">
                    <div className="  w-full flex items-center justify-between gap-1 text-xs relative">
                      <div className=" flex items-center lg:gap-2 gap-1 w-full">
                        <h1 className=" font-semibold">Sort By:</h1>
                        <h1 className="" onClick={ButtonDropdown}>
                          {selectedOption}{" "}
                        </h1>
                        <h1 onClick={ButtonDropdown}>
                          {open ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                        </h1>
                      </div>
                    </div>
                    {open && (
                      <div className="border  absolute bg-white  w-36">
                        <h2
                          className={`px-3 py-2 cursor-pointer text-xs ${
                            selectedOption === "Low to High"
                              ? "bg-secondary"
                              : "hover:bg-gray-100 "
                          }`}
                          onClick={() => handleOptionSelect("Low to High")}
                        >
                          Low to High
                        </h2>
                        <h2
                          className={`px-3 py-2  cursor-pointer text-xs ${
                            selectedOption === "High to Low"
                              ? "bg-secondary"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => handleOptionSelect("High to Low")}
                        >
                          High to Low
                        </h2>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Search box */}
            </div>
            {/* Sort and Filter buttons large screen */}
            <div className="hidden lg:block">
              <div className="flex gap-3">
                <div className=" ">
                  <div className="   flex items-center justify-between gap-1 text-sm relative cursor-pointer">
                    <div className=" flex items-center gap-1 w-full">
                      <h1 className=" font-semibold">Sort By:</h1>
                      <h1 className="" onClick={ButtonDropdown}>
                        {selectedOption}{" "}
                      </h1>
                      <h1 onClick={ButtonDropdown}>
                        {open ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                      </h1>
                    </div>
                  </div>
                  {open && (
                    <div className="border text-sm absolute bg-white shadow-md w-44">
                      <h2
                        className={`px-3 py-2 cursor-pointer ${
                          selectedOption === "Low to High" ? "bg-secondary" : " "
                        }`}
                        onClick={() => handleOptionSelect("Low to High")}
                      >
                        Low to High
                      </h2>
                      <h2
                        className={`px-3 py-2  cursor-pointer ${
                          selectedOption === "High to Low" ? "bg-secondary" : ""
                        }`}
                        onClick={() => handleOptionSelect("High to Low")}
                      >
                        High to Low
                      </h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-3" />

          {/* Products Display */}
          <div className="w-[90%]  mx-auto mt-5 md:mt-10">
            <div className="w-full  border-b  border-b-background flex justify-between items-end pb-4 ">
              <h1 className=" text-sm lg:text-xl font-semibold">
                {selectedCategory}
              </h1>
            </div>

            {/* Display paginated products */}
            <div className="grid lg:grid-cols-3 grid-cols-2 md:gap-8 gap-4 mt-5">
              {paginatedProducts.map((product) => (
                <div
                  key={product.product_id}
                  className="border flex flex-col justify-between p-2 md:p-5 border-[#E5EFFF] rounded-md relative"
                >
                  {/* Conditional Recommended Tag */}
                  {product.overallRating > "4" && (
                    <span className="bg-[#FFE566] font-medium px-2 py-1 md:text-xs text-[8px] text-gray-800 rounded-r-full absolute left-0 md:top-2">
                      Recommended
                    </span>
                  )}
                  {/* Display the first image from productVariation */}
                  <div className="flex flex-col justify-between w-full">
                    <img
                      src={product.productVariation[0].productVariation_image}
                      className="md:h-[250px] h-[100px] text-text rounded-lg object-cover w-full"
                      alt={product.product_name}
                      loading="lazy"
                    />
                    <div className="flex justify-between gap-2 mt-1 md:mt-2 items-center">
                      <h2 className="lg:text-lg md:text-sm text-text text-[10px] line-clamp-1 text-left font-semibold">
                        {product.product_name}
                      </h2>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex flex-col items-start md:gap-2 gap-[2px] w-full">
                      <h1 className="text-gray-500 md:text-base sm:text-sm text-[10px] line-clamp-2  text-left">
                        {product.productVariation[0].description}
                      </h1>
                    </div>

                    <div className="text-start md:mt-2 mt-1">
                      <h1 className="text-text md:text-3xl text-[13px] font-bold">
                        ₹{product.productVariation[0].productVariation_price}
                        <span className="text-gray-400 line-through text-[11px] md:text-xl ml-2">
                          ₹
                          {Math.round(
                            parseFloat(
                              product.productVariation[0].productVariation_price
                            ) * 1.2
                          )}
                        </span>
                      </h1>
                    </div>

                    <div className="md:flex hidden  gap-[2px]  justify-between   w-full  md:pb-3 pb-[5px] lg:mt-4 md:mt-2 mt-0 ">
                      {/* Features can be added dynamically */}
                      <span className="text-gray-800 md:text-xs text-[8px] flex items-center justify-center border border-background bg-gray-200 md:rounded-l-md w-1/3 ">
                        {product.productVariation[0].theme}
                      </span>
                      <span className="text-gray-800  md:text-xs text-[8px]  py-[5px]  md:py-3  lg:flex items-center gap-1 justify-center  border border-background bg-gray-200 w-1/3 ">
                        <span className="md:block hidden">Shipping:</span>₹
                        {product.productVariation[0].shipping_charges}
                      </span>
                      <span className="text-gray-800 md:text-xs text-[8px]   py-[5px]  md:py-3  flex items-center justify-center  border border-background bg-gray-200 md:rounded-r-md w-1/3">
                        {product.productVariation[0].delivery_details}
                      </span>
                    </div>

                    <div className="flex md:flex-row mt-1 md:mt-0 flex-col lg:gap-2 gap-1">
                      <button
                        className="w-full flex items-center justify-center gap-2 bg-primary text-[#F7F7F8] font-medium md:text-xs text-[10px] md:py-3 py-2 md:rounded-md rounded-sm text-md md:hover:scale-105 md:hover:bg-black transition-transform will-change-transform duration-300"
                        onClick={() => {
                          const phoneNumber = "9894010363"; // Replace with your phone number
                          const message = `Hi, I am interested in the product ${product.product_name} . Can you share more details?`; // Custom message
                          const whatsappLink = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(
                            message
                          )}`;
                          window.open(whatsappLink, "_blank"); // Opens in a new tab
                        }}
                      >
                        <img
                          src="https://ik.imagekit.io/cjureug40/Home/1.Top%20CTA/whatsapp.svg?updatedAt=1732086051072"
                          alt=""
                          className="w-[15px]"
                        />
                        WhatsApp Us
                      </button>

                      <button
                        className="w-full bg-primary text-[#F7F7F8] font-medium md:py-3 py-2 md:text-xs text-[10px] md:rounded-md rounded-sm md:hover:scale-105 md:hover:bg-black transition-transform will-change-transform duration-300"
                        onClick={() => handleBuyNowClick(product.product_id)} // Use product.product_id
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4 gap-2">
              {/* Left Arrow */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1} // Disable if on the first page
                className={`px-3 py-2 text-xl ${
                  currentPage === 1
                    ? " text-gray-500 cursor-not-allowed"
                    : "bg-white text-black "
                }`}
              >
                <MdOutlineKeyboardArrowLeft /> {/* Left arrow symbol */}
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border rounded-lg ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              {/* Right Arrow */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages} // Disable if on the last page
                className={`px-3 py-2 text-xl  ${
                  currentPage === totalPages
                    ? " text-gray-500 cursor-not-allowed"
                    : "bg-white text-black "
                }`}
              >
                <MdOutlineKeyboardArrowRight /> {/* Right arrow symbol */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreProducts;
