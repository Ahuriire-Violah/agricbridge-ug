import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function FarmerDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [listings, setListings] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('agribridge_user')
    if (!stored) { navigate('/login'); return }
    const u = JSON.parse(stored)
    if (u.user_type !== 'farmer') { navigate('/buyer-dashboard'); return }
    setUser(u)
    fetchData(u)
  }, [])

  async function fetchData(u) {
    setLoading(true)
    if (u.farmer_id) {
      const { data: myListings } = await supabase
        .from('listings')
        .select('*')
        .eq('farmer_id', u.farmer_id)
        .order('created_at', { ascending: false })
      setListings(myListings || [])

      const listingIds = (myListings || []).map(l => l.id)
      if (listingIds.length > 0) {
        const { data: myOrders } = await supabase
          .from('orders')
          .select('*, listings(product_name)')
          .in('listing_id', listingIds)
          .order('created_at', { ascending: false })
        setOrders(myOrders || [])
      }
    }
    setLoading(false)
  }

  function logout() {
    localStorage.removeItem('agribridge_user')
    navigate('/')
  }

  if (loading) return (
    <div style={{minHeight:'100vh', background:'#080C0A', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'40px', marginBottom:'12px'}}>🌱</div>
        <p style={{color:'rgba(255,255,255,0.4)', fontSize:'14px'}}>Loading your dashboard...</p>
      </div>
    </div>
  )

  return (
    <div style={{background:'#080C0A', minHeight:'100vh', position:'relative'}}>

      {/* Background glow */}
      <div style={{
        position:'fixed', inset:0,
        backgroundImage:`radial-gradient(circle at 0% 0%, rgba(27,107,69,0.12) 0%, transparent 50%)`,
        pointerEvents:'none', zIndex:0
      }}/>

      {/* Header */}
      <div style={{
        background:'linear-gradient(160deg, #0D3D26 0%, #080C0A 100%)',
        padding:'48px 24px 32px',
        position:'relative', zIndex:1
      }}>
        {/* Top row */}
        <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'24px'}}>
          <div>
            <p style={{fontSize:'12px', color:'rgba(255,255,255,0.35)', marginBottom:'4px', letterSpacing:'0.05em'}}>
              FARMER DASHBOARD
            </p>
            <h1 style={{fontSize:'26px', fontWeight:'800', color:'#FFFFFF', marginBottom:'4px'}}>
              {user?.full_name?.split(' ')[0]} 👋
            </h1>
            <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
              <span style={{fontSize:'12px', color:'#C9A84C'}}>📍</span>
              <span style={{fontSize:'13px', color:'rgba(255,255,255,0.5)'}}>{user?.district}</span>
            </div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
            <div style={{
              width:'44px', height:'44px',
              borderRadius:'50%',
              background:'linear-gradient(135deg, #C9A84C, #A8873A)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontWeight:'800', fontSize:'15px', color:'#080C0A'
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

        {/* Stats */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px'}}>
          {[
            { val: listings.length, lbl: 'My listings', icon: '📦' },
            { val: orders.length, lbl: 'Orders received', icon: '📬' },
            { val: orders.filter(o=>o.status==='pending').length, lbl: 'Pending', icon: '⏳' },
          ].map(s => (
            <div key={s.lbl} style={{
              background:'rgba(255,255,255,0.05)',
              border:'1px solid rgba(201,168,76,0.15)',
              borderRadius:'16px', padding:'14px 12px',
              textAlign:'center'
            }}>
              <div style={{fontSize:'18px', marginBottom:'4px'}}>{s.icon}</div>
              <div style={{fontSize:'22px', fontWeight:'800', color:'#C9A84C'}}>{s.val}</div>
              <div style={{fontSize:'10px', color:'rgba(255,255,255,0.35)', marginTop:'2px', letterSpacing:'0.03em'}}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{padding:'20px 24px', position:'relative', zIndex:1}}>

        {/* Quick actions */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'20px'}}>
          <button onClick={() => navigate('/post')} style={{
            borderRadius:'20px', padding:'18px 16px',
            background:'linear-gradient(135deg, #C9A84C 0%, #A8873A 100%)',
            border:'none', cursor:'pointer',
            display:'flex', alignItems:'center', gap:'12px'
          }}>
            <span style={{fontSize:'24px'}}>➕</span>
            <div style={{textAlign:'left'}}>
              <div style={{fontWeight:'800', color:'#080C0A', fontSize:'14px'}}>Post produce</div>
              <div style={{fontSize:'11px', color:'rgba(0,0,0,0.5)', marginTop:'1px'}}>List your harvest</div>
            </div>
          </button>

          <button onClick={() => navigate('/prices')} style={{
            borderRadius:'20px', padding:'18px 16px',
            background:'rgba(255,255,255,0.05)',
            border:'1px solid rgba(27,107,69,0.4)',
            cursor:'pointer',
            display:'flex', alignItems:'center', gap:'12px'
          }}>
            <span style={{fontSize:'24px'}}>📊</span>
            <div style={{textAlign:'left'}}>
              <div style={{fontWeight:'800', color:'#FFFFFF', fontSize:'14px'}}>Check prices</div>
              <div style={{fontSize:'11px', color:'rgba(255,255,255,0.35)', marginTop:'1px'}}>Before you travel</div>
            </div>
          </button>
        </div>

        {/* Price alert */}
        <div style={{
          borderRadius:'16px', padding:'14px 16px',
          background:'rgba(201,168,76,0.08)',
          border:'1px solid rgba(201,168,76,0.2)',
          display:'flex', alignItems:'center', gap:'12px',
          marginBottom:'24px'
        }}>
          <span style={{fontSize:'20px'}}>📈</span>
          <div style={{flex:1}}>
            <div style={{fontSize:'11px', fontWeight:'700', color:'#C9A84C', letterSpacing:'0.08em'}}>LIVE PRICE ALERT</div>
            <div style={{fontSize:'13px', color:'rgba(255,255,255,0.7)', marginTop:'2px'}}>
              Maize up 12% in Kampala — best time to sell
            </div>
          </div>
          <button onClick={() => navigate('/prices')} style={{
            background:'#C9A84C', border:'none',
            borderRadius:'10px', padding:'8px 14px',
            fontSize:'12px', fontWeight:'700',
            color:'#080C0A', cursor:'pointer'
          }}>
            View
          </button>
        </div>

        {/* My listings */}
        <div style={{marginBottom:'20px'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px'}}>
            <p style={{fontSize:'11px', fontWeight:'700', color:'rgba(255,255,255,0.35)', letterSpacing:'0.1em', textTransform:'uppercase'}}>
              My listings
            </p>
            <button onClick={() => navigate('/post')} style={{
              background:'none', border:'none',
              color:'#C9A84C', fontSize:'12px',
              fontWeight:'700', cursor:'pointer'
            }}>
              + Add new
            </button>
          </div>

          {listings.length === 0 ? (
            <div style={{
              background:'#111614',
              border:'1px solid rgba(201,168,76,0.1)',
              borderRadius:'20px', padding:'32px 20px',
              textAlign:'center'
            }}>
              <div style={{fontSize:'36px', marginBottom:'10px'}}>🌾</div>
              <div style={{fontSize:'15px', fontWeight:'600', color:'rgba(255,255,255,0.6)', marginBottom:'6px'}}>
                No listings yet
              </div>
              <div style={{fontSize:'12px', color:'rgba(255,255,255,0.3)', marginBottom:'16px'}}>
                Post your first produce to start selling
              </div>
              <button onClick={() => navigate('/post')} style={{
                background:'linear-gradient(135deg, #C9A84C, #A8873A)',
                border:'none', borderRadius:'12px',
                padding:'10px 20px', fontSize:'13px',
                fontWeight:'800', color:'#080C0A', cursor:'pointer'
              }}>
                Post now →
              </button>
            </div>
          ) : (
            <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
              {listings.map(l => (
                <div key={l.id} style={{
                  background:'#111614',
                  border:'1px solid rgba(201,168,76,0.12)',
                  borderRadius:'16px', padding:'16px',
                  display:'flex', alignItems:'center', gap:'14px'
                }}>
                  <div style={{
                    width:'48px', height:'48px',
                    borderRadius:'14px',
                    background:'rgba(27,107,69,0.2)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'24px', flexShrink:0
                  }}>
                    {l.emoji}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:'700', fontSize:'14px', color:'#FFFFFF'}}>{l.product_name}</div>
                    <div style={{fontSize:'12px', color:'rgba(255,255,255,0.35)', marginTop:'2px'}}>
                      {l.quantity_kg?.toLocaleString()}kg · {l.district}
                    </div>
                    <div style={{fontSize:'15px', fontWeight:'800', color:'#C9A84C', marginTop:'4px'}}>
                      UGX {l.price_per_kg?.toLocaleString()}/kg
                    </div>
                  </div>
                  <div style={{
                    fontSize:'11px', fontWeight:'700',
                    padding:'4px 10px', borderRadius:'8px',
                    background: l.is_available ? 'rgba(27,107,69,0.2)' : 'rgba(255,255,255,0.05)',
                    color: l.is_available ? '#4DC882' : 'rgba(255,255,255,0.3)'
                  }}>
                    {l.is_available ? 'Live' : 'Sold'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Orders received */}
        <div style={{marginBottom:'40px'}}>
          <p style={{
            fontSize:'11px', fontWeight:'700',
            color:'rgba(255,255,255,0.35)',
            letterSpacing:'0.1em', textTransform:'uppercase',
            marginBottom:'14px'
          }}>
            Orders received
          </p>

          {orders.length === 0 ? (
            <div style={{
              background:'#111614',
              border:'1px solid rgba(201,168,76,0.1)',
              borderRadius:'20px', padding:'24px 20px',
              textAlign:'center'
            }}>
              <div style={{fontSize:'13px', color:'rgba(255,255,255,0.3)'}}>
                No orders yet — post your produce to start receiving orders
              </div>
            </div>
          ) : (
            <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
              {orders.map(o => (
                <div key={o.id} style={{
                  background:'#111614',
                  border:'1px solid rgba(201,168,76,0.12)',
                  borderRadius:'16px', padding:'16px'
                }}>
                  <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                    <div style={{fontWeight:'700', fontSize:'14px', color:'#FFFFFF'}}>
                      {o.listings?.product_name}
                    </div>
                    <span style={{
                      fontSize:'11px', fontWeight:'700',
                      padding:'3px 10px', borderRadius:'8px',
                      background:'rgba(201,168,76,0.15)',
                      color:'#C9A84C'
                    }}>
                      {o.status}
                    </span>
                  </div>
                  <div style={{fontSize:'12px', color:'rgba(255,255,255,0.4)', lineHeight:'1.8'}}>
                    <div>Buyer: <span style={{color:'rgba(255,255,255,0.7)'}}>{o.buyer_name}</span></div>
                    <div>Phone: <span style={{color:'#4DC882'}}>{o.buyer_phone}</span></div>
                    <div>Quantity: <span style={{color:'rgba(255,255,255,0.7)'}}>{o.quantity_kg}kg</span></div>
                  </div>
                  <div style={{
                    fontSize:'11px', color:'rgba(201,168,76,0.5)',
                    fontFamily:'monospace', marginTop:'8px'
                  }}>
                    {o.reference}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}