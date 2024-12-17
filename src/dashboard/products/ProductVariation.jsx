import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEditDocument } from "react-icons/md";

function ProductVariation() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [productVariation, setProductVariation] = useState({
    productVariation_price: "",
    size: "",
    shipping_charges: "",
    delivery_details: "",
    requirements1: "",
    requirements2: "",
    requirements3: "",
    theme: "",
    description: "",
    about: "",
  });

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/v1/category`
        );
        setCategories(response.data.data); // Assuming the response data is in response.data.data
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      const fetchSubcategories = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_API}/v1/subcategory/${selectedCategory}`
          );
          setSubcategories(response.data.data); // Assuming the response data is in response.data.data
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };

      fetchSubcategories();
    }
  }, [selectedCategory]);

  // Fetch products when a subcategory is selected
  useEffect(() => {
    if (selectedSubcategory) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_API}/v1/paticularproduct/${selectedSubcategory}`
          );
          setProducts(response.data.data); // Assuming the response data is in response.data.data
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    }
  }, [selectedSubcategory]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductVariation({ ...productVariation, [name]: value });
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedProduct("");
    setProductVariation({
      productVariation_price: "",
      size: "",
      shipping_charges: "",
      delivery_details: "",
      requirements1: "",
      requirements2: "",
      requirements3: "",
      theme: "",
      description: "",
      about: "",
    });
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }

    if (
      !file ||
      !selectedProduct ||
      !productVariation.productVariation_price ||
      !productVariation.size ||
      !productVariation.shipping_charges ||
      !productVariation.delivery_details ||
      !productVariation.requirements1 ||
      !productVariation.requirements2 ||
      !productVariation.requirements3 ||
      !productVariation.description ||
      !productVariation.theme ||
      !productVariation.about
    ) {
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 2000);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("productVariation_image", file);
    formData.append("product_id", selectedProduct);
    formData.append(
      "productVariation_price",
      productVariation.productVariation_price
    );
    formData.append("size", productVariation.size);
    formData.append("shipping_charges", productVariation.shipping_charges);
    formData.append("delivery_details", productVariation.delivery_details);
    formData.append("requirements1", productVariation.requirements1);
    formData.append("requirements2", productVariation.requirements2);
    formData.append("requirements3", productVariation.requirements3);
    formData.append("description", productVariation.description);
    formData.append("theme", productVariation.theme);
    formData.append("about", productVariation.about);

    console.log(formData);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/v1/product-variations`,
        formData
      );
      setShowSubmitPopup(true);
      setTimeout(() => {
        setShowSubmitPopup(false);
      }, 5000);
      handleReset();
    } catch (error) {
      console.error(
        "Error adding product variation:",
        error.response?.data || error.message
      );
      alert("Error adding product variation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className=" ">
        <form className="mx-auto py-5  " onSubmit={handleSubmit}>
          <div className="bg-[#e9e9e9] w-full border-l-4 border-[#8c4cff] mb-3">
            <div className="flex text-[#000000] space-x-2 text-sm md:text-base font-semibold p-2 items-center">
              <h1>Product Details</h1>
              <MdEditDocument className="text-xl" />
            </div>
          </div>
          <div className="lg:flex justify-start items-center px-2 lg:space-x-6 pb-6 lg:space-y-0 space-y-4">
            {/* Category Dropdown */}
            <div className="text-sm md:text-base space-y-1">
              <h2>Category:</h2>
              <select
                className="focus:outline-none border rounded p-1 w-full lg:w-[300px] h-[40px]"
                value={selectedCategory}
                required
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select a Category</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Dropdown */}
            <div className="text-sm md:text-base space-y-1">
              <h2>Subcategory:</h2>
              <select
                className="focus:outline-none border rounded p-1 w-full lg:w-[350px] h-[40px]"
                value={selectedSubcategory}
                required
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              >
                <option value="">Select a Subcategory</option>
                {subcategories.map((subcategory) => (
                  <option
                    key={subcategory.subcategory_id}
                    value={subcategory.subcategory_id}
                  >
                    {subcategory.subcategory_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Name Dropdown */}
            <div className="text-sm md:text-base space-y-1 ">
              <h2>Product Name:</h2>
              <select
                className="focus:outline-none border rounded p-1 w-full lg:w-[300px] h-[40px]"
                value={selectedProduct}
                required
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Select a Product</option>
                {products.map((product) => (
                  <option key={product.product_id} value={product.product_id}>
                    {product.product_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-[#e9e9e9] border-l-4 border-[#8c4cff] mb-3">
            <div className="flex text-[#000000] space-x-2 text-sm md:text-base font-semibold p-2 items-center">
              <h1>Product Variation</h1>
              <MdEditDocument className="text-xl" />
            </div>
          </div>
          <div className="lg:flex justify-start items-center px-2 lg:space-x-6 pb-2 lg:space-y-0  space-y-4">
            <div className="text-sm md:text-base space-y-1">
              <h2>Product Image :-</h2>
              <input
                name="productVariation_image"
                required
                onChange={handleFileChange}
                type="file"
                className="focus:outline-none border  rounded p-1 w-full "
              />
            </div>
            <div className="text-sm md:text-base space-y-1">
              <h2>Product Price :-</h2>
              <input
                type="text"
                name="productVariation_price"
                required
                value={productVariation.productVariation_price}
                onChange={handleInputChange}
                placeholder="Enter  Variation Price"
                className="focus:outline-none border  rounded p-1 w-full  h-[40px]"
              />
            </div>
            <div className="text-sm md:text-base space-y-1">
              <h2>Size :-</h2>
              <input
                type="text"
                name="size"
                required
                value={productVariation.size}
                onChange={handleInputChange}
                placeholder="Enter Variation Size"
                className="focus:outline-none border  rounded p-1 w-full  h-[40px]"
              />
            </div>
            <div className="text-sm md:text-base space-y-1">
              <h2>Theme :-</h2>
              <input
                type="text"
                name="theme"
                required
                value={productVariation.theme}
                onChange={handleInputChange}
                placeholder="Enter Variation theme"
                className="focus:outline-none border  rounded p-1 w-full  h-[40px]"
              />
            </div>
          </div>
          <div className="lg:flex justify-start items-center px-2 lg:space-x-6 pb-2 pt-2 llg:pt-0 space-y-4 lg:space-y-0">
            <div className="text-sm md:text-base space-y-1">
              <h2>Shipping Charges :-</h2>
              <input
                type="text"
                name="shipping_charges"
                required
                value={productVariation.shipping_charges}
                placeholder="Enter Variation Shipping Charges"
                onChange={handleInputChange}
                className="focus:outline-none border  rounded p-1 w-full h-[40px]"
              />
            </div>
            <div className="text-sm md:text-base space-y-1">
              <h2>Delivery Details :-</h2>
              <input
                type="text"
                name="delivery_details"
                required
                value={productVariation.delivery_details}
                placeholder="Enter Variation Delivery Details"
                onChange={handleInputChange}
                className="focus:outline-none border  rounded p-1 w-full h-[40px]"
              />
            </div>
          </div>
          <div className="lg:flex justify-start items-center px-2 lg:space-x-6 pb-4 pt-2 lg:pt-0">
            <div className="text-md md:text-base space-y-1">
              <h2>Description :-</h2>
              <textarea
                name="description"
                value={productVariation.description}
                required
                onChange={handleInputChange}
                className="focus:outline-none border  w-full h-[60px]  rounded p-1"
                rows="2"
                cols="51"
                placeholder="Enter message here..."
              ></textarea>
            </div>
            <div className="text-sm md:text-base space-y-1 w-">
              <h2>About :-</h2>
              <textarea
                name="about"
                value={productVariation.about}
                onChange={handleInputChange}
                placeholder="Enter Varition About"
                required
                className="focus:outline-none border  rounded p-1 w-full "
                rows="2"
                cols="51"
              ></textarea>
            </div>
          </div>

          <div className="bg-[#e9e9e9] border-l-4 border-[#8c4cff] mb-3">
            <div className="flex text-[#000000] space-x-2 text-sm md:text-base font-semibold p-2 items-center">
              <h1>Requirements Details</h1>
              <MdEditDocument className="text-xl" />
            </div>
          </div>
          <div className="flex items-center justify-between w-full h-full">
            <div className=" lg:flex justify-start items-center px-2 lg:space-x-6 pb-2 w-full">
              <div className="text-sm md:text-base space-y-1 ">
                <h2>Requirements point-1 :-</h2>

                <textarea
                  type="text"
                  name={`requirements1`}
                  placeholder={`Requirements (Point 1)`}
                  value={productVariation.requirements1}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full"
                  required
                  rows="2"
                  cols="51"
                />
              </div>
              <div className="text-sm md:text-base space-y-1">
                <h2>Requirements Point-2 :-</h2>

                <textarea
                  type="text"
                  name={`requirements2`}
                  placeholder={`Requirements (Point 2)`}
                  value={productVariation.requirements2}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full"
                  required
                  rows="2"
                  cols="51"
                />
              </div>
              <div className="text-sm md:text-base space-y-1">
                <h2>Requirements Point-3 :-</h2>

                <textarea
                  type="text"
                  name={`requirements3`}
                  placeholder={`Requirements (Point 3)`}
                  value={productVariation.requirements3}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full"
                  required
                  rows="2"
                  cols="51"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-start space-x-4 items-center px-2 text-md md:text-base pb-5">
            <button
              onClick={handleReset}
              className="lg:px-4 px-4 py-2 lg:py-1 rounded md:hover:scale-105 transition-all duration-300   border"
            >
              Reset
            </button>
            <button
              type="submit"
              className="lg:px-4 px-4 py-2 lg:py-1 rounded  border bg-[#8c4cff] md:hover:scale-105 transition-all duration-300 text-white"
            >
              Add Product Variation
            </button>
          </div>
          {showErrorPopup && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  Please fill all required fields.
                </span>
              </div>
            </div>
          )}
          {loading && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-8 rounded flex flex-col items-center justify-center max-w-md w-full">
                <div>
                  <lord-icon
                    id="success-icon"
                    src="https://cdn.lordicon.com/mwikjdwh.json"
                    trigger="loop" // Set to loop to repeat the animation
                    style={{ width: "80px", height: "80px" }}
                    colors="primary:#8C4CFF"
                  ></lord-icon>
                </div>
                <p className="text-center md:text-base text-sm text-gray-600 mt-2">
                  Adding Product Variation Please wait for Sometimes....
                </p>
                <div className="  mt-3 w-full"></div>
              </div>
            </div>
          )}

          {/* Success Popup */}
          {showSubmitPopup && (
            <div className="fixed top-0 p-6 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-8 flex flex-col items-center justify-center rounded max-w-md w-full">
                <h2 className="text-center md:text-base text-sm font-semibold text-gray-700">
                  Your Product Variations was Added successfully!
                </h2>
                <div>
                  <lord-icon
                    id="success-icon"
                    src="https://cdn.lordicon.com/oqdmuxru.json"
                    trigger="in" // Set to loop to repeat the animation
                    style={{ width: "80px", height: "80px" }}
                    colors="primary:#16c72e"
                  ></lord-icon>
                </div>
                <p className="text-center md:text-base text-xs text-gray-600 mt-2">
                  Explore Home Page for More Products
                </p>
                <div className="mt-3 w-full">
                  <button
                    onClick={() => setShowSubmitPopup(false)}
                    className="bg-red-500 md:hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded w-full"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loading Popup */}
        </form>
      </div>
    </div>
  );
}

export default ProductVariation;
