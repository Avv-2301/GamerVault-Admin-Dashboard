import { formatReportCurrency } from '../../services/helper.js'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
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
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const RevenueChart = ({ series = [] }) => {
  const { darkMode } = useTheme()

  // Chart data configuration
  const chartData = useMemo(() => ({
    labels: series.map((item) => item.period),
    datasets: [
      {
        label: 'Revenue',
        data: series.map((item) => item.revenue),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
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
          callback: (value) => formatReportCurrency(value),
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
        <h3 className="text-gray-800 dark:text-white text-base sm:text-lg mb-1">Revenue Overview</h3>
        <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">Successful Razorpay and Stripe payments in the selected range.</p>
      </div>
      <div className="h-[200px] sm:h-[250px]">
        {series.length ? <Line data={chartData} options={chartOptions} /> : <div className="h-full flex items-center justify-center text-sm text-gray-500">No revenue in this range</div>}
      </div>
    </div>
  )
}

export default RevenueChart

