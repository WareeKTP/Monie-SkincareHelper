export default function PillarCard({ icon, num, title, desc, chips, color, softColor, borderColor, shadowColor }) {
  return (
    <div className="pillar" style={{ position: 'relative', overflow: 'hidden', background: '#fff', border: `1.5px solid ${borderColor}`, borderRadius: '24px', padding: '26px 22px 24px', boxShadow: `0 6px 18px ${shadowColor}` }}>
      <div className="pblob" style={{ position: 'absolute', top: '-46px', right: '-34px', width: '140px', height: '140px', borderRadius: '50%', background: `radial-gradient(circle,${color}99,${color})`, opacity: '.16' }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="picon" style={{ width: '64px', height: '64px', borderRadius: '20px', background: `linear-gradient(135deg,${softColor},${color})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', boxShadow: `0 8px 16px ${color}50` }}>{icon}</div>
          <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '30px', color: `${color}33` }}>{num}</span>
        </div>
        <h3 style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '21px', margin: '18px 0 0', color: '#43382f' }}>{title}</h3>
        <p style={{ margin: '8px 0 0', fontSize: '14px', lineHeight: '1.55', color: '#6b5d52' }}>{desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginTop: '16px' }}>
          {chips.map(chip => (
            <span key={chip} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: `${color}18`, border: `1px solid ${color}44`, borderRadius: '999px', padding: '4px 11px', fontSize: '12.5px', fontWeight: 700, color }}>{chip}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
