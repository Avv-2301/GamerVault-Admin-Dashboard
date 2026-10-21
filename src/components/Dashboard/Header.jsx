import { getUserInitials } from '../../services/helper.js'
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaEnvelope,
  FaKey,
  FaHistory,
  FaSignOutAlt,
  FaChevronDown,
  FaUser,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import ChangePasswordModal from "../Modals/ChangePasswordModal";
import LoginHistoryModal from "../Modals/LoginHistoryModal";
import NotificationDropdown from "./NotificationDropdown";
import { useAuthStore } from "../../store/useAuthStore";
import { useTheme } from "../../context/ThemeContext";
import { logout as logoutApi } from "../../services/api/auth";
import { searchDashboard } from "../../services/api/dashboard";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isLoginHistoryOpen, setIsLoginHistoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const loggedInState = useAuthStore.getState().user;

  useEffect(() => {
    const query = searchQuery.trim();
    if (query.length < 2) return;
    let active = true;
    const timer = setTimeout(() => {
      searchDashboard(query)
        .then((results) => { if (active) { setSearchResults(results); setSearchError(false); } })
        .catch(() => { if (active) { setSearchResults([]); setSearchError(true); } });
    }, 250);
    return () => { active = false; clearTimeout(timer); };
  }, [searchQuery]);

  const openSearchResult = (result) => {
    navigate(result.path);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Get user initials

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    if (isDropdownOpen || isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isNotificationOpen]);

  const handleChangePassword = () => {
    setIsDropdownOpen(false);
    setIsChangePasswordOpen(true);
  };

  const handleLoginHistory = () => {
    setIsDropdownOpen(false);
    setIsLoginHistoryOpen(true);
  };

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    try {
      await logoutApi();
    } catch {
      // Clear the local session even if the server cannot be reached.
    } finally {
      useAuthStore.getState().logout();
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 py-4">
      <div className="flex-1 w-full sm:w-auto">
        <div className="relative flex items-center gap-2 sm:gap-3 bg-gray-100 dark:bg-[#141b2d] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 dark:border-[#1e2742] max-w-full sm:max-w-md">
          <FaSearch className="text-gray-500 dark:text-[#8b8fa3] text-sm sm:text-base flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => { setSearchQuery(event.target.value); setSearchResults([]); setSearchError(false); }}
            onKeyDown={(event) => { if (event.key === 'Enter' && searchResults[0]) openSearchResult(searchResults[0]); }}
            placeholder="Search games, users, transactions..."
            className="flex-1 bg-transparent border-none text-gray-800 dark:text-[#e0e0e0] text-xs sm:text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-[#6b7280] min-w-0"
          />
          {searchQuery.trim().length >= 2 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
              {searchError ? <p className="px-3 py-2 text-xs text-red-500">Search is unavailable</p> : searchResults.length ? searchResults.map((result) => (
                <button key={`${result.type}-${result.id}`} type="button" onClick={() => openSearchResult(result)} className="block w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-[#1e2742]">
                  <span className="text-xs text-[#10b981] mr-2">{result.type}</span>
                  <span className="text-sm text-gray-800 dark:text-white">{result.label}</span>
                  {result.detail && <span className="block text-xs text-gray-500">{result.detail}</span>}
                </button>
              )) : <p className="px-3 py-2 text-xs text-gray-500">No matches</p>}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto flex-wrap">
        <button type="button" onClick={() => navigate('/dashboard/reports')} className="bg-gradient-to-br from-[#10b981] to-[#059669] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-md font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity whitespace-nowrap flex-shrink-0">
          Export Report
        </button>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg text-gray-600 opacity-70 transition-opacity hover:opacity-100 dark:text-[#8b8fa3] sm:h-10 sm:w-10 sm:text-xl"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            type="button"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div className="relative flex shrink-0 items-center">
            <button
              onClick={() => {
                setIsNotificationOpen(!isNotificationOpen);
                setIsDropdownOpen(false);
              }}
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg text-gray-600 opacity-70 transition-opacity hover:opacity-100 dark:text-[#8b8fa3] sm:h-10 sm:w-10 sm:text-xl"
              type="button"
              title="Notifications"
            >
              <FaBell />
            </button>
            <NotificationDropdown
              isOpen={isNotificationOpen}
              notificationRef={notificationRef}
            />
          </div>
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg text-gray-600 opacity-70 transition-opacity hover:opacity-100 dark:text-[#8b8fa3] sm:h-10 sm:w-10 sm:text-xl"
            title="Messages"
          >
            <FaEnvelope />
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              setIsNotificationOpen(false);
            }}
            className="flex items-center gap-2 sm:gap-3 hover:bg-gray-100 dark:hover:bg-[#141b2d] px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
              {loggedInState?.profile?.profilePhoto ? (
                <img
                  src={loggedInState?.profile?.profilePhoto}
                  alt={loggedInState?.name || "User"}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-200 dark:border-[#1e2742]"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-semibold text-xs sm:text-sm ${
                  loggedInState?.profile?.profilePhoto ||
                  loggedInState?.profilePhoto
                    ? "hidden absolute inset-0"
                    : ""
                }`}
              >
                {getUserInitials(loggedInState)}
              </div>
            </div>
            <div className="flex flex-col items-start hidden sm:flex">
              <div className="text-gray-800 dark:text-white font-semibold text-xs sm:text-sm">
                {loggedInState?.name}
              </div>
              <div className="text-gray-500 dark:text-[#8b8fa3] text-xs">
                {loggedInState?.role?.toUpperCase()} •{" "}
                <span className="text-[#10b981]">Online</span>
              </div>
            </div>
            <FaChevronDown
              className={`text-gray-600 dark:text-[#8b8fa3] text-xs transition-transform hidden sm:block ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg shadow-lg overflow-hidden z-50">
              {/* Profile Info Section */}
              <div className="px-4 py-3 border-b border-gray-200 dark:border-[#1e2742] bg-gray-50 dark:bg-[#1e2742]">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    {loggedInState?.profile?.profilePhoto ||
                    loggedInState?.profilePhoto ? (
                      <img
                        src={
                          loggedInState?.profile?.profilePhoto ||
                          loggedInState?.profilePhoto
                        }
                        alt={loggedInState?.name || "User"}
                        className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-[#1e2742]"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-semibold ${
                        loggedInState?.profile?.profilePhoto ||
                        loggedInState?.profilePhoto
                          ? "hidden absolute inset-0"
                          : ""
                      }`}
                    >
                      {getUserInitials(loggedInState)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 dark:text-white font-semibold text-sm">
                      {loggedInState?.name}
                    </div>
                    <div className="text-gray-500 dark:text-[#8b8fa3] text-xs">
                      {loggedInState?.email}
                    </div>
                    <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mt-1">
                      Role:{" "}
                      <span className="text-[#10b981]">
                        {loggedInState?.role?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={handleChangePassword}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
                >
                  <FaKey className="text-gray-500 dark:text-[#8b8fa3] text-base" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Change Password</div>
                    <div className="text-xs text-gray-500 dark:text-[#8b8fa3]">
                      Update your account password
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleLoginHistory}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
                >
                  <FaHistory className="text-gray-500 dark:text-[#8b8fa3] text-base" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Login History</div>
                    <div className="text-xs text-gray-500 dark:text-[#8b8fa3]">
                      View your recent login sessions
                    </div>
                  </div>
                </button>

                <div className="border-t border-gray-200 dark:border-[#1e2742] my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-[#ef4444] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
                >
                  <FaSignOutAlt className="text-base" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Logout</div>
                    <div className="text-xs text-gray-500 dark:text-[#8b8fa3]">
                      Sign out of your account
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
      <LoginHistoryModal
        isOpen={isLoginHistoryOpen}
        onClose={() => setIsLoginHistoryOpen(false)}
      />
    </header>
  );
};

export default Header;
