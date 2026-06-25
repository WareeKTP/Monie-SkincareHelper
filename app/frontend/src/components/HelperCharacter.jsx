const MOODS = {
  empty:   { emoji: '🌸', headline: 'Your helper is waiting for products' },
  happy:   { emoji: '🥰', headline: 'Your routine is looking great!' },
  caution: { emoji: '😬', headline: 'A small heads-up…' },
  sad:     { emoji: '😟', headline: "Uh oh, these don't mix well" },
}

export default function HelperCharacter({ mood, clashes, amCount, pmCount }) {
  const { emoji, headline } = MOODS[mood] || MOODS.empty

  return (
    <div style={{ position: 'sticky', top: '90px', background: '#ffffff', border: '1px solid #f0e2cf', borderRadius: '22px', padding: '24px 20px', boxShadow: '0 4px 16px rgba(74,63,56,.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '118px', height: '118px', borderRadius: '50%', background: 'radial-gradient(circle at 50% 38%,#ffe7d6,#f6cbb4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '62px', boxShadow: '0 10px 22px rgba(217,140,106,.28), inset 0 -6px 12px rgba(217,140,106,.16)', animation: 'bob 3.6s ease-in-out infinite' }}>{emoji}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
        <div style={{ width: '14px', height: '14px', background: '#fff', border: '1px solid #efe4d4', borderBottom: 'none', borderRight: 'none', transform: 'rotate(45deg)', marginBottom: '-8px', position: 'relative', zIndex: 2 }} />
      </div>

      <div style={{ background: '#fff', border: '1px solid #efe4d4', borderRadius: '18px', padding: '16px 16px 6px', boxShadow: '0 4px 12px rgba(74,63,56,.06)' }}>
        <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '16px', lineHeight: '1.3', color: '#43382f', textAlign: 'center' }}>{headline}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginTop: '14px' }}>
          {mood === 'empty' && (
            <div style={{ textAlign: 'center', fontSize: '13px', color: '#a8998b', padding: '6px 0 12px' }}>Drag products into morning or night to get started 🌸</div>
          )}

          {mood === 'happy' && (amCount > 0 || pmCount > 0) && (
            <div style={{ display: 'flex', gap: '9px', background: '#eef6e0', border: '1px solid #cce8a8', borderRadius: '12px', padding: '10px 12px' }}>
              <span style={{ fontSize: '15px', lineHeight: '1.3', flexShrink: 0 }}>✅</span>
              <span style={{ fontSize: '13px', lineHeight: '1.45', color: '#5a4f46' }}>
                {amCount > 0 && `${amCount} morning product${amCount > 1 ? 's' : ''}`}
                {amCount > 0 && pmCount > 0 && ' · '}
                {pmCount > 0 && `${pmCount} night product${pmCount > 1 ? 's' : ''}`}
                {' — all ingredients play nicely together!'}
              </span>
            </div>
          )}

          {clashes.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: '9px', background: c.severity === 'avoid' ? '#fde8e8' : '#fef5e4', border: `1px solid ${c.severity === 'avoid' ? '#f5c2c2' : '#f5dfa2'}`, borderRadius: '12px', padding: '10px 12px' }}>
              <span style={{ fontSize: '15px', lineHeight: '1.3', flexShrink: 0 }}>{c.severity === 'avoid' ? '⚠️' : '💡'}</span>
              <span style={{ fontSize: '13px', lineHeight: '1.45', color: '#5a4f46' }}>{c.msg || c.message}</span>
            </div>
          ))}
        </div>
        <div style={{ height: '10px' }} />
      </div>
    </div>
  )
}
