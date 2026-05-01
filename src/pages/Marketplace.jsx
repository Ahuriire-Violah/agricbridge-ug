import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import ProduceCard from '../components/ProduceCard'
import OrderModal from '../components/OrderModal'

export default function Marketplace() {
  const [listings, setListings] = useState([])
  const [bubuOn, setBubuOn] = useState(true)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedListing, setSelectedListing] = useState(null)

  useEffect(() => {
    fetchListings()
  }, [])

  async function fetchListings() {
    setLoading(true)
    const { data, error } = await supabase
      .from('listings')
      .select('*, farmers(*)')
      .eq('is_available', true)
      .order('created_at', { ascending: false })
    if (!error) setListings(data)
    setLoading(false)
  }

  const filtered = listings
    .filter(l => !search || l.product_name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => bubuOn ? (b.is_local - a.is_local) : 0)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#1B6B45] mb-1">Marketplace</h1>
      <p className="text-sm text-gray-500 mb-4">Direct from verified Ugandan farmers</p>

      {/* Search + BUBU Toggle */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Search maize, beans, coffee..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2A9660]"
        />
        <button
          onClick={() => setBubuOn(!bubuOn)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
            bubuOn
              ? 'bg-[#E8F7EE] border-[#2A9660] text-[#1B6B45]'
              : 'bg-white border-gray-200 text-gray-500'
          }`}
        >
          🇺🇬 Local first
          <div className={`w-8 h-4 rounded-full transition-colors relative ${bubuOn ? 'bg-[#2A9660]' : 'bg-gray-300'}`}>
            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${bubuOn ? 'left-4' : 'left-0.5'}`} />
          </div>
        </button>
      </div>

      {bubuOn && (
        <div className="text-xs text-[#1B6B45] bg-[#E8F7EE] px-3 py-2 rounded-lg mb-4">
          🇺🇬 Showing Ugandan products first · BUBU filter ON
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading listings...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No listings found. Be the first to post!
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(listing => (
            <ProduceCard
              key={listing.id}
              listing={listing}
              onOrder={() => setSelectedListing(listing)}
            />
          ))}
        </div>
      )}

      {selectedListing && (
        <OrderModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onSuccess={() => {
            setSelectedListing(null)
            fetchListings()
          }}
        />
      )}
    </div>
  )
}