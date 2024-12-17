import React, { useState } from "react";
import { RiBox2Fill } from "react-icons/ri";

const NewPassword = () => {
  // State for new password and re-entered password
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  // Handle password set click
  const handleSetNewPassword = () => {
    if (newPassword && reEnterPassword) {
      if (newPassword === reEnterPassword) {
        alert("Password successfully updated!");
        // Proceed with further logic (e.g., API call to update the password)
      } else {
        alert("Passwords do not match. Please try again.");
      }
    } else {
      alert("Please fill in both password fields.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      {/* Main container */}
      <div className="flex justify-around w-full px-4 md:px-8">
        <div></div>
        <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-xl font-medium mb-8 flex space-x-1 items-center">
              <RiBox2Fill />
              <span>Saran Castle</span>
            </h2>
            <h1 className="text-2xl font-bold mb-2">Set New Password</h1>
            <p className="text-gray-600 text-center">
              Create a password with at least 8 characters (A-Z, 0-9, @, #, $, %)
            </p>
          </div>
          <div className="space-y-4">
            {/* New Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter New Password</label>
              <input
                type="password"
                placeholder="Enter your New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Re-enter Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Re-enter Password</label>
              <input
                type="password"
                placeholder="Re-enter your Password"
                value={reEnterPassword}
                onChange={(e) => setReEnterPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Set New Password Button */}
          <button
            onClick={handleSetNewPassword}
            className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition"
          >
            Set New Password
          </button>
        </div>
      </div>
    </div>
   
  );
};

export default NewPassword;
