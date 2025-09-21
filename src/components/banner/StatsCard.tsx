import React from "react";

type Props = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bgColor:string;
};

const StatsCard: React.FC<Props> = ({ title, value, icon, color, bgColor }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
      <div className={`p-2 rounded-lg ${bgColor}`}>
        {/* icon with dynamic color */}
        <div className={`text-2xl ${color}`}>{icon}</div>
      </div>
      <div>
        <h4 className="text-gray-500 text-sm font-semibold">{title}</h4>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
