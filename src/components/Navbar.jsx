import { useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const stored = localStorage.getItem('agribridge_user')
  const user = stored ? JSON.parse(stored) : null

  const getTitle = () => {
    const path = location.pathname
    if (path === '/prices') return 'Market Prices'
    if (path === '/marketplace') return 'Marketplace'
    if (path === '/farmers') return 'Farmers'
    if (path === '/post') return 'Post Produce'
    if (path === '/ussd') return 'SMS & USSD'
    if (path === '/home') return 'AgriBridge UG'
    return 'AgriBridge UG'
  }

  return (
    <nav style={{
      background: '#080C0A',
      borderBottom: '1px solid rgba(201,168,76,0.15)',
      padding: '14px 20px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '8px', height: '8px',
          borderRadius: '50%',
          background: '#C9A84C'
        }} />
        <span style={{
          color: '#FFFFFF', fontWeight: '800',
          fontSize: '16px', letterSpacing: '-0.2px'
        }}>
          {getTitle()}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {user && (
          <div style={{
            fontSize: '12px', fontWeight: '600',
            color: 'rgba(255,255,255,0.4)'
          }}>
            {user.full_name?.split(' ')[0]}
          </div>
        )}
        <div style={{
          background: 'rgba(201,168,76,0.15)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: '999px',
          padding: '3px 10px',
          fontSize: '11px', fontWeight: '800',
          color: '#C9A84C', letterSpacing: '0.05em'
        }}>
          BUBU
        </div>
      </div>
    </nav>
  )
}