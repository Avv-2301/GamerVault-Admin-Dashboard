import React, { useState } from "react";
import { FaUser, FaLock, FaHistory, FaEnvelope, FaShieldAlt, FaCalendarAlt } from "react-icons/fa";
import ChangePasswordModal from "../components/common/modals/ChangePasswordModal";
import LoginHistoryModal from "../components/common/modals/LoginHistoryModal";
import { useAuthStore } from "../stores/authStore";
import { formatDateTime } from "../utils/helper";

const Settings: React.FC = () => {
  const { user } = useAuthStore();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const settingsSections = [
    {
      title: "Account Information",
      icon: <FaUser className="text-green-600" size={20} />,
      items: [
        {
          label: "Name",
          value: user?.name || "N/A",
          icon: <FaUser className="text-gray-400" size={16} />,
        },
        {
          label: "Email",
          value: user?.email || "N/A",
          icon: <FaEnvelope className="text-gray-400" size={16} />,
        },
        {
          label: "Role",
          value: user?.role || "N/A",
          icon: <FaShieldAlt className="text-gray-400" size={16} />,
        },
      ],
    },
    {
      title: "Security",
      icon: <FaLock className="text-green-600" size={20} />,
      items: [
        {
          label: "Password",
          value: "••••••••",
          action: () => setIsPasswordModalOpen(true),
          actionLabel: "Change Password",
          icon: <FaLock className="text-gray-400" size={16} />,
        },
        {
          label: "Login History",
          value: "View recent login activity",
          action: () => setIsHistoryModalOpen(true),
          actionLabel: "View History",
          icon: <FaHistory className="text-gray-400" size={16} />,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Section Header */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                {section.icon}
                <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
              </div>
            </div>

            {/* Section Content */}
            <div className="p-6">
              <div className="space-y-4">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="text-gray-400">{item.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 mb-1">{item.label}</p>
                        <p className="text-base text-gray-800">{item.value}</p>
                      </div>
                    </div>
                    {item.action && (
                      <button
                        onClick={item.action}
                        className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium text-sm whitespace-nowrap"
                      >
                        {item.actionLabel}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Additional Info Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <FaCalendarAlt className="text-green-600" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">Account Details</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">User ID</p>
                <p className="text-gray-800 font-mono">{user?._id || user?.id || "N/A"}</p>
              </div>
              {user?.createdAt && (
                <div>
                  <p className="text-gray-500 mb-1">Account Created</p>
                  <p className="text-gray-800">{formatDateTime(user.createdAt)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
      <LoginHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />
    </div>
  );
};

export default Settings;

