import { formatReportNumber } from '../../services/helper.js'
import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const BarChart = ({ series = [] }) => {
  const { darkMode } = useTheme()

  // Chart data configuration
  const chartData = useMemo(() => ({
    labels: series.map((item) => item.period),
    datasets: [
      {
        label: 'Transactions',
        data: series.map((item) => item.count),
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  }), [series])

  // Chart options configuration
  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formatReportNumber(value),
          color: darkMode ? '#8b8fa3' : '#6b7280',
          font: {
            size: 11,
          },
        },
        grid: {
          color: darkMode ? '#1e2742' : '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: darkMode ? '#8b8fa3' : '#6b7280',
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  }), [darkMode])

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg sm:rounded-xl p-3 sm:p-4">
      <div className="mb-3 sm:mb-4">
        <h3 className="text-gray-800 dark:text-white text-base sm:text-lg mb-1">Transaction Volume</h3>
        <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">Transaction count in the selected range.</p>
      </div>
      <div className="h-[200px] sm:h-[250px]">
        {series.length ? <Bar data={chartData} options={chartOptions} /> : <div className="h-full flex items-center justify-center text-sm text-gray-500">No transactions in this range</div>}
      </div>
    </div>
  )
}

export default BarChart
