import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const UploadBanner: React.FC = () => {
  return (
    <div className="space-y-3 bg-white p-4 rounded-lg shadow">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">Upload Banner</h2>

      {/* Upload Box */}
      <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          {/* Upload Icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
            <FaCloudUploadAlt className="text-green-500 text-3xl" />
          </div>

          {/* Text */}
          <p className="text-gray-600 font-bold text-lg">
            Drop your images here
          </p>
          <p className="text-black text-sm">
            or click to browse from your computer
          </p>

          {/* Button */}
          <div className="mt-3">
            <label className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 cursor-pointer inline-block">
              Select Files
              <input
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                // onChange={handleFiles} // optional: handle selected files
              />
            </label>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-gray-400 mt-2">
            Supports: JPG, PNG, WebP (Max 5MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadBanner;
