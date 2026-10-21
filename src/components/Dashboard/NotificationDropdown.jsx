import { FaBell } from "react-icons/fa";

const NotificationDropdown = ({ isOpen, notificationRef }) => {
  if (!isOpen) return null;

  return (
    <div
      ref={notificationRef}
      className="absolute right-0 mt-2 w-96 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg shadow-lg overflow-hidden z-50"
    >
      <div className="px-4 py-3 border-b border-gray-200 dark:border-[#1e2742] bg-gray-50 dark:bg-[#1e2742] flex items-center gap-2">
        <FaBell className="text-gray-600 dark:text-[#8b8fa3]" />
        <h3 className="text-gray-800 dark:text-white font-semibold text-sm">
          Notifications
        </h3>
      </div>
      <div className="px-4 py-8 text-center">
        <FaBell className="text-gray-400 dark:text-[#6b7280] text-3xl mx-auto mb-2" />
        <p className="text-gray-500 dark:text-[#8b8fa3] text-sm">
          No notifications
        </p>
      </div>
    </div>
  );
};

export default NotificationDropdown;
