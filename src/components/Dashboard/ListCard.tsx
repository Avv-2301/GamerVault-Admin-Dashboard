import React from "react";

interface ListItem {
  title: string;
  subtitle: string;
  value?: string;
  icon?: React.ReactNode;
}

interface ListCardProps {
  title: string;
  items: ListItem[];
}

const ListCard: React.FC<ListCardProps> = ({ title, items }) => {
  return (
    <div className="bg-white shadow-sm p-4 sm:p-6 rounded-md">
      <h3 className="font-semibold text-lg sm:text-xl mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0"
          >
            <div className="flex items-center space-x-2">
              {/* green dot if not icon */}
              {!item.icon && <span className="w-2 h-2 rounded-full bg-green-500 mb-4" />}

              {item.icon && <span className="text-green-600 bg-green-200 p-3 rounded-lg">{item.icon}</span>}
              <div>
                <p className="font-semibold text-gray-700 text-sm sm:text-base">
                  {item.title}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">{item.subtitle}</p>
              </div>
            </div>
            {item.value && (
              <span className="font-semibold text-green-600 text-sm sm:text-base">
                {item.value}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCard;
