import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Farmers() {
  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFarmers()
  }, [])

  async function fetchFarmers() {
    setLoading(true)
    const { data, error } = await supabase
      .from('farmers')
      .select('*')
      .order('name')
    if (!error) setFarmers(data)
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#1B6B45] mb-1">Verified farmers</h1>
      <p className="text-sm text-gray-500 mb-6">
        Identity-verified producers across Uganda
      </p>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading farmers...</div>
      ) : (
        <div className="flex flex-col gap-3">
          {farmers.map(farmer => (
            <div key={farmer.id} className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 shadow-sm">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-[#E8F7EE] flex items-center justify-center text-lg font-bold text-[#1B6B45] flex-shrink-0">
                {farmer.avatar_initials}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900 text-sm">{farmer.name}</span>
                  <span className="inline-block bg-[#E8F7EE] text-[#0F6E56] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ✔ Verified
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-2">
                  📍 {farmer.district} &nbsp;·&nbsp;
                  ⭐ {farmer.rating} &nbsp;·&nbsp;
                  {farmer.orders_completed} orders
                </div>

                {/* Crops */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {farmer.crops?.map(crop => (
                    <span key={crop} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                      {crop}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-[#2A9660] font-medium">{farmer.phone}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}