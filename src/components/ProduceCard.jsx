export default function ProduceCard({ listing, onOrder }) {
  const { product_name, emoji, price_per_kg, quantity_kg, is_local, farmers } = listing

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex gap-4 p-4">
        <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center text-3xl flex-shrink-0">
          {emoji}
        </div>
        <div className="flex-1 min-w-0">
          {is_local && (
            <span className="inline-block bg-[#E8F7EE] text-[#0F6E56] text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
              🇺🇬 Made in Uganda
            </span>
          )}
          <div className="font-semibold text-gray-900 text-sm">{product_name}</div>
          {farmers && (
            <>
              <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                <span className="inline-flex w-3.5 h-3.5 bg-[#2A9660] rounded-full items-center justify-center text-white" style={{fontSize:'8px'}}>✓</span>
                {farmers.name} · {farmers.district}
              </div>
              <div className="text-xs text-[#2A9660] font-medium">{farmers.phone}</div>
            </>
          )}
          <div className="text-lg font-bold text-[#1B6B45] mt-1">
            UGX {price_per_kg?.toLocaleString()}/kg
          </div>
          <div className="text-xs text-gray-400">{quantity_kg?.toLocaleString()}kg available</div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <button onClick={onOrder}
          className="w-full bg-[#1B6B45] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2A9660] transition-colors">
          Request order →
        </button>
      </div>
    </div>
  )
}