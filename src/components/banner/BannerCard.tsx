import React from "react";

type Props = {
  title: string;
  category: string;
  resolution: string;
  views: number;
  status: "active" | "inactive";
  image: string;
};

const BannerCard: React.FC<Props> = ({
  title,
  category,
  resolution,
  views,
  status,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden relative">
      {/* Image container with relative positioning */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        {/* Status badge on top-right corner */}
        <span
          className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full ${
            status === "active"
              ? "bg-green-100 text-green-600"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-gray-800 text-md">{title}</h3>
        <p className="text-xs font-medium text-gray-500">
          {category} • {resolution}
        </p>
        <p className="text-xs font-medium text-gray-400">{views} views</p>

        <div className="flex justify-end mt-2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={status === "active"}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-checked:bg-green-500 rounded-full relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 peer-checked:after:translate-x-4 transition"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
