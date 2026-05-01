import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function OrderModal({ listing, onClose, onSuccess }) {
  const [qty, setQty] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const { farmers, product_name, price_per_kg } = listing

  async function sendOrder() {
    if (!qty || !name || !phone) {
      alert('Please fill in all fields')
      return
    }
    setLoading(true)
    const ref = 'AGB-2026-' + Math.floor(Math.random() * 90000 + 10000)
    await supabase.from('orders').insert({
      listing_id: listing.id,
      buyer_name: name,
      buyer_phone: phone,
      quantity_kg: Number(qty),
      reference: ref
    })
    setLoading(false)
    onSuccess()
  }

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        
        {/* Farmer identity */}
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-[#E8F7EE] rounded-full flex items-center justify-center text-xl font-bold text-[#1B6B45] mx-auto mb-2">
            {farmers?.avatar_initials || farmers?.name?.split(' ').map(n=>n[0]).join('')}
          </div>
          <div className="font-bold text-gray-900">{farmers?.name}</div>
          <span className="inline-block bg-[#E8F7EE] text-[#0F6E56] text-[10px] font-bold px-2 py-0.5 rounded-full">
            ✔ Verified Farmer
          </span>
          <div className="text-sm text-gray-500 mt-1">📍 {farmers?.district}</div>
          <div className="text-sm text-[#2A9660] font-medium">{farmers?.phone}</div>
        </div>

        {/* Order summary */}
        <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Product</span>
            <span className="font-medium">{product_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Price</span>
            <span className="font-medium text-[#1B6B45]">UGX {price_per_kg?.toLocaleString()}/kg</span>
          </div>
          {qty && (
            <div className="flex justify-between">
              <span className="text-gray-500">Total estimate</span>
              <span className="font-bold text-[#1B6B45]">UGX {(qty * price_per_kg).toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Buyer details */}
        <div className="space-y-3 mb-4">
          <input value={qty} onChange={e=>setQty(e.target.value)} type="number" 
            placeholder="Quantity needed (kg)"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2A9660]" />
          <input value={name} onChange={e=>setName(e.target.value)} 
            placeholder="Your name"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2A9660]" />
          <input value={phone} onChange={e=>setPhone(e.target.value)} 
            placeholder="Your phone number"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2A9660]" />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <a href={`tel:${farmers?.phone}`}
            className="flex-1 border border-[#1B6B45] text-[#1B6B45] py-3 rounded-xl text-sm font-semibold text-center">
            📞 Call farmer
          </a>
          <button onClick={sendOrder} disabled={loading}
            className="flex-1 bg-[#1B6B45] text-white py-3 rounded-xl text-sm font-semibold disabled:opacity-60">
            {loading ? 'Sending...' : 'Send request'}
          </button>
        </div>

        <button onClick={onClose} className="w-full mt-2 text-gray-400 text-xs py-2">
          Cancel
        </button>
      </div>
    </div>
  )
}