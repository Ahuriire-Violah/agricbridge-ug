import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const UGANDAN_DISTRICTS = [
  'Kampala','Wakiso','Mukono','Jinja','Mbale','Gulu','Lira',
  'Mbarara','Masaka','Kasese','Fort Portal','Arua','Soroti','Tororo',
  'Hoima','Kabale','Bushenyi','Iganga','Busia','Pallisa','Luwero',
  'Mityana','Mubende','Kiboga','Nakaseke','Nakasongola','Kayunga'
]

const EMOJIS = [
  { e: '🌽', label: 'Maize' },
  { e: '🫘', label: 'Beans' },
  { e: '🌾', label: 'Rice' },
  { e: '🍅', label: 'Tomatoes' },
  { e: '🥬', label: 'Cabbages' },
  { e: '🍠', label: 'Sweet potato' },
  { e: '🍌', label: 'Bananas' },
  { e: '☕', label: 'Coffee' },
  { e: '🟤', label: 'Vanilla' },
  { e: '🫚', label: 'Sunflower' },
  { e: '🥑', label: 'Avocado' },
  { e: '🍆', label: 'Eggplant' },
]

export default function PostListing() {
  const navigate = useNavigate()
  const stored = localStorage.getItem('agribridge_user')
  const user = stored ? JSON.parse(stored) : null

  const [form, setForm] = useState({
    product_name: '', quantity_kg: '', price_per_kg: '',
    district: user?.district || '', description: '', emoji: '🌾'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  async function handleSubmit() {
    setError('')
    if (!form.product_name || !form.quantity_kg || !form.price_per_kg || !form.district) {
      setError('Please fill in all required fields')
      return
    }
    setLoading(true)

    let farmer_id = user?.farmer_id

    if (!farmer_id) {
      const { data: farmer } = await supabase
        .from('farmers')
        .select('id')
        .limit(1)
        .single()
      farmer_id = farmer?.id
    }

    const { error: insertError } = await supabase
      .from('listings')
      .insert({
        ...form,
        farmer_id,
        quantity_kg: Number(form.quantity_kg),
        price_per_kg: Number(form.price_per_kg),
        is_local: true,
        is_available: true
      })

    setLoading(false)
    if (!insertError) {
      navigate('/farmer-dashboard')
    } else {
      setError('Something went wrong. Please try again.')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: '#FFFFFF',
    border: '1.5px solid #E2E0D8',
    borderRadius: '14px',
    color: '#1A1A18',
    fontSize: '15px',
    outline: 'none',
    marginTop: '8px',
    fontFamily: 'inherit'
  }

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '700',
    color: '#6B6B62',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    display: 'block'
  }

  return (
    <div style={{
      background: '#F4F6F4',
      minHeight: '100vh',
      paddingBottom: '80px'
    }}>

      {/* Dark green hero header */}
      <div style={{
        background: 'linear-gradient(160deg, #1B6B45 0%, #0D3D26 100%)',
        padding: '28px 20px 40px',
        position: 'relative'
      }}>
        {/* Gold top line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)'
        }} />

        <h1 style={{
          fontSize: '26px', fontWeight: '800',
          color: '#FFFFFF', marginBottom: '4px',
          letterSpacing: '-0.3px'
        }}>
          Post your produce
        </h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
          List your harvest for buyers to find directly
        </p>

        {/* Step indicator */}
        <div style={{
          display: 'flex', gap: '8px',
          alignItems: 'center', marginTop: '20px'
        }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px', height: '28px',
                borderRadius: '50%',
                background: step >= s
                  ? 'linear-gradient(135deg, #C9A84C, #A8873A)'
                  : 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px', fontWeight: '800',
                color: step >= s ? '#0D3D26' : 'rgba(255,255,255,0.4)'
              }}>
                {s}
              </div>
              <span style={{
                fontSize: '11px', fontWeight: '600',
                color: step >= s ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'
              }}>
                {s === 1 ? 'Product' : s === 2 ? 'Details' : 'Review'}
              </span>
              {s < 3 && (
                <div style={{
                  width: '20px', height: '1px',
                  background: step > s
                    ? '#C9A84C'
                    : 'rgba(255,255,255,0.2)'
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form card pulled up */}
      <div style={{
        padding: '0 16px',
        marginTop: '-16px',
        position: 'relative', zIndex: 10
      }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>

          {/* Step 1 — Product */}
          {step === 1 && (
            <div style={{ padding: '24px 20px' }}>
              <div style={{
                fontSize: '14px', fontWeight: '800',
                color: '#1B6B45', marginBottom: '20px',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <span style={{
                  width: '24px', height: '24px',
                  background: '#E8F7EE', borderRadius: '50%',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '12px',
                  fontWeight: '800', color: '#1B6B45'
                }}>1</span>
                What are you selling?
              </div>

              {/* Emoji picker */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Choose product icon</label>
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: '8px', marginTop: '10px'
                }}>
                  {EMOJIS.map(({ e, label }) => (
                    <button
                      key={e}
                      onClick={() => setForm({ ...form, emoji: e })}
                      title={label}
                      style={{
                        padding: '12px 6px',
                        borderRadius: '12px',
                        border: form.emoji === e
                          ? '2px solid #1B6B45'
                          : '1.5px solid #E2E0D8',
                        background: form.emoji === e ? '#E8F7EE' : '#FAFAF8',
                        fontSize: '22px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product name */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Product name *</label>
                <input
                  value={form.product_name}
                  onChange={e => setForm({ ...form, product_name: e.target.value })}
                  placeholder="e.g. Maize, Beans, Coffee"
                  style={inputStyle}
                />
              </div>

              {/* District */}
              <div style={{ marginBottom: '8px' }}>
                <label style={labelStyle}>Your district *</label>
                <select
                  value={form.district}
                  onChange={e => setForm({ ...form, district: e.target.value })}
                  style={{ ...inputStyle, color: form.district ? '#1A1A18' : '#9B9B90' }}
                >
                  <option value="">Select your district...</option>
                  {UGANDAN_DISTRICTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  if (!form.product_name || !form.district) {
                    setError('Please enter product name and district')
                    return
                  }
                  setError('')
                  setStep(2)
                }}
                style={{
                  width: '100%', padding: '16px',
                  marginTop: '20px',
                  borderRadius: '14px',
                  background: '#1B6B45',
                  border: 'none', cursor: 'pointer',
                  fontSize: '15px', fontWeight: '800',
                  color: '#FFFFFF'
                }}>
                Next — Add details →
              </button>
            </div>
          )}

          {/* Step 2 — Details */}
          {step === 2 && (
            <div style={{ padding: '24px 20px' }}>
              <div style={{
                fontSize: '14px', fontWeight: '800',
                color: '#1B6B45', marginBottom: '20px',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <span style={{
                  width: '24px', height: '24px',
                  background: '#E8F7EE', borderRadius: '50%',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '12px',
                  fontWeight: '800', color: '#1B6B45'
                }}>2</span>
                Quantity and price
              </div>

              {/* Quantity + Price */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '12px', marginBottom: '20px'
              }}>
                <div>
                  <label style={labelStyle}>Quantity (kg) *</label>
                  <input
                    type="number"
                    value={form.quantity_kg}
                    onChange={e => setForm({ ...form, quantity_kg: e.target.value })}
                    placeholder="e.g. 500"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Price per kg (UGX) *</label>
                  <input
                    type="number"
                    value={form.price_per_kg}
                    onChange={e => setForm({ ...form, price_per_kg: e.target.value })}
                    placeholder="e.g. 1200"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Price estimate */}
              {form.quantity_kg && form.price_per_kg && (
                <div style={{
                  background: '#E8F7EE',
                  border: '1px solid #BBE8D0',
                  borderRadius: '14px', padding: '14px 16px',
                  marginBottom: '20px',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{
                    fontSize: '13px', color: '#2A9660', fontWeight: '600'
                  }}>
                    Estimated total value
                  </span>
                  <span style={{
                    fontSize: '18px', fontWeight: '800', color: '#1B6B45'
                  }}>
                    UGX {(Number(form.quantity_kg) * Number(form.price_per_kg)).toLocaleString()}
                  </span>
                </div>
              )}

              {/* Description */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Description (optional)</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe quality, harvest date, how to collect..."
                  rows={3}
                  style={{
                    ...inputStyle,
                    resize: 'none',
                    lineHeight: '1.6'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1, padding: '16px',
                    borderRadius: '14px',
                    background: 'transparent',
                    border: '1.5px solid #E2E0D8',
                    cursor: 'pointer',
                    fontSize: '14px', fontWeight: '700',
                    color: '#6B6B62'
                  }}>
                  ← Back
                </button>
                <button
                  onClick={() => {
                    if (!form.quantity_kg || !form.price_per_kg) {
                      setError('Please enter quantity and price')
                      return
                    }
                    setError('')
                    setStep(3)
                  }}
                  style={{
                    flex: 2, padding: '16px',
                    borderRadius: '14px',
                    background: '#1B6B45',
                    border: 'none', cursor: 'pointer',
                    fontSize: '15px', fontWeight: '800',
                    color: '#FFFFFF'
                  }}>
                  Review listing →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 3 && (
            <div style={{ padding: '24px 20px' }}>
              <div style={{
                fontSize: '14px', fontWeight: '800',
                color: '#1B6B45', marginBottom: '20px',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <span style={{
                  width: '24px', height: '24px',
                  background: '#E8F7EE', borderRadius: '50%',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '12px',
                  fontWeight: '800', color: '#1B6B45'
                }}>3</span>
                Review your listing
              </div>

              {/* Preview card */}
              <div style={{
                background: '#0F1A14',
                borderRadius: '20px', overflow: 'hidden',
                marginBottom: '20px',
                border: '1px solid rgba(201,168,76,0.15)'
              }}>
                <div style={{ padding: '16px', display: 'flex', gap: '14px' }}>
                  <div style={{
                    width: '60px', height: '60px',
                    borderRadius: '16px',
                    background: 'rgba(27,107,69,0.2)',
                    border: '1px solid rgba(27,107,69,0.3)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '28px',
                    flexShrink: 0
                  }}>
                    {form.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      background: 'rgba(27,107,69,0.2)',
                      border: '1px solid rgba(77,200,130,0.2)',
                      borderRadius: '999px', padding: '2px 8px',
                      fontSize: '10px', fontWeight: '700',
                      color: '#4DC882', marginBottom: '6px'
                    }}>
                      🇺🇬 Made in Uganda
                    </div>
                    <div style={{
                      fontSize: '16px', fontWeight: '800',
                      color: '#FFFFFF', marginBottom: '2px'
                    }}>
                      {form.product_name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.4)',
                      marginBottom: '6px'
                    }}>
                      {user?.full_name} · {form.district}
                    </div>
                    <div style={{
                      fontSize: '20px', fontWeight: '800', color: '#C9A84C'
                    }}>
                      UGX {Number(form.price_per_kg).toLocaleString()}/kg
                    </div>
                    <div style={{
                      fontSize: '12px', color: 'rgba(255,255,255,0.3)'
                    }}>
                      {Number(form.quantity_kg).toLocaleString()}kg available
                    </div>
                  </div>
                </div>
              </div>

              {/* Posting as */}
              <div style={{
                background: '#E8F7EE',
                border: '1px solid #BBE8D0',
                borderRadius: '14px', padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '36px', height: '36px',
                  borderRadius: '50%',
                  background: '#1B6B45',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '13px',
                  fontWeight: '800', color: '#fff', flexShrink: 0
                }}>
                  {user?.full_name?.split(' ').map(n => n[0]).join('') || 'UG'}
                </div>
                <div>
                  <div style={{
                    fontSize: '13px', fontWeight: '700', color: '#1B6B45'
                  }}>
                    Posting as {user?.full_name || 'Verified Farmer'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#2A9660' }}>
                    {form.district} · ✔ Verified
                  </div>
                </div>
              </div>

              {error && (
                <div style={{
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '12px', padding: '12px 16px',
                  color: '#DC2626', fontSize: '13px',
                  marginBottom: '16px'
                }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    flex: 1, padding: '16px',
                    borderRadius: '14px',
                    background: 'transparent',
                    border: '1.5px solid #E2E0D8',
                    cursor: 'pointer',
                    fontSize: '14px', fontWeight: '700',
                    color: '#6B6B62'
                  }}>
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    flex: 2, padding: '16px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #C9A84C, #A8873A)',
                    border: 'none', cursor: 'pointer',
                    fontSize: '15px', fontWeight: '800',
                    color: '#0F1A14',
                    opacity: loading ? 0.6 : 1,
                    boxShadow: '0 4px 16px rgba(201,168,76,0.25)'
                  }}>
                  {loading ? 'Posting...' : 'Post listing →'}
                </button>
              </div>
            </div>
          )}

          {/* Error display for step 1 and 2 */}
          {error && step !== 3 && (
            <div style={{
              margin: '0 20px 20px',
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '12px', padding: '12px 16px',
              color: '#DC2626', fontSize: '13px'
            }}>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}