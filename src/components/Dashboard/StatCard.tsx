import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white shadow-sm p-4 rounded-md flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-sm font-semibold text-green-600">{subtitle}</p>
      </div>
      <div className="bg-green-200 text-green-700 p-2 rounded-lg">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
