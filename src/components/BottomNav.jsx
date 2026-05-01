import { Link, useLocation } from 'react-router-dom'

export default function BottomNav() {
  const location = useLocation()
  const path = location.pathname

  const tabs = [
    { to: '/', icon: '🏠', label: 'Home' },
    { to: '/prices', icon: '📊', label: 'Prices' },
    { to: '/marketplace', icon: '🛒', label: 'Market' },
    { to: '/post', icon: '➕', label: 'Post' },
    { to: '/farmers', icon: '🧑‍🌾', label: 'Farmers' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {tabs.map(tab => (
          <Link
            key={tab.to}
            to={tab.to}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <span className="text-xl">{tab.icon}</span>
            <span className={`text-[10px] font-medium ${
              path === tab.to ? 'text-[#1B6B45]' : 'text-gray-400'
            }`}>
              {tab.label}
            </span>
            {path === tab.to && (
              <div className="w-1 h-1 rounded-full bg-[#1B6B45]"></div>
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}