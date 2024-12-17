import React from 'react'
import { motion } from "framer-motion";

const Memories = () => {
  return (
    <div>
      {/* ********* Recreating Memories in Every Detail ********* */}
      <div className="md:flex items-center w-[90%] mx-auto my-10">
        <motion.div initial={{ opacity: 0,scale:0.5 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-2 my-10 md:w-[30%] pr-10">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">
            Recreating Memories in Every Detail
          </h1>
          <p className="mx-auto text-gray-500 lg:text-sm text-xs">
            From cherished moments to timeless memories, our miniatures bring your stories to life in stunning detail
          </p>
        </motion.div>

        {/* Grid Section */}
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4 md:w-[70%] overflow-hidden md:h-[45rem] h-[70vh]">
          {/* Column 1 */}
          <div className="space-y-2 h-full scroll-up">
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/abae571aa9da109ae236993569a39e2a.jpeg?updatedAt=1733808802645"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[35%]"
            />
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/139bed4afedcaf9703e9bba0d90b9167.jpeg?updatedAt=1733808793726"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[20%]"
            />
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/Pen%20stand%20with%20organizer.jpg?updatedAt=1733465366125"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[35%]"
            />
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/walletcard.jpg?updatedAt=1733465366683"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[20%]"
            />
          </div>

          {/* Column 2 */}
          <div className="space-y-2 scroll-down">
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/Fridgemagnet.jpg?updatedAt=1733465367073"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[35%]"
            />
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/15e5dc671efa5a6f4870627563574094.jpeg?updatedAt=1733808793153"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[20%]"
            />
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/84d5dc0b474605997958a31d29307e27.jpeg?updatedAt=1733808793663"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[35%]"
            />
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/139bed4afedcaf9703e9bba0d90b9167.jpeg?updatedAt=1733808793726"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[20%]"
            />
          </div>

          {/* Column 3 */}
          <div className="space-y-2 scroll-up hidden md:block">
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/Pen%20stand%20with%20organizer.jpg?updatedAt=1733465366125"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[35%]"
            />
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/Custom%20pen%20Stand%20organizer.jpg?updatedAt=1733465366590"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[20%]"
            />
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/c71723b5570c8af6ce127e467d9d5e1a.jpeg?updatedAt=1733808807107"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[35%]"
            />
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/Explosion%20box.jpg?updatedAt=1733465366899"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[20%]"
            />
          </div>

          {/* Column 4 */}
          <div className="space-y-2 scroll-down hidden md:block">
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/abae571aa9da109ae236993569a39e2a.jpeg?updatedAt=1733808802645"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[35%]"
            />
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/c942c586e677a341ae3628e83d7cf305.jpeg?updatedAt=1733808807158"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[20%]"
            />
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/e2f2d651aee6e2732f96b04c5f31b3cb.jpeg?updatedAt=1733808807001"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[35%]"
            />
            <img
              src="https://ik.imagekit.io/cjureug40/gallery/Money%20bank.jpg?updatedAt=1733465366989"
              alt=""
              className="rounded-lg shadow-md w-full object-cover md:h-[20%]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Memories;
