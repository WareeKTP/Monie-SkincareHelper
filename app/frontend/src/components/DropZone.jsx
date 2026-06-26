import { useState, useRef } from 'react'
import ProductCard from './ProductCard'

export default function DropZone({ slot, items, onDrop, onRemove }) {
  const [active, setActive] = useState(false)
  const counter = useRef(0)
  const isAm = slot === 'am'

  const bg     = isAm ? '#fbf4e8' : '#f6f1f8'
  const border = isAm ? '#ead9bf' : '#ddd0e6'
  const ring   = '0 0 0 3px ' + (isAm ? '#f2925a55' : '#9b7bc455')
  const hint   = isAm ? '#bbab98' : '#b7a8c4'

  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDragEnter={() => { counter.current++; setActive(true) }}
      onDragLeave={() => { if (--counter.current === 0) setActive(false) }}
      onDrop={e => { e.preventDefault(); counter.current = 0; setActive(false); onDrop(e) }}
      style={{
        minHeight: '96px',
        borderRadius: '16px',
        padding: '12px',
        background: bg,
        border: `2px dashed ${border}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '9px',
        transition: 'box-shadow .15s',
        boxShadow: active ? ring : 'none',
      }}
    >
      {items.length === 0 ? (
        <div style={{ margin: 'auto', color: hint, fontSize: '13.5px', fontWeight: 600, textAlign: 'center', padding: '14px' }}>
          {isAm ? 'Drop your morning products here ☀️' : 'Drop your night products here 🌙'}
        </div>
      ) : (
        items.map(p => (
          <ProductCard key={p.id} product={p} compact onRemove={() => onRemove(p.id)} />
        ))
      )}
    </div>
  )
}
