import React from "react";
import { LuBox } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BestSelling = () => {
  const products = [
    {
      id: 1,
      title: "Wedding Theme",
      icon: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/icon1.svg?updatedAt=1732086219474',
      description:
        "Celebrate love with our enchanting wedding-themed creations",
      image: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/1.jpg?updatedAt=1732094150817',
    },
    {
      id: 2,
      title: "Birthday Theme",
      icon: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/icon2.svg?updatedAt=1732086219195',
      description:
        "Make every birthday unforgettable with our personalized decor",
      image: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/2.jpg?updatedAt=1732086218868',
    },
    {
      id: 3,
      title: "Dream House",
      icon: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/icon3.svg?updatedAt=1732086218794',
      description: "Bring your dream home to life with our bespoke miniatures",
      image: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/3.jpg?updatedAt=1732086219588',
    },
    {
      id: 4,
      title: "Money Bank",
      icon: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/icon4.svg?updatedAt=1732086215807',
      description:
        "Save in style with our creatively designed money banks",
      image: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/4.jpg?updatedAt=1732086215985',
    },
    {
      id: 5,
      title: "Outdoor Setup",
      icon:'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/icon5.svg?updatedAt=1732086215857',
      description:
        "Showcase your memories in our beautifully crafted photo frames",
      image: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/5.jpg?updatedAt=1732086216159',
    },
    {
      id: 6,
      title: "Office Theme",
      icon: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/Icon%206.svg?updatedAt=1732086218822',
      description: "Experience the magic of artistry with our stunning resin creations",
      image: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/6.jpg?updatedAt=1732086218881',
    },
    {
      id: 7,
      title: "Anniversary Theme",
      icon: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/icon7.svg?updatedAt=1732086218161',
      description:
        "Save in style with our creatively designed money banks",
      image: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/7.jpg?updatedAt=1732086216029',
    },
    {
      id: 8,
      title: "Kids Room Theme",
      icon: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/icon8.svg?updatedAt=1732086215339',
      description:
        "Showcase your memories in our beautifully crafted photo frames",
      image: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/8.jpg?updatedAt=1732086215981',
    },
    {
      id: 9,
      title: "Create Your Own Theme",
      icon: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/icon9.svg?updatedAt=1732086215787',
      description:
        "Can’t find your theme? We'll bring your custom idea to life",
      image: 'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/9.jpg?updatedAt=1732086216107',
    },
  ];

  return (
    <div className="pb-6 md:py-14 w-[90%] mx-auto">
      <motion.div initial={{ opacity: 0,scale:0.5 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-col justify-center items-center mb-6 space-y-2">
        <span className="text-text font-medium border border-gray-200 rounded-lg p-2 flex items-center w-fit space-x-1">
          <LuBox />
          <span>Our Best Selling Miniatures</span>
        </span>
        <h1 className="md:text-3xl text-center w-full md:w-[70%] lg:w-[50%]">
          Explore Our Cherished Miniatures That Rekindle Precious Memories
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-lg p-5 border shadow-sm bg-gray-100">
        {products.map((product) => (
            <div
              key={product.id}
              className="text-center text-sm p-5 shadow-lg rounded-lg bg-white"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-lg w-full h-60 object-cover mb-4"
                  loading="lazy"
                />
                <div className="relative flex justify-center items-center">
                  <div className="absolute -bottom-4 transform  right-3-translate-x-1/2 bg-white py-3 px-6 rounded-full flex items-center justify-center" style={{borderRadius: '50% / 70% 70% 30% 30%'}}>
                  <div className="p-3 rounded-full flex items-center justify-center bg-primary" style={{ backgroundImage: `url(${'https://ik.imagekit.io/cjureug40/Home/5.Miniature%20Category/bg.svg?updatedAt=1732086215779'})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
                      <img
                        src={product.icon}
                        alt="icon"
                        className="text-white text-2xl w-7"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="text-xl font-semibold relative z-[1] mt-2">{product.title}</h1>
              <p className="mt-2 text-text opacity-70 relative z-[1]">{product.description}</p>
              <Link to={'/products'}><button className="mt-4 px-4 w-full py-3 bg-primary text-white rounded-lg flex items-center space-x-1 justify-center hover:scale-105 hover:bg-black transition-transform will-change-transform duration-300">
                <span>Order Now</span>
                <FaArrowRight className="-rotate-[40deg]" />
              </button></Link>
            </div>     
        ))}
      </div>
    </div>
  );
};

export default BestSelling;
