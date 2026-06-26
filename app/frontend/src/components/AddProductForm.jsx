import { useState } from 'react'
import { TAG_OPTIONS } from '../lib/tagMeta'

export default function AddProductForm({ onAdd, onClose, loading }) {
  const [name, setName] = useState('')
  const [tag, setTag] = useState('Cleanser')
  const [time, setTime] = useState('both')
  const [ingText, setIngText] = useState('')

  function submit(e) {
    e.preventDefault()
    const ingredients = ingText.split(',').map(s => s.trim()).filter(Boolean)
    onAdd({ name: name.trim(), tag, time, ingredients })
  }

  const inputStyle = { width: '100%', fontFamily: "'Nunito',sans-serif", fontSize: '14px', color: '#43382f', background: '#fff', border: '1px solid #e7dccd', borderRadius: '10px', padding: '9px 11px', outline: 'none' }
  const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: '#8a7d72', marginBottom: '5px' }

  return (
    <form onSubmit={submit} style={{ background: '#fbf4ea', border: '1px solid #f0e2cf', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '12px' }}>
        <div>
          <label style={labelStyle}>Product name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Rojukiss Vit C" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Type</label>
          <select value={tag} onChange={e => setTag(e.target.value)} style={inputStyle}>
            {TAG_OPTIONS.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Ingredients (comma-separated)</label>
          <input value={ingText} onChange={e => setIngText(e.target.value)} placeholder="Gluta, Vit C" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Time</label>
          <select value={time} onChange={e => setTime(e.target.value)} style={inputStyle}>
            <option value="am">☀️ Morning</option>
            <option value="pm">🌙 Night</option>
            <option value="both">☀️🌙 Both</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
        <button type="button" onClick={onClose} style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: '13px', color: '#9a8b7d', background: 'none', border: '1px solid #e7dccd', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer' }}>Cancel</button>
        <button type="submit" disabled={!name.trim() || loading} style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '13px', color: '#fff', background: '#5f9c1f', border: 'none', borderRadius: '10px', padding: '8px 16px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(95,156,31,.3)', opacity: (!name.trim() || loading) ? .6 : 1 }}>
          {loading ? 'Adding…' : 'Add to shelf'}
        </button>
      </div>
    </form>
  )
}
