import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const UGANDAN_DISTRICTS = [
  'Kampala','Wakiso','Mukono','Jinja','Mbale','Gulu','Lira',
  'Mbarara','Masaka','Kasese','Fort Portal','Arua','Soroti','Tororo',
  'Hoima','Kabale','Bushenyi','Iganga','Busia','Pallisa'
]

export default function PostListing() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    product_name: '', quantity_kg: '', price_per_kg: '',
    district: '', description: '', emoji: '🌾'
  })
  const [loading, setLoading] = useState(false)

  const emojis = ['🌽','🫘','🌾','🍅','🥬','🍠','🍌','☕','🟤','🫚','🥑','🍆']

  async function handleSubmit() {
    if (!form.product_name || !form.quantity_kg || !form.price_per_kg || !form.district) {
      alert('Please fill in all required fields')
      return
    }
    setLoading(true)

    const { data: farmer } = await supabase
      .from('farmers')
      .select('id')
      .limit(1)
      .single()

    const { error } = await supabase.from('listings').insert({
      ...form,
      farmer_id: farmer.id,
      quantity_kg: Number(form.quantity_kg),
      price_per_kg: Number(form.price_per_kg),
      is_local: true,
      is_available: true
    })

    setLoading(false)
    if (!error) {
      alert('✅ Your listing is live!')
      navigate('/marketplace')
    } else {
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#1B6B45] mb-1">Post your produce</h1>
      <p className="text-sm text-gray-500 mb-6">List your harvest for buyers to find directly</p>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 shadow-sm">

        {/* Emoji picker */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Product icon
          </label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {emojis.map(e => (
              <button key={e} onClick={() => setForm({...form, emoji: e})}
                className={`text-xl p-2 rounded-lg border transition-all ${
                  form.emoji === e
                    ? 'border-[#1B6B45] bg-[#E8F7EE]'
                    : 'border-gray-200'
                }`}>
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Product name */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Product name *
          </label>
          <input
            value={form.product_name}
            onChange={e => setForm({...form, product_name: e.target.value})}
            placeholder="e.g. Maize, Beans, Coffee"
            className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2A9660]"
          />
        </div>

        {/* Quantity and Price */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Quantity (kg) *
            </label>
            <input
              type="number"
              value={form.quantity_kg}
              onChange={e => setForm({...form, quantity_kg: e.target.value})}
              placeholder="e.g. 500"
              className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2A9660]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Price/kg (UGX) *
            </label>
            <input
              type="number"
              value={form.price_per_kg}
              onChange={e => setForm({...form, price_per_kg: e.target.value})}
              placeholder="e.g. 1200"
              className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2A9660]"
            />
          </div>
        </div>

        {/* District */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            District *
          </label>
          <select
            value={form.district}
            onChange={e => setForm({...form, district: e.target.value})}
            className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2A9660]"
          >
            <option value="">Select your district...</option>
            {UGANDAN_DISTRICTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            placeholder="Describe quality, harvest date, how to collect..."
            rows={3}
            className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2A9660] resize-none"
          />
        </div>

        {/* Posting as */}
        <div className="bg-[#E8F7EE] rounded-xl p-3 text-sm text-[#1B6B45]">
          Posting as <strong>John Okello</strong> · Gulu District · ✔ Verified
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#1B6B45] text-white py-4 rounded-xl text-sm font-semibold hover:bg-[#2A9660] transition-colors disabled:opacity-60"
        >
          {loading ? 'Posting...' : 'Post listing →'}
        </button>
      </div>
    </div>
  )
}