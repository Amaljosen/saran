import React, { useState } from "react";
import { RiBox2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle login click
  const handleLogin = () => {
    // You can replace the logic here with actual validation or API calls
    console.log("Email:", email);
    console.log("Password:", password);

    // Simple validation check
    if (email && password) {
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      {/* Main container */}
      <div className="flex justify-around w-full px-4 md:px-8">
        {/* Login form */}
        <div></div>
        <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-xl font-medium mb-8 flex space-x-1 items-center">
              <RiBox2Fill />
              <span>Saran Castle</span>
            </h2>
            <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
            <p className="text-gray-600 text-center">
              Manage orders, products, and customer details with ease.
            </p>
          </div>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          {/* Forgot Password */}
          <div className="text-right mt-2">
            <Link to={"/reset"} className="text-sm opacity-70 hover:underline">
              Forgot Password?
            </Link>
          </div>
          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
