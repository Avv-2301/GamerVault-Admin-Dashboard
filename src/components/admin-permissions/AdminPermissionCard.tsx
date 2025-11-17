import React from "react";
import { FaUser, FaEnvelope, FaShieldAlt, FaEdit, FaTrash } from "react-icons/fa";
import PermissionToggle from "./PermissionToggle";

export interface PagePermission {
  page: string;
  path: string;
  enabled: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  permissions: PagePermission[];
}

interface AdminPermissionCardProps {
  admin: AdminUser;
  onPermissionChange: (adminId: string, page: string, enabled: boolean) => void;
  onEdit?: (admin: AdminUser) => void;
  onDelete?: (adminId: string) => void;
}

const AdminPermissionCard: React.FC<AdminPermissionCardProps> = ({
  admin,
  onPermissionChange,
  onEdit,
  onDelete,
}) => {
  const enabledCount = admin.permissions.filter((p) => p.enabled).length;
  const totalCount = admin.permissions.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
              {admin.avatarUrl ? (
                <img
                  src={admin.avatarUrl}
                  alt={admin.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaUser />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{admin.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <FaEnvelope className="text-gray-400 text-xs" />
                <p className="text-sm text-gray-600">{admin.email}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-xs text-gray-500">Access</p>
              <p className="text-sm font-semibold text-green-600">
                {enabledCount}/{totalCount} pages
              </p>
            </div>
            {onEdit && (
              <button
                onClick={() => onEdit(admin)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                aria-label="Edit admin"
              >
                <FaEdit size={16} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(admin.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                aria-label="Remove admin"
              >
                <FaTrash size={16} />
              </button>
            )}
          </div>
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <FaShieldAlt className="text-gray-400 text-xs" />
          <span className="text-xs text-gray-600 font-medium">{admin.role}</span>
        </div>
      </div>

      {/* Permissions List */}
      <div className="divide-y divide-gray-100">
        {admin.permissions.map((permission) => (
          <PermissionToggle
            key={permission.page}
            label={permission.page}
            enabled={permission.enabled}
            onChange={(enabled) => onPermissionChange(admin.id, permission.page, enabled)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPermissionCard;

