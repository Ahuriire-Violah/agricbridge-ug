import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import OrderModal from '../components/OrderModal'

export default function BuyerDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [bubuOn, setBubuOn] = useState(true)
  const [selectedListing, setSelectedListing] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('agribridge_user')
    if (!stored) { navigate('/login'); return }
    const u = JSON.parse(stored)
    if (u.user_type !== 'buyer') { navigate('/farmer-dashboard'); return }
    setUser(u)
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const { data } = await supabase
      .from('listings')
      .select('*, farmers(*)')
      .eq('is_available', true)
      .order('created_at', { ascending: false })
    setListings(data || [])
    setLoading(false)
  }

  function logout() {
    localStorage.removeItem('agribridge_user')
    navigate('/')
  }

  const filtered = listings
    .filter(l => !search || l.product_name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => bubuOn ? (b.is_local - a.is_local) : 0)

  if (loading) return (
    <div style={{minHeight:'100vh', background:'#080C0A', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'40px', marginBottom:'12px'}}>🛒</div>
        <p style={{color:'rgba(255,255,255,0.4)', fontSize:'14px'}}>Loading your dashboard...</p>
      </div>
    </div>
  )

  return (
    <div style={{background:'#080C0A', minHeight:'100vh', position:'relative'}}>

      {/* Background glow */}
      <div style={{
        position:'fixed', inset:0,
        backgroundImage:`radial-gradient(circle at 100% 0%, rgba(201,168,76,0.06) 0%, transparent 50%)`,
        pointerEvents:'none', zIndex:0
      }}/>

      {/* Header */}
      <div style={{
        background:'linear-gradient(160deg, #0A1628 0%, #080C0A 100%)',
        padding:'48px 24px 28px',
        position:'relative', zIndex:1,
        borderBottom:'1px solid rgba(201,168,76,0.1)'
      }}>
        <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'20px'}}>
          <div>
            <p style={{fontSize:'12px', color:'rgba(255,255,255,0.35)', marginBottom:'4px', letterSpacing:'0.05em'}}>
              BUYER DASHBOARD
            </p>
            <h1 style={{fontSize:'26px', fontWeight:'800', color:'#FFFFFF', marginBottom:'4px'}}>
              {user?.full_name?.split(' ')[0]} 👋
            </h1>
            <p style={{fontSize:'13px', color:'rgba(255,255,255,0.4)'}}>
              Find fresh Ugandan produce
            </p>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
            <div style={{
              width:'44px', height:'44px',
              borderRadius:'50%',
              background:'linear-gradient(135deg, #1B6B45, #0D3D26)',
              border:'1px solid rgba(201,168,76,0.3)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontWeight:'800', fontSize:'15px', color:'#4DC882'
            }}>
              {user?.full_name?.split(' ').map(n=>n[0]).join('')}
            </div>
            <button onClick={logout} style={{
              background:'rgba(255,255,255,0.06)',
              border:'1px solid rgba(255,255,255,0.1)',
              borderRadius:'10px', padding:'6px 12px',
              color:'rgba(255,255,255,0.4)', fontSize:'12px', cursor:'pointer'
            }}>
              Exit
            </button>
          </div>
        </div>

        {/* BUBU toggle */}
        <button
          onClick={() => setBubuOn(!bubuOn)}
          style={{
            display:'flex', alignItems:'center', gap:'10px',
            padding:'10px 16px', borderRadius:'12px',
            background: bubuOn ? 'rgba(27,107,69,0.2)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${bubuOn ? 'rgba(27,107,69,0.5)' : 'rgba(255,255,255,0.1)'}`,
            cursor:'pointer', width:'100%', marginBottom:'4px'
          }}>
          <span style={{fontSize:'16px'}}>🇺🇬</span>
          <span style={{fontSize:'13px', fontWeight:'700',
            color: bubuOn ? '#4DC882' : 'rgba(255,255,255,0.4)'}}>
            Buy Uganda First
          </span>
          <div style={{
            width:'32px', height:'18px',
            borderRadius:'999px',
            background: bubuOn ? '#1B6B45' : 'rgba(255,255,255,0.15)',
            position:'relative', marginLeft:'auto',
            transition:'background 0.2s'
          }}>
            <div style={{
              position:'absolute', top:'3px',
              width:'12px', height:'12px',
              background:'#fff', borderRadius:'50%',
              transition:'left 0.2s',
              left: bubuOn ? '17px' : '3px'
            }}/>
          </div>
        </button>
      </div>

      {/* Content */}
      <div style={{padding:'20px 24px', position:'relative', zIndex:1}}>

        {/* Search */}
        <div style={{
          display:'flex', alignItems:'center', gap:'12px',
          background:'#111614',
          border:'1px solid rgba(201,168,76,0.15)',
          borderRadius:'16px', padding:'14px 16px',
          marginBottom:'16px'
        }}>
          <span style={{color:'rgba(255,255,255,0.3)', fontSize:'16px'}}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search maize, beans, coffee..."
            style={{
              flex:1, background:'transparent',
              border:'none', outline:'none',
              color:'#FFFFFF', fontSize:'14px'
            }}
          />
        </div>

        {/* BUBU notice */}
        {bubuOn && (
          <div style={{
            borderRadius:'12px', padding:'8px 14px',
            background:'rgba(27,107,69,0.1)',
            border:'1px solid rgba(27,107,69,0.25)',
            fontSize:'12px', color:'#4DC882',
            marginBottom:'16px', fontWeight:'500'
          }}>
            🇺🇬 Showing Ugandan products first · BUBU filter ON
          </div>
        )}

        {/* Quick actions */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px', marginBottom:'20px'}}>
          {[
            { icon:'📊', label:'Prices', path:'/prices' },
            { icon:'🧑‍🌾', label:'Farmers', path:'/farmers' },
            { icon:'📱', label:'SMS/USSD', path:'/ussd' },
          ].map(a => (
            <button key={a.path} onClick={() => navigate(a.path)} style={{
              background:'#111614',
              border:'1px solid rgba(201,168,76,0.1)',
              borderRadius:'16px', padding:'14px 8px',
              textAlign:'center', cursor:'pointer'
            }}>
              <div style={{fontSize:'22px', marginBottom:'4px'}}>{a.icon}</div>
              <div style={{fontSize:'11px', fontWeight:'600', color:'rgba(255,255,255,0.5)'}}>{a.label}</div>
            </button>
          ))}
        </div>

        {/* Listings header */}
        <p style={{
          fontSize:'11px', fontWeight:'700',
          color:'rgba(255,255,255,0.35)',
          letterSpacing:'0.1em', textTransform:'uppercase',
          marginBottom:'14px'
        }}>
          Fresh produce · {filtered.length} listings
        </p>

        {/* Listings */}
        {loading ? (
          <div style={{textAlign:'center', padding:'40px 0', color:'rgba(255,255,255,0.3)', fontSize:'14px'}}>
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            background:'#111614',
            border:'1px solid rgba(201,168,76,0.1)',
            borderRadius:'20px', padding:'32px',
            textAlign:'center'
          }}>
            <div style={{fontSize:'13px', color:'rgba(255,255,255,0.3)'}}>No listings found</div>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:'12px', paddingBottom:'40px'}}>
            {filtered.map(listing => (
              <div key={listing.id} style={{
                background:'#111614',
                border:'1px solid rgba(201,168,76,0.12)',
                borderRadius:'20px', overflow:'hidden'
              }}>
                <div style={{padding:'16px', display:'flex', gap:'14px'}}>
                  <div style={{
                    width:'56px', height:'56px',
                    borderRadius:'16px',
                    background:'rgba(27,107,69,0.15)',
                    border:'1px solid rgba(27,107,69,0.2)',
                    display:'flex', alignItems:'center',
                    justifyContent:'center', fontSize:'28px',
                    flexShrink:0
                  }}>
                    {listing.emoji}
                  </div>
                  <div style={{flex:1}}>
                    {listing.is_local && (
                      <div style={{
                        display:'inline-block',
                        background:'rgba(27,107,69,0.2)',
                        border:'1px solid rgba(27,107,69,0.3)',
                        borderRadius:'999px',
                        padding:'2px 8px',
                        fontSize:'10px', fontWeight:'700',
                        color:'#4DC882', marginBottom:'4px'
                      }}>
                        🇺🇬 Made in Uganda
                      </div>
                    )}
                    <div style={{fontWeight:'700', fontSize:'15px', color:'#FFFFFF', marginBottom:'2px'}}>
                      {listing.product_name}
                    </div>
                    {listing.farmers && (
                      <>
                        <div style={{fontSize:'12px', color:'rgba(255,255,255,0.4)', display:'flex', alignItems:'center', gap:'4px'}}>
                          <span style={{
                            width:'14px', height:'14px',
                            background:'#1B6B45', borderRadius:'50%',
                            display:'inline-flex', alignItems:'center',
                            justifyContent:'center', fontSize:'8px', color:'#fff'
                          }}>✓</span>
                          {listing.farmers.name} · {listing.farmers.district}
                        </div>
                        <div style={{fontSize:'12px', color:'#4DC882', fontWeight:'500', marginTop:'1px'}}>
                          {listing.farmers.phone}
                        </div>
                      </>
                    )}
                    <div style={{fontSize:'18px', fontWeight:'800', color:'#C9A84C', marginTop:'6px'}}>
                      UGX {listing.price_per_kg?.toLocaleString()}/kg
                    </div>
                    <div style={{fontSize:'12px', color:'rgba(255,255,255,0.3)'}}>
                      {listing.quantity_kg?.toLocaleString()}kg available
                    </div>
                  </div>
                </div>
                <div style={{padding:'0 16px 16px'}}>
                  <button
                    onClick={() => setSelectedListing(listing)}
                    style={{
                      width:'100%', padding:'12px',
                      borderRadius:'12px',
                      background:'linear-gradient(135deg, #C9A84C, #A8873A)',
                      border:'none', cursor:'pointer',
                      fontSize:'14px', fontWeight:'800',
                      color:'#080C0A'
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
            fetchData()
          }}
        />
      )}
    </div>
  )
}