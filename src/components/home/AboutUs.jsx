import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaArrowLeft, FaArrowUp } from "react-icons/fa";
import { LiaStarOfLifeSolid } from "react-icons/lia";

const AboutUs = () => {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    "https://ik.imagekit.io/cjureug40/Home/Profiles/img1%20ls.jpg?updatedAt=1733476942268",
    "https://ik.imagekit.io/cjureug40/gallery/7e43d7609a4c770292bc07c7b77b0d5e.jpeg?updatedAt=1733808793442",
    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/2.jpg?updatedAt=1732086184951",
    "https://ik.imagekit.io/cjureug40/gallery/Fridgemagnet.jpg?updatedAt=1733465367073",
    "https://ik.imagekit.io/cjureug40/Home/7.Return%20Gift/img2.jpg?updatedAt=1732099215384"
  ];
  const profile = [
    "https://ik.imagekit.io/cjureug40/Home/9.Testimonials/Customer%20Photos(poduct%20testimonial)/img2.jpg?updatedAt=1732100377846",
    "https://ik.imagekit.io/cjureug40/Home/9.Testimonials/Customer%20Photos(poduct%20testimonial)/img1.jpg?updatedAt=1732100377922",
    "https://ik.imagekit.io/cjureug40/Home/Profiles/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA3L3N0YXJ0dXBpbWFnZXNfcGhvdG9fb2ZfeW91bmdfaW5kaWFuX3dvbWFuX3dpdGhfc3R1ZGVudF9iYWNrcGFja19mMjdjYTdjZC0zOTM0LTQ4NTUtYTJlMC01MzYyYzg2MjhjYTlfMS5qcGc.webp?updatedAt=1733470465327",
    "https://ik.imagekit.io/cjureug40/Home/Profiles/serious-pensive-young-man-with-smartphone-leaning-railing.jpg?updatedAt=1733470476878",
    "https://ik.imagekit.io/cjureug40/Home/Profiles/indian-student-goes-first-lesson.jpg?updatedAt=1733470612366",
    "https://ik.imagekit.io/cjureug40/Home/Profiles/pleased-young-schoolgirl-wearing-back-bag-holding-notebook-white.jpg?updatedAt=1733470966153",
    "https://ik.imagekit.io/cjureug40/Home/9.Testimonials/Customer%20Photos(poduct%20testimonial)/img3.jpg?updatedAt=1732100377742",
    "https://ik.imagekit.io/cjureug40/Home/Profiles/front-view-smiley-man-holding-book.jpg?updatedAt=1733470473319",
  ];

  const handleNextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage(); // Change to the next image
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:py-10 py-6 w-[90%] mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Text Section */}
        <motion.div
          className="md:w-1/2 space-y-4"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-text font-medium border border-gray-200 rounded-lg p-2 flex items-center space-x-1 w-fit">
            <LiaStarOfLifeSolid /> <span>About Us</span>
          </span>
          <h1 className="text-xl lg:text-3xl  font-medium leading-snug">
            Crafting Memories, Inspiring Creators.
          </h1>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Saran Castle is an online destination for custom handcrafted
            creations, where memories come to life through miniature frames,
            resins, and other unique handmade products. We're not just
            makers—we’re also teachers, sharing our passion by conducting
            workshops to inspire others to master the art of handcrafting.
          </p>
          <div className="flex gap-4">
            {/* <button
              className="px-4 py-3 text-sm bg-primary text-white rounded-lg font-medium hover:bg-black hover:scale-105 transition-transform will-change-transform duration-300"
              onClick={() => navigate("/products")}
            >
              Explore Products
            </button> */}
            <button
              className="px-4 py-3 text-sm border border-primary text-primary rounded-lg font-medium hover:border-black hover:text-black hover:scale-105 transition-transform will-change-transform duration-300"
              onClick={() => navigate("/sessions")}
            >
              Explore Sessions
            </button>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="md:w-1/2 w-full h-[30rem] md:h-[25rem] text-sm md:text-base relative flex items-center rounded-xl shadow-lg overflow-hidden"
        >
          <img
            src={images[imageIndex]}
            alt="Saran Castle"
            className={`w-full h-full object-cover ${
              imageIndex === 0 || imageIndex === 1
                ? "object-top"
                : "object-center"
            }`}
            loading="lazy"
          />

          <div className="absolute top-3 right-3 flex gap-3">
            <button
              onClick={handlePrevImage}
              className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <FaArrowLeft className="text-primary" />
            </button>
            <button
              onClick={handleNextImage}
              className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <FaArrowRight className="text-primary" />
            </button>
          </div>

          <div className="absolute bottom-2 flex justify-between items-center w-full px-4">
            <div className="flex items-center text-xs px-4 py-2 h-fit text-[#101828] rounded-full bg-gray-100 bg-opacity-70">
              Glimpse Of Saran Castle
            </div>
            <button
              onClick={() => navigate("/gallery")}
              className="flex items-center text-black rounded-full"
            >
              <FaArrowUp className="ml-2 bg-primary text-white rotate-45 text-5xl hover:scale-110 transition-all duration-300 p-3 rounded-full" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap gap-4 p-6 rounded-lg shadow-sm border items-end lg:shadow-lg bg-[#FCFAFF] mt-10 text-sm">
        {/* Orders Completed Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:flex flex-col items-center justify-center w-full lg:w-1/5 p-6 bg-[#FCFAFF] rounded-lg shadow-md h-fit text-center border hidden "
        >
          <h2 className="text-3xl font-bold ">500+</h2>
          <p className="text-gray-500">Orders Completed</p>
          {/* <button
            className="mt-4 w-full justify-center py-3 bg-primary text-white rounded-lg shadow-sm flex gap-x-1 items-center hover:bg-black hover:scale-105 transition-transform will-change-transform duration-300"
            onClick={() => navigate("/products")}
          >
            <FaArrowUp className="rotate-45" />
            <p>Order Now</p>
          </button> */}
        </motion.div>

        {/* Students Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center w-full lg:w-1/5 p-6 rounded-lg shadow-md text-center bg-[#FCFAFF] border"
        >
          <h3 className="font-semibold text-text">Our Students</h3>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {profile.map((item, index) => (
              <div
                key={index}
                className="flex justify-center items-center aspect-square w-[2.5rem]"
              >
                <img
                  className="rounded-full object-cover w-full h-full"
                  src={item} // Assuming `profile` has an `image` property for each item
                  alt="profile" // Fallback alt text
                />
              </div>
            ))}
          </div>

          <span className="mt-2 text-purple-800 border rounded-full px-4 py-1">
            +2000
          </span>
          <a
            href="https://www.instagram.com/saran_castle/profilecard/?igsh=amtsMzFxNWs3ZDV0"
            target="_blank"
            className="mt-4 px-6 py-2 text-text font-medium rounded-lg border border-gray-200 shadow-sm shadow-gray-200 hover:text-black hover:scale-105 transition-transform will-change-transform duration-300"
          >
            Join Our Family
          </a>
        </motion.div>

        {/* Orders Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:flex flex-col w-full lg:w-1/5 p-3 bg-[#FCFAFF] rounded-lg shadow-md border hidden "
        >
          <h3 className="font-semibold text-gray-800">Our Orders Stats</h3>
          <p className="text-primary text-xs">20+ Orders P/M</p>
          <button className="flex items-center space-x-1">
            <p className="text-opacity-10">Order Now</p>
            <FaArrowUp className="text-primary rotate-45" />
          </button>
          <div className="my-4 w-full h-20 rounded-lg">
            {/* Placeholder for the graph */}
            <div className="w-full h-full  rounded-lg">
              <img
                src={
                  "https://ik.imagekit.io/cjureug40/Home/Container.png?updatedAt=1732085863644"
                }
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Founder Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="p-2 py-4 w-full lg:w-2/5 bg-[#FCFAFF] rounded-lg shadow-md border"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="">
              <h3 className="text-text text-sm font-medium">Founder</h3>
              <span className="opacity-70 text-xs text-primary">
                Mother for 2 Children
              </span>
              <h2 className="font-semibold text-gray-800">
                Saranya Durairajan
              </h2>
            </div>
            <div className="!w-[3.3rem] !h-[3.3rem] bg-primary rounded-full">
              <img
                className="!w-12 !h-12 rounded-full object-center"
                src={
                  "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Founder.png?updatedAt=1732086181539"
                }
                alt="Founder"
                loading="lazy"
              />
            </div>
          </div>
          <p className="mt-2 lg:mt-5 text-[#895FD3] text-sm italic border bg-white w-full text-left p-2 rounded-lg">
            "Empowering women to create, inspire, and lead through the art of
            handcrafted elegance."
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
