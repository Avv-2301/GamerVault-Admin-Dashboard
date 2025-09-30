import React from "react";
import ReviewRow from "./ReviewRow";

interface Review {
  id: number;
  user: string;
  email: string;
  game: string;
  comment: string;
  rating: number;
  date: string;
  status: "Approved" | "Pending" | "Flagged";
  avatar: string;
}

const ReviewsTable: React.FC<{ reviews: Review[] }> = ({ reviews }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
    <table className="w-full text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3">User</th>
          <th className="p-3">Game</th>
          <th className="p-3">Comment</th>
          <th className="p-3">Rating</th>
          <th className="p-3">Date</th>
          <th className="p-3">Status</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <ReviewRow key={review.id} review={review} />
        ))}
      </tbody>
    </table>
  </div>
);

export default ReviewsTable;
