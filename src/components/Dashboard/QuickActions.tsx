import React from "react";

const QuickActions: React.FC = () => {
  return (
    <div className="bg-white shadow-sm p-4 rounded-md">
      <h3 className="font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
          + Add New Game
        </button>
        <button className="w-full border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-md">
          Create Discount
        </button>
        <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded-md">
          View Reports
        </button>
        <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded-md">
          Send Notification
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
