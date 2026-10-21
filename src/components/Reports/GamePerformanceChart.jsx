import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useTheme } from "../../context/ThemeContext";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const GamePerformanceChart = ({ games = [] }) => {
  const { darkMode } = useTheme();
  const data = useMemo(() => ({
    labels: games.map((game) => game.name),
    datasets: [{ label: "Units Sold", data: games.map((game) => game.unitsSold), backgroundColor: "rgba(16, 185, 129, 0.8)" }],
  }), [games]);
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: { legend: { display: false } },
    scales: {
      x: { beginAtZero: true, ticks: { color: darkMode ? "#8b8fa3" : "#6b7280", precision: 0 } },
      y: { ticks: { color: darkMode ? "#8b8fa3" : "#6b7280" } },
    },
  }), [darkMode]);
  return (
    <div className="h-[400px]">
      {games.length ? <Bar data={data} options={options} /> : <div className="h-full flex items-center justify-center text-gray-500 dark:text-[#8b8fa3]">No games sold in this period.</div>}
    </div>
  );
};

export default GamePerformanceChart;
