import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoCheckmarkSharp } from "react-icons/io5";

const Contact = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setaddress] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState("item1");

  const [loading, setLoading] = useState(false); // for loading state
  const [success, setSuccess] = useState(false); // for success state

  const contactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading popup
    const response = await axios.post(
      'https://saran-backend-vwsm.onrender.com/v1/contact',
      {firstname, lastname, email, phone,address, message, selected}
    );

    setSuccess(false); // Hide success popup
    console.log("Form submitted successfully");
    console.log(firstname, lastname, email, phone, message, selected);
    
    setLoading(false); // Hide loading popup
    setSuccess(true);
    // Simulate form submission delay
    setTimeout(() => {
       // Show success popup
  setSuccess(false)
      // Clear the input fields
      

      // Hide success popup after a few seconds
      // setTimeout(() => setSuccess(false), 3000);
    }, 2000); // Simulating a 2-second delay
    setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setaddress("");
      setMessage("");
      setSelected("item1");
    
  };

  return (
    <div className="container mx-auto mt-28 md:mt-40 text-black">
      <div className="grid grid-cols-1 lg:grid-cols-2   gap-4 w-[90%] mx-auto py-2">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col  gap-3 mx-auto h-full"
        >
          <div className="lg:h-[650px] w-full">
            <img
              src="https://ik.imagekit.io/cjureug40/Home/8.Bulk%20Order%20Section/img2.jpg?updatedAt=1732086297473"
              className="w-full h-full object-cover rounded-2xl"
              alt="Contact Us"
            />
          </div>
          <div className="border bg-[#EFE5FF] rounded-lg border-primary py-2">
            <div className="flex flex-wrap items-center justify-around gap-2 p-2 w-full">
              <div className="flex items-center bg-white rounded-lg gap-2 border p-2">
                <h1>
                  {" "}
                  <FaPhoneSquareAlt className="text-2xl" />
                </h1>
                <a href="tel:+91 9874563215 " className="lg:text-base text-xs">
                  +91 9874563215
                </a>
              </div>
              <div className="flex items-center border bg-white rounded-lg gap-2 p-2">
                <h1>
                  <IoLogoWhatsapp className="text-2xl" />
                </h1>
                <a
                  className="lg:text-base text-xs"
                  onClick={() => {
                    const phoneNumber = "9894010363"; // Replace with your phone number
                    const message = `Hii i'm Intrested in your Service  Can i Know More info About You `; // Custom message
                    const whatsappLink = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(
                      message
                    )}`;
                    window.open(whatsappLink, "_blank"); // Opens in a new tab
                  }}
                >
                  +91 9874563215
                </a>
              </div>
              <div className="flex items-center rounded-lg bg-white gap-2 border p-2">
                <h1>
                  <RiInstagramFill className="text-2xl" />
                </h1>
                <a
                  href="https://www.instagram.com/saran_castle/profilecard/?igsh=amtsMzFxNWs3ZDV0"
                  className=" lg:text-base text-xs"
                  target="_blank"
                >
                  @ saran_castle
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:justify-start justify-center w-full md:gap-10 gap-5"
        >
          <div className="flex flex-col gap-2">
            <h1 className="md:text-3xl text-xl text-left  font-bold">
              Reach Out for Bulk Orders or Queries
            </h1>
            <p className="text-gray-600 lg:text-base text-sm text-left ">
              Have questions or need assistance with bulk orders? We’re just a
              message away!
            </p>
          </div>

          <form
            className=" border border-[#E8EAED] rounded-lg lg:p-6 p-4 flex flex-col gap-3 "
            onSubmit={contactSubmit}
          >
            <h1 className="lg:text-lg text-md font-semibold">
              Fill your Details
            </h1>
            <div className="flex gap-7">
              <div className="p-2 w-full border-b-2 border-[#E8EAED]">
                <p className="md:text-base text-sm font-semibold mb-2">
                  First name
                </p>
                <input
                  type="text"
                  placeholder="Enter First name"
                  className="w-full focus:outline-none md:placeholder:text-base placeholder:text-xs"
                  required
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="p-2 w-full border-b-2 border-[#E8EAED]">
                <p className="md:text-base text-sm font-semibold mb-2">
                  Last name
                </p>
                <input
                  type="text"
                  placeholder="Enter Last name"
                  className="w-full focus:outline-none md:placeholder:text-base placeholder:text-xs"
                  required
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-7">
              <div className="p-2 w-full border-b-2 border-[#E8EAED]">
                <p className="md:text-base text-sm font-semibold mb-2">Email</p>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full focus:outline-none md:placeholder:text-base  placeholder:text-xs"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="p-2 w-full border-b-2 border-[#E8EAED]">
                <p className="lg:text-base text-sm font-semibold mb-2 ">
                  Phone
                </p>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number "
                  className="w-full focus:outline-none md:placeholder:text-base placeholder:text-xs"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="p-2 w-full border-b-2 border-[#E8EAED]">
                <p className="lg:text-base text-sm font-semibold mb-2">
                  Full Address
                </p>
                <input
                  type="text"
                  placeholder="Enter Address"
                  className="w-full focus:outline-none md:placeholder:text-base placeholder:text-xs"
                  required
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col w-full items-start p-2">
              <h2 className="text-gray-800 font-semibold text-sm md:text-base mb-2">
                Select your Requirements
              </h2>
              <div className="flex flex-wrap gap-4 w-full">
                {[
                  "Bulk Corporate Order",
                  "Miniature",
                  "Resin",
                  "Other Customized",
                  "Workshop",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center cursor-pointer  md:w-[calc(50%-1rem)] w-[calc(50%-1rem)] lg:pr-10"
                  >
                    <input
                      type="radio"
                      name="requirement"
                      value={item}
                      checked={selected === item}
                      onChange={() => setSelected(item)}
                      className="hidden"
                      required
                    />
                    <div
                      className={`md:h-5 md:w-5 h-4 w-4 flex items-center justify-center rounded-full border-2 ${
                        selected === item
                          ? "border-blue-400"
                          : "border-gray-300"
                      }`}
                    >
                      <div
                        className={`md:h-3 md:w-3 h-2.5 w-2.5 rounded-full ${
                          selected === item
                            ? "bg-blue-500 flex items-center justify-center"
                            : "bg-transparent"
                        }`}
                      >
                        {selected === item && (
                          <span className="text-white text-xs">
                            <IoCheckmarkSharp />
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`lg:ml-2 ml-1 ${
                        selected === item
                          ? "text-black placeholder:text-xs md:text-base text-xs"
                          : "text-gray-400 md:text-base text-xs"
                      }`}
                    >
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-2 border-b-2 border-[#E8EAED]">
              <p className="lg:text-base text-sm font-semibold mb-2">
                Messages
              </p>
              <textarea
                placeholder="Enter Message"
                className="w-full focus:outline-none md:placeholder:text-base placeholder:text-xs"
                rows={1}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="lg:py-3 py-2 bg-primary md:hover:scale-105 transition-transform will-change-transform duration-300 text-white font-semibold rounded-md hover:bg-black"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>

      {/* Loading Popup */}
      {loading && (
        <div className="fixed inset-0 p-6 bg-gray-800 bg-opacity-50 flex justify-center items-center w-full ">
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
              Submitting Details...
            </p>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {success && (
        <div className="p-6 fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl max-w-md w-full flex flex-col  justify-center items-center">
            <h2 className="text-center lg:text-xl text-base font-semibold text-gray-700">
              Your contact request was submitted successfully!
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
            <p className="text-center lg:text-base text-sm text-gray-600 mt-2">
              Our team will get in touch with you soon.
            </p>
            <div className="mt-3 w-full">
              <button
                onClick={() => setSuccess(false)}
                className="bg-red-500 md:hover:scale-105 transition-transform will-change-transform duration-300 text-white py-2 px-4 rounded-lg w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;