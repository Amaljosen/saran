import React from 'react'
import { motion } from "framer-motion";
import { FaRegStar } from "react-icons/fa";

const Testimonials = () => {
    const testimonials=[
        {
        title:"Fantabulous Product!",
        content:"The wedding theme miniature frame was stunning! It captured our special day beautifully, and it’s a keepsake we’ll cherish forever.",
        name:"Aditi B",
        profile:'https://ik.imagekit.io/cjureug40/Home/9.Testimonials/Customer%20Photos(poduct%20testimonial)/img1.jpg?updatedAt=1732100377922'
    },
        {
        title:"Perfect Anniversary Gift!",
        content:"Ordered the anniversary theme frame as a surprise for my wife, and she loved it! The attention to detail made it feel so personal.",
        name:"Karthik R",
        profile:'https://ik.imagekit.io/cjureug40/Home/9.Testimonials/Customer%20Photos(poduct%20testimonial)/img2.jpg?updatedAt=1732100377846'
    },
        {
        title:"Adorable Birthday Frame!",
        content:"The birthday theme frame for my niece was a hit! It was adorable and brought her celebration to life in such a unique way.",
        name:"Neha P",
        profile:'https://ik.imagekit.io/cjureug40/Home/9.Testimonials/Customer%20Photos(poduct%20testimonial)/img3.jpg?updatedAt=1732100377742'
    },
        {
        title:"Adds Charm to My Workspace!",
        content:"The office theme miniature was spot-on. It added a personal touch to my workspace and got so many compliments from colleagues!",
        name:"Sanjay M",
        profile:'https://ik.imagekit.io/cjureug40/Home/9.Testimonials/Customer%20Photos(poduct%20testimonial)/img4.jpg?updatedAt=1732100377801'
    },
        {
        title:"Memories in a Miniature House!",
        content:"I gifted my parents a miniature frame of their dream house setup, and they were overwhelmed. Truly an amazing piece of art!",
        name:"Swati L",
        profile:'https://ik.imagekit.io/cjureug40/Home/9.Testimonials/Customer%20Photos(poduct%20testimonial)/img5.jpg?updatedAt=1732100377738'
    },
        {
        title:"Bringing Our Trip Memories Back!",
        content:"The outdoor recreation theme frame was beyond expectations! It brought back wonderful memories of our family trip.",
        name:"Rajesh T",
        profile:'https://ik.imagekit.io/cjureug40/Home/9.Testimonials/Customer%20Photos(poduct%20testimonial)/img6.jpg?updatedAt=1732100377850'
    },
]
  return (
    <div className='py-6 w-[90%] mx-auto'>
        <motion.div initial={{ opacity: 0, scale:0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }} className='flex flex-col justify-center items-center text-center space-y-2'>
        <span className="text-text font-medium border border-gray-200 rounded-lg p-2 flex items-center space-x-1"><FaRegStar  /> <span>Testimonials</span></span>
        <p className='text-sm'><span className='text-primary'>We have 2000+</span> Happy Customers</p>
        <h1 className='text-2xl md:text-3xl font-medium text-gray-800'>What our Customer say About us</h1>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
                {testimonials.map((item, index) => (
                    <motion.div initial={{ opacity: 0, scale:0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }} key={index} className='p-4 border rounded-lg shadow-md'>
                        <h2 className='font-semibold text-lg text-text'>{item.title}</h2>
                        <p className='mt-2 text-sm text-gray-600'>{item.content}</p>
                        <div className='mt-4 flex items-center'>
                            <img
                                src={item.profile || 'https://via.placeholder.com/50'}
                                alt={item.name}
                                className='w-10 h-10 rounded-full object-cover object-top'
                            />
                            <div className='ml-3'>
                                <p className='font-medium text-gray-800'>{item.name}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
    </div>
  )
}

export default Testimonials