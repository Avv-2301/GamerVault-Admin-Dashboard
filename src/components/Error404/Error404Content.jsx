import { useNavigate } from 'react-router-dom'
import { FaExclamationTriangle, FaHome, FaArrowLeft, FaGamepad, FaUsers, FaChartBar } from 'react-icons/fa'

const Error404Content = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e27] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Error Card */}
        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          {/* Error Icon and Code */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[rgba(239,68,68,0.2)] to-[rgba(220,38,38,0.2)] rounded-2xl mb-6 border border-[rgba(239,68,68,0.3)]">
              <FaExclamationTriangle className="text-[#ef4444] text-6xl" />
            </div>
            <h1 className="text-gray-800 dark:text-white text-7xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-[#ef4444] to-[#dc2626] bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-gray-800 dark:text-white text-3xl md:text-4xl font-semibold mb-3">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-[#8b8fa3] text-base md:text-lg max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved to a different location.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <FaHome className="text-sm" />
              <span>Go to Dashboard</span>
            </button>
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-200 dark:hover:bg-[#2a3441] transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-[#1e2742]">
            <div className="text-center">
              <p className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-4">Quick Links</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 text-[#10b981] hover:text-[#059669] transition-colors text-sm"
                >
                  <FaChartBar className="text-sm" />
                  <span>Dashboard</span>
                </button>
                <span className="text-gray-300 dark:text-[#2a3441]">•</span>
                <button
                  onClick={() => navigate('/dashboard/games')}
                  className="flex items-center gap-2 text-[#10b981] hover:text-[#059669] transition-colors text-sm"
                >
                  <FaGamepad className="text-sm" />
                  <span>Games</span>
                </button>
                <span className="text-gray-300 dark:text-[#2a3441]">•</span>
                <button
                  onClick={() => navigate('/dashboard/users')}
                  className="flex items-center gap-2 text-[#10b981] hover:text-[#059669] transition-colors text-sm"
                >
                  <FaUsers className="text-sm" />
                  <span>Users</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-[#1e2742]">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-[#8b8fa3] text-xs">
              <FaGamepad className="text-[#10b981]" />
              <span>
                Need help? <a href="#" className="text-[#10b981] hover:text-[#059669] transition-colors font-medium">Contact Support</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error404Content

