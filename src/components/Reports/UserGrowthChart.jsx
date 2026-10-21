import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useTheme } from "../../context/ThemeContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserGrowthChart = ({ series = [] }) => {
  const { darkMode } = useTheme();

  const chartData = useMemo(() => ({
    labels: series.map((point) => point.period),
    datasets: [
      {
        label: "New Users",
        data: series.map((point) => point.registrations),
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "#10b981",
        borderWidth: 1,
      },
      {
        label: "Latest Logins",
        data: series.map((point) => point.activeUsers),
        backgroundColor: "rgba(139, 92, 246, 0.8)",
        borderColor: "#8b5cf6",
        borderWidth: 1,
      },
    ],
  }), [series]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: darkMode ? "#8b8fa3" : "#6b7280",
          },
        },
        tooltip: {
          backgroundColor: darkMode ? "#1e2742" : "#ffffff",
          titleColor: darkMode ? "#e0e0e0" : "#1f2937",
          bodyColor: darkMode ? "#8b8fa3" : "#6b7280",
          borderColor: darkMode ? "#2a3441" : "#e5e7eb",
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          grid: {
            color: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            color: darkMode ? "#8b8fa3" : "#6b7280",
          },
        },
        y: {
          grid: {
            color: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            color: darkMode ? "#8b8fa3" : "#6b7280",
          },
        },
      },
    }),
    [darkMode]
  );

  return (
    <div className="h-[400px]">
      {series.length ? <Bar data={chartData} options={options} /> : <div className="h-full flex items-center justify-center text-gray-500 dark:text-[#8b8fa3]">No user activity in this period.</div>}
    </div>
  );
};

export default UserGrowthChart;
