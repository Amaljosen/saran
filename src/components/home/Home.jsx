import React from 'react';
import AboutUs from './AboutUs';
import Scrolling from './Scrolling';
import ArtResin from './ArtResin';
import ReturnGift from './ReturnGift';
import BulkOrders from './BulkOrders';
import Testimonials from './Testimonials';
import Reviews from './Reviews';
import Features from './Features';
import HeroSection from './HeroSection';
import ProductCategories from './ProductCategories';
import BestSelling from './BestSelling';

const Home = () => {
  return (
    <div className="container mx-auto mt-24 md:mt-32 overflow-hidden">
      <div id="hero-section">
        <HeroSection />
      </div>
      {/* <div id="product-categories">
        <ProductCategories />
      </div> */}
      <div id="about-section">
        <AboutUs />
      </div>
      <div id="scrolling-section">
        <Scrolling />
      </div>
      {/* <div id="miniature-section">
        <BestSelling />
      </div> */}
      <div id="resin-section">
        <ArtResin />
      </div>
      <div id="return-gifts-section">
        <ReturnGift />
      </div>
      <div id="bulk-orders-section">
        <BulkOrders />
      </div>
      <div id="testimonials-section">
        <Testimonials />
      </div>
      <div id="reviews-section">
        <Reviews />
      </div>
      {/* <div id="features-section">
        <Features />
      </div> */}
    </div>
  );
};

export default Home;
