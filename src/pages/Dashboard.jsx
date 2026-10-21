import { useEffect, useState } from 'react'
import { FaGamepad, FaTag, FaRupeeSign, FaUsers, FaUser, FaTicketAlt, FaChartBar } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import TimeRangeSelector from '../components/ui/TimeRangeSelector'
import KPICard from '../components/Dashboard/KPICard'
import RevenueChart from '../components/Dashboard/RevenueChart'
import BarChart from '../components/Dashboard/BarChart'
import ActivityList from '../components/Dashboard/ActivityList'
import AlertsList from '../components/Dashboard/AlertsList'
import TransactionsTable from '../components/Dashboard/TransactionsTable'
import SupportTickets from '../components/Dashboard/SupportTickets'
import QuickActions from '../components/Dashboard/QuickActions'
import { getDashboardStats } from '../services/api/dashboard'
import { formatReportCurrency, formatReportNumber } from '../services/helper'

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('all')
  const [customDates, setCustomDates] = useState(null)
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getDashboardStats(timeRange, customDates)
      .then((data) => { if (active) setDashboard(data) })
      .catch(() => { if (active) setDashboard(null) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [timeRange, customDates])

  const handleTimeRangeChange = (range, dates) => {
    setLoading(true)
    setTimeRange(range)
    setCustomDates(dates)
  }

  const metrics = dashboard?.metrics
  const number = (value) => metrics ? formatReportNumber(value) : '—'
  const currency = (value) => metrics ? formatReportCurrency(value) : '—'

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] min-h-screen overflow-x-hidden max-w-full">
      <Header />
      <div className="mb-4 sm:mb-6 flex items-center gap-3 flex-wrap">
        <TimeRangeSelector onRangeChange={handleTimeRangeChange} defaultRange={timeRange} />
        {loading && <span className="text-xs text-gray-500">Loading dashboard…</span>}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <KPICard icon={FaGamepad} label="Total Games" value={number(metrics?.totalGames)} iconColor="green" />
        <KPICard icon={FaGamepad} label="Active Games" value={number(metrics?.activeGames)} iconColor="green" />
        <KPICard icon={FaTag} label="Active Discounts" value={number(metrics?.activeDiscounts)} iconColor="orange" />
        <KPICard icon={FaRupeeSign} label={timeRange === 'all' ? 'Revenue Today' : 'Revenue in Range'} value={currency(timeRange === 'all' ? metrics?.revenueToday : metrics?.revenueInRange)} iconColor="green" />
        <KPICard icon={FaUsers} label="Total Users" value={number(metrics?.totalUsers)} iconColor="purple" />
        <KPICard icon={FaUser} label="Active Today" value={number(metrics?.activeUsersToday)} iconColor="purple" />
        <KPICard icon={FaTicketAlt} label="Open Tickets" value="12" change="↑5.4% avg response, 2.3h" changeType="positive" iconColor="red" />
        <KPICard icon={FaChartBar} label="Avg Transaction" value={currency(metrics?.averageTransaction)} change={metrics ? `${number(metrics.paymentCount)} successful payments in range` : undefined} iconColor="green" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <RevenueChart series={dashboard?.revenueSeries || []} />
        <BarChart series={dashboard?.transactionSeries || []} />
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <TransactionsTable transactions={dashboard?.recentTransactions || []} />
        <ActivityList activities={dashboard?.recentActivity || []} />
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <SupportTickets />
        <AlertsList />
      </section>
      <section className="mb-4 sm:mb-6"><QuickActions /></section>
    </main>
  )
}

export default Dashboard
