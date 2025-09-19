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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      {/* Title + Subtitle */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 text-sm sm:text-base">{subtitle}</p>
      </div>

      {/* Button */}
      <button
        onClick={onAddUser}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition-colors duration-200"
      >
        + Add New User
      </button>
    </div>
  );
};

export default PageHeader;
