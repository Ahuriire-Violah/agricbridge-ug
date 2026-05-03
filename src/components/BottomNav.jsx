import { Link, useLocation } from 'react-router-dom'

export default function BottomNav() {
  const location = useLocation()
  const path = location.pathname

  // Get user type from localStorage
  const stored = localStorage.getItem('agribridge_user')
  const user = stored ? JSON.parse(stored) : null
  const userType = user?.user_type

  const farmerTabs = [
    { to: '/farmer-dashboard', icon: '🏠', label: 'Home' },
    { to: '/post', icon: '➕', label: 'Post' },
    { to: '/prices', icon: '📊', label: 'Prices' },
    { to: '/farmers', icon: '🧑‍🌾', label: 'Network' },
    { to: '/ussd', icon: '📱', label: 'SMS' },
  ]

  const buyerTabs = [
    { to: '/buyer-dashboard', icon: '🏠', label: 'Home' },
    { to: '/marketplace', icon: '🛒', label: 'Market' },
    { to: '/prices', icon: '📊', label: 'Prices' },
    { to: '/farmers', icon: '🧑‍🌾', label: 'Farmers' },
    { to: '/ussd', icon: '📱', label: 'SMS' },
  ]

  const guestTabs = [
    { to: '/', icon: '🏠', label: 'Home' },
    { to: '/marketplace', icon: '🛒', label: 'Market' },
    { to: '/prices', icon: '📊', label: 'Prices' },
    { to: '/farmers', icon: '🧑‍🌾', label: 'Farmers' },
    { to: '/login', icon: '👤', label: 'Sign in' },
  ]

  const tabs = userType === 'farmer' ? farmerTabs : userType === 'buyer' ? buyerTabs : guestTabs

  const isActive = (tabPath) => {
    if (tabPath === '/farmer-dashboard' || tabPath === '/buyer-dashboard' || tabPath === '/') {
      return path === tabPath
    }
    return path === tabPath
  }

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#111614',
      borderTop: '1px solid rgba(201,168,76,0.15)',
      zIndex: 50,
      paddingBottom: 'env(safe-area-inset-bottom)'
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-around',
        alignItems: 'center', padding: '8px 0'
      }}>
        {tabs.map(tab => {
          const active = isActive(tab.to)
          return (
            <Link
              key={tab.to}
              to={tab.to}
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '3px',
                padding: '6px 12px', textDecoration: 'none',
                minWidth: '56px'
              }}>
              <span style={{ fontSize: '22px', lineHeight: 1 }}>{tab.icon}</span>
              <span style={{
                fontSize: '10px', fontWeight: active ? '700' : '500',
                color: active ? '#C9A84C' : 'rgba(255,255,255,0.35)',
                letterSpacing: '0.02em'
              }}>
                {tab.label}
              </span>
              {active && (
                <div style={{
                  width: '4px', height: '4px',
                  borderRadius: '50%',
                  background: '#C9A84C',
                  marginTop: '1px'
                }} />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}