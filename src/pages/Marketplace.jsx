import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import OrderModal from '../components/OrderModal'

export default function Marketplace() {
  const [listings, setListings] = useState([])
  const [bubuOn, setBubuOn] = useState(true)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedListing, setSelectedListing] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => { fetchListings() }, [])

  async function fetchListings() {
    setLoading(true)
    const { data, error } = await supabase
      .from('listings')
      .select('*, farmers(*)')
      .eq('is_available', true)
      .order('created_at', { ascending: false })
    if (!error) setListings(data)
    setLoading(false)
  }

  const categories = [
    { key: 'all', label: 'All', icon: '🌾' },
    { key: 'grain', label: 'Grains', icon: '🌽' },
    { key: 'veg', label: 'Vegetables', icon: '🥬' },
    { key: 'fruit', label: 'Fruits', icon: '🍌' },
    { key: 'cash', label: 'Cash crops', icon: '☕' },
  ]

  const filtered = listings
    .filter(l => !search || l.product_name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => bubuOn ? (b.is_local - a.is_local) : 0)

  return (
    <div style={{ background: '#080C0A', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Background glow */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: `radial-gradient(circle at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 50%)`,
        pointerEvents: 'none', zIndex: 0
      }} />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0D1610 0%, #080C0A 100%)',
        padding: '20px 20px 0',
        position: 'relative', zIndex: 1
      }}>
        {/* Title row */}
        <div style={{ marginBottom: '16px' }}>
          <h1 style={{
            fontSize: '24px', fontWeight: '800',
            color: '#FFFFFF', marginBottom: '4px',
            letterSpacing: '-0.3px'
          }}>
            Marketplace
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
            Direct from verified Ugandan farmers
          </p>
        </div>

        {/* Search bar */}
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
            placeholder="Search maize, beans, coffee..."
            style={{
              flex: 1, background: 'transparent',
              border: 'none', outline: 'none',
              color: '#FFFFFF', fontSize: '14px'
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{
              background: 'none', border: 'none',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '16px', cursor: 'pointer'
            }}>✕</button>
          )}
        </div>

        {/* BUBU toggle */}
        <button
          onClick={() => setBubuOn(!bubuOn)}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 14px', borderRadius: '12px',
            background: bubuOn ? 'rgba(27,107,69,0.15)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${bubuOn ? 'rgba(27,107,69,0.4)' : 'rgba(255,255,255,0.08)'}`,
            cursor: 'pointer', marginBottom: '16px'
          }}>
          <span style={{ fontSize: '16px' }}>🇺🇬</span>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{
              fontSize: '13px', fontWeight: '700',
              color: bubuOn ? '#4DC882' : 'rgba(255,255,255,0.4)'
            }}>
              Buy Uganda First
            </div>
            {bubuOn && (
              <div style={{ fontSize: '11px', color: 'rgba(77,200,130,0.6)', marginTop: '1px' }}>
                Ugandan products showing first
              </div>
            )}
          </div>
          <div style={{
            width: '36px', height: '20px',
            borderRadius: '999px',
            background: bubuOn ? '#1B6B45' : 'rgba(255,255,255,0.15)',
            position: 'relative', transition: 'background 0.2s'
          }}>
            <div style={{
              position: 'absolute', top: '4px',
              width: '12px', height: '12px',
              background: '#fff', borderRadius: '50%',
              transition: 'left 0.2s',
              left: bubuOn ? '20px' : '4px'
            }} />
          </div>
        </button>

        {/* Category chips */}
        <div style={{
          display: 'flex', gap: '8px',
          overflowX: 'auto', paddingBottom: '16px',
          scrollbarWidth: 'none'
        }}>
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '999px',
                whiteSpace: 'nowrap', cursor: 'pointer',
                background: activeCategory === cat.key
                  ? 'linear-gradient(135deg, #C9A84C, #A8873A)'
                  : 'rgba(255,255,255,0.06)',
                border: activeCategory === cat.key
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.1)',
                fontSize: '12px', fontWeight: '700',
                color: activeCategory === cat.key ? '#080C0A' : 'rgba(255,255,255,0.5)'
              }}>
              <span style={{ fontSize: '14px' }}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Listings */}
      <div style={{ padding: '16px 20px', position: 'relative', zIndex: 1 }}>

        {/* Count */}
        <p style={{
          fontSize: '11px', fontWeight: '700',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          marginBottom: '14px'
        }}>
          {filtered.length} listings available
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🌾</div>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
              Loading fresh produce...
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
            <div style={{ fontSize: '15px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
              No listings found
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
              Try a different search or check back later
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(listing => (
              <div key={listing.id} style={{
                background: '#111614',
                border: '1px solid rgba(201,168,76,0.1)',
                borderRadius: '20px', overflow: 'hidden',
                transition: 'border-color 0.2s'
              }}>
                {/* Card top */}
                <div style={{ padding: '16px', display: 'flex', gap: '14px' }}>

                  {/* Emoji */}
                  <div style={{
                    width: '64px', height: '64px',
                    borderRadius: '18px',
                    background: 'rgba(27,107,69,0.12)',
                    border: '1px solid rgba(27,107,69,0.2)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '32px',
                    flexShrink: 0
                  }}>
                    {listing.emoji}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {listing.is_local && (
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        background: 'rgba(27,107,69,0.2)',
                        border: '1px solid rgba(27,107,69,0.3)',
                        borderRadius: '999px',
                        padding: '2px 8px',
                        fontSize: '10px', fontWeight: '700',
                        color: '#4DC882', marginBottom: '6px'
                      }}>
                        🇺🇬 Made in Uganda
                      </div>
                    )}

                    <div style={{
                      fontSize: '16px', fontWeight: '800',
                      color: '#FFFFFF', marginBottom: '4px',
                      letterSpacing: '-0.2px'
                    }}>
                      {listing.product_name}
                    </div>

                    {listing.farmers && (
                      <div style={{ marginBottom: '6px' }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: '5px',
                          fontSize: '12px', color: 'rgba(255,255,255,0.45)'
                        }}>
                          <span style={{
                            width: '14px', height: '14px',
                            background: '#1B6B45', borderRadius: '50%',
                            display: 'inline-flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: '8px',
                            color: '#fff', flexShrink: 0
                          }}>✓</span>
                          {listing.farmers.name} · {listing.farmers.district}
                        </div>
                        <div style={{
                          fontSize: '12px', color: '#4DC882',
                          fontWeight: '600', marginTop: '2px'
                        }}>
                          {listing.farmers.phone}
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{
                        fontSize: '20px', fontWeight: '800',
                        color: '#C9A84C', letterSpacing: '-0.3px'
                      }}>
                        UGX {listing.price_per_kg?.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
                        per kg
                      </span>
                    </div>

                    <div style={{
                      fontSize: '12px', color: 'rgba(255,255,255,0.3)',
                      marginTop: '2px'
                    }}>
                      {listing.quantity_kg?.toLocaleString()}kg available
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{
                  height: '1px',
                  background: 'rgba(201,168,76,0.08)',
                  margin: '0 16px'
                }} />

                {/* Action */}
                <div style={{ padding: '12px 16px' }}>
                  <button
                    onClick={() => setSelectedListing(listing)}
                    style={{
                      width: '100%', padding: '14px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #C9A84C 0%, #A8873A 100%)',
                      border: 'none', cursor: 'pointer',
                      fontSize: '14px', fontWeight: '800',
                      color: '#080C0A', letterSpacing: '0.02em'
                    }}>
                    Request order →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedListing && (
        <OrderModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onSuccess={() => {
            setSelectedListing(null)
            fetchListings()
          }}
        />
      )}
    </div>
  )
}