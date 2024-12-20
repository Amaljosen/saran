import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { TbCalendarHeart } from "react-icons/tb";
import { LuGalleryVerticalEnd, LuContact2 } from "react-icons/lu";
import { IoCall } from "react-icons/io5";

const SideBar = ({ setOpen }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    setOpen(false); // Close the menu
  };

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="lg:hidden w-[80%] h-screen bg-white text-gray-800 border-r rounded-br-lg">
      <div className="flex flex-col pt-8 px-4 space-y-4 text-sm text-gray-800">
        {[
          { to: "/", label: "Home", icon: <HiOutlineHome /> },
          { to: "/products", label: "Products", icon: <RiShoppingBasket2Line /> },
          { to: "/sessions", label: "Sessions", icon: <TbCalendarHeart /> },
          { to: "/gallery", label: "Gallery", icon: <LuGalleryVerticalEnd /> },
          { to: "/contact", label: "Contact Us", icon: <LuContact2 /> },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={handleHomeClick}
            className={`flex items-center space-x-3 px-3 py-2 w-full rounded-lg ${
              activePath === item.to
                ? "bg-secondary border border-primary text-gray-800"
                : ""
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="px-4 py-6">
        <h1 className="text-lg font-medium mt-4">Contact Info</h1>
        <hr className="mb-4 mt-1"/>
        <div className="space-y-7 text-sm mt-5 font-medium px-4">
          <a
            href="https://www.instagram.com/saran_castle/profilecard/?igsh=amtsMzFxNWs3ZDV0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3"
          >
            <img src={'https://ik.imagekit.io/cjureug40/Home/1.Top%20CTA/instagram.svg?updatedAt=1732086051108'} alt="Instagram" className="w-6 h-6" />
            <span>@sarancastle</span>
          </a>
          <a
            href="https://wa.me/9894010363"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3"
          >
            <img src={'https://ik.imagekit.io/cjureug40/Home/1.Top%20CTA/whatsapp.svg?updatedAt=1732086051072'} alt="WhatsApp" className="w-6 h-6" />
            <span>+91 9894010363</span>
          </a>
          <a
            href="tel:+9894010363"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3"
          >
            <IoCall className="w-6 h-6 text-primary" />
            <span>+91 9894010363</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
