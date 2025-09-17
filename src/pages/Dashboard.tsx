import React from "react";
import StatCard from "../components/Dashboard/StatCard";
import ChartCard from "../components/Dashboard/ChartCard";
import ListCard from "../components/Dashboard/ListCard";
import QuickActions from "../components/Dashboard/QuickActions";
import {
  FaDollarSign,
  FaUsers,
  FaUserCheck,
  FaTags,
  FaTrophy,
  FaRocket,
  FaCar,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

// Register chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue ($)",
        data: [
          80000, 95000, 70000, 85000, 90000, 110000, 120000, 130000, 140000,
          155000, 145000, 135000,
        ],
        backgroundColor: "rgba(34,197,94,0.7)", // Tailwind green-500
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Line chart data (User Growth Trends)
  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "New Users",
        data: [
          1000, 1200, 1100, 1400, 1600, 1800, 1700, 1900, 2000, 2100, 2200,
          2400,
        ],
        borderColor: "rgba(34,197,94,1)", // green-500
        backgroundColor: "rgba(34,197,94,0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Returning Users",
        data: [
          800, 950, 900, 1000, 1100, 1250, 1300, 1350, 1500, 1600, 1700, 1800,
        ],
        borderColor: "rgba(16,185,129,1)", // green-400
        backgroundColor: "rgba(16,185,129,0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };
  return (
    <div className="flex">
      <main className="flex-1 bg-gray-50 min-h-screen">
        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue"
              value="$124,892"
              subtitle="+12.5% from last month"
              icon={<FaDollarSign size={20} />}
            />
            <StatCard
              title="Total Users"
              value="45,892"
              subtitle="+8.2% from last month"
              icon={<FaUsers size={20} />}
            />
            <StatCard
              title="Users Logged Today"
              value="2,847"
              subtitle="+5.1% from yesterday"
              icon={<FaUserCheck size={20} />}
            />
            <StatCard
              title="Active Discounts"
              value="23"
              subtitle="5 expiring soon"
              icon={<FaTags size={20} />}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard title="Revenue Overview">
              <Bar data={barData} options={barOptions} />{" "}
            </ChartCard>
            <ChartCard title="User Growth Trends">
              {" "}
              <Line data={lineData} options={lineOptions} />
            </ChartCard>
          </div>

          {/* Lists & Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ListCard
              title="Top Games"
              items={[
                {
                  title: "Battle Royale Pro",
                  subtitle: "12,450 players",
                  value: "$28,450",
                  icon: <FaTrophy />,
                },
                {
                  title: "Space Adventure",
                  subtitle: "8,920 players",
                  value: "$19,850",
                  icon: <FaRocket />,
                },
                {
                  title: "Racing Champions",
                  subtitle: "6,780 players",
                  value: "$15,620",
                  icon: <FaCar />,
                },
              ]}
            />

            <ListCard
              title="Recent Activity"
              items={[
                {
                  title: "New user registration spike",
                  subtitle: "2 minutes ago",
                },
                {
                  title: 'Game "Battle Royale Pro" updated',
                  subtitle: "15 minutes ago",
                },
                {
                  title: "New discount campaign created",
                  subtitle: "1 hour ago",
                },
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
