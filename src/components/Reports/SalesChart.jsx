import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "../../context/ThemeContext";
import { formatReportCurrency } from "../../services/helper";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SalesChart = ({ series = [], label = "Revenue", emptyMessage = "No completed purchases in this period." }) => {
  const { darkMode } = useTheme();

  const chartData = useMemo(() => ({
    labels: series.map((point) => point.period),
    datasets: [
      {
        label,
        data: series.map((point) => point.revenue),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  }), [series, label]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
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
            callback: function (value) {
              return formatReportCurrency(value);
            },
          },
        },
      },
    }),
    [darkMode]
  );

  return (
    <div className="h-[400px]">
      {series.length ? <Line data={chartData} options={options} /> : <div className="h-full flex items-center justify-center text-gray-500 dark:text-[#8b8fa3]">{emptyMessage}</div>}
    </div>
  );
};

export default SalesChart;
