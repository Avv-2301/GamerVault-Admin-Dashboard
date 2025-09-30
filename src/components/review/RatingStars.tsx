import React from "react";
import { FaStar } from "react-icons/fa";

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex">
    {Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"} />
    ))}
  </div>
);

export default RatingStars;
