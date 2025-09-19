import React from "react";
import { FaUser, FaLock, FaShieldAlt } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import { MdLogin } from "react-icons/md";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-10">
      <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg p-3 sm:p-4">
            <span className="text-white text-2xl">
              <IoGameController size={28} />
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mt-2">GamerVault</h2>
          <p className="text-gray-500 text-sm sm:text-md">
            Admin Portal Access
          </p>
        </div>

        {/* Form */}
        <form>
          {/* Email / Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                placeholder="Enter your email or username"
                className="w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-end mb-4">
            <a
              href="#"
              className="text-sm sm:text-md text-green-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <Link to={"/dashboard"}>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 rounded-md flex items-center justify-center space-x-2 text-sm sm:text-base cursor-pointer"
            >
              <MdLogin size={20} className="sm:w-6 sm:h-6" />
              <span className="font-semibold">Sign In to Admin Panel</span>
            </button>
          </Link>
        </form>

        {/* Secure Notice */}
        <div className="bg-green-100 text-sm p-3 sm:p-4 rounded-md mt-6 flex items-start space-x-3">
          <div className="text-green-700 flex-shrink-0 mt-1">
            <FaShieldAlt size={18} className="sm:w-5 sm:h-5" />
          </div>
          <div>
            <p className="font-bold text-black text-sm sm:text-base">
              Secure Admin Access
            </p>
            <p className="text-xs sm:text-sm">
              Your connection is encrypted and monitored for security.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
          Need help?{" "}
          <a href="#" className="text-green-600 hover:underline">
            Contact IT Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
