import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{background:'#1B6B45'}} className="px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#4DC882]"></div>
        <span className="text-white font-bold text-lg">AgriBridge UG</span>
      </div>
      <span className="text-xs font-bold px-3 py-1 rounded-full" 
        style={{background:'#4DC882', color:'#1B6B45'}}>
        BUBU
      </span>
    </nav>
  )
}