import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Prices() {
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')

  useEffect(() => {
    fetchPrices()
  }, [])

  async function fetchPrices() {
    setLoading(true)
    const { data, error } = await supabase
      .from('prices')
      .select('*')
      .order('crop_name')
    if (!error) setPrices(data)
    setLoading(false)
  }

  const categories = ['all', 'grain', 'veg', 'fruit', 'cash']

  const filtered = category === 'all'
    ? prices
    : prices.filter(p => p.category === category)

  function getBest(row) {
    const vals = { Kampala: row.kampala, Gulu: row.gulu, Mbale: row.mbale, Mbarara: row.mbarara }
    return Object.entries(vals).sort((a, b) => b[1] - a[1])[0][0]
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-[#1B6B45]">Market prices</h1>
        <span className="text-xs text-gray-400">Live · Updated today</span>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Real-time prices across Uganda's major markets
      </p>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${
              category === cat
                ? 'bg-[#1B6B45] text-white border-[#1B6B45]'
                : 'bg-white text-gray-500 border-gray-200'
            }`}>
            {cat === 'all' ? 'All crops' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading prices...</div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-6 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
            <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Crop</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">KLA</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">GUL</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">MBL</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">MBR</div>
          </div>

          {filtered.map((row, i) => {
            const best = getBest(row)
            const cities = { Kampala: row.kampala, Gulu: row.gulu, Mbale: row.mbale, Mbarara: row.mbarara }
            const maxVal = Math.max(...Object.values(cities))

            return (
              <div key={row.id} className={`grid grid-cols-6 gap-2 px-4 py-3 border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="col-span-2 flex items-center gap-2">
                  <span className="text-lg">{row.emoji}</span>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">{row.crop_name}</div>
                    <div className={`text-[10px] font-medium ${
                      row.trend === 'up' ? 'text-green-600' :
                      row.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                    }`}>
                      {row.trend === 'up' ? '↑ Rising' : row.trend === 'down' ? '↓ Falling' : '→ Stable'}
                    </div>
                  </div>
                </div>
                {[row.kampala, row.gulu, row.mbale, row.mbarara].map((val, idx) => (
                  <div key={idx} className={`text-xs font-medium ${val === maxVal ? 'text-[#1B6B45] font-bold' : 'text-gray-400'}`}>
                    {val?.toLocaleString()}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}

      {/* Price alert */}
      <div className="mt-4 bg-[#E8F7EE] border border-green-200 rounded-2xl p-4 flex gap-3">
        <span className="text-xl">💡</span>
        <div>
          <div className="font-semibold text-sm text-[#1B6B45]">Smart insight</div>
          <div className="text-xs text-[#2A9660] mt-0.5 leading-relaxed">
            Maize prices in Kampala have risen 12% this week. If you have stock ready, now is the best time to sell.
          </div>
          <div className="text-xs text-green-400 mt-1">Powered by AgriBridge Market Intelligence</div>
        </div>
      </div>
    </div>
  )
}