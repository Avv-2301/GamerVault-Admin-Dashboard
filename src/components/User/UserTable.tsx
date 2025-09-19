import React from "react";
import UserRow from "./UserRow";
import { FaSort, FaFilter } from "react-icons/fa";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  avatarUrl: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const headers = [
    "User ID",
    "Name",
    "Email",
    "Role",
    "Status",
    "Last Login",
    "Actions",
  ];

  return (
    <div className="bg-white rounded-md shadow-sm">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold text-gray-700">
          All Users <span className="text-gray-500 text-sm">({users.length})</span>
        </h2>

        <button className="mt-2 sm:mt-0 flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50">
          <FaFilter size={14} />
        </button>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-max min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <span>{header}</span>
                    {header !== "Actions" && (
                      <FaSort
                        className="text-gray-400 cursor-pointer hover:text-gray-600"
                        size={12}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow key={user.id} {...user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
