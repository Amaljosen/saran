import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import { BsLaptop } from "react-icons/bs";
import { LuProjector } from "react-icons/lu";

const Reviews = () => {
  const online = [
    {
      id: 1,
      name: "Meena S",
      location: "Coimbatore",
      content:
        "The resin workshop was amazing! Learned so much, and the instructor made everything easy to follow. Now I feel confident to start my own projects.",
      image:
        "https://ik.imagekit.io/cjureug40/Home/Profiles/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA3L3N0YXJ0dXBpbWFnZXNfcGhvdG9fb2ZfeW91bmdfaW5kaWFuX3dvbWFuX3dpdGhfc3R1ZGVudF9iYWNrcGFja19mMjdjYTdjZC0zOTM0LTQ4NTUtYTJlMC01MzYyYzg2MjhjYTlfMS5qcGc.webp?updatedAt=1733470465327",
      rating: 5,
    },
    {
      id: 2,
      name: "Arjun R",
      location: "Chennai",
      content:
        "Such a fantastic experience. The resin techniques I learned were beyond my expectations. It was truly worth every minute, and I can’t wait to try them out!",
      image:
        "https://ik.imagekit.io/cjureug40/Home/Profiles/front-view-smiley-man-holding-book.jpg?updatedAt=1733470473319",
      rating: 4,
    },
    {
      id: 3,
      name: "Kavitha P",
      location: "Madurai ",
      content:
        "This resin workshop offered a complete escape into creativity. The team provided everything we needed, and the results were beautiful!",
      image:
        "https://ik.imagekit.io/cjureug40/Home/Profiles/young-cheerful-indian-woman.jpg?updatedAt=1733470473109",
      rating: 5,
    },
    {
      id: 4,
      name: "Hari S",
      location: "Salem",
      content:
        "I’ve never done resin art before, but this workshop was perfect for beginners. The guidance was excellent, and I left with a beautiful piece of art!",
      image:
        "https://ik.imagekit.io/cjureug40/Home/Profiles/serious-pensive-young-man-with-smartphone-leaning-railing.jpg?updatedAt=1733470476878",
      rating: 4,
    },
  ];
  const offline = [
    {
      id: 1,
      name: "Divya M",
      location: "Trichy",
      content:
        "Creating miniatures was an absolute delight. The workshop was hands-on, and I learned unique techniques. Such a fun experience!",
      image:
        "https://ik.imagekit.io/cjureug40/Home/9.Testimonials/Customer%20Photos(poduct%20testimonial)/img5.jpg?updatedAt=1732100377738",
      rating: 5,
    },
    {
      id: 2,
      name: "Rajesh K",
      location: "Tirunelveli",
      content:
        "This miniature workshop exceeded my expectations. Each detail was covered perfectly, and I loved every moment of it!",
      image:
        "https://ik.imagekit.io/cjureug40/Home/Profiles/portrait-young-stylish-indian-man-model-pose-street.jpg?updatedAt=1733470474686",
      rating: 4,
    },
    {
      id: 3,
      name: "Priya V",
      location: "Erode",
      content:
        "The miniature workshop was detailed and exciting. I gained so much knowledge, and it was the best workshop I’ve attended in a long time!",
      image:
        "https://ik.imagekit.io/cjureug40/Home/Profiles/pleased-young-schoolgirl-wearing-back-bag-holding-notebook-white.jpg?updatedAt=1733470966153",
      rating: 5,
    },
    {
      id: 4,
      name: "Karthik N",
      location: "Vellore",
      content:
        "Fantastic experience! The miniature workshop had a welcoming environment, and I was thrilled to learn new techniques to use in my own creations.",
      image:
        "https://ik.imagekit.io/cjureug40/Home/Profiles/indian-student-goes-first-lesson.jpg?updatedAt=1733470612366",
      rating: 4,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = online[activeIndex];
  const activeOfflineTestimonial = offline[activeIndex];

  // Handle the Next button click
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % online.length);
  };

  // Handle the Previous button click
  const handlePrevious = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + online.length) % online.length
    );
  };

  return (
    <div className="py-6 w-[90%] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="space-y-2 my-5"
      >
        <h2 className="md:text-3xl text-xl font-semibold text-gray-800 text-center">
          Reviews from Our Crafting Workshops
        </h2>
        <div>
          <p className="text-center text-gray-600 text-xs md:text-sm">
            See what participants have to say about their hands-on
          </p>
          <p className="text-center text-gray-600 text-xs md:text-sm">
            learning and creative experiences
          </p>
        </div>
      </motion.div>

      {/* ***************** Online Section **************** */}
      <div className="">
        {/* ***************** Testimonials Grid **************** */}
        <div className="flex items-center space-x-1 justify-center mb-2">
          <BsLaptop className="text-2xl text-text" />
          <h1 className="text-2xl font-medium text-text">Online Workshop's</h1>
        </div>
        <div className="p-5 border rounded-lg mt-2 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {online.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`cursor-pointer rounded-lg p-3 transition-colors duration-300 w-full
 ${activeIndex === index ? "bg-secondary" : "bg-gray-100"}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex space-x-2 text-sm items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-lg object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Testimonial */}
        <div className="bg-white p-5 rounded-lg border mt-5 md:flex items-start">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-5/12 md:p-5 pb-5"
          >
            <div className="flex w-full justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  {activeTestimonial.name}
                </h3>
                <p className="text-gray-500">{activeTestimonial.location}</p>
                <div className="flex space-x-1 mt-2">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 border bg-gray-100 h-fit p-2 rounded">
                <RxArrowLeft
                  className="bg-white text-2xl p-1 rounded cursor-pointer"
                  onClick={handlePrevious}
                />
                <RxArrowRight
                  className="bg-white text-2xl p-1 rounded cursor-pointer"
                  onClick={handleNext}
                />
              </div>
            </div>
            <p className="md:mt-6 mt-3 text-gray-600 text-sm">
              {activeTestimonial.content}
            </p>
            <button className="md:mt-5 mt-3 px-4 py-2 text-gray-800 text-sm border bg-gray-100 rounded-lg flex space-x-1 items-center">
              <span>Join Our Community</span> <RxArrowRight />
            </button>
          </motion.div>

          {/* Right Side - Video */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-7/12 flex justify-center"
          >
            <video
              src="https://ik.imagekit.io/cjureug40/Videos/Untitled%20video%20-%20Made%20with%20Clipchamp%20(2).mp4?updatedAt=1733892514234"
              controls
              className="h-[30rem] object-cover object-top w-full rounded-lg"
            ></video>
          </motion.div>
        </div>
      </div>

      {/* ***************** Offline Section **************** */}
      <div className="py-5 md:py-10">
        {/* ***************** Testimonials Grid **************** */}
        <div className="flex items-center space-x-1 justify-center mb-2">
          <LuProjector className="text-2xl text-text" />
          <h1 className="text-2xl font-medium text-text">Offline Workshop's</h1>
        </div>
        <div className="p-5 border rounded-lg mt-2 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offline.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`cursor-pointer rounded-lg p-3 transition-colors duration-300 w-full
 ${activeIndex === index ? "bg-secondary" : "bg-gray-100"}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex space-x-2 text-sm items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-lg object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Testimonial */}
        <div className="bg-white p-5 rounded-lg border mt-5 md:flex items-start lg:flex-row-reverse">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-5/12 md:p-5 pb-5"
          >
            <div className="flex w-full justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  {activeOfflineTestimonial.name}
                </h3>
                <p className="text-gray-500">
                  {activeOfflineTestimonial.location}
                </p>
                <div className="flex space-x-1 mt-2">
                  {[...Array(activeOfflineTestimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 border bg-gray-100 h-fit p-2 rounded">
                <RxArrowLeft
                  className="bg-white text-2xl p-1 rounded cursor-pointer"
                  onClick={handlePrevious}
                />
                <RxArrowRight
                  className="bg-white text-2xl p-1 rounded cursor-pointer"
                  onClick={handleNext}
                />
              </div>
            </div>
            <p className="md:mt-6 mt-3 text-gray-600 text-sm">
              {activeTestimonial.content}
            </p>
            <button className="md:mt-5 mt-3 px-4 py-2 text-gray-800 text-sm border bg-gray-100 rounded-lg flex space-x-1 items-center">
              <span>Join Our Community</span> <RxArrowRight />
            </button>
          </motion.div>

          {/* Right Side - Video */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-7/12 flex justify-center"
          >
            <video
              src="https://ik.imagekit.io/cjureug40/Videos/Untitled%20video%20-%20Made%20with%20Clipchamp%20(3).mp4?updatedAt=1733895060564"
              controls
              className="h-[30rem] object-cover object-top w-full rounded-lg"
            ></video>
          </motion.div>
        </div>
      </div>

      {/* * * * * * * * * How it works ? * * * * * * * * * */}

      {/* <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="space-y-2 mt-10 flex flex-col items-center"
        id="how-it-works-section"
      >
        <span className="text-gray-800 border border-primary bg-secondary text-center rounded-full w-fit px-3 py-1 flex items-center space-x-1 text-xs">
          {" "}
          <span>It's too way simple 😊</span>
        </span>
        <h2 className="md:text-3xl text-xl font-semibold text-gray-800 text-center">
          How it works ?
        </h2>
        <div>
          <p className="text-center text-gray-600 text-xs md:text-sm">
            Discover the Simple Steps to Creating Your Unique Customized Gift
            with Ease and Joy
          </p>
        </div>
      </motion.div>

      <div className="p-2 text-gray-800 md:mt-10 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
        <div className="absolute top-9 w-full hidden lg:block">
          <svg width="70%" height="2" className="mx-auto">
            <line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="#4A4A4A"
              strokeWidth="2"
              strokeDasharray="10, 10"
            />
          </svg>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-5 flex flex-col items-center"
        >
          <div className="relative flex justify-center bg-white px-10 animate-bounce">
            <h1 className="text-5xl font-bold relative z-[2]">01</h1>
            <div className="w-5 h-16 bg-purple-500 rounded-full absolute rotate-[65deg] top-1 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="space-y-2">
            <h1 className="text-gray-800 text-center">Explore and Select</h1>
            <p className="text-gray-500 text-center text-sm">
              Visit our website and browse our diverse range of customized
              products, selecting your favorite along with available variations.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-5 flex flex-col items-center"
        >
          <div className="relative flex justify-center bg-white px-10 animate-bounce">
            <h1 className="text-5xl font-bold relative z-[2]">02</h1>
            <div className="w-5 h-16 bg-orange-500 rounded-full absolute rotate-[65deg] top-1 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="space-y-2">
            <h1 className="text-gray-800 text-center">Customize Your Gift</h1>
            <p className="text-gray-500 text-center text-sm">
              Fill out the form with your personal details and upload any
              necessary assets, such as photos or texts.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-5 flex flex-col items-center"
        >
          <div className="relative flex justify-center bg-white px-10 animate-bounce">
            <h1 className="text-5xl font-bold relative z-[2]">03</h1>
            <div className="w-5 h-16 bg-green-500 rounded-full absolute rotate-[65deg] top-1 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="space-y-2">
            <h1 className="text-gray-800 text-center">Complete Your Order</h1>
            <p className="text-gray-500 text-center text-sm">
              Securely pay and place your order to confirm your customization
              and begin the creation process.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-5 flex flex-col items-center"
        >
          <div className="relative flex justify-center bg-white px-10 animate-bounce">
            <h1 className="text-5xl font-bold relative z-[2]">04</h1>
            <div className="w-5 h-16 bg-yellow-500 rounded-full absolute rotate-[65deg] top-1 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="space-y-2">
            <h1 className="text-gray-800 text-center">
              Receive Your Custom Gift
            </h1>
            <p className="text-gray-500 text-center text-sm">
              Sit back and relax as your personalized creation is crafted and
              delivered within 3-4 days!
            </p>
          </div>
        </motion.div>
      </div> */}
    </div>
  );
};

export default Reviews;
