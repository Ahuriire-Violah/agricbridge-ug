import { useState } from 'react'

const responses = {
  'maize': '✅ Maize prices today:\nKampala: 1,200/kg ↑\nGulu: 1,050/kg →\nMbale: 1,100/kg →\nMbarara: 980/kg ↓\n\nBest market: KAMPALA\nTrend: Rising — sell now',
  'beans': '✅ Beans prices today:\nKampala: 2,800/kg ↑\nGulu: 2,600/kg →\nMbale: 2,700/kg →\nMbarara: 2,500/kg ↓\n\nBest market: KAMPALA',
  'coffee': '✅ Coffee (FAQ) today:\nKampala: 7,200/kg ↑\nGulu: 6,800/kg →\nMbale: 7,000/kg →\nMbarara: 6,900/kg\n\nBest market: KAMPALA',
  'tomatoes': '✅ Tomatoes today:\nKampala: 1,500/kg ↑\nGulu: 1,200/kg →\nMbale: 1,400/kg →\nMbarara: 1,300/kg\n\nBest market: KAMPALA',
  'bananas': '✅ Bananas today:\nKampala: 600/kg ↑\nGulu: 500/kg →\nMbale: 550/kg →\nMbarara: 520/kg\n\nBest market: KAMPALA',
  'status': '✅ Your listings:\n1. Maize 500kg — 3 inquiries\n2. Beans 200kg — 1 order pending\n\nReply ACCEPT 2 to confirm order.',
  'help': '✅ AgriBridge UG commands:\nMAIZE — price check\nBEANS — price check\nCOFFEE — price check\nTOMATOES — price check\nSTATUS — your listings\nHELP — show commands',
}

export default function USSD() {
  const [messages, setMessages] = useState([
    { from: 'system', text: '✅ Maize prices today:\nKampala: 1,200/kg ↑\nGulu: 1,050/kg →\nMbale: 1,100/kg →\nMbarara: 980/kg ↓\n\nBest market: KAMPALA\nTrend: Rising — sell now', time: 'just now' },
  ])
  const [input, setInput] = useState('')

  function sendMessage() {
    const val = input.trim()
    if (!val) return

    const userMsg = { from: 'user', text: val, time: 'just now' }
    const reply = responses[val.toLowerCase()] ||
      '⚠️ Command not recognized.\n\nTry: MAIZE, BEANS, COFFEE, TOMATOES, STATUS, HELP\n\nOr dial *272# for full menu.'
    const sysMsg = { from: 'system', text: reply, time: 'just now' }

    setMessages(prev => [...prev, userMsg, sysMsg])
    setInput('')
  }

  function handleKey(e) {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#1B6B45] mb-1">SMS & USSD access</h1>
      <p className="text-sm text-gray-500 mb-6">
        For farmers without smartphones · Any phone · Any network
      </p>

      {/* USSD menu */}
      <div className="bg-gray-900 rounded-2xl p-4 mb-4">
        <div className="text-gray-400 text-xs mb-2 text-center">
          AgriBridge UG · *272# · Simulated network
        </div>
        <div className="bg-black rounded-xl p-4 font-mono text-sm text-white">
          <div className="text-green-400 font-bold mb-2">AgriBridge UG *272#</div>
          <div className="text-gray-300 space-y-1">
            <div>1. Check market prices</div>
            <div>2. List my produce</div>
            <div>3. Find buyers near me</div>
            <div>4. My active orders</div>
          </div>
          <div className="text-gray-500 text-xs mt-3">Reply with number</div>
        </div>
      </div>

      {/* SMS simulation */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-[#1B6B45] px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#4DC882] flex items-center justify-center text-xs font-bold text-[#1B6B45]">
            AG
          </div>
          <div>
            <div className="text-white text-sm font-semibold">AgriBridge UG</div>
            <div className="text-green-200 text-xs">8484 · Online</div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-3 min-h-64 max-h-80 overflow-y-auto bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-3 rounded-2xl text-xs whitespace-pre-line leading-relaxed ${
                msg.from === 'user'
                  ? 'bg-[#1B6B45] text-white rounded-br-sm'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-200 flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type MAIZE, BEANS, COFFEE, STATUS..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2A9660]"
          />
          <button
            onClick={sendMessage}
            className="bg-[#1B6B45] text-white px-4 py-2.5 rounded-xl text-sm font-semibold"
          >
            Send
          </button>
        </div>
      </div>

      {/* Commands reference */}
      <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          SMS commands
        </div>
        <div className="space-y-2">
          {[
            { cmd: 'MAIZE', desc: 'Get maize prices across all regions' },
            { cmd: 'BEANS', desc: 'Get beans prices across all regions' },
            { cmd: 'COFFEE', desc: 'Get coffee prices across all regions' },
            { cmd: 'STATUS', desc: 'Check your active listings and orders' },
            { cmd: 'HELP', desc: 'Show all available commands' },
          ].map(c => (
            <div key={c.cmd} className="flex gap-3 items-start">
              <span className="font-mono text-xs font-bold text-[#1B6B45] bg-[#E8F7EE] px-2 py-0.5 rounded">
                {c.cmd}
              </span>
              <span className="text-xs text-gray-500">{c.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}