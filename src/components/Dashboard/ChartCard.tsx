import React from "react";

interface ChartCardProps {
  title: string;
  children?: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white shadow-sm p-4 sm:p-6 rounded-md flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="font-semibold text-lg sm:text-xl mb-2 sm:mb-0">{title}</h3>
        <div className="flex space-x-2 text-sm">
          <button className="px-3 py-1 bg-green-500 text-white rounded-md font-semibold cursor-pointer text-xs sm:text-sm">
            Monthly
          </button>
          <button className="px-3 py-1 text-gray-500 font-semibold cursor-pointer text-xs sm:text-sm">
            Weekly
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 min-h-[16rem] sm:min-h-[20rem] flex items-center justify-center text-gray-400 rounded-md overflow-hidden">
        {children || "Chart Placeholder"}
      </div>
    </div>
  );
};

export default ChartCard;
