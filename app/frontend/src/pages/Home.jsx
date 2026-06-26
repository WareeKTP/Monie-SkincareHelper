import { useNavigate } from 'react-router-dom'

const floatingCards = [
  { emoji: '🍊', label: 'Vitamin C',   style: { top: '54px',  left: '4px',  animationDuration: '6s' } },
  { emoji: '💦', label: 'Hyaluronic',  style: { top: '330px', left: '16px', animationDuration: '8.5s', animationDelay: '.4s' } },
  { emoji: '🌙', label: 'Retinol',     style: { top: '128px', right: '2px', animationDuration: '7.5s', animationDelay: '.2s' } },
  { emoji: '☀️', label: 'SPF 50',      style: { top: '372px', right: '18px',animationDuration: '6.8s', animationDelay: '.6s' } },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <section style={{ position: 'relative', maxWidth: '920px', margin: '0 auto', padding: '40px 24px 80px', textAlign: 'center' }}>
      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '30px', left: '6%', width: '140px', height: '140px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%,#f7d9c4,#eeb59a)', opacity: '.5', animation: 'floaty 7s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '120px', right: '4%', width: '96px', height: '96px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%,#d9e3bf,#b6c596)', opacity: '.55', animation: 'floaty 9s ease-in-out infinite', pointerEvents: 'none' }} />

      {/* Floating ingredient cards — hidden on narrow viewports via .floating-card */}
      {floatingCards.map(c => (
        <div key={c.label} className="floating-card" style={{ position: 'absolute', width: '108px', background: '#fff', borderRadius: '18px', padding: '12px', textAlign: 'center', boxShadow: '0 10px 24px rgba(74,63,56,.12)', animation: `floaty ${c.style.animationDuration} ease-in-out infinite ${c.style.animationDelay || '0s'}`, pointerEvents: 'none', ...c.style }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#f8ecd4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto' }}>{c.emoji}</div>
          <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, fontSize: '13px', marginTop: '7px' }}>{c.label}</div>
        </div>
      ))}

      {/* Hero */}
      <div style={{ fontSize: '80px', animation: 'bob 4s ease-in-out infinite', display: 'inline-block' }}>😊</div>
      <h1 style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: 'clamp(32px,5vw,50px)', lineHeight: '1.08', letterSpacing: '-.02em', margin: '14px 0 0', color: '#43382f', textWrap: 'balance' }}>
        Build a skincare routine<br />that actually gets along.
      </h1>
      <p style={{ maxWidth: '540px', margin: '18px auto 0', fontSize: '18px', lineHeight: '1.55', color: '#6b5d52' }}>
        Monie helps total beginners learn what each product does, then plan a morning and night routine — and tells you which things play nicely together. No jargon, no guessing.
      </p>
      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '30px', flexWrap: 'wrap' }}>
        <button onClick={() => navigate('/plan')} style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, fontSize: '17px', color: '#fff', background: 'linear-gradient(135deg,#f2925a,#e0632a)', border: 'none', borderRadius: '14px', padding: '14px 26px', cursor: 'pointer', boxShadow: '0 8px 18px rgba(224,99,42,.4)' }}>Start planning →</button>
        <button onClick={() => navigate('/learn')} style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, fontSize: '17px', color: '#6b5d52', background: '#fffaf3', border: '1px solid #e2d5c4', borderRadius: '14px', padding: '14px 26px', cursor: 'pointer' }}>Learn the basics</button>
      </div>

      {/* 3 info cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px', marginTop: '54px', textAlign: 'left' }}>
        {[
          { bg: '#d6ecbb', icon: '📖', title: 'Learn',  desc: 'What each ingredient does, and when to use it.' },
          { bg: '#fadcbd', icon: '🧩', title: 'Plan',   desc: 'Drag products into a morning & night routine.' },
          { bg: '#e6d4f5', icon: '💬', title: 'Check',  desc: 'A friendly helper flags clashes & cheers you on.' },
        ].map(c => (
          <div key={c.title} style={{ background: '#ffffff', border: '1px solid #f0e2cf', borderRadius: '20px', padding: '22px' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{c.icon}</div>
            <h3 style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, fontSize: '18px', margin: '14px 0 6px' }}>{c.title}</h3>
            <p style={{ margin: 0, fontSize: '14.5px', lineHeight: '1.5', color: '#7a6d61' }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
