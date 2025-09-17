import React from "react";

interface ChartCardProps {
  title: string;
  children?: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white shadow-sm p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex space-x-2 text-sm">
          <button className="px-3 py-1 bg-green-500 text-white rounded-md font-semibold cursor-pointer">Monthly</button>
          <button className="px-3 py-1 text-gray-500 font-semibold cursor-pointer">Weekly</button>
        </div>
      </div>
      <div className="h-56 flex items-center justify-center text-gray-400 rounded-md">
        {children || "Chart Placeholder"}
      </div>
    </div>
  );
};

export default ChartCard;
