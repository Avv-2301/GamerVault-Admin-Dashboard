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
    <div className="bg-white shadow-sm p-4 rounded-md">
      <h3 className="font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {item.icon && <span className="text-green-600">{item.icon}</span>}
              <div>
                <p className="font-medium text-gray-700">{item.title}</p>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </div>
            {item.value && <span className="font-semibold text-green-600">{item.value}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCard;
