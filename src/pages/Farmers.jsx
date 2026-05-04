import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Farmers() {
  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('all')

  useEffect(() => { fetchFarmers() }, [])

  async function fetchFarmers() {
    setLoading(true)
    const { data, error } = await supabase
      .from('farmers')
      .select('*')
      .order('rating', { ascending: false })
    if (!error) setFarmers(data)
    setLoading(false)
  }

  const districts = ['all', ...new Set(farmers.map(f => f.district).filter(Boolean))]

  const filtered = farmers
    .filter(f => selectedDistrict === 'all' || f.district === selectedDistrict)
    .filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.district?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ background: '#080C0A', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Background glow */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(27,107,69,0.1) 0%, transparent 50%)`,
        pointerEvents: 'none', zIndex: 0
      }} />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0D1610 0%, #080C0A 100%)',
        padding: '20px 20px 0',
        position: 'relative', zIndex: 1
      }}>
        <div style={{ marginBottom: '16px' }}>
          <h1 style={{
            fontSize: '24px', fontWeight: '800',
            color: '#FFFFFF', marginBottom: '4px',
            letterSpacing: '-0.3px'
          }}>
            Verified Farmers
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
            Identity-verified producers across Uganda
          </p>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: '#161C18',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '14px', padding: '12px 16px',
          marginBottom: '14px'
        }}>
          <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.25)' }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or district..."
            style={{
              flex: 1, background: 'transparent',
              border: 'none', outline: 'none',
              color: '#FFFFFF', fontSize: '14px'
            }}
          />
        </div>

        {/* District filter */}
        <div style={{
          display: 'flex', gap: '8px',
          overflowX: 'auto', paddingBottom: '16px',
          scrollbarWidth: 'none'
        }}>
          {districts.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDistrict(d)}
              style={{
                padding: '7px 14px', borderRadius: '999px',
                whiteSpace: 'nowrap', cursor: 'pointer',
                background: selectedDistrict === d
                  ? 'linear-gradient(135deg, #C9A84C, #A8873A)'
                  : 'rgba(255,255,255,0.06)',
                border: selectedDistrict === d
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.1)',
                fontSize: '12px', fontWeight: '700',
                color: selectedDistrict === d ? '#080C0A' : 'rgba(255,255,255,0.5)'
              }}>
              {d === 'all' ? '🇺🇬 All districts' : `📍 ${d}`}
            </button>
          ))}
        </div>
      </div>

      {/* Farmers list */}
      <div style={{ padding: '16px 20px', position: 'relative', zIndex: 1 }}>

        {/* Count */}
        <p style={{
          fontSize: '11px', fontWeight: '700',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          marginBottom: '14px'
        }}>
          {filtered.length} verified farmers
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🧑‍🌾</div>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
              Loading farmers...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#111614',
            border: '1px solid rgba(201,168,76,0.1)',
            borderRadius: '20px'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontSize: '15px', fontWeight: '600', color: 'rgba(255,255,255,0.5)' }}>
              No farmers found
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(farmer => (
              <div key={farmer.id} style={{
                background: '#111614',
                border: '1px solid rgba(201,168,76,0.1)',
                borderRadius: '20px', padding: '16px',
                display: 'flex', gap: '14px', alignItems: 'flex-start'
              }}>
                {/* Avatar */}
                <div style={{
                  width: '52px', height: '52px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #1B6B45, #0D3D26)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '17px', fontWeight: '800',
                  color: '#4DC882', flexShrink: 0
                }}>
                  {farmer.avatar_initials}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    gap: '8px', marginBottom: '4px', flexWrap: 'wrap'
                  }}>
                    <span style={{
                      fontSize: '15px', fontWeight: '800',
                      color: '#FFFFFF'
                    }}>
                      {farmer.name}
                    </span>
                    {farmer.verified && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '3px',
                        background: 'rgba(27,107,69,0.2)',
                        border: '1px solid rgba(27,107,69,0.4)',
                        borderRadius: '999px', padding: '2px 8px',
                        fontSize: '10px', fontWeight: '700', color: '#4DC882'
                      }}>
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  <div style={{
                    fontSize: '12px', color: 'rgba(255,255,255,0.4)',
                    marginBottom: '8px', display: 'flex',
                    alignItems: 'center', gap: '8px', flexWrap: 'wrap'
                  }}>
                    <span>📍 {farmer.district}</span>
                    <span>⭐ {farmer.rating}</span>
                    <span>{farmer.orders_completed} orders</span>
                  </div>

                  {/* Crops */}
                  {farmer.crops?.length > 0 && (
                    <div style={{
                      display: 'flex', flexWrap: 'wrap',
                      gap: '6px', marginBottom: '10px'
                    }}>
                      {farmer.crops.map(crop => (
                        <span key={crop} style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '999px', padding: '3px 10px',
                          fontSize: '11px', color: 'rgba(255,255,255,0.5)',
                          fontWeight: '500'
                        }}>
                          {crop}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Phone + Call button */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontSize: '13px', color: '#4DC882',
                      fontWeight: '600'
                    }}>
                      {farmer.phone}
                    </span>
                    <a href={`tel:${farmer.phone}`} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      background: 'linear-gradient(135deg, #C9A84C, #A8873A)',
                      border: 'none', borderRadius: '10px',
                      padding: '8px 14px',
                      fontSize: '12px', fontWeight: '700',
                      color: '#080C0A', textDecoration: 'none'
                    }}>
                      📞 Call
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}