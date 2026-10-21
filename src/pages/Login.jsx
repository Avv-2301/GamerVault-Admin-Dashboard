import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGamepad,
  FaShieldAlt,
} from "react-icons/fa";
import { login } from "../services/api/auth";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const { isAuthenticated, isCheckingSession } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await login(formData);

      if (res?.meta?.code === 200) {
        const { login: loginStore } = useAuthStore.getState();
        loginStore(res.data || res.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if user is already authenticated (after all hooks)
  if (isCheckingSession) return <div className="min-h-screen" />;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e27] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm transform transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          {/* Logo and Title */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg transform transition-transform hover:scale-105">
              <FaGamepad className="text-white text-2xl sm:text-3xl" />
            </div>
            <h1 className="text-gray-800 dark:text-white text-3xl sm:text-4xl font-bold mb-2">GamerVault</h1>
            <p className="text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm">
              Admin Portal - Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#10b981]">
                  <FaEnvelope className="text-gray-500 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors text-sm sm:text-base" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@gamervault.com"
                  required
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 focus:bg-gray-100 dark:focus:bg-[#252d42] transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#10b981]">
                  <FaLock className="text-gray-500 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors text-sm sm:text-base" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-10 sm:pl-11 pr-10 sm:pr-11 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 focus:bg-gray-100 dark:focus:bg-[#252d42] transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-500 dark:text-[#8b8fa3] hover:text-[#10b981] transition-colors duration-200 touch-manipulation"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-sm sm:text-base" />
                  ) : (
                    <FaEye className="text-sm sm:text-base" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[44px]"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <FaShieldAlt className="text-sm" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-[#1e2742]">
            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-[#8b8fa3] text-xs flex-wrap">
              <FaShieldAlt className="text-[#10b981] flex-shrink-0" />
              <span className="text-center">
                Secure login powered by{" "}
                <span className="text-[#10b981] font-medium">GamerVault</span>
              </span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">
            Need help?{" "}
            <a
              href="#"
              className="text-[#10b981] hover:text-[#059669] transition-colors font-medium touch-manipulation"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
