import { getMeta } from '../lib/tagMeta'

export default function ProductCard({ product, onDragStart, onDragEnd, onRemove, compact }) {
  const m = getMeta(product.tag)

  return (
    <div
      draggable={!!onDragStart}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={{
        position: 'relative',
        background: '#fff',
        border: '1px solid #ece2d4',
        borderRadius: '16px',
        padding: compact ? '9px 11px' : '12px',
        cursor: onDragStart ? 'grab' : 'default',
        display: 'flex',
        flexDirection: compact ? 'row' : 'column',
        alignItems: compact ? 'center' : undefined,
        gap: compact ? '11px' : '8px',
        boxShadow: '0 2px 6px rgba(74,63,56,.06)',
        transition: 'transform .12s, box-shadow .12s',
        width: compact ? undefined : '160px',
        flex: compact ? 1 : undefined,
        minWidth: 0,
      }}
      onMouseEnter={e => { if (!compact) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(74,63,56,.12)' } }}
      onMouseLeave={e => { if (!compact) { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 6px rgba(74,63,56,.06)' } }}
    >
      {compact ? (
        <>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: m.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', flexShrink: 0 }}>{m.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, fontSize: '14.5px', color: '#43382f' }}>{product.name}</div>
            <div style={{ fontSize: '11.5px', color: '#8a7d72' }}>{product.tag} · {(product.ingredients || []).join(', ')}</div>
          </div>
          {onRemove && (
            <button onClick={onRemove} style={{ width: '26px', height: '26px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,.7)', color: '#9a8b7d', fontSize: '16px', lineHeight: 1, cursor: 'pointer', flexShrink: 0 }}>×</button>
          )}
        </>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', background: m.soft, flexShrink: 0 }}>{m.emoji}</div>
            <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: m.color, background: m.soft, borderRadius: '999px', padding: '3px 9px' }}>{product.tag}</span>
          </div>
          <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '13.5px', lineHeight: '1.2', color: '#43382f' }}>{product.name}</div>
          <div style={{ fontSize: '11.5px', lineHeight: '1.35', color: '#8a7d72' }}>{(product.ingredients || []).join(', ')}</div>
        </>
      )}
    </div>
  )
}
