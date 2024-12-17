import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./Context";
import Home from "./components/home/Home";
import ExploreProducts from "./components/products/ExploreProducts";
import ProductDescription from "./components/products/ProductDescriptionPage";
import SessionCard from "./components/sessions/SessionCard";
import Gallery from "./components/gallery/Gallery";
import ContactUs from "./components/contact/ContactUs";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ProductForm from "./components/products/ProductForm";
import SessionsForm from "./components/sessions/SessionsForm";
import SessionDescription from "./components/sessions/SessionDescription";
import SuccessPageSession from "./components/success-failure/SuccessPage";
import FailurePage from "./components/success-failure/FailurePage";
import Terms from "./components/terms/Terms";


import Product from "./dashboard/orders/Product";
import Session from "./dashboard/orders/Session";
import Login from "./dashboard/auth/Login";
import Dashboard from "./dashboard/Dashboard";
import ResetPass from "./dashboard/auth/ResetPass";
import Orders from "./dashboard/orders/Orders";
import ProductsAdmin from "./dashboard/products/Products";
import SessionsAdmin from "./dashboard/sessions/Sessions";
import Reviews from "./dashboard/reviews/Reviews";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          {/* Public-facing Routes - with Navbar and Footer */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/products" element={<><Navbar /><ExploreProducts /><Footer /></>} />
          <Route path="/description/:productId" element={<><Navbar /><ProductDescription /><Footer /></>} />
          <Route path="/sessionDescription/:SessionId" element={<><Navbar /><SessionDescription /><Footer /></>} />
          <Route path="/sessions" element={<><Navbar /><SessionCard /><Footer /></>} />
          <Route path="/gallery" element={<><Navbar /><Gallery /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><ContactUs /><Footer /></>} />
          <Route path="/product-form" element={<><Navbar /><ProductForm /><Footer /></>} />
          <Route path="/session-form" element={<><Navbar /><SessionsForm /><Footer /></>} />
          <Route path="/success-page" element={<><Navbar /><SuccessPageSession /><Footer /></>} />
          <Route path="/failure-page" element={<><Navbar /><FailurePage /><Footer /></>} />
          <Route path="/terms" element={<><Navbar /><Terms /></>} />


         {/* Admin-specific Routes - without Navbar and Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPass />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Orders />} />
            <Route path="my-orders" element={<Orders />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="sessions" element={<SessionsAdmin />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="product/:permanentId" element={<Product/>} />
            <Route path="session/:permanentId" element={<Session/>} />
          </Route>

          
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
