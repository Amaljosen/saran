import React from "react";
import { motion } from "framer-motion";

const Videos = () => {
  // const videoURL=[
  //   "https://ik.imagekit.io/cjureug40/Videos/VID-20241210-WA0002.mp4?updatedAt=1733809048250",
  //   "https://ik.imagekit.io/cjureug40/Videos/VID-20241210-WA0001.mp4?updatedAt=1733809026405",
  //   "https://ik.imagekit.io/cjureug40/Videos/online%20Session.mp4?updatedAt=1733809050235",
  //   "https://ik.imagekit.io/cjureug40/Videos/VID-20241210-WA0004.mp4?updatedAt=1733809049368",
  // ]
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-2"
      >
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">
          Inspiring Growth, One Creation at a Time
        </h1>
        <p className="w-[90%] md:w-[40%] mx-auto text-gray-500 lg:text-sm text-xs">
          Championing the skills and ambitions of women artisans, turning
          passion into purpose.
        </p>
      </motion.div>

      <div className="mt-5 md:mt-8">
        <div className="grid lg:grid-cols-4  grid-cols-1 gap-6 p-5">
          <motion.video
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            src="https://ik.imagekit.io/cjureug40/Videos/VID-20241210-WA0002.mp4?updatedAt=1733809048250"
            className=" h-full w-full rounded-lg"
            controls
            preload="metadata" // Add preload for lazy loading
            playsInline
          />
          <motion.video
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            src="https://ik.imagekit.io/cjureug40/Videos/VID-20241210-WA0001.mp4?updatedAt=1733809026405"
            className=" h-full w-full rounded-lg"
            controls
            preload="metadata" // Add preload for lazy loading
            playsInline
          />
          <motion.video
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            src="https://ik.imagekit.io/cjureug40/Videos/online%20Session.mp4?updatedAt=1733809050235"
            className=" h-full w-full rounded-lg"
            controls
            preload="metadata" // Add preload for lazy loading
            playsInline
          />
          <motion.video
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            src="https://ik.imagekit.io/cjureug40/Videos/VID-20241210-WA0004.mp4?updatedAt=1733809049368"
            className=" h-full w-full rounded-lg"
            controls
            preload="metadata" // Add preload for lazy loading
            playsInline
          />
        </div>
      </div>
    </div>
  );
};

export default Videos;
