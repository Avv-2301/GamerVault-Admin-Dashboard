// components/DiscountCard.tsx
import React, { type ReactNode } from "react";

interface DiscountCardProps {
  title: string;
  value?: string;
  icon: ReactNode;        // already rendered element
  bgColor?: string;       // background color for icon container
}

export const DiscountCard: React.FC<DiscountCardProps> = ({
  title,
  value,
  icon,
  bgColor = "bg-blue-100",
}) => {
  return (
    <div className="bg-white p-4 rounded shadow flex items-center justify-between">
      {/* Text on the left */}
      <div className="flex flex-col">
        <span className="text-black">{title}</span>
        <span className="text-xl font-bold mt-1">{value}</span>
      </div>

      {/* Icon on the right */}
      <div className={`p-3 rounded-lg ${bgColor}`}>
        {icon}
      </div>
    </div>
  );
};
