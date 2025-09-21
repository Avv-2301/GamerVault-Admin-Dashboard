import React from "react";
import StatsCard from "../components/banner/StatsCard";
import UploadBanner from "../components/banner/UploadBanner";
import BannerCard from "../components/banner/BannerCard";
import { FaPhotoFilm, FaEye, FaEyeSlash, FaChartBar } from "react-icons/fa6";

const BannerManagement: React.FC = () => {
  const banners = [
    {
      title: "Homepage Hero Banner",
      category: "Gaming",
      resolution: "1920×1080",
      views: 2300,
      status: "active",
      image: "https://placehold.co/1920x1080/png",
    },
    {
      title: "Tournament Promo",
      category: "Esports",
      resolution: "1920×1080",
      views: 1800,
      status: "active",
      image: "https://placehold.co/1920x1080/png",
    },
    {
      title: "Mobile Gaming Ad",
      category: "Mobile",
      resolution: "1080×1920",
      views: 956,
      status: "inactive",
      image: "https://placehold.co/1920x1080/png",
    },
    {
      title: "Summer Sale Banner",
      category: "Promotions",
      resolution: "1920×1080",
      views: 3100,
      status: "active",
      image: "https://placehold.co/1920x1080/png",
    },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">Banner Management</h1>
        <p className="text-gray-500">
          Upload, manage and organize your banner images
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Banners"
          value={24}
          icon={<FaPhotoFilm />}
          color="text-green-500"
          bgColor="bg-green-100"
        />
        <StatsCard
          title="Active"
          value={18}
          icon={<FaEye />}
          color="text-green-500"
          bgColor="bg-green-100"
        />
        <StatsCard
          title="Inactive"
          value={6}
          icon={<FaEyeSlash />}
          color="text-yellow-400"
          bgColor="bg-yellow-100"
        />
        <StatsCard
          title="Total Views"
          value="1.2M"
          icon={<FaChartBar />}
          color="text-purple-400"
          bgColor="bg-purple-100"
        />
      </div>

      {/* Upload */}
      <UploadBanner />

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 bg-white p-4 rounded-lg shadow">
        {/* Search */}
        <input
          type="text"
          placeholder="Search banners..."
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 bg-white">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 bg-white">
            <option>All Categories</option>
            <option>Gaming</option>
            <option>Esports</option>
            <option>Mobile</option>
            <option>Promotions</option>
          </select>
        </div>
      </div>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {banners.map((banner, i) => (
          <BannerCard key={i} {...banner} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
          Previous
        </button>
        <div className="space-x-2">
          <button className="px-3 py-1 rounded bg-green-600 text-white">
            1
          </button>
          <button className="px-3 py-1 rounded bg-gray-200">2</button>
          <button className="px-3 py-1 rounded bg-gray-200">3</button>
        </div>
        <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default BannerManagement;
