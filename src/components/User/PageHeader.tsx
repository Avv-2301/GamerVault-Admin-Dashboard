import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  onAddUser: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  onAddUser,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <button
        onClick={onAddUser}
        className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold flex items-center space-x-2"
      >
        + Add New User
      </button>
    </div>
  );
};

export default PageHeader;
