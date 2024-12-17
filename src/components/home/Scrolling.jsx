import React from "react";
import { useNavigate } from "react-router-dom";
import line from "../../assets/Line.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Scrolling = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="py-7 md:flex md:space-x-6 items-center w-[90%] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="md:w-1/2"
        >
          <div className="flex items-center font-medium relative">
            {/* <p className="text-primary text-5xl font-light"> I </p> */}
            <hr className="w-8 rotate-90 absolute -left-3 border-primary border-2"/>
            <p className="ml-3">Unlocking Potential Through Creativity ❤️</p>
          </div>
          <div className="text-xl md:text-3xl font-medium mt-4 mb-5">
            <h1>Crafting Futures and Empowering</h1>
            <div className="relative">
              <h1>Women</h1>
              <motion.img
                initial={{ opacity: 0,scale:1.7 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{delay:1,duration: 1.5 }}
                src={line}
                className="absolute top-1 md:left-28 left-[5rem] rotate-3 w-32 md:w-48 "
              />
            </div>{" "}
          </div>
          <p className="text-sm text-gray-600">
            Welcome to Nutritionist, your partner in achieving optimal health
            through personalized nutrition coaching. Our certified nutritionists
            are here to guide you on your weight loss journey, providing
            customized plans and ongoing support. Start your transformation
            today and experience the power of personalized nutrition coaching
          </p>
          <Link to={"/sessions"}>
            <button
              className="px-10 py-3 text-sm w-full md:w-fit bg-primary text-white hover:scale-105 hover:bg-black transition-transform will-change-transform duration-300 rounded-lg mt-5 "
              onClick={() => navigate("/sessions")}
            >
              Explore Our Sections
            </button>
          </Link>
          <div className="flex items-center space-x-2 my-2">
            <div className="flex items-center border border-gray-200 rounded-full pl-3 pr-1 py-2">
              <img
                className="w-8 h-8 rounded-full object-cover object-top"
                src={
                  "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Happy%20Students%20Photos/happy2.jpg?updatedAt=1732086180719"
                }
                alt="student1"
              />
              <img
                className="w-8 h-8 rounded-full object-cover object-top relative right-1 z-[1]"
                src={
                  "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Happy%20Students%20Photos/happy1.jpg?updatedAt=1732086181077"
                }
                alt="student2"
              />
              <img
                className="w-8 h-8 rounded-full object-cover object-top relative right-2 z-[2]"
                src={
                  "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Happy%20Students%20Photos/happy3.jpg?updatedAt=1732086181034"
                }
                alt="student3"
              />
            </div>
            <p>
              <span className="text-primary font-medium">2000+ </span>Happy
              Students
            </p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg border border-primary">
            <p className="text-sm text-gray-600 mb-5">
              "My mission is to empower women through creativity. By sharing my
              knowledge, I hope to inspire others to harness their skills and
              build their own paths to success."
            </p>
            <div className="flex items-center space-x-2">
              <img
                src={
                  "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Founder.png?updatedAt=1732086181539"
                }
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border border-primary"
              />
              <div>
                <h1 className="font-medium">Saranya Durairajan</h1>
                <p className="text-xs text-primary">Founder, Saran Castle</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="my-10 md:my-0 overflow-hidden relative md:w-1/2 h-96 md:h-[38rem] reverse-animation"
        >
          <div className="absolute md:-left-80 -left-96 w-full">
            <div className="flex space-x-5 md:space-x-7 lg:space-x-10 justify-center items-center rotate-[30deg]">
              <div className="w-fit mt-3 overflow-hidden t-scroll">
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/5.jpg?updatedAt=1732086184279"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/4.jpg?updatedAt=1732086184336"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/3.jpg?updatedAt=1732086185115"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/2.jpg?updatedAt=1732086184951"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/1.jpg?updatedAt=1732086187036"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
              </div>
              <div className="w-fit md:mt-96 mt-44  b-scroll">
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/6.jpg?updatedAt=1732086184947"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/7.jpg?updatedAt=1732086184823"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/8.jpg?updatedAt=1732086184117"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/9.jpg?updatedAt=1732086184785"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/1.jpg?updatedAt=1732086187036"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/2.jpg?updatedAt=1732086184951"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
              </div>
              <div className="w-fit mt-3  t-scroll">
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/3.jpg?updatedAt=1732086185115"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/4.jpg?updatedAt=1732086184336"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/5.jpg?updatedAt=1732086184279"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/6.jpg?updatedAt=1732086184947"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
                <img
                  src={
                    "https://ik.imagekit.io/cjureug40/Home/4.About%20Us/Scrolling%20Animation%20Photos/7.jpg?updatedAt=1732086184823"
                  }
                  alt=""
                  className="w-28 h-44 object-cover rounded-lg relative z-[1]"
                />
                <hr className="border-primary rotate-90 border-4 rounded-lg" />
                <hr className="border-primary rotate-90 mt-16" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Scrolling;
