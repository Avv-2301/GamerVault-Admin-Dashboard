import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white shadow-sm p-4 sm:p-6 rounded-md flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
      <div>
        <p className="text-sm sm:text-base font-semibold text-gray-500">{title}</p>
        <h3 className="text-xl sm:text-2xl font-bold">{value}</h3>
        <p className="text-sm sm:text-base font-semibold text-green-600">{subtitle}</p>
      </div>
      <div className="bg-green-200 text-green-700 p-2 sm:p-3 rounded-lg flex-shrink-0 self-start sm:self-auto">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
