import React from "react";
import StatCard from "../components/Dashboard/StatCard";
import ChartCard from "../components/Dashboard/ChartCard";
import ListCard from "../components/Dashboard/ListCard";
import QuickActions from "../components/Dashboard/QuickActions";
import { FaDollarSign, FaUsers, FaUserCheck, FaTags, FaTrophy, FaRocket, FaCar } from "react-icons/fa";

const Dashboard: React.FC = () => {
  return (
    <div className="flex">

      <main className="flex-1 bg-gray-50 min-h-screen">

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Total Revenue" value="$124,892" subtitle="+12.5% from last month" icon={<FaDollarSign />} />
            <StatCard title="Total Users" value="45,892" subtitle="+8.2% from last month" icon={<FaUsers />} />
            <StatCard title="Users Logged Today" value="2,847" subtitle="+5.1% from yesterday" icon={<FaUserCheck />} />
            <StatCard title="Active Discounts" value="23" subtitle="5 expiring soon" icon={<FaTags />} />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard title="Revenue Overview" />
            <ChartCard title="User Growth Trends" />
          </div>

          {/* Lists & Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ListCard
              title="Top Games"
              items={[
                { title: "Battle Royale Pro", subtitle: "12,450 players", value: "$28,450", icon: <FaTrophy /> },
                { title: "Space Adventure", subtitle: "8,920 players", value: "$19,850", icon: <FaRocket /> },
                { title: "Racing Champions", subtitle: "6,780 players", value: "$15,620", icon: <FaCar /> },
              ]}
            />

            <ListCard
              title="Recent Activity"
              items={[
                { title: "New user registration spike", subtitle: "2 minutes ago" },
                { title: 'Game "Battle Royale Pro" updated', subtitle: "15 minutes ago" },
                { title: "New discount campaign created", subtitle: "1 hour ago" },
                { title: "Support ticket resolved", subtitle: "3 hours ago" },
              ]}
            />

            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
