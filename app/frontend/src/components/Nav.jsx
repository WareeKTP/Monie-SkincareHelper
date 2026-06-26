import { Link, NavLink } from 'react-router-dom'

const links = [
  { label: 'Home',  to: '/' },
  { label: 'Learn', to: '/learn' },
  { label: 'Plan',  to: '/plan' },
]

export default function Nav() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', background: 'rgba(248,231,208,.82)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #ece1d0' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'linear-gradient(135deg,#f59e42,#e0632a 52%,#c4486b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', boxShadow: '0 4px 10px rgba(196,72,107,.32)' }}>💧</div>
        <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '21px', color: '#4a3f38', letterSpacing: '-.01em' }}>Monie</span>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {links.map(({ label, to }) => (
          <NavLink key={to} to={to} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '7px 14px 0', fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, fontSize: '15px', color: '#6b5d52' }}>
                {label}
                <div style={{ height: '3px', width: '100%', marginTop: '5px', borderRadius: '3px' }}>
                  {isActive && <div style={{ height: '3px', borderRadius: '3px', background: '#d98c6a' }} />}
                </div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
