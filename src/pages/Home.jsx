import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{background:'#F0F4F0', minHeight:'100vh'}}>

      {/* Header */}
      <div style={{background:'linear-gradient(160deg, #1B6B45 60%, #2A9660 100%)'}} className="px-5 pt-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs" style={{color:'rgba(255,255,255,0.6)'}}>Good morning 👋</p>
            <h1 className="text-xl font-bold text-white">AgriBridge UG</h1>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{background:'#4DC882', color:'#1B6B45'}}>
            UG
          </div>
        </div>

        {/* Hero text */}
        <h2 className="text-3xl font-bold text-white leading-tight mb-2">
          Uganda produces.<br/>
          <span style={{color:'#4DC882'}}>Uganda profits.</span>
        </h2>
        <p className="text-sm" style={{color:'rgba(255,255,255,0.65)'}}>
          Direct farm-to-buyer digital marketplace
        </p>
      </div>

      {/* Cards pulled up */}
      <div className="px-4 -mt-10">

        {/* Price alert */}
        <div className="rounded-2xl p-4 mb-4 flex items-center gap-3"
          style={{background:'#fff', boxShadow:'0 4px 20px rgba(0,0,0,0.08)'}}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{background:'#FEF3C7'}}>
            📈
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold" style={{color:'#D97706'}}>LIVE PRICE ALERT</div>
            <div className="text-sm font-semibold text-gray-800 mt-0.5">Maize up 12% in Kampala</div>
            <div className="text-xs text-gray-400 mt-0.5">Best time to sell your harvest</div>
          </div>
          <Link to="/prices"
            className="text-xs font-bold px-3 py-2 rounded-xl text-white flex-shrink-0"
            style={{background:'#1B6B45'}}>
            View →
          </Link>
        </div>

        {/* 4 action cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">

          <Link to="/marketplace"
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{background:'#1B6B45', minHeight:'140px', boxShadow:'0 4px 16px rgba(27,107,69,0.35)'}}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{background:'rgba(255,255,255,0.15)'}}>
              🛒
            </div>
            <div>
              <div className="font-bold text-white text-sm">Buy Produce</div>
              <div className="text-xs mt-0.5" style={{color:'rgba(255,255,255,0.65)'}}>Browse listings</div>
            </div>
          </Link>

          <Link to="/post"
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{background:'#fff', minHeight:'140px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{background:'#E8F7EE'}}>
              ➕
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">Sell Produce</div>
              <div className="text-xs text-gray-400 mt-0.5">Post your harvest</div>
            </div>
          </Link>

          <Link to="/prices"
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{background:'#fff', minHeight:'140px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{background:'#EFF6FF'}}>
              📊
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">Market Prices</div>
              <div className="text-xs text-gray-400 mt-0.5">Live across Uganda</div>
            </div>
          </Link>

          <Link to="/farmers"
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{background:'#fff', minHeight:'140px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{background:'#FEF3C7'}}>
              🧑‍🌾
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">Farmers</div>
              <div className="text-xs text-gray-400 mt-0.5">Verified profiles</div>
            </div>
          </Link>
        </div>

        {/* Stats strip */}
        <div className="rounded-2xl p-5 mb-4 grid grid-cols-3 gap-2"
          style={{background:'#1B6B45', boxShadow:'0 4px 16px rgba(27,107,69,0.3)'}}>
          {[
            { val: '+25%', lbl: 'Farmer income' },
            { val: '-15%', lbl: 'Import reliance' },
            { val: '5 min', lbl: 'To trade' },
          ].map((s, i) => (
            <div key={s.val} className={`text-center ${i === 1 ? 'border-x' : ''}`}
              style={{borderColor:'rgba(255,255,255,0.15)'}}>
              <div className="text-xl font-bold" style={{color:'#4DC882'}}>{s.val}</div>
              <div className="text-xs mt-1" style={{color:'rgba(255,255,255,0.6)'}}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* USSD banner */}
        <Link to="/ussd"
          className="rounded-2xl p-4 mb-6 flex items-center gap-4"
          style={{background:'#E8F7EE', border:'1px solid #BBE8D0', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{background:'#1B6B45'}}>
            <span>📱</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold" style={{color:'#1B6B45'}}>No smartphone? No problem.</div>
            <div className="text-xs mt-0.5" style={{color:'#2A9660'}}>Dial *272# · SMS 8484 · Any phone</div>
          </div>
          <span className="text-xl font-bold" style={{color:'#1B6B45'}}>›</span>
        </Link>

      </div>
    </div>
  )
}