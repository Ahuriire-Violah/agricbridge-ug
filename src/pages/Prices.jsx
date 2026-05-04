import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Prices() {
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')

  useEffect(() => { fetchPrices() }, [])

  async function fetchPrices() {
    setLoading(true)
    const { data, error } = await supabase
      .from('prices')
      .select('*')
      .order('crop_name')
    if (!error) setPrices(data)
    setLoading(false)
  }

  const categories = [
    { key: 'all', label: 'All crops', icon: '🌾' },
    { key: 'grain', label: 'Grains', icon: '🌽' },
    { key: 'veg', label: 'Vegetables', icon: '🥬' },
    { key: 'fruit', label: 'Fruits', icon: '🍌' },
    { key: 'cash', label: 'Cash crops', icon: '☕' },
  ]

  const filtered = category === 'all'
    ? prices
    : prices.filter(p => p.category === category)

  function getBestCity(row) {
    const vals = {
      Kampala: row.kampala,
      Gulu: row.gulu,
      Mbale: row.mbale,
      Mbarara: row.mbarara
    }
    return Object.entries(vals).sort((a, b) => b[1] - a[1])[0]
  }

  const cities = ['Kampala', 'Gulu', 'Mbale', 'Mbarara']
  const cityKeys = ['kampala', 'gulu', 'mbale', 'mbarara']
  const cityShort = ['KLA', 'GUL', 'MBL', 'MBR']

  return (
    <div style={{ background: '#080C0A', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Background glow */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(27,107,69,0.08) 0%, transparent 50%)`,
        pointerEvents: 'none', zIndex: 0
      }} />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0D1610 0%, #080C0A 100%)',
        padding: '20px 20px 0',
        position: 'relative', zIndex: 1
      }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{
                fontSize: '24px', fontWeight: '800',
                color: '#FFFFFF', marginBottom: '4px',
                letterSpacing: '-0.3px'
              }}>
                Market Prices
              </h1>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                Live prices across Uganda's major markets
              </p>
            </div>
            <div style={{
              background: 'rgba(27,107,69,0.2)',
              border: '1px solid rgba(27,107,69,0.4)',
              borderRadius: '10px', padding: '6px 12px',
              fontSize: '11px', fontWeight: '700',
              color: '#4DC882'
            }}>
              LIVE
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div style={{
          display: 'flex', gap: '8px',
          overflowX: 'auto', paddingBottom: '16px',
          scrollbarWidth: 'none'
        }}>
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '999px',
                whiteSpace: 'nowrap', cursor: 'pointer',
                background: category === cat.key
                  ? 'linear-gradient(135deg, #C9A84C, #A8873A)'
                  : 'rgba(255,255,255,0.06)',
                border: category === cat.key
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.1)',
                fontSize: '12px', fontWeight: '700',
                color: category === cat.key ? '#080C0A' : 'rgba(255,255,255,0.5)'
              }}>
              <span style={{ fontSize: '14px' }}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 20px', position: 'relative', zIndex: 1 }}>

        {/* Price alert */}
        <div style={{
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '16px', padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: '12px',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '20px' }}>📈</span>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '11px', fontWeight: '700',
              color: '#C9A84C', letterSpacing: '0.08em'
            }}>
              SMART INSIGHT
            </div>
            <div style={{
              fontSize: '13px', color: 'rgba(255,255,255,0.7)',
              marginTop: '2px', lineHeight: '1.4'
            }}>
              Maize prices in Kampala rose 12% this week. Best time to sell.
            </div>
          </div>
        </div>

        {/* City headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          gap: '4px', padding: '0 4px',
          marginBottom: '8px'
        }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
            CROP
          </div>
          {cityShort.map(c => (
            <div key={c} style={{
              fontSize: '10px', fontWeight: '700',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.08em', textAlign: 'center'
            }}>
              {c}
            </div>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
              Loading live prices...
            </p>
          </div>
        ) : (
          <div style={{
            background: '#111614',
            border: '1px solid rgba(201,168,76,0.1)',
            borderRadius: '20px', overflow: 'hidden'
          }}>
            {filtered.map((row, i) => {
              const [bestCity, bestVal] = getBestCity(row)
              return (
                <div key={row.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                  gap: '4px',
                  padding: '14px 16px',
                  borderBottom: i < filtered.length - 1
                    ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'
                }}>
                  {/* Crop name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{row.emoji}</span>
                    <div>
                      <div style={{
                        fontSize: '13px', fontWeight: '700',
                        color: '#FFFFFF', lineHeight: '1.2'
                      }}>
                        {row.crop_name}
                      </div>
                      <div style={{
                        fontSize: '10px', fontWeight: '600', marginTop: '2px',
                        color: row.trend === 'up' ? '#4DC882'
                          : row.trend === 'down' ? '#F87171'
                          : 'rgba(255,255,255,0.3)'
                      }}>
                        {row.trend === 'up' ? '↑ Rising'
                          : row.trend === 'down' ? '↓ Falling'
                          : '→ Stable'}
                      </div>
                    </div>
                  </div>

                  {/* City prices */}
                  {cityKeys.map((key, idx) => {
                    const val = row[key]
                    const isBest = val === bestVal
                    return (
                      <div key={key} style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: '12px', fontWeight: isBest ? '800' : '500',
                          color: isBest ? '#C9A84C' : 'rgba(255,255,255,0.35)',
                          lineHeight: '1.2'
                        }}>
                          {val?.toLocaleString()}
                        </div>
                        {isBest && (
                          <div style={{
                            fontSize: '9px', fontWeight: '700',
                            color: '#C9A84C', marginTop: '2px'
                          }}>
                            BEST
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}

        {/* Footer note */}
        <div style={{
          textAlign: 'center', marginTop: '16px',
          fontSize: '11px', color: 'rgba(255,255,255,0.2)',
          fontStyle: 'italic'
        }}>
          Powered by AgriBridge Market Intelligence · Prices in UGX per kg
        </div>
      </div>
    </div>
  )
}