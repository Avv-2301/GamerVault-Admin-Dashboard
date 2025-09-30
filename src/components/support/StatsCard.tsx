import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color?: string; // Tailwind color for bg
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition">
      <div
        className={`p-3 rounded-full flex items-center justify-center ${
          color || "bg-gray-100"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );
};

export default StatsCard;
