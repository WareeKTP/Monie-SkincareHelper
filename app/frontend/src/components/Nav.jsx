import { useLocation, useNavigate } from 'react-router-dom'

const links = [
  { label: 'Home',  to: '/' },
  { label: 'Learn', to: '/learn' },
  { label: 'Plan',  to: '/plan' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', background: 'rgba(248,231,208,.82)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #ece1d0' }}>
      <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '9px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'linear-gradient(135deg,#f59e42,#e0632a 52%,#c4486b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', boxShadow: '0 4px 10px rgba(196,72,107,.32)' }}>💧</div>
        <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '21px', color: '#4a3f38', letterSpacing: '-.01em' }}>Monie</span>
      </button>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {links.map(({ label, to }) => {
          const active = pathname === to
          return (
            <button key={to} onClick={() => navigate(to)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '7px 14px 0', fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, fontSize: '15px', color: '#6b5d52' }}>
              {label}
              <div style={{ height: '3px', width: '100%', marginTop: '5px', borderRadius: '3px' }}>
                {active && <div style={{ height: '3px', borderRadius: '3px', background: '#d98c6a' }} />}
              </div>
            </button>
          )
        })}
      </nav>
    </header>
  )
}
