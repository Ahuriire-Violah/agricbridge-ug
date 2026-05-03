import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ phone: '', pin: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    setError('')
    if (!form.phone || !form.pin) {
      setError('Please enter your phone number and PIN')
      return
    }
    setLoading(true)

    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('phone', form.phone)
      .eq('pin', form.pin)
      .single()

    setLoading(false)

    if (fetchError || !user) {
      setError('Wrong phone number or PIN. Please try again.')
      return
    }

    localStorage.setItem('agribridge_user', JSON.stringify(user))
    navigate(user.user_type === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard')
  }

  return (
    <div style={{
      minHeight:'100vh',
      background:'#080C0A',
      display:'flex',
      flexDirection:'column',
      position:'relative',
      overflow:'hidden'
    }}>

      {/* Background glow */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`radial-gradient(circle at 50% 20%, rgba(27,107,69,0.12) 0%, transparent 60%),
                         radial-gradient(circle at 80% 80%, rgba(201,168,76,0.06) 0%, transparent 50%)`,
        pointerEvents:'none'
      }}/>

      {/* Back button */}
      <div style={{padding:'20px 24px', position:'relative'}}>
        <button
          onClick={() => navigate('/')}
          style={{
            background:'rgba(255,255,255,0.08)',
            border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:'12px',
            padding:'8px 16px',
            color:'rgba(255,255,255,0.6)',
            fontSize:'13px',
            cursor:'pointer'
          }}>
          ← Back
        </button>
      </div>

      {/* Header */}
      <div style={{
        padding:'20px 24px 32px',
        position:'relative',
        textAlign:'center'
      }}>
        {/* Logo */}
        <div style={{
          width:'64px', height:'64px',
          borderRadius:'18px',
          background:'linear-gradient(135deg, #1B6B45 0%, #0D3D26 100%)',
          border:'1px solid rgba(201,168,76,0.3)',
          display:'flex', alignItems:'center', justifyContent:'center',
          margin:'0 auto 20px',
          boxShadow:'0 0 30px rgba(27,107,69,0.25)'
        }}>
          <span style={{fontSize:'30px'}}>🌱</span>
        </div>

        <h1 style={{
          fontSize:'28px', fontWeight:'800',
          color:'#FFFFFF',
          marginBottom:'6px',
          letterSpacing:'-0.3px'
        }}>
          Welcome back
        </h1>
        <p style={{
          fontSize:'14px',
          color:'rgba(255,255,255,0.4)'
        }}>
          Sign in to AgriBridge UG
        </p>
      </div>

      {/* Form */}
      <div style={{
        flex:1, padding:'0 24px 40px',
        position:'relative'
      }}>
        <div style={{
          background:'#111614',
          borderRadius:'24px',
          border:'1px solid rgba(201,168,76,0.15)',
          padding:'28px 20px'
        }}>

          {/* Phone */}
          <div style={{marginBottom:'20px'}}>
            <label style={{
              fontSize:'11px', fontWeight:'700',
              color:'rgba(255,255,255,0.4)',
              letterSpacing:'0.1em',
              textTransform:'uppercase',
              display:'block', marginBottom:'8px'
            }}>
              Phone number
            </label>
            <div style={{display:'flex'}}>
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

          {/* PIN */}
          <div style={{marginBottom:'24px'}}>
            <label style={{
              fontSize:'11px', fontWeight:'700',
              color:'rgba(255,255,255,0.4)',
              letterSpacing:'0.1em',
              textTransform:'uppercase',
              display:'block', marginBottom:'8px'
            }}>
              Your 4-digit PIN
            </label>
            <input
              value={form.pin}
              onChange={e => setForm({...form, pin: e.target.value})}
              placeholder="••••"
              type="password"
              maxLength={4}
              style={{
                width:'100%', padding:'16px',
                background:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(201,168,76,0.2)',
                borderRadius:'12px',
                color:'#FFFFFF',
                fontSize:'28px',
                textAlign:'center',
                letterSpacing:'0.5em',
                outline:'none'
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
            onClick={handleLogin}
            disabled={loading}
            style={{
              width:'100%', padding:'18px',
              borderRadius:'14px',
              background:'linear-gradient(135deg, #C9A84C 0%, #A8873A 100%)',
              border:'none', cursor:'pointer',
              fontSize:'16px', fontWeight:'800',
              color:'#080C0A',
              letterSpacing:'0.02em',
              opacity: loading ? 0.6 : 1
            }}>
            {loading ? 'Signing in...' : 'Sign in →'}
          </button>
        </div>

        {/* Divider */}
        <div style={{
          display:'flex', alignItems:'center',
          gap:'12px', margin:'24px 0'
        }}>
          <div style={{flex:1, height:'1px', background:'rgba(255,255,255,0.08)'}}/>
          <span style={{fontSize:'12px', color:'rgba(255,255,255,0.25)'}}>or</span>
          <div style={{flex:1, height:'1px', background:'rgba(255,255,255,0.08)'}}/>
        </div>

        {/* Sign up options */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
          <button
            onClick={() => navigate('/signup?type=farmer')}
            style={{
              padding:'14px',
              borderRadius:'14px',
              background:'transparent',
              border:'1px solid rgba(201,168,76,0.3)',
              color:'#C9A84C',
              fontSize:'13px', fontWeight:'700',
              cursor:'pointer'
            }}>
            🧑‍🌾 Join as farmer
          </button>
          <button
            onClick={() => navigate('/signup?type=buyer')}
            style={{
              padding:'14px',
              borderRadius:'14px',
              background:'transparent',
              border:'1px solid rgba(255,255,255,0.1)',
              color:'rgba(255,255,255,0.5)',
              fontSize:'13px', fontWeight:'700',
              cursor:'pointer'
            }}>
            🛒 Join as buyer
          </button>
        </div>
      </div>
    </div>
  )
}