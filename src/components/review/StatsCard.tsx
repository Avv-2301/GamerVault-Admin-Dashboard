import React from "react";

interface Props {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const StatsCard: React.FC<Props> = ({ icon, label, value }) => (
  <div className="flex items-center p-4 border rounded-lg bg-white shadow-sm">
    <div className="text-2xl mr-3">{icon}</div>
    <div>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  </div>
);

export default StatsCard;
