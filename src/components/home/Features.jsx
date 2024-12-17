import React from 'react'
import { motion } from 'framer-motion';
import { TbClick } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className='py-6 w-[90%] mx-auto'>
      {/* Top Section */}
      <motion.div initial={{ opacity: 0,scale:0.5 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{duration: 1 }} className='space-y-2 flex flex-col items-center'>
        <span className="text-text border text-center rounded-lg w-fit px-3 py-2 flex items-center space-x-1 text-sm">
          <span>Features</span>
          <TbClick className='text-xl'/>
        </span>
        <h2 className="md:text-3xl text-xl font-semibold text-gray-800 text-center">
          Features That Make Us Unique
        </h2>
        <div>
          <p className="text-center text-gray-600 text-xs md:text-sm">
            Discover the exceptional qualities that set our handcrafted creations apart and enhance your gifting experience
          </p>
        </div>
      </motion.div>

      {/* Bottom Section - Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 md:w-[70%] mx-auto">
        <motion.div initial={{ opacity: 0,scale:0.5 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{duration: 0.5 }} className="p-6 border rounded-lg shadow hover:shadow-lg transition text-center flex flex-col items-center">
          <img src={'https://ik.imagekit.io/cjureug40/Home/11.Features/image%204.png?updatedAt=1732086457432'} className=" w-14 mb-3" />
          <h3 className="font-semibold text-sm md:text-lg text-gray-800 ">Customizable Creations</h3>
          <p className="text-gray-600 text-xs md:text-sm">Tailor each product to your preferences, making every gift truly unique.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0,scale:0.5 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{duration: 0.5 }} className="p-6 border rounded-lg shadow hover:shadow-lg transition text-center flex flex-col items-center">
        <img src={'https://ik.imagekit.io/cjureug40/Home/11.Features/image%205.png?updatedAt=1732086457426'} className=" w-14 mb-3" />
          <h3 className="font-semibold text-sm md:text-lg text-gray-800">High-Quality Materials</h3>
          <p className="text-gray-600 text-xs md:text-sm">We use only premium materials to ensure durability and beauty in every piece.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0,scale:0.5 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{duration: 0.5 }} className="p-6 border rounded-lg shadow hover:shadow-lg transition text-center flex flex-col items-center">
        <img src={'https://ik.imagekit.io/cjureug40/Home/11.Features/image%206.png?updatedAt=1732086457361'} className=" w-14 mb-3" />
          <h3 className="font-semibold text-sm md:text-lg text-gray-800">Secure Online Payment</h3>
          <p className="text-gray-600 text-xs md:text-sm">Enjoy hassle-free and secure online payment options for your convenience.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0,scale:0.5 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{duration: 0.5 }} className="p-6 border rounded-lg shadow hover:shadow-lg transition text-center flex flex-col items-center">
        <img src={'https://ik.imagekit.io/cjureug40/Home/11.Features/image%207.png?updatedAt=1732086457404'} className=" w-14 mb-3" />
          <h3 className="font-semibold text-sm md:text-lg text-gray-800">WhatsApp Customization</h3>
          <p className="text-gray-600 text-xs md:text-sm">Connect with us via WhatsApp for personalized customization and instant support!</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0,scale:0.5 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{duration: 0.5 }} className="p-6 border rounded-lg shadow hover:shadow-lg transition text-center flex flex-col items-center">
         <img src={'https://ik.imagekit.io/cjureug40/Home/11.Features/image%208.png?updatedAt=1732086457029'} className=" w-14 mb-3" />
          <h3 className="font-semibold text-sm md:text-lg text-gray-800">Quick Delivery</h3>
          <p className="text-gray-600 text-xs md:text-sm">Experience prompt processing and receive your orders within 3–4 days.</p>
        </motion.div>
      </div>


      <div className='bg-[#AF82FF] text-gray-50 p-6 rounded-lg m-10 flex justify-between items-center md:w-[80%] mx-auto'>
        <motion.div initial={{ opacity: 0,scale:0.5 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{duration: 0.5 }} className='w-[60%] space-y-3'>
            <div className='md:text-2xl text-xs font-medium'>
            <h1 className=''>Discover the Joy of Custom</h1>
            <h1>Creations</h1>
            <motion.img initial={{ opacity: 0,scale:1.7 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{delay:1,duration: 0.5 }} src={"https://ik.imagekit.io/cjureug40/Home/12.CTA/Vector%20366.png?updatedAt=1732086474604"} alt="line" className='w-36'/>
            </div>
            <p className='text-[0.5rem] md:text-sm opacity-85 mt-5 w-[80%]'>Shop unique handcrafted products or join our workshops to learn the art of crafting. Start your journey today and create something truly special!</p>
            <div className='md:space-x-4 space-x-1 flex text-[0.7rem]'>
                <Link to={'/products'}><button className='bg-gray-800 text-gray-50 px-5 py-2 rounded-lg md:text-sm md:hover:scale-105 transition-transform will-change-transform duration-300'>Shop Now</button></Link>
                <Link to={'/sessions'}><button className='bg-gray-50 text-gray-800 px-5 py-2 rounded-lg md:text-sm hidden md:block md:hover:scale-105 transition-transform will-change-transform duration-300'>Join Our Workshop</button></Link>
            </div>
        </motion.div>
        <motion.div initial={{ opacity: 0,scale:0.5 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{duration: 0.5 }} className='w-[40%] flex items-end justify-end'>
            <img src={'https://ik.imagekit.io/cjureug40/Home/profile.png?updatedAt=1732085863695'} alt="profile" className='w-52'/>
        </motion.div>
      </div>


    <hr />
    </div>
  )
}

export default Features;
