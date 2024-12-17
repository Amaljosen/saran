import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { TbHeartHandshake } from "react-icons/tb";
import { motion } from 'framer-motion';



const ArtResin = () => {
    const navigate = useNavigate();
  return (
    <div className='py-6 w-[90%] mx-auto'>   

        <div className='md:flex md:items-end md:space-x-10 space-y-2 md:space-y-0'>
        <div className='lg:w-[66%] md:w-full'>
         <h1 className="text-text text-sm font-medium border rounded-lg p-2 w-fit flex items-center space-x-1 border-[#EFE5FF]"><TbHeartHandshake />  <span>Encasing Memories in Timeless Resin Art</span></h1>
         <motion.h1 initial={{ opacity: 0,x:-100 }} whileInView={{ opacity: 1, x:0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-2xl lg:text-3xl my-3 text-gray-800 font-medium rounded-lg lg:p-2 w-fit flex items-start lg:items-center lg:space-x-1 lg:border"><img src={'https://ik.imagekit.io/cjureug40/Home/6.Resin%20Art%20Section/icon.svg?updatedAt=1732086244524'} alt="icon" loading="lazy" className='w-8 lg:block hidden'/> <span>The Art of Resin Crafting Beauty in Every Piece</span></motion.h1>
         <div className='md:flex md:space-x-5 lg:space-x-10 space-y-2 lg:space-y-0 md:mt-7 mt-5'>
            <div className='md:w-1/2'>
            <motion.p initial={{ opacity: 0,x:-100 }} whileInView={{ opacity: 1,x:0 }} viewport={{ once: true }} transition={{delay:0.3, duration: 1 }} className='text-gray-600 text-sm'>
            Experience the allure of resin art with our stunning creations, where each piece is crafted to bring elegance and uniqueness to your space. Discover the beauty of handcrafted designs that blend creativity and craftsmanship.
            </motion.p>
            {/* <motion.button initial={{ opacity: 0,scale:1.2}} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{duration: 1 }} className="px-6 py-2 my-5 text-sm bg-primary text-white rounded-lg md:hover:scale-105 hover:bg-black transition-transform will-change-transform duration-300" onClick={() => navigate('/products')}>Order Now</motion.button> */}
            <motion.button initial={{ opacity: 0,scale:1.2}} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{duration: 1 }} className="px-4 py-2 my-5 ml-2 text-sm border border-primary text-text rounded-lg hover:border-black hover:text-black transition-all duration-300" onClick={() => navigate('/sessions')}>Learn the Art</motion.button>
            <motion.img initial={{ opacity: 0,scale:0.5 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{ duration: 1 }} src={'https://ik.imagekit.io/cjureug40/Home/6.Resin%20Art%20Section/img1.jpg?updatedAt=1732086245258'} alt="Art" className='w-full object-cover rounded-lg shadow md:h-[19rem] lg:h-[15rem]'/>
            </div>
            <motion.div initial={{ opacity: 0,scale:0.5 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{ duration: 1 }} className='md:w-1/2 hidden md:flex flex-col justify-end'>
            <img src={'https://ik.imagekit.io/cjureug40/Home/6.Resin%20Art%20Section/img2.jpg?updatedAt=1732086245194'} alt="Art" className='w-full h-[29rem] lg:h-[25rem] object-cover lg:block rounded-lg shadow' />
            </motion.div>
         </div>
        </div>
        <motion.div initial={{ opacity: 0,scale:0.5 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{ duration: 1 }} className='lg:w-[34%] md:w-1/2 md:hidden lg:block rounded-lg shadow md:shadow-none'>
        <img src={'https://ik.imagekit.io/cjureug40/Home/6.Resin%20Art%20Section/img3.jpg?updatedAt=1732086245535'} alt="Art" className='w-full object-cover rounded-t-lg md:rounded-lg md:h-[37rem] lg:h-[25rem]'/>
        <div className='p-5 md:p-0 md:mt-5 text-gray-800'>
        <h1 className='font-medium'>Why Resin Products?</h1>
        <p className='text-sm text-gray-600'>Resin products are durable, beautiful, and perfect for preserving memories.</p>
        {/* <motion.button initial={{ opacity: 0,scale:0.5 }} whileHover={{ scale: 1.05 }} whileInView={{ opacity: 1,scale:1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className='bg-gray-50 text-sm py-2 px-5 rounded-lg mt-2 flex items-center space-x-1 shadow'onClick={() => navigate('/products')}><span>Order Now</span><span className='bg-white p-1 rounded'><FaArrowRightLong /></span></motion.button> */}

        </div>
        </motion.div>
        </div>

    </div>
  )
}

export default ArtResin