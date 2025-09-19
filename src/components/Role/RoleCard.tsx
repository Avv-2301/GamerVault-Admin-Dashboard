import React from "react";

interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

interface RoleCardProps {
  icon: React.ReactNode;
  roleName: string;
  description: string;
  users: User[];
  userCount: number;
  accentColor: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  icon,
  roleName,
  description,
  users,
  userCount,
  accentColor,
}) => {
  return (
    <div className="bg-white rounded-md shadow-sm p-4 flex-1 min-w-[280px]">
      {/* Role Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className={`p-2 rounded-md text-white ${accentColor}`}>
              {icon}
            </span>
            <div className="flex flex-col">
              <h3 className="font-bold text-gray-800">{roleName}</h3>
              <p className="text-gray-500 text-sm font-semibold">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Badge with role-specific color */}
        <span
          className={`text-xs px-2 py-1 rounded-full text-white font-medium ${accentColor}`}
        >
          {userCount} {userCount === 1 ? "user" : "users"}
        </span>
      </div>

      {/* User List */}
      <div className="space-y-3">
        {users.map((user, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
          >
            <div className="flex items-center space-x-2">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <button className="text-red-500 hover:text-red-700 text-sm">
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* View More */}
      {userCount > users.length && (
        <div className="mt-3">
          <button className="text-green-600 hover:underline text-sm font-medium">
            View all {userCount} users
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleCard;
