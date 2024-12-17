import React, { useState, useEffect } from "react";
import { RiBox2Fill } from "react-icons/ri";


const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [timer, setTimer] = useState(59);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  // Handle sending the reset link
  const handleSendResetLink = () => {
    if (email) {
      console.log("Reset link sent to:", email);
      setIsOtpSent(true);
    } else {
      alert("Please enter your email.");
    }
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle OTP verification
  const handleVerifyOtp = () => {
    if (otp === "123456") {
      setIsOtpVerified(true); // Mark OTP as verified
    } else {
      alert("Incorrect OTP.");
    }
  };

  // Start the timer countdown
  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsTimerActive(false); // Stop the timer when it reaches 0
    }
  }, [timer, isTimerActive]);

  // Resend OTP when timer reaches 0
  const handleResendOtp = () => {
    setTimer(59); // Reset timer
    setIsTimerActive(true); // Restart timer
    alert("OTP resent to your email.");
  };

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
      <div className="flex justify-around w-full px-4 md:px-8">
        <div></div>
        <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-xl font-medium mb-8 flex space-x-1 items-center">
              <RiBox2Fill />
              <span>Saran Castle</span>
            </h2>
            <h1 className="text-2xl font-bold mb-2">
              {!isOtpSent
                ? "Reset Password Now!"
                : isOtpVerified
                ? "Set Your New Password"
                : "Enter OTP to Reset Password"}
            </h1>
            <p className="text-gray-600 text-center">
              {!isOtpSent
                ? "Enter your registered email address to get reset password link"
                : isOtpVerified
                ? "Create a new password below"
                : "Enter the OTP sent to your email"}
            </p>
          </div>
          {!isOtpSent ? (
            <div className="space-y-4">
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
              <button
                onClick={handleSendResetLink}
                className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition"
              >
                Send Reset Link
              </button>
            </div>
          ) : !isOtpVerified ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition"
              >
                Verify OTP
              </button>
              <div className="text-center mt-2">
                {isTimerActive ? (
                  <span className="text-sm text-gray-600">
                    Resend OTP in {timer}s
                  </span>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    className="text-sm text-primary hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Re-enter Password
                </label>
                <input
                  type="password"
                  placeholder="Re-enter your Password"
                  value={reEnterPassword}
                  onChange={(e) => setReEnterPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              <button
                onClick={handleSetNewPassword}
                className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition"
              >
                Set New Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
