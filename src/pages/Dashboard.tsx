import React, { useState, useEffect } from "react";
import StatCard from "../components/Dashboard/StatCard";
import ChartCard from "../components/Dashboard/ChartCard";
import ListCard from "../components/Dashboard/ListCard";
import QuickActions from "../components/Dashboard/QuickActions";
import { apiGet } from "../services/api";
import { API_CONFIG } from "../services/config";
import { showError } from "../utils/notifications";
import type { ApiError } from "../services/api";
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

// API Response Interfaces
interface DashboardStats {
  totalRevenue?: number;
  totalUsers?: {
    active: number;
    inactive: number;
    total: number;
  };
  usersLoggedToday?: number;
  activeDiscounts?: number;
  revenueChange?: number;
  usersChange?: number;
  loggedTodayChange?: number;
  expiringDiscounts?: number;
}


const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Fetch only stats data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRes = await apiGet<any>(API_CONFIG.endpoints.dashboard.stats);

        // Extract data from response
        // Response structure: { data: { totalUsers: {...}, usersLoggedToday: 0 } }
        // or wrapped: { data: { data: { totalUsers: {...}, ... } } }
        let statsData: DashboardStats;
        
        // Check for nested data structure
        if (statsRes.data?.data) {
          statsData = statsRes.data.data as DashboardStats;
        } else if (statsRes.data) {
          statsData = statsRes.data as DashboardStats;
        } else {
          statsData = statsRes as any;
        }
        
        setStats(statsData);
      } catch (err) {
        const apiError = err as ApiError;
        showError(apiError.message || "Failed to load dashboard stats");
      }
    };

    fetchStats();
  }, []);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Format percentage change
  const formatChange = (change?: number): string => {
    if (change === undefined || change === null) return "+0%";
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(1)}%`;
  };

  // Static chart data
  const barData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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
    maintainAspectRatio: false, // ✅ lets charts resize properly on mobile
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Static chart data
  const lineData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  // Static top games data
  const topGames = [
    {
      name: "Battle Royale Pro",
      players: 12450,
      revenue: 28450,
    },
    {
      name: "Space Adventure",
      players: 8920,
      revenue: 19850,
    },
    {
      name: "Racing Champions",
      players: 6780,
      revenue: 15620,
    },
  ];

  // Static recent activity data
  const recentActivity = [
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
    {
      title: "Support ticket resolved",
      subtitle: "3 hours ago",
    },
  ];

  return (
    <div className="flex">
      <main className="flex-1 bg-gray-50 min-h-screen">
        <div className="p-4 md:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              title="Total Revenue"
              value={stats?.totalRevenue ? formatCurrency(stats.totalRevenue) : "$0"}
              subtitle={stats?.revenueChange !== undefined 
                ? `${formatChange(stats.revenueChange)} from last month`
                : stats?.totalRevenue !== undefined ? "No change data" : "Loading..."}
              icon={<FaDollarSign size={20} />}
            />
            <StatCard
              title="Total Users"
              value={stats?.totalUsers ? formatNumber(stats.totalUsers.total) : "0"}
              subtitle={stats?.totalUsers
                ? `${stats.totalUsers.active} active, ${stats.totalUsers.inactive} inactive`
                : "Loading..."}
              icon={<FaUsers size={20} />}
            />
            <StatCard
              title="Users Logged Today"
              value={stats?.usersLoggedToday !== undefined ? formatNumber(stats.usersLoggedToday) : "0"}
              subtitle={stats?.loggedTodayChange !== undefined
                ? `${formatChange(stats.loggedTodayChange)} from yesterday`
                : stats?.usersLoggedToday !== undefined ? "No change data" : "Loading..."}
              icon={<FaUserCheck size={20} />}
            />
            <StatCard
              title="Active Discounts"
              value={stats?.activeDiscounts !== undefined ? stats.activeDiscounts.toString() : "0"}
              subtitle={stats?.expiringDiscounts !== undefined
                ? `${stats.expiringDiscounts} expiring soon`
                : stats?.activeDiscounts !== undefined ? "No expiring discounts" : "Loading..."}
              icon={<FaTags size={20} />}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Revenue Overview">
              <div className="w-full h-full">
                <Bar data={barData} options={barOptions} />
              </div>
            </ChartCard>

            <ChartCard title="User Growth Trends">
              <div className="w-full h-full">
                <Line data={lineData} options={lineOptions} />
              </div>
            </ChartCard>
          </div>

          {/* Lists & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ListCard
              title="Top Games"
              items={topGames.map((game, idx) => ({
                title: game.name,
                subtitle: `${formatNumber(game.players)} players`,
                value: formatCurrency(game.revenue),
                icon: idx === 0 ? <FaTrophy /> : idx === 1 ? <FaRocket /> : <FaCar />,
              }))}
            />

            <ListCard
              title="Recent Activity"
              items={recentActivity.map((activity) => ({
                title: activity.title,
                subtitle: activity.subtitle,
              }))}
            />

            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
