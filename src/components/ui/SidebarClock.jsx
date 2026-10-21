import { getClockHands, formatClockTime as formatTime, formatClockDate as formatDate } from '../../services/helper.js'
import { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'

const SidebarClock = () => {
  const { darkMode } = useTheme()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    // Update every 50ms for smooth movement
    const timer = setInterval(() => {
      setTime(new Date())
    }, 50)

    return () => clearInterval(timer)
  }, [])

  // Get clock hands

  const { hourAngle, minuteAngle, secondAngle } = getClockHands(time)
  
  // Format time in 12-hour format

  // Format date
  
  // Format time and date using helper functions
  const timeString = formatTime(time)
  const dateString = formatDate(time)

  // Theme-aware colors
  const clockFaceFill = darkMode ? '#141b2d' : '#f3f4f6'
  const clockFaceStroke = darkMode ? '#2a3441' : '#d1d5db'
  const markerColor = darkMode ? '#8b8fa3' : '#6b7280'
  const centerDotColor = darkMode ? '#8b8fa3' : '#6b7280'

  return (
    <div className="px-4 py-3 bg-gray-100 dark:bg-[#1e2742] rounded-lg border border-gray-200 dark:border-[#2a3441]">
      <div className="flex items-center gap-3">
        {/* Analog Clock */}
        <div className="relative w-12 h-12 flex-shrink-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Clock face circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill={clockFaceFill}
              stroke={clockFaceStroke}
              strokeWidth="2"
            />
            
            {/* Hour markers */}
            {[12, 3, 6, 9].map((hour) => {
              const angle = ((hour * 30) - 90) * (Math.PI / 180)
              const x1 = 50 + 35 * Math.cos(angle)
              const y1 = 50 + 35 * Math.sin(angle)
              const x2 = 50 + 40 * Math.cos(angle)
              const y2 = 50 + 40 * Math.sin(angle)
              return (
                <line
                  key={hour}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={markerColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )
            })}

            {/* Hour hand */}
            <line
              x1="50"
              y1="50"
              x2="70"
              y2="50"
              stroke={markerColor}
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${hourAngle - 90} 50 50)`}
            />

            {/* Minute hand */}
            <line
              x1="50"
              y1="50"
              x2="80"
              y2="50"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${minuteAngle - 90} 50 50)`}
            />

            {/* Second hand */}
            <line
              x1="50"
              y1="50"
              x2="85"
              y2="50"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform={`rotate(${secondAngle - 90} 50 50)`}
            />

            {/* Center dot */}
            <circle
              cx="50"
              cy="50"
              r="3"
              fill={centerDotColor}
            />
          </svg>
        </div>

        {/* Time and Date */}
        <div className="flex-1 min-w-0">
          <div className="text-gray-800 dark:text-white text-sm font-semibold leading-tight">
            {timeString}
          </div>
          <div className="text-gray-500 dark:text-[#8b8fa3] text-xs leading-tight">
            {dateString}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarClock
