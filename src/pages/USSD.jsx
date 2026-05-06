import { useState, useRef, useEffect } from 'react'

const responses = {
  'maize': '✅ Maize prices today:\nKampala: 1,200/kg ↑\nGulu: 1,050/kg →\nMbale: 1,100/kg →\nMbarara: 980/kg ↓\n\nBest market: KAMPALA\nTrend: Rising — sell now',
  'beans': '✅ Beans prices today:\nKampala: 2,800/kg ↑\nGulu: 2,600/kg →\nMbale: 2,700/kg →\nMbarara: 2,500/kg ↓\n\nBest market: KAMPALA',
  'coffee': '✅ Coffee (FAQ) today:\nKampala: 7,200/kg ↑\nGulu: 6,800/kg →\nMbale: 7,000/kg →\nMbarara: 6,900/kg\n\nBest market: KAMPALA\nGlobal demand rising.',
  'tomatoes': '✅ Tomatoes today:\nKampala: 1,500/kg ↑\nGulu: 1,200/kg →\nMbale: 1,400/kg →\nMbarara: 1,300/kg\n\nBest market: KAMPALA',
  'bananas': '✅ Bananas today:\nKampala: 600/kg ↑\nGulu: 500/kg →\nMbale: 550/kg →\nMbarara: 520/kg\n\nBest market: KAMPALA',
  'vanilla': '✅ Vanilla today:\nKampala: 45,000/kg ↑\nGulu: 42,000/kg →\nMbale: 44,000/kg →\nMbarara: 43,000/kg\n\nBest market: KAMPALA',
  'rice': '✅ Rice today:\nKampala: 3,200/kg ↓\nGulu: 2,900/kg →\nMbale: 3,100/kg →\nMbarara: 3,000/kg\n\nBest market: KAMPALA',
  'status': '✅ Your listings:\n1. Maize 500kg — 3 inquiries\n2. Beans 200kg — 1 order pending\n\nReply ACCEPT 2 to confirm.',
  'help': '✅ AgriBridge UG commands:\n\nCrop prices:\nMAIZE · BEANS · COFFEE\nTOMATOES · BANANAS · RICE\nVANILLA\n\nAccount:\nSTATUS — your listings\nHELP — this menu\n\nDial *272# for full menu',
}

const quickCommands = [
  { cmd: 'MAIZE', icon: '🌽' },
  { cmd: 'BEANS', icon: '🫘' },
  { cmd: 'COFFEE', icon: '☕' },
  { cmd: 'TOMATOES', icon: '🍅' },
  { cmd: 'BANANAS', icon: '🍌' },
  { cmd: 'STATUS', icon: '📋' },
  { cmd: 'HELP', icon: '❓' },
]

