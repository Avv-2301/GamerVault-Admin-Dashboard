import React from "react";
import { FiPlus, FiTag, FiDollarSign, FiClock } from "react-icons/fi";
import { FaGamepad } from "react-icons/fa6";
import { DiscountCard } from "../components/discount/DiscountCard";
import { DiscountTable } from "../components/discount/DiscountTable";
import { Filters } from "../components/discount/Filters";

export type Discount = {
  id: string;
  game: string;
  category: string;
  percentage: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Expiring";
  image?: string;
};

export const discountsData: Discount[] = [
  {
    id: "#D001",
    game: "Cyberpunk 2077",
    category: "Action/RPG",
    percentage: 50,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    status: "Active",
    image: "/images/cyberpunk.jpg",
  },
  {
    id: "#D002",
    game: "The Witcher 3",
    category: "RPG",
    percentage: 75,
    startDate: "2024-01-10",
    endDate: "2024-01-31",
    status: "Expiring",
    image: "/images/cyberpunk.jpg",
  },
];

export const DiscountManagement: React.FC = () => {
  // const [discounts, setDiscounts] = useState<Discount[]>(discountsData);

  // const totalSavings = 12400;
  // const activeDiscounts = discounts.filter((d) => d.status === "Active").length;
  // const expiringSoon = discounts.filter((d) => d.status === "Expiring").length;
  // const gamesOnSale = 156;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Discount Management</h1>
        <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          <FiPlus className="mr-2" /> Add Discount
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <DiscountCard
          title="Active Discounts"
          // value={activeDiscounts.toString()}
          icon={<FiTag className="text-green-600" size={20}/>}
          bgColor="bg-green-100"
        />

        <DiscountCard
          title="Games on Sale"
          // value={gamesOnSale.toString()}
          icon={<FaGamepad className="text-green-600" size={20}/>}
          bgColor="bg-green-100"
        />

        <DiscountCard
          title="Total Savings"
          // value={`$${totalSavings.toLocaleString()}`}
          icon={<FiDollarSign className="text-green-600" size={20}/>}
          bgColor="bg-green-100"
        />

        <DiscountCard
          title="Expiring Soon"
          // value={expiringSoon.toString()}
          icon={<FiClock className="text-red-600" size={20}/>}
          bgColor="bg-red-100"
        />
      </div>

      {/* Filters */}
      <Filters />

      {/* Table */}
      <DiscountTable discounts={discountsData} />
    </div>
  );
};
