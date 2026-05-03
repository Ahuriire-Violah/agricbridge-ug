import { useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight:'100vh',
      background:'#080C0A',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'space-between',
      padding:'48px 24px',
      position:'relative',
      overflow:'hidden'
    }}>

      {/* Background subtle pattern */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`radial-gradient(circle at 20% 20%, rgba(27,107,69,0.15) 0%, transparent 50%),
                         radial-gradient(circle at 80% 80%, rgba(201,168,76,0.08) 0%, transparent 50%)`,
        pointerEvents:'none'
      }}/>

      {/* Top spacer */}
      <div/>

      {/* Center content */}
      <div style={{textAlign:'center', width:'100%', position:'relative'}}>

        {/* Logo mark */}
        <div style={{
          width:'88px', height:'88px',
          borderRadius:'24px',
          background:'linear-gradient(135deg, #1B6B45 0%, #0D3D26 100%)',
          border:'1px solid rgba(201,168,76,0.3)',
          display:'flex', alignItems:'center', justifyContent:'center',
          margin:'0 auto 28px',
          boxShadow:'0 0 40px rgba(27,107,69,0.3)'
        }}>
          <span style={{fontSize:'44px'}}>🌱</span>
        </div>

        {/* Brand name */}
        <h1 style={{
          fontSize:'36px', fontWeight:'800',
          color:'#FFFFFF',
          letterSpacing:'-0.5px',
          marginBottom:'8px',
          lineHeight:'1.1'
        }}>
          AgriBridge
          <span style={{color:'#C9A84C'}}> UG</span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize:'15px',
          color:'rgba(255,255,255,0.5)',
          marginBottom:'6px',
          letterSpacing:'0.02em'
        }}>
          Uganda produces. Uganda profits.
        </p>

        {/* Subtitle */}
        <p style={{
          fontSize:'13px',
          color:'rgba(255,255,255,0.3)',
          marginBottom:'4px',
          letterSpacing:'0.01em'
        }}>
          The digital marketplace for Ugandan farmers and buyers
        </p>

        {/* Gold divider */}
        <div style={{
          width:'40px', height:'2px',
          background:'linear-gradient(90deg, transparent, #C9A84C, transparent)',
          margin:'16px auto 24px'
        }}/>

        {/* Stats strip */}
        <div style={{
          display:'flex', justifyContent:'center', gap:'32px',
          marginBottom:'8px'
        }}>
          {[
            { val: '6+', lbl: 'Districts' },
            { val: '100%', lbl: 'Ugandan' },
            { val: 'BUBU', lbl: 'Certified' },
          ].map(s => (
            <div key={s.val} style={{textAlign:'center'}}>
              <div style={{fontSize:'18px', fontWeight:'800', color:'#C9A84C'}}>{s.val}</div>
              <div style={{fontSize:'10px', color:'rgba(255,255,255,0.35)', marginTop:'2px', letterSpacing:'0.05em'}}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom buttons */}
      <div style={{width:'100%', position:'relative'}}>
        <p style={{
          textAlign:'center', fontSize:'12px',
          color:'rgba(255,255,255,0.35)',
          marginBottom:'16px',
          letterSpacing:'0.08em',
          textTransform:'uppercase'
        }}>
          I am joining as a
        </p>

        {/* Farmer button */}
        <button
          onClick={() => navigate('/signup?type=farmer')}
          style={{
            width:'100%', padding:'18px',
            borderRadius:'16px',
            background:'linear-gradient(135deg, #C9A84C 0%, #A8873A 100%)',
            border:'none', marginBottom:'12px',
            cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'
          }}>
          <span style={{fontSize:'22px'}}>🧑‍🌾</span>
          <span style={{fontSize:'16px', fontWeight:'800', color:'#080C0A', letterSpacing:'0.02em'}}>
            Farmer
          </span>
        </button>

        {/* Buyer button */}
        <button
          onClick={() => navigate('/signup?type=buyer')}
          style={{
            width:'100%', padding:'18px',
            borderRadius:'16px',
            background:'transparent',
            border:'1px solid rgba(201,168,76,0.4)',
            cursor:'pointer', marginBottom:'20px',
            display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'
          }}>
          <span style={{fontSize:'22px'}}>🛒</span>
          <span style={{fontSize:'16px', fontWeight:'800', color:'#C9A84C', letterSpacing:'0.02em'}}>
            Buyer
          </span>
        </button>

        {/* Sign in */}
        <p style={{textAlign:'center', fontSize:'13px', color:'rgba(255,255,255,0.35)'}}>
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