export default function USSD() {
  const [messages, setMessages] = useState([
    {
      from: 'system',
      text: 'Welcome to AgriBridge UG 🌱\n\nType any crop name to get today\'s best price instantly.\n\nExample: MAIZE, BEANS, COFFEE\n\nType HELP for all commands.',
      time: 'now'
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage(val) {
    const text = (val || input).trim()
    if (!text) return

    const userMsg = { from: 'user', text, time: 'now' }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate network delay
    setTimeout(() => {
      const reply = responses[text.toLowerCase()] ||
        `⚠️ "${text}" not recognized.\n\nTry: MAIZE, BEANS, COFFEE\nOr type HELP for all commands.\n\nDial *272# for full USSD menu.`
      setMessages(prev => [...prev, { from: 'system', text: reply, time: 'now' }])
      setIsTyping(false)
    }, 800)
  }

  function handleKey(e) {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div style={{
      background: '#0F1A14',
      minHeight: '100vh',
      paddingBottom: '80px',
      position: 'relative'
    }}>

      {/* Background */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: `
          radial-gradient(circle at 50% 30%, rgba(27,107,69,0.08) 0%, transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(201,168,76,0.04) 0%, transparent 40%)
        `,
        pointerEvents: 'none', zIndex: 0
      }} />

      {/* Hero header */}
      <div style={{
        background: 'linear-gradient(160deg, #0D3D26 0%, #0A2018 100%)',
        padding: '28px 20px 24px',
        position: 'relative',
        borderBottom: '1px solid rgba(201,168,76,0.1)'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)'
        }} />

        <h1 style={{
          fontSize: '26px', fontWeight: '800',
          color: '#FFFFFF', marginBottom: '4px',
          letterSpacing: '-0.3px'
        }}>
          SMS & USSD
        </h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
          Works on any phone · No internet needed · Any network
        </p>
      </div>

      <div style={{ padding: '20px 16px', position: 'relative', zIndex: 1 }}>

        {/* USSD + SMS access cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '10px', marginBottom: '20px'
        }}>
          {/* USSD card */}
          <div style={{
            background: 'linear-gradient(135deg, #0D3D26, #081F14)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '20px', padding: '18px 14px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              fontSize: '28px', marginBottom: '8px'
            }}>📲</div>
            <div style={{
              fontSize: '11px', fontWeight: '700',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.08em', marginBottom: '6px'
            }}>
              USSD CODE
            </div>
            <div style={{
              fontSize: '26px', fontWeight: '800',
              color: '#C9A84C', letterSpacing: '0.05em',
              marginBottom: '4px'
            }}>
              *272#
            </div>
            <div style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.3)'
            }}>
              Dial on any phone
            </div>
          </div>

          {/* SMS card */}
          <div style={{
            background: 'linear-gradient(135deg, #1A2A1A, #0F1A14)',
            border: '1px solid rgba(77,200,130,0.15)',
            borderRadius: '20px', padding: '18px 14px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>💬</div>
            <div style={{
              fontSize: '11px', fontWeight: '700',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.08em', marginBottom: '6px'
            }}>
              SMS NUMBER
            </div>
            <div style={{
              fontSize: '26px', fontWeight: '800',
              color: '#4DC882', letterSpacing: '0.05em',
              marginBottom: '4px'
            }}>
              8484
            </div>
            <div style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.3)'
            }}>
              Send any crop name
            </div>
          </div>
        </div>

        {/* Quick command chips */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{
            fontSize: '11px', fontWeight: '700',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            Tap to try
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '8px'
          }}>
            {quickCommands.map(({ cmd, icon }) => (
              <button
                key={cmd}
                onClick={() => sendMessage(cmd)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  color: '#C9A84C', fontSize: '12px',
                  fontWeight: '700', cursor: 'pointer',
                  fontFamily: 'monospace'
                }}>
                <span style={{ fontSize: '14px' }}>{icon}</span>
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Live chat simulation */}
        <div style={{
          background: '#162419',
          border: '1px solid rgba(201,168,76,0.1)',
          borderRadius: '24px', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}>

          {/* Chat header */}
          <div style={{
            background: 'linear-gradient(135deg, #0D3D26, #091E12)',
            padding: '14px 18px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(201,168,76,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px', height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1B6B45, #0D3D26)',
                border: '2px solid rgba(201,168,76,0.3)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '18px'
              }}>
                🌱
              </div>
              <div>
                <div style={{
                  fontSize: '14px', fontWeight: '800',
                  color: '#FFFFFF'
                }}>
                  AgriBridge UG
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  gap: '5px', marginTop: '1px'
                }}>
                  <div style={{
                    width: '6px', height: '6px',
                    borderRadius: '50%', background: '#4DC882'
                  }} />
                  <span style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.4)'
                  }}>
                    Online · Simulated network
                  </span>
                </div>
              </div>
            </div>
            <div style={{
              fontSize: '11px', fontWeight: '700',
              color: '#C9A84C',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '8px', padding: '4px 10px'
            }}>
              SMS 8484
            </div>
          </div>

          {/* Messages area */}
          <div style={{
            padding: '16px',
            minHeight: '300px', maxHeight: '360px',
            overflowY: 'auto',
            background: '#0A1410',
            display: 'flex', flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end', gap: '8px'
              }}>
                {msg.from === 'system' && (
                  <div style={{
                    width: '28px', height: '28px',
                    borderRadius: '50%',
                    background: '#1B6B45',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '13px',
                    flexShrink: 0
                  }}>
                    🌱
                  </div>
                )}
                <div style={{
                  maxWidth: '78%',
                  padding: '11px 14px',
                  borderRadius: msg.from === 'user'
                    ? '18px 18px 4px 18px'
                    : '18px 18px 18px 4px',
                  background: msg.from === 'user'
                    ? 'linear-gradient(135deg, #C9A84C, #A8873A)'
                    : '#162419',
                  border: msg.from === 'system'
                    ? '1px solid rgba(255,255,255,0.06)'
                    : 'none',
                  fontSize: '13px',
                  color: msg.from === 'user' ? '#0A1410' : '#E0E8E3',
                  fontFamily: 'monospace',
                  lineHeight: '1.7',
                  whiteSpace: 'pre-line',
                  fontWeight: msg.from === 'user' ? '700' : '400',
                  boxShadow: msg.from === 'user'
                    ? '0 4px 12px rgba(201,168,76,0.2)'
                    : '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{
                display: 'flex', alignItems: 'flex-end', gap: '8px'
              }}>
                <div style={{
                  width: '28px', height: '28px',
                  borderRadius: '50%', background: '#1B6B45',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '13px'
                }}>
                  🌱
                </div>
                <div style={{
                  padding: '12px 16px',
                  background: '#162419',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '18px 18px 18px 4px',
                  display: 'flex', gap: '4px', alignItems: 'center'
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '6px', height: '6px',
                      borderRadius: '50%',
                      background: '#4DC882',
                      animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid rgba(201,168,76,0.08)',
            background: '#111C14',
            display: 'flex', gap: '10px', alignItems: 'center'
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value.toUpperCase())}
              onKeyDown={handleKey}
              placeholder="Type MAIZE, BEANS, HELP..."
              style={{
                flex: 1, padding: '12px 16px',
                background: '#0A1410',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '14px',
                color: '#FFFFFF', fontSize: '13px',
                outline: 'none', fontFamily: 'monospace',
                fontWeight: '600', letterSpacing: '0.05em'
              }}
            />
            <button
              onClick={() => sendMessage()}
              style={{
                width: '46px', height: '46px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #C9A84C, #A8873A)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '18px',
                boxShadow: '0 4px 12px rgba(201,168,76,0.25)',
                flexShrink: 0
              }}>
              ➤
            </button>
          </div>
        </div>

        {/* How it works */}
        <div style={{
          marginTop: '16px',
          background: '#162419',
          border: '1px solid rgba(201,168,76,0.08)',
          borderRadius: '20px', padding: '20px'
        }}>
          <p style={{
            fontSize: '11px', fontWeight: '700',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            How it works
          </p>
          {[
            { step: '1', icon: '📲', text: 'Dial *272# on any phone — MTN, Airtel, any network' },
            { step: '2', icon: '📋', text: 'Choose from the menu: prices, post listing, find buyers' },
            { step: '3', icon: '💬', text: 'Get instant results via SMS — no internet needed' },
          ].map(s => (
            <div key={s.step} style={{
              display: 'flex', gap: '14px',
              alignItems: 'flex-start',
              marginBottom: '14px'
            }}>
              <div style={{
                width: '36px', height: '36px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #C9A84C, #A8873A)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '18px',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(201,168,76,0.2)'
              }}>
                {s.icon}
              </div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: '1.6', paddingTop: '6px'
              }}>
                {s.text}
              </div>
            </div>
          ))}
        </div>

        {/* Network badges */}
        <div style={{
          marginTop: '16px',
          display: 'flex', gap: '10px', justifyContent: 'center'
        }}>
          {['MTN Uganda', 'Airtel Uganda', 'Any network'].map(n => (
            <div key={n} style={{
              padding: '6px 12px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              fontSize: '11px', fontWeight: '600',
              color: 'rgba(255,255,255,0.3)'
            }}>
              {n}
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}