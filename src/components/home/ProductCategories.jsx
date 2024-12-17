import React from 'react';
import { AiOutlineGift } from "react-icons/ai";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ProductCategories = () => {
    const products = [
        { id: 1, title: "Miniature Shadow Box", price: '1299', description: "Recreating cherished memories in intricate, handcrafted miniatures.", image: 'https://ik.imagekit.io/cjureug40/Home/3.Product%20Category/img1.png?updatedAt=1732086152650', },
        { id: 2, title: "Resin Art", price: '299', description: "Artfully crafted resin pieces that capture beauty and preserve moments.", image: 'https://ik.imagekit.io/cjureug40/Home/3.Product%20Category/img2.png?updatedAt=1732086152655' },
        { id: 3, title: "Miniature Food Clay", price: '199', description: "Capture life's special moments with our handcrafted miniature clay creations.", image: 'https://ik.imagekit.io/cjureug40/Home/3.Product%20Category/img3.png?updatedAt=1732086152771' },
        { id: 4, title: "All Customized Products", price: '149', description: "Discover unique, personalized gifts designed to celebrate your memories.", image: 'https://ik.imagekit.io/cjureug40/Home/3.Product%20Category/img4.png?updatedAt=1732086152435' },
        { id: 5, title: "Online Class", price: '499', description: "Learn the art of crafting from your home with our interactive online classes.", image: 'https://ik.imagekit.io/cjureug40/Home/3.Product%20Category/img5.png?updatedAt=1732086152499' },
        { id: 6, title: "Offline Class", price: '799', description: "Enjoy hands-on learning with our immersive offline workshops.", image: 'https://ik.imagekit.io/cjureug40/Home/3.Product%20Category/img6.png?updatedAt=1732086152419' },
    ];

    return (
        <div className='py-6 w-[90%] mx-auto'>
            <div className='flex justify-center mb-6'>
                <span className="text-text font-medium border border-gray-200 rounded-lg p-2 flex items-center space-x-1">
                    <AiOutlineGift />
                    <span>Product & Sessions Categories</span>
                </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {products.map((product, index) => (
                    <div key={product.id} className='text-center text-sm p-5 border rounded-lg bg-[#FCFCFD] shadow-sm'>
                        <img src={product.image} alt={product.title} loading="lazy" className='rounded-lg w-full h-60 object-cover mb-4' />
                        <div>
                            <h1 className='text-xl font-semibold'>{product.title}</h1>
                            <p className='text-lg text-gray-600'>Starts from ₹{product.price}</p>
                        </div>
                        <p className='mt-2 text-gray-500 line-clamp-2'>{product.description}</p>
                        <Link to={index < 4 ? '/products' : '/sessions'}>
                            <button className='mt-4 px-4 w-full py-3 bg-primary text-white rounded-lg hover:bg-black transition-transform will-change-transform duration-300 hover:scale-105'>
                                {index < 4 ? 'Explore Collections' : 'Explore Sessions'}
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
            <hr className='mt-10' />
        </div>
    );
}

export default ProductCategories;
