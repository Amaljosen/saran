import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEditDocument } from "react-icons/md";

function AddProduct() {

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [file, setFile] = useState(null);
    const [showSubmitPopup, setShowSubmitPopup] = useState(false);
    const [poptext, setpoptext] = useState('loading');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [productName, setProductName] = useState('');
    const maxLength = 10;
    const [productVariation, setProductVariation] = useState({
        productVariation_price: '',
        size: '',
        shipping_charges: '120',
        delivery_details: '7 to 10 days',
        requirements1: '',
        requirements2: '',
        requirements3: '',
        theme: 'Customize',
        description: '',
        about: ''
    });


    const handleFileChange = (e) => setFile(e.target.files[0]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductVariation({ ...productVariation, [name]: value });
    };


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/v1/category`);
                setCategories(response.data.data); // Assuming the response data is in response.data.data

            } catch (error) {
                // console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const fetchSubcategories = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/v1/subcategory/${selectedCategory}`);
                    setSubcategories(response.data.data); // Assuming the response data is in response.data.data
                } catch (error) {
                    // console.error('Error fetching subcategories:', error);
                }
            };

            fetchSubcategories();
        }
    }, [selectedCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        //    console.log(productVariation.requirements1,productVariation.requirements2,productVariation.requirements3)
        if (!productName || !selectedSubcategory) {
            setShowErrorPopup(true);
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/v1/product`, {
                product_name: productName,
                subcategory_id: selectedSubcategory
            });

            // console.log('Product created successfully:', response.data.data.product_id);
            const productId = response.data.data.product_id
            // console.log(productId)

            if (!file || !productId || !selectedSubcategory || !productVariation.productVariation_price || !productVariation.size || !productVariation.theme
                || !productVariation.shipping_charges || !productVariation.delivery_details || !productVariation.about || !productVariation.description || !productVariation.requirements1 || !productVariation.requirements2 || !productVariation.requirements3) {
                setShowErrorPopup(true);
                setTimeout(() => {
                    setShowErrorPopup(false);
                }, 4000)
                return;
            }

            setShowSubmitPopup(true);
            setpoptext("loading")

            const formData = new FormData();
            formData.append("productVariation_image", file);
            formData.append("product_id", productId);
            formData.append("productVariation_price", productVariation.productVariation_price);
            formData.append("size", productVariation.size);
            formData.append("shipping_charges", productVariation.shipping_charges);
            formData.append("delivery_details", productVariation.delivery_details);
            formData.append("requirements1", productVariation.requirements1)
            formData.append("requirements2", productVariation.requirements2)
            formData.append("requirements3", productVariation.requirements3)
            formData.append("description", productVariation.description);
            formData.append("theme", productVariation.theme);
            formData.append("about", productVariation.about);

            // console.log(formData)
            // console.log('Data to submit:', dataToSubmit);
            // console.log('Data:', JSON.parse(productVariation.requirements));


            await axios.post(
                `${import.meta.env.VITE_BACKEND_API}/v1/product-variations`,
                formData
            );

            // Show the success popup
            setpoptext("success")
            setShowSubmitPopup(true);

            // Hide the popup after 2 seconds
            setTimeout(() => {
                setShowSubmitPopup(false);
            }, 5000);

            setSelectedCategory("")
            setSelectedSubcategory("")
            setProductName("")
            setSelectedCategory('');
            setSelectedSubcategory('');
            setProductVariation({
                productVariation_image: null,
                productVariation_price: '',
                size: '',
                shipping_charges: '',
                delivery_details: '',
                requirements1: '',
                requirements2: '',
                requirements3: '',
                theme: '',
                description: '',
                about: ''
            })
            // console.log(responsedata.data);
        } catch (error) {
            // console.error('Error adding product variation:', error.response?.data || error.message);
            alert('Unsupported data detected. Please provide valid data!');
            setTimeout(() => {
                setShowSubmitPopup(false)
            }, 1000);
        }
    };

    const handleReset = () => {
        setSelectedCategory("")
        setSelectedSubcategory("")
        setProductName("")
        setSelectedCategory('');
        setSelectedSubcategory('');
        setProductVariation({

            productVariation_price: '',
            size: '',
            shipping_charges: '',
            delivery_details: '',
            requirements1 : ' ',
            requirements2 : ' ',
            requirements3 : ' ',
            theme: '',
            description: '',
            about: ''
        })
    }
   
    return (
        <div>
            <div>
                <form className='container mx-auto text-black' onSubmit={handleSubmit}>
                    <div className='py-5 '>
                        <div className='bg-[#e9e9e9] w-full border-l-4 border-[#8c4cff] mb-3'>
                            <div className='flex space-x-2 text-sm md:text-base text-[#000000] font-semibold p-2 items-center'>
                                <h1>Product Details:-</h1>
                                <MdEditDocument className='text-xl' />
                            </div>
                        </div>
                        <div className="lg:flex justify-start items-center px-2 lg:space-x-6 pb-6 lg:space-y-0 space-y-4">
                            {/* Category Dropdown */}
                            <div className="text-sm md:text-base space-y-1">
                                <h2>Category:-</h2>
                                <select
                                    className="focus:outline-none border text-sm md:text-base rounded p-2 w-full lg:w-[300px] h-[40px]"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    required
                                >
                                    <option value="" className='md:text-base text-sm'>Select a Category</option>
                                    {categories.map((category) => (
                                        <option key={category.category_id} value={category.category_id} className=' text-base'>
                                            {category.category_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Subcategory Dropdown */}
                            <div className="text-sm md:text-base space-y-1 ">
                                <h2>Subcategory:-</h2>
                                <select
                                    className="focus:outline-none border text-sm md:text-base rounded p-2 w-full  lg:w-[300px] h-[40px]"
                                    value={selectedSubcategory}
                                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                                    required
                                >
                                    <option className='md:text-base text-sm'>Select a Subcategory</option>
                                    {subcategories.map((subcategory) => (
                                        <option className='' key={subcategory.subcategory_id} value={subcategory.subcategory_id}>
                                            {subcategory.subcategory_name}

                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Product Name Dropdown */}
                            <div className="text-sm md:text-base space-y-1">
                                <h2>Product Name:-</h2>
                                <input
                                    type="text"
                                    className="focus:outline-none border  rounded p-2 w-full lg:w-[300px] h-[40px]"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder={

                                        'Enter product name'
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className='bg-[#e9e9e9] w-full border-l-4 border-[#8c4cff] mb-3'>
                            <div className='flex space-x-2 text-[#000000] text-sm md:text-base font-semibold p-2 items-center'>
                                <h1>Product Variation Details</h1>
                                <MdEditDocument className='text-xl' />
                            </div>
                        </div>

                        <div className='lg:flex justify-start items-center px-2 lg:space-x-6 pb-2 lg:space-y-0 space-y-4'>
                            <div className='text-sm md:text-base space-y-1'>
                                <h2>Product Image :-</h2>
                                <input name='productVariation_image' onChange={handleFileChange} required type="file" className='focus:outline-none border  rounded p-2 w-full  ' />
                            </div>
                            <div className='text-sm md:text-base space-y-1'>
                                <h2>Product Price :-</h2>
                                <input type="text" name='productVariation_price' value={productVariation.productVariation_price} required onChange={handleInputChange} placeholder='Enter the Product Prize' className='focus:outline-none border rounded p-2 w-full h-[40px]' />
                            </div>
                            <div className='text-sm md:text-base space-y-1'>
                                <h2>Size :-</h2>
                                <input type="text" name='size' value={productVariation.size} onChange={handleInputChange} placeholder='Enter Product Size' required className='focus:outline-none border rounded p-2 w-full h-[40px]' />
                            </div>
                            <div className='text-sm md:text-base space-y-1'>
                                <h2>Theme :-</h2>
                                <input type="text" name='theme' value={productVariation.theme} onChange={handleInputChange} placeholder='Enter Theme' required className='focus:outline-none border  rounded p-2 w-full h-[40px]' />
                            </div>

                        </div>
                        <div className='lg:flex justify-start items-center px-2 lg:space-x-6 pb-2 lg:space-y-0  space-y-4 lg:pt-0 pt-2'>
                            <div className='text-sm md:text-base space-y-1'>
                                <h2>Shipping Charges :-</h2>
                                <input type="text" name='shipping_charges' value={productVariation.shipping_charges} placeholder='Enter Shipping Charges' required onChange={handleInputChange} className='focus:outline-none border  rounded p-2 w-full h-[40px]' />
                            </div>
                            <div className='text-sm md:text-base space-y-1'>
                                <h2>Delivery Details :-</h2>
                                <input type="text" name='delivery_details' value={productVariation.delivery_details} required onChange={handleInputChange} placeholder='Enter Delivery Details' className='focus:outline-none border  rounded p-2 w-full h-[40px]' />
                            </div>

                        </div>
                        <div className='lg:flex justify-start items-center px-2 lg:space-x-6 pb-4 lg:pt-0 pt-2 '>

                            <div className='text-sm md:text-base space-y-1'>
                                <h2>Description :-</h2>
                                <textarea name='description'
                                    value={productVariation.description} onChange={handleInputChange} required className='focus:outline-none border  w-full h-[60px]  rounded p-2' rows='2' cols='51' placeholder="Enter message here..."></textarea>
                            </div>
                            <div className='text-sm md:text-base space-y-1 '>
                                <h2>About :-</h2>
                                <textarea
                                    name='about' value={productVariation.about} onChange={handleInputChange} placeholder='Enter About Product' required className='focus:outline-none border rounded p-2 w-full ' rows='2' cols='51'   ></textarea>
                            </div>
                        </div>

                        <div className='bg-[#e9e9e9] border-l-4 border-[#8c4cff] mb-3 '>
                            <div className='flex text-[#000000] space-x-2 text-sm md:text-base font-semibold p-2 items-center'>
                                <h1>Requirements Details</h1>
                                <MdEditDocument className='text-xl' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between w-full h-full'>
                            <div className=' lg:flex justify-start items-center px-2 lg:space-x-6 pb-2 w-full'>
                                <div className='text-sm md:text-base space-y-1 '>
                                    <h2>Requirements point-1 :-</h2>
                                    
                                        <textarea
                                            
                                            type="text"
                                            name={`requirements1`}
                                            placeholder={`Requirements (Point 1)`}
                                            value={productVariation.requirements1}
                                            onChange={handleInputChange}
                                            className="p-2 border rounded w-full"
                                            required
                                            rows='2' cols='51' 
                                        />
                                    
                                </div>
                                <div className='text-sm md:text-base space-y-1'>
                                    <h2>Requirements Point-2 :-</h2>
                                    
                                        <textarea
                                            
                                            type="text"
                                            name={`requirements2`}
                                            placeholder={`Requirements (Point 2)`}
                                            value={productVariation.requirements2}
                                            onChange={handleInputChange}
                                            className="p-2 border rounded w-full"
                                            required
                                            rows='2' cols='51' 
                                        />
                                    
                                </div>
                                <div className='text-sm md:text-base space-y-1'>
                                    <h2>Requirements Point-3 :-</h2>
                                    
                                        <textarea
                                           
                                            type="text"
                                            name={`requirements3`}
                                            placeholder={`Requirements (Point 3)`}
                                            value={productVariation.requirements3}
                                            onChange={handleInputChange}
                                            className="p-2 border rounded w-full"
                                            required
                                            rows='2' cols='51' 
                                        />
                                    
                                </div>
                            </div>


                        </div>



                        <div className='flex justify-center lg:justify-start space-x-4 items-center px-2 text-sm md:text-base pb-5 lg:pb-0 '>
                            <button onClick={handleReset} className='lg:px-4 px-4 py-2 md:hover:scale-105 transition-all duration-300 text-sm rounded  border'>Reset</button>
                            <button type='submit' className='lg:px-4 px-4 py-2 text-sm rounded border bg-gradient-to-r from-primary to-text md:hover:scale-105 transition-all duration-300 text-white'>Add Product</button>
                        </div>

                        {showErrorPopup && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                                <div className="bg-white p-6 rounded shadow-xl w-11/12 max-w-md text-center transform transition-all hover:scale-105">
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="text-6xl text-yellow-500 animate-bounce md:mt-4 mt-2">😔</div>
                                        <h2 className="text-gray-800 font-bold text-base">Oops!</h2>
                                        <p className="text-gray-600 lg:text- text-sm">
                                            Please make sure to fill out all required fields before proceeding.
                                        </p>
                                        <button
                                            onClick={() => setShowErrorPopup(false)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md focus:ring-4 focus:ring-red-300"
                                        >
                                            Go Back
                                        </button>
                                    </div>
                                </div>
                            </div>

                        )}
                        {showSubmitPopup && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                                <div className="bg-white p-6  rounded shadow-2xl flex flex-col items-center space-y-6 w-11/12 max-w-md ">
                                    {poptext === "loading" ? (
                                        <div className="flex flex-col items-center space-y-2 text-center">
                                            {/* <div className="flex items-center justify-center py-5 space-x-2 animate-spin">
                                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                      </div> */}
                                            <div>
                                                <lord-icon
                                                    id="success-icon"
                                                    src="https://cdn.lordicon.com/mfmkufkr.json"
                                                    trigger="loop"  // Set to loop to repeat the animation
                                                    style={{ width: "80px", height: "80px", }}
                                                    colors="primary:#8C4CFF"

                                                ></lord-icon>
                                            </div>
                                            <p className="text-gray-700 font-semibold text-base sm:text-base">Loading, please wait...</p>
                                            <p className="text-gray-500 text-sm">
                                                This may take a few moments. Please wait patiently!
                                            </p>
                                        </div>
                                    ) : poptext === "success" ? (
                                        <div className=" p-6 fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                                            <div className="bg-white p-8 rounded flex flex-col items-center justify-center max-w-md w-full">

                                                <h2 className="text-center text-sm md:text-base mb-3 font-semibold text-gray-700 ">
                                                    Product Added Successfully 🎉
                                                </h2>
                                                <div>
                                                    <lord-icon
                                                        id="success-icon"
                                                        src="https://cdn.lordicon.com/oqdmuxru.json"
                                                        trigger="in"  // Set to loop to repeat the animation

                                                        style={{ width: "80px", height: "80px", }}
                                                        colors="primary:#16c72e"

                                                    ></lord-icon>
                                                </div>

                                                <p className="text-center md:text-base text-xs text-gray-600 mt-2">
                                                    Explore Products Page for More products
                                                </p>
                                                <div className="  mt-3 w-full">
                                                    <button
                                                        onClick={() => setShowSubmitPopup(false)}
                                                        className="bg-red-500 md:hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded w-full  "
                                                    >
                                                        Close
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </div>

                </form>
                
            </div>


        </div>
    )
}

export default AddProduct

