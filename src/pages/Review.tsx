import React from "react";
import { FaCommentDots, FaClock, FaFlag, FaStar } from "react-icons/fa";
import StatsCard from "../components/review/StatsCard";
import ReviewsTable from "../components/review/ReviewsTable";
import type { Review } from "../utils/type";

// ---- Mock Data ----
const reviews: Review[] = [
  {
    id: 1,
    user: "Alex Johnson",
    email: "alex@email.com",
    game: "Cyberpunk 2077",
    comment: "Amazing game with incredible graphics ...",
    rating: 5,
    date: "Dec 15, 2024",
    status: "Approved",
    avatar:"https://github.com/shadcn.png"
  },
  {
    id: 2,
    user: "Sarah Wilson",
    email: "sarah@email.com",
    game: "The Witcher 3",
    comment: "Best RPG ever created! The story is capt...",
    rating: 4,
    date: "Dec 14, 2024",
    status: "Pending",
    avatar:"https://github.com/shadcn.png"
  },
  {
    id: 3,
    user: "Mike Chen",
    email: "mike@email.com",
    game: "GTA V",
    comment: "This game is terrible and contains inapp...",
    rating: 1,
    date: "Dec 13, 2024",
    status: "Flagged",
    avatar:"https://github.com/shadcn.png"
  },
];

const ReviewsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={<FaCommentDots className="text-green-600" />}
          label="Total Reviews"
          value="2,847"
        />
        <StatsCard
          icon={<FaClock className="text-yellow-500" />}
          label="Pending Review"
          value="23"
        />
        <StatsCard
          icon={<FaFlag className="text-red-500" />}
          label="Flagged"
          value="8"
        />
        <StatsCard
          icon={<FaStar className="text-teal-500" />}
          label="Avg Rating"
          value="4.2"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search reviews..."
          className="w-full sm:w-1/3 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <select className="px-3 py-2 border rounded-md">
            <option>All Games</option>
          </select>
          <select className="px-3 py-2 border rounded-md">
            <option>All Ratings</option>
          </select>
          <select className="px-3 py-2 border rounded-md">
            <option>All Status</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <ReviewsTable reviews={reviews} />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">Showing 1-10 of 2,847 reviews</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            Previous
          </button>
          <button className="px-3 py-1 border rounded-md bg-green-600 text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            2
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            3
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
