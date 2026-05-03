import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const DISTRICTS = [
  'Kampala','Wakiso','Mukono','Jinja','Mbale','Gulu','Lira',
  'Mbarara','Masaka','Kasese','Fort Portal','Arua','Soroti','Tororo',
  'Hoima','Kabale','Bushenyi','Iganga','Busia','Pallisa'
]

export default function Signup() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const userType = searchParams.get('type') || 'buyer'
  const isFarmer = userType === 'farmer'

  const [form, setForm] = useState({
    full_name: '', phone: '', pin: '', confirm_pin: '', district: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inputStyle = {
    width:'100%', padding:'14px 16px',
    background:'rgba(255,255,255,0.05)',
    border:'1px solid rgba(201,168,76,0.2)',
    borderRadius:'12px',
    color:'#FFFFFF', fontSize:'15px',
    outline:'none', marginTop:'8px'
  }

  const labelStyle = {
    fontSize:'11px', fontWeight:'700',
    color:'rgba(255,255,255,0.4)',
    letterSpacing:'0.1em',
    textTransform:'uppercase',
    display:'block'
  }

  async function handleSignup() {
    setError('')
    if (!form.full_name || !form.phone || !form.pin || !form.confirm_pin) {
      setError('Please fill in all fields')
      return
    }
    if (form.pin.length !== 4 || isNaN(form.pin)) {
      setError('PIN must be exactly 4 numbers')
      return
    }
    if (form.pin !== form.confirm_pin) {
      setError('PINs do not match')
      return
    }
    if (isFarmer && !form.district) {
      setError('Please select your district')
      return
    }

    setLoading(true)

    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('phone', form.phone)
      .single()

    if (existing) {
      setError('This phone number is already registered')
      setLoading(false)
      return
    }

    let farmer_id = null
    if (isFarmer) {
      const initials = form.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
      const { data: farmer } = await supabase
        .from('farmers')
        .insert({
          name: form.full_name,
          phone: form.phone,
          district: form.district,
          avatar_initials: initials,
          verified: false,
          crops: [],
          orders_completed: 0,
          rating: 5.0
        })
        .select()
        .single()
      farmer_id = farmer?.id
    }

    const { error: userError } = await supabase
      .from('users')
      .insert({
        full_name: form.full_name,
        phone: form.phone,
        pin: form.pin,
        user_type: userType,
        district: form.district || null,
        farmer_id: farmer_id
      })

    setLoading(false)

    if (userError) {
      setError('Something went wrong. Please try again.')
      return
    }

    localStorage.setItem('agribridge_user', JSON.stringify({
      full_name: form.full_name,
      phone: form.phone,
      user_type: userType,
      district: form.district,
      farmer_id: farmer_id
    }))

    navigate(isFarmer ? '/farmer-dashboard' : '/buyer-dashboard')
  }

  return (
    <div style={{
      minHeight:'100vh',
      background:'#080C0A',
      position:'relative',
      overflow:'hidden'
    }}>

      {/* Background glow */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`radial-gradient(circle at 30% 10%, rgba(27,107,69,0.12) 0%, transparent 50%),
                         radial-gradient(circle at 70% 90%, rgba(201,168,76,0.06) 0%, transparent 50%)`,
        pointerEvents:'none'
      }}/>

      {/* Header */}
      <div style={{
        padding:'20px 24px 24px',
        position:'relative',
        display:'flex', alignItems:'center', gap:'16px'
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background:'rgba(255,255,255,0.08)',
            border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:'12px',
            padding:'8px 14px',
            color:'rgba(255,255,255,0.6)',
            fontSize:'13px', cursor:'pointer'
          }}>
          ←
        </button>
        <div>
          <h1 style={{fontSize:'20px', fontWeight:'800', color:'#FFFFFF', marginBottom:'2px'}}>
            {isFarmer ? '🧑‍🌾 Join as Farmer' : '🛒 Join as Buyer'}
          </h1>
          <p style={{fontSize:'12px', color:'rgba(255,255,255,0.35)'}}>
            Create your AgriBridge account
          </p>
        </div>
      </div>

      {/* User type badge */}
      <div style={{padding:'0 24px 20px', position:'relative'}}>
        <div style={{
          borderRadius:'16px', padding:'14px 16px',
          display:'flex', alignItems:'center', gap:'12px',
          background: isFarmer ? 'rgba(27,107,69,0.15)' : 'rgba(201,168,76,0.08)',
          border: `1px solid ${isFarmer ? 'rgba(27,107,69,0.4)' : 'rgba(201,168,76,0.2)'}`
        }}>
          <span style={{fontSize:'28px'}}>{isFarmer ? '🧑‍🌾' : '🛒'}</span>
          <div>
            <div style={{fontSize:'13px', fontWeight:'700',
              color: isFarmer ? '#4DC882' : '#C9A84C'}}>
              {isFarmer ? 'Farmer account' : 'Buyer account'}
            </div>
            <div style={{fontSize:'12px', color:'rgba(255,255,255,0.35)', marginTop:'2px'}}>
              {isFarmer
                ? 'List produce and connect with buyers'
                : 'Browse and order from verified farmers'}
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{padding:'0 24px 40px', position:'relative'}}>
        <div style={{
          background:'#111614',
          borderRadius:'24px',
          border:'1px solid rgba(201,168,76,0.15)',
          padding:'24px 20px'
        }}>

          {/* Full name */}
          <div style={{marginBottom:'20px'}}>
            <label style={labelStyle}>Full name</label>
            <input
              value={form.full_name}
              onChange={e => setForm({...form, full_name: e.target.value})}
              placeholder="e.g. John Okello"
              style={inputStyle}
            />
          </div>

          {/* Phone */}
          <div style={{marginBottom:'20px'}}>
            <label style={labelStyle}>Phone number</label>
            <div style={{display:'flex', marginTop:'8px'}}>
              <div style={{
                padding:'14px 12px',
                background:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(201,168,76,0.2)',
                borderRight:'none',
                borderRadius:'12px 0 0 12px',
                display:'flex', alignItems:'center'
              }}>
                <span style={{fontSize:'13px', color:'rgba(255,255,255,0.4)'}}>+256</span>
              </div>
              <input
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                placeholder="700 123 456"
                type="tel"
                style={{
                  flex:1, padding:'14px',
                  background:'rgba(255,255,255,0.05)',
                  border:'1px solid rgba(201,168,76,0.2)',
                  borderRadius:'0 12px 12px 0',
                  color:'#FFFFFF', fontSize:'15px',
                  outline:'none'
                }}
              />
            </div>
          </div>

          {/* District — farmers only */}
          {isFarmer && (
            <div style={{marginBottom:'20px'}}>
              <label style={labelStyle}>Your district</label>
              <select
                value={form.district}
                onChange={e => setForm({...form, district: e.target.value})}
                style={{...inputStyle,
                  background:'rgba(255,255,255,0.05)',
                  color: form.district ? '#FFFFFF' : 'rgba(255,255,255,0.3)'
                }}
              >
                <option value="" style={{background:'#111614'}}>Select your district...</option>
                {DISTRICTS.map(d => (
                  <option key={d} value={d} style={{background:'#111614'}}>{d}</option>
                ))}
              </select>
            </div>
          )}

          {/* PIN */}
          <div style={{marginBottom:'20px'}}>
            <label style={labelStyle}>Create 4-digit PIN</label>
            <input
              value={form.pin}
              onChange={e => setForm({...form, pin: e.target.value})}
              placeholder="••••"
              type="password"
              maxLength={4}
              style={{
                ...inputStyle,
                textAlign:'center',
                letterSpacing:'0.5em',
                fontSize:'24px'
              }}
            />
          </div>

          {/* Confirm PIN */}
          <div style={{marginBottom:'24px'}}>
            <label style={labelStyle}>Confirm PIN</label>
            <input
              value={form.confirm_pin}
              onChange={e => setForm({...form, confirm_pin: e.target.value})}
              placeholder="••••"
              type="password"
              maxLength={4}
              style={{
                ...inputStyle,
                textAlign:'center',
                letterSpacing:'0.5em',
                fontSize:'24px'
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background:'rgba(220,38,38,0.1)',
              border:'1px solid rgba(220,38,38,0.3)',
              borderRadius:'12px',
              padding:'12px 16px',
              color:'#FCA5A5',
              fontSize:'13px',
              marginBottom:'16px'
            }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSignup}
            disabled={loading}
            style={{
              width:'100%', padding:'18px',
              borderRadius:'14px',
              background:'linear-gradient(135deg, #C9A84C 0%, #A8873A 100%)',
              border:'none', cursor:'pointer',
              fontSize:'16px', fontWeight:'800',
              color:'#080C0A',
              opacity: loading ? 0.6 : 1
            }}>
            {loading ? 'Creating account...' : 'Create account →'}
          </button>
        </div>

        {/* Sign in link */}
        <p style={{
          textAlign:'center', marginTop:'20px',
          fontSize:'13px', color:'rgba(255,255,255,0.3)'
        }}>
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            style={{
              background:'none', border:'none',
              color:'#C9A84C', fontWeight:'700',
              fontSize:'13px', cursor:'pointer'
            }}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}