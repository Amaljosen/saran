import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../Context";
import { IoMdContacts } from "react-icons/io";
import { MdAddToPhotos } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { GrSecure } from "react-icons/gr";

function SessionForm() {
  const navigate = useNavigate();
  const { sessionDetails } = useProductContext();
  const { setLink } = useProductContext();
  const [loading, setLoading] = useState(false); // for loading state
  const [showPopup, setShowPopup] = useState(false);
  const [backPopup, setBackPopup] = useState(false);
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleContinue = () => {
    if (files.length > 0) {
      nextStep();
      scrollUp();
    } else {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Individual states for each session data field
  const [sessionName, setSessionName] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [platform, setPlatform] = useState("");
  const [kit, setKit] = useState("");
  const [description, setDescription] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [sessionMode, setSessionMode] = useState("");
  const [totalPrice, setTotalPrice] = useState(null);

  // Customer details states
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [req1, setReq1] = useState("");
  const [req2, setReq2] = useState("");
  const [req3, setReq3] = useState("");

  // Files state
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const isEmpty =
      !sessionDetails || // Check if sessionDetails is null or undefined
      (Array.isArray(sessionDetails) &&
        sessionDetails.every((item) => item === null)) || // Check if it's an array of nulls
      (typeof sessionDetails === "object" &&
        Object.keys(sessionDetails).length === 0); // Check if it's an empty object

    if (isEmpty) {
      navigate("/sessions");
      console.log(sessionDetails);
    } else {
      // Set individual states from sessionDetails
      console.log(sessionDetails);
      setSessionName(sessionDetails.sessionName);
      setPrice(parseFloat(sessionDetails.price));
      setDate(sessionDetails.date);
      setTime(sessionDetails.time);
      setPlatform(sessionDetails.platform);
      setKit(sessionDetails.kit);
      setDescription(sessionDetails.description);
      setSessionId(sessionDetails.sessionId);
      setSessionMode(sessionDetails.sessionMode);
      // setReq1(sessionDetails.req1 || "");
      // setReq2(sessionDetails.req2 || "");
      // setReq3(sessionDetails.req3 || "");

      // Set total price (in this case, just the session price)
      setTotalPrice(parseFloat(sessionDetails.price).toString());
    }
  }, [sessionDetails, navigate]);

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files)
      .filter((file) => file.type.startsWith("image/")) // Only allow images
      .slice(0, 14); // Limit to 14 files

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDelete = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // // Navigation between steps
  // const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  // const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Navigation between steps
  const nextStep = () => {
    setCurrentStep((prev) => {
      if (kit === "Not Provided" && prev === 1) {
        return 3; // Skip step 2 and go directly to step 3
      }
      return Math.min(prev + 1, 3); // Normal step increment
    });
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const steps = 3;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const sessionData = {
    //   sessionName,
    //   price,
    //   date,
    //   time,
    //   platform,
    //   kit,
    //   name,
    //   email,
    //   phoneNumber,
    //   address1,
    //   address2,
    //   landmark,
    //   city,
    //   state,
    //   pincode,
    //   sessionId,
    //   sessionMode,
    //   files, // Ensure 'files' is properly initialized before accessing it
    // };

    const formData = new FormData();

    formData.append("sessionName", sessionName);
    formData.append("price", price);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("platform", platform);
    formData.append("kit_info", kit);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address1", address1);
    formData.append("address2", address2);
    formData.append("landmark", landmark);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pincode", pincode);
    formData.append("session_id", sessionId);
    formData.append("session_mode", sessionMode);

    Array.from(files).forEach((file) => {
      console.log(file); // Log each file to verify it's a valid File object
      formData.append("photos", file);
    });
    console.log([...formData]); // Logs all key-value pairs in formData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/v1/session-payment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response", response, "Response Data", response.data.order);

      if (response.status === 200) {
        const order = response.data.order;
        const options = {
          key: "rzp_test_qUePsQvwKUdYCu",
          amount: order.amount,
          currency: "INR",
          name: "Webzspot Technologies",
          description: "Product Order",
          image: "/logo.png",
          order_id: order.id,
          handler: async function (response) {
            // navigate('/success-page')
            console.log("Payment Successful", response);
            console.log("razorpay_order_id", response.razorpay_order_id);
            console.log("razorpay_payment_id", response.razorpay_payment_id);
            console.log("razorpay_signature", response.razorpay_signature);

            const paymentId = await axios.post(
              `${import.meta.env.VITE_BACKEND_API}/v1/link`,
              {
                payment_id: response.razorpay_payment_id,
              }
            );
            setLink(paymentId.data.groupLink);
            setLoading(false);
            navigate("/success-page");
          },
          prefill: {
            name: name,
            email: email,
            contact: phoneNumber,
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (error) {
      console.error("Error creating order:", error);
      // alert("Error creating order. Please try again.");
      setLoading(false);
      navigate("/failure-page");
    }
  };

  return (
    <div>
      <div className="container mx-auto mt-32">
        <div className="w-full lg:w-[90%] mx-auto p-4">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-lg lg:text-2xl">Session Booking</h1>
            <p className="text-md lg:text-lg text-center">
              Complete your session booking process
            </p>
          </div>

          {/* Stepper */}
          <div className="py-4 md:py-6 lg:py-8">
            <div className="relative w-[90%] sm:w-[80%] lg:w-[50%] mx-auto">
              {/* Step Icons */}
              <div className="flex justify-between items-center gap-2 sm:gap-4 lg:gap-5 pb-4 md:pb-6 lg:pb-8">
                {[IoMdContacts, MdAddToPhotos, BsBoxSeam].map((Icon, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center w-1/3"
                  >
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex justify-center items-center rounded-md ${
                        currentStep > index
                          ? "bg-[#8c4cff] text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      <Icon className="text-sm sm:text-base lg:text-xl" />
                    </div>
                    <h1 className="hidden sm:block text-xs sm:text-sm lg:text-base font-semibold text-center">
                      {
                        [
                          "Customer Details",
                          "Asset Submission",
                          "Session Review",
                        ][index]
                      }
                    </h1>
                  </div>
                ))}
              </div>

              {/* Background line */}
              <div className="absolute top-[100%] -translate-y-1/2 left-0 w-full h-1 bg-gray-300 rounded-full"></div>

              {/* Progress line */}
              <div
                className="absolute top-[100%] -translate-y-1/2 left-0 h-1 bg-[#8c4cff] rounded-full"
                style={{ width: `${(currentStep - 1) * (100 / (steps - 1))}%` }}
              ></div>

              {/* Dots with Tick */}
              <div className="flex justify-between absolute top-[100%] -translate-y-1/2 left-0 w-full">
                {Array.from({ length: steps }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${
                      index < currentStep
                        ? "border-[#8c4cff] bg-[#8c4cff] text-white"
                        : "border-[#8c4cff] bg-white"
                    }`}
                  >
                    {index < currentStep && (
                      <span className="text-xs sm:text-sm font-bold">✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            {/* Step 1: Customer Details */}
            {currentStep === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  nextStep();
                  scrollUp();
                }}
              >
                <div className="w-full lg:w-[80%] mx-auto border mt-8 p-4 text-black rounded-md relative">
                  <div className="flex flex-col justify-center items-center py-3 text-center">
                    <div className="h-16 w-16 rounded-full bg-white flex justify-center items-center absolute -top-9 border-t-2 border-x-gray-100">
                      <div className="h-12 w-12 rounded-full bg-[#8c4cff] text-white flex justify-center items-center">
                        <BiSolidMessageRoundedDetail className="text-2xl" />
                      </div>
                    </div>
                    <h1 className="font-semibold text-xl">Customer Details</h1>
                    <p className="text-lg">
                      Provide your details to complete session booking
                    </p>
                  </div>
                  <div
                    className={`${
                      kit === "Not Provided"
                        ? "md:grid-cols-1 md:w-[70%] mx-auto"
                        : "md:grid-cols-2 lg:gap-10"
                    } grid text-md lg:text-lg py-4 gap-3 `}
                  >
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Your Name"
                        className={`outline-none w-full p-2 rounded-md border`}
                      />
                      <input
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email"
                        className={`outline-none w-full p-2 rounded-md border`}
                      />
                      <input
                        type="text"
                        value={phoneNumber}
                        required
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Mobile Number"
                        className={`outline-none w-full p-2 rounded-md border`}
                      />
                      <input
                        type="text"
                        value={alternatePhoneNumber}
                        required
                        onChange={(e) =>
                          setAlternatePhoneNumber(e.target.value)
                        }
                        placeholder="Alternate Mobile Number"
                        className={`outline-none w-full p-2 rounded-md border`}
                      />
                      <input
                        type="text"
                        value={address1}
                        required={kit !== "Not Provided"}
                        onChange={(e) => setAddress1(e.target.value)}
                        placeholder="Address Line 1"
                        className={`outline-none w-full p-2 rounded-md border ${
                          kit === "Not Provided" ? "hidden" : "block"
                        }`}
                      />
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={address2}
                        required={kit !== "Not Provided"}
                        onChange={(e) => setAddress2(e.target.value)}
                        placeholder="Address Line 2"
                        className={`outline-none w-full p-2 rounded-md border ${
                          kit === "Not Provided" ? "hidden" : "block"
                        }`}
                      />
                      <input
                        type="text"
                        value={landmark}
                        required={kit !== "Not Provided"}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Nearest Land Mark"
                        className={`outline-none w-full p-2 rounded-md border ${
                          kit === "Not Provided" ? "hidden" : "block"
                        }`}
                      />
                      <input
                        type="text"
                        value={city}
                        required={kit !== "Not Provided"}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className={`outline-none w-full p-2 rounded-md border ${
                          kit === "Not Provided" ? "hidden" : "block"
                        }`}
                      />
                      <input
                        type="text"
                        value={state}
                        required={kit !== "Not Provided"}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        className={`outline-none w-full p-2 rounded-md border ${
                          kit === "Not Provided" ? "hidden" : "block"
                        }`}
                      />
                      <input
                        type="text"
                        value={pincode}
                        required={kit !== "Not Provided"}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Pin code"
                        className={`outline-none w-full p-2 rounded-md border ${
                          kit === "Not Provided" ? "hidden" : "block"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      type="submit"
                      className="px-10 py-2 md:hover:scale-105 transition-transform will-change-transform duration-300 bg-black rounded-md text-gray-100"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Step 2: Asset Submission */}
            {currentStep === 2 && (
              <div>
                <div className="w-full lg:w-[80%] mx-auto border mt-8 pt-4 rounded-md relative px-7 lg:px-0">
                  <div className="flex flex-col justify-center items-center py-3 px-2 text-center">
                    <div className="h-16 w-16 rounded-full bg-white flex justify-center items-center absolute -top-9 border-t-2 border-x-gray-100">
                      <div className="h-12 w-12 rounded-full bg-[#8c4cff] text-white flex justify-center items-center">
                        <BiSolidMessageRoundedDetail className="text-2xl" />
                      </div>
                    </div>
                    <h1 className="font-semibold text-xl">Asset Submission</h1>
                    <p className="lg:text-lg text-center text-sm text-gray-500">
                      Submit your gift details on time to ensure smooth
                      processing of your order.
                    </p>
                  </div>

                  <div className="w-full lg:w-[80%] mx-auto">
                    <div className="border lg:p-5 p-4 rounded-md">
                      <h3 className="text-black font-medium text-base md:text-lg">
                        Kit Requirement Info
                      </h3>
                      <ul className="space-y-2 mt-2 text-gray-500 text-sm md:text-base">
                        <li>
                          1. Full Length Image {`(To be used as main picture)`}
                        </li>
                        <li>
                          2. Only allow specific formats like JPEG, PNG, or WebP
                          for uploading.
                        </li>
                        <li>
                          3. The image size should not exceed a specific limit
                          (e.g., 5 MB).
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center space-y-4 mt-6">
                    <div className="text-center">
                      <h1 className="text-lg lg:text-xl font-medium">
                        Upload Document
                      </h1>
                      <p className="text-base text-gray-500">
                        Upload your document for validation and reference
                      </p>
                    </div>

                    <div className=" lg:w-[80%] w-full ">
                      <div className="border border-gray-300 border-dashed rounded-md flex flex-col justify-center items-center space-y-4 p-4 lg:p-8">
                        <div className="bg-[#FCFAFF] border border-gray-300 rounded-md px-10 lg:px-20 py-4">
                          <label
                            htmlFor="fileInput"
                            className="text-gray-800 cursor-pointer text-lg flex flex-col items-center"
                          >
                            <RiImageAddFill className="text-3xl lg:text-6xl" />
                          </label>
                          <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            onChange={handleFileChange}
                            multiple
                          />
                        </div>

                        <div className="text-center">
                          <h1 className="text-gray-600 font-medium">
                            Drag and Drop Here
                          </h1>
                          <p className="text-gray-500">Or</p>
                        </div>

                        <div className="flex flex-col space-y-4 justify-center items-center">
                          <label
                            htmlFor="fileInput"
                            className="bg-[#FCFAFF] border border-gray-300 text-gray-800 px-6 py-2 rounded-md cursor-pointer text-lg text-center"
                          >
                            Browse File
                          </label>
                          <input
                            name="photos"
                            type="file"
                            id="fileInput"
                            className="hidden"
                            onChange={handleFileChange}
                            multiple
                          />
                          <div className="text-center">
                            <p className="text-gray-600 text-sm">
                              Accepted File Types: <strong>.jpg</strong> and{" "}
                              <strong>.jpeg</strong> only
                            </p>
                            <p className="text-red-600 text-sm mt-1">
                              Upload Min 1 photo & Max 10 photos
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-center items-center space-x-2">
                          <GrSecure className="text-2xl text-gray-500" />
                          <h1 className="text-gray-600 text-sm font-medium">
                            Secure
                          </h1>
                        </div>

                        {/* File Display Box */}
                        {files.length > 0 && (
                          <div className="w-full border border-gray-300 rounded-lg p-4 mt-4">
                            <h3 className="text-lg font-semibold mb-2">
                              Uploaded Files:
                            </h3>
                            {files.map((file, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2"
                              >
                                <div>
                                  <p className="text-gray-700 text-sm lg:text-base">
                                    {file.name}
                                  </p>
                                  <p className="text-gray-500 text-xs lg:text-sm">
                                    {file.size} KB
                                  </p>
                                </div>
                                <button
                                  onClick={() => handleDelete(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <AiOutlineDelete className="text-lg lg:text-xl" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-4 p-4">
                    <button
                      onClick={prevStep}
                      className="px-6 py-2 bg-[#8c4cff]  rounded-md text-white"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleContinue}
                      className="px-6 py-2 bg-[#8c4cff] rounded-md text-white"
                    >
                      Continue
                    </button>

                    {showPopup && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20] text-sm">
                        <div className="bg-white p-6 md:w-1/3 w-4/5 sm:w-1/2 rounded-lg shadow-lg">
                          <h3 className="font-medium text-center text-gray-800">
                            Please upload a Photo.
                          </h3>
                          <div className="flex justify-center mt-6 space-x-4">
                            <button
                              className="bg-gray-300 text-black p-2 rounded-lg w-24 hover:bg-gray-400 transition duration-200"
                              onClick={closePopup} // Close popup
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-red-500 text-white p-2 rounded-lg w-24 hover:bg-red-600 transition duration-200"
                              onClick={closePopup} // Close popup
                            >
                              Ok
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Booking Review */}
            {currentStep === 3 && (
              <div className="w-full lg:w-[80%] mx-auto border mt-8 p-4 rounded-md relative">
                <div className="flex flex-col justify-center items-center py-3 text-center">
                  <div className="h-16 w-16 rounded-full bg-white flex justify-center items-center absolute -top-9 border-t-2 border-x-gray-100">
                    <div className="h-12 w-12 rounded-full bg-[#8c4cff] text-white flex justify-center items-center">
                      <BsBoxSeam className="text-2xl" />
                    </div>
                  </div>
                  <h1 className="font-semibold text-xl">
                    Session Booking Review
                  </h1>
                  <p className="text-sm md:text-base text-gray-500">
                    Review Your Session Details Before Confirmation
                  </p>
                </div>
                <div>
                  <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-5 py-1 lg:py-4 lg:gap-5">
                    <div className="lg:border text-black flex flex-col justify-between rounded-md p-3 md:p-5 space-y-2 border-[#E8EAED]">
                      <div className="space-y-1">
                      <h1 className="font-bold text-xl">
                        {sessionName}
                      </h1>
                      <p className="text-gray-600 text-sm">{description}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">
                          Date:{" "}
                          <span className="text-gray-600 text-sm font-normal">
                            {date}
                          </span>
                        </p>
                        <p className="font-medium">
                          Time:{" "}
                          <span className="text-gray-600 text-sm font-normal">
                            {time}
                          </span>
                        </p>
                        <p className="font-medium">
                        Platform:{" "}
                          <span className="text-gray-600 text-sm font-normal">
                          {platform}
                          </span>
                        </p>
                        <p className="font-medium">
                          Kit:{" "}
                          <span className="text-gray-600 text-sm font-normal">
                            {kit}
                          </span>
                        </p>
                      
                      <h1 className="font-bold text-3xl  text-[#4c4c4c]">
                        Rs:{totalPrice} /-
                      </h1>
                      </div>
                      <div className="lg:flex space-x-2 justify-between hidden">
                        <button
                          className="w-1/2 py-2 border text-primary border-primary bg-secondary rounded-md hover:bg-primary hover:text-gray-100 transition duration-300"
                          onClick={() =>
                            kit === "Not Provided"
                              ? setCurrentStep(1)
                              : setCurrentStep(2)
                          }
                        >
                          Go Back
                        </button>
                        <button
                          className="w-1/2 py-2 border border-black rounded-md hover:bg-black hover:text-gray-100 transition duration-300"
                          onClick={() => setBackPopup(true)}
                        >
                          Discard
                        </button>
                      </div>
                    </div>
                    <div className="lg:border border-[#E8EAED] flex flex-col justify-between rounded-md p-3 md:p-5 space-y-5">
                      <h1 className="font-bold text-xl text-[#4c4c4c]">
                        Booking Details
                      </h1>
                      <div className="bg-[#FFF7E6] text-xs p-3 rounded-md space-y-2">
                        <h2 className="font-bold text-[#D97706]">
                          Important Notes:
                        </h2>
                        <p className="text-[#4c4c4c]">
                          - Please review your booking details before proceeding
                          to payment.
                        </p>
                        <p className="text-[#4c4c4c]">
                          - Taxes are included in the total amount.
                        </p>
                        <p className="text-[#4c4c4c]">
                        - In case of any issues, please contact our support team.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-[#666666]">
                          <h1>Session Price</h1>
                          <p>Rs:{price} /-</p>
                        </div>
                        <hr />
                        <div className="flex justify-between font-bold text-[#4c4c4c]">
                          <h1>Total Amount</h1>
                          <p>Rs:{totalPrice} /-</p>
                        </div>
                      </div>

                      

                      <button
                        onClick={handleSubmit}
                        className="bg-black md:hover:scale-105 text-white rounded-md w-full py-2 transition-transform will-change-transform duration-300"
                      >
                        Proceed to Pay
                      </button>

                      {loading && (
                        <div className="fixed inset-0 p-6 bg-gray-800 bg-opacity-50 flex justify-center items-center w-full z-[20]">
                          <div className="bg-white p-8 flex flex-col items-center justify-center rounded-xl max-w-md w-full">
                            {/* <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 border-t-4 border-blue-600 rounded-full" role="status"></div> */}
                            <lord-icon
                              id="success-icon"
                              src="https://cdn.lordicon.com/mwikjdwh.json"
                              trigger="loop" // Set to loop to repeat the animation
                              style={{ width: "80px", height: "80px" }}
                              colors="primary:#8C4CFF"
                            ></lord-icon>
                            <p className="ml-3 mt-3 md:text-base text-sm">
                              Processing Please Wait...
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {backPopup && (
              <div className="fixed inset-0 flex items-center bg-gray-500 bg-opacity-50  justify-center z-50">
                <div className="bg-white rounded-lg mx-5 shadow-lg p-4 w-full max-w-md">
                  <p className="text-gray-700 text-center">
                    Are you sure you want to Discard ?
                  </p>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => setBackPopup(false)}
                      className="px-4 py-2 mr-2 text-sm bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        navigate("/sessions"), setBackPopup(false);
                      }}
                      className="px-4 py-2 text-sm bg-red-500 rounded text-white hover:bg-red-600"
                    >
                      {" "}
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionForm;
