import React from "react";
import { FaCheck, FaTimes, FaTrash, FaEdit } from "react-icons/fa";
import RatingStars from "./RatingStars";

interface Review {
  id: number;
  user: string;
  email: string;
  game: string;
  comment: string;
  rating: number;
  date: string;
  status: "Approved" | "Pending" | "Flagged";
  avatar: string; // 👈 added avatar
}

const ReviewRow: React.FC<{ review: Review }> = ({ review }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-3">
      <div className="flex items-center gap-3">
        <img
          src={review.avatar}
          alt={review.user}
          className="w-8 h-8 rounded-full object-cover border"
        />
        <div>
          <p className="font-semibold">{review.user}</p>
          <p className="text-sm text-gray-500">{review.email}</p>
        </div>
      </div>
    </td>
    <td className="p-3">{review.game}</td>
    <td className="p-3">{review.comment}</td>
    <td className="p-3">
      <RatingStars rating={review.rating} />
    </td>
    <td className="p-3">{review.date}</td>
    <td className="p-3">
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          review.status === "Approved"
            ? "bg-green-100 text-green-700"
            : review.status === "Pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {review.status}
      </span>
    </td>
    <td className="p-3 flex gap-2 text-lg">
      {review.status === "Pending" && <FaCheck className="text-green-600 cursor-pointer" />}
      {review.status === "Pending" && <FaTimes className="text-red-600 cursor-pointer" />}
      {review.status === "Flagged" && <FaCheck className="text-green-600 cursor-pointer" />}
      <FaEdit className="text-blue-600 cursor-pointer" />
      <FaTrash className="text-red-600 cursor-pointer" />
    </td>
  </tr>
);

export default ReviewRow;
