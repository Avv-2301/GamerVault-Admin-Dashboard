import Sidebar from '../Common/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0a0e27] text-gray-800 dark:text-[#e0e0e0] overflow-x-hidden">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default DashboardLayout

