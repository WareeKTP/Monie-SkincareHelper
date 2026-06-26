import { useState, useEffect } from 'react'
import { createIngredient, createProduct, initSession } from '../lib/api'

const TAGS      = ['Cleanser','Toner','Essence','Serum','Treatment','Exfoliant','Eye Cream','Moisturizer','Sunscreen','Sleeping Mask']
const ING_TAGS  = ['brighten','hydrate','renew','calm','protect']
const TIMES     = ['am','pm','both']
const BEST_TIMES = ['AM','PM','AM & PM']

const card = {
  background: '#fff',
  borderRadius: '20px',
  padding: '28px 32px',
  boxShadow: '0 4px 20px rgba(74,63,56,.08)',
  border: '1px solid #ece2d4',
}

const label = { display: 'block', fontWeight: 700, fontSize: '13px', color: '#6b5c50', marginBottom: '5px', marginTop: '14px' }

const input = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: '10px',
  border: '1.5px solid #e0d3c5',
  fontFamily: "'Nunito',sans-serif",
  fontSize: '14px',
  color: '#43382f',
  background: '#fffcf9',
  boxSizing: 'border-box',
  outline: 'none',
}

const btn = {
  marginTop: '20px',
  width: '100%',
  padding: '11px',
  borderRadius: '12px',
  border: 'none',
  background: '#e8916a',
  color: '#fff',
  fontFamily: "'Baloo 2',sans-serif",
  fontWeight: 700,
  fontSize: '15px',
  cursor: 'pointer',
}

function StatusMsg({ ok, msg }) {
  if (!msg) return null
  return (
    <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '10px', background: ok ? '#edf7ee' : '#fdecea', color: ok ? '#2e7d32' : '#c62828', fontSize: '13.5px', fontWeight: 600 }}>
      {ok ? '✅' : '❌'} {msg}
    </div>
  )
}

function IngredientForm() {
  const empty = { id: '', name: '', emoji: '', tag: 'hydrate', description: '', best_time: 'AM & PM', time_icon: '🕐', tip: '' }
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      await createIngredient(form)
      setStatus({ ok: true, msg: `"${form.name}" saved successfully.` })
      setForm(empty)
    } catch (err) {
      setStatus({ ok: false, msg: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={card}>
      <h2 style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: '20px', color: '#43382f', margin: '0 0 4px' }}>⚗️ Add Ingredient</h2>
      <p style={{ fontSize: '13px', color: '#9a8b7d', margin: '0 0 8px' }}>Shown on the Learn page. Re-submitting the same ID updates the existing entry.</p>
      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
          <div>
            <span style={label}>ID <span style={{ color: '#b08070', fontWeight: 400 }}>(unique, no spaces)</span></span>
            <input style={input} value={form.id} onChange={set('id')} placeholder="e.g. bak" required />
          </div>
          <div>
            <span style={label}>Name</span>
            <input style={input} value={form.name} onChange={set('name')} placeholder="e.g. Bakuchiol" required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '0 14px' }}>
          <div>
            <span style={label}>Emoji</span>
            <input style={input} value={form.emoji} onChange={set('emoji')} placeholder="🌸" required />
          </div>
          <div>
            <span style={label}>Tag</span>
            <select style={input} value={form.tag} onChange={set('tag')}>
              {ING_TAGS.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <span style={label}>Best Time</span>
            <select style={input} value={form.best_time} onChange={set('best_time')}>
              {BEST_TIMES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '0 14px' }}>
          <div>
            <span style={label}>Tip</span>
            <input style={input} value={form.tip} onChange={set('tip')} placeholder="e.g. Safe to pair with vitamin C" required />
          </div>
          <div>
            <span style={label}>Time Icon</span>
            <input style={input} value={form.time_icon} onChange={set('time_icon')} placeholder="🕐" required />
          </div>
        </div>

        <span style={label}>Description</span>
        <textarea style={{ ...input, resize: 'vertical', minHeight: '72px' }} value={form.description} onChange={set('description')} placeholder="Plain-English explanation of what this ingredient does." required />

        <button style={btn} disabled={loading}>{loading ? 'Saving…' : 'Save Ingredient'}</button>
        {status && <StatusMsg {...status} />}
      </form>
    </div>
  )
}

function ProductForm() {
  const empty = { name: '', tag: 'Serum', time: 'am', ingredients: '' }
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const ingredients = form.ingredients.split(',').map(s => s.trim()).filter(Boolean)
      await createProduct({ name: form.name, tag: form.tag, time: form.time, ingredients })
      setStatus({ ok: true, msg: `"${form.name}" added to your shelf.` })
      setForm(empty)
    } catch (err) {
      setStatus({ ok: false, msg: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={card}>
      <h2 style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: '20px', color: '#43382f', margin: '0 0 4px' }}>📦 Add Product</h2>
      <p style={{ fontSize: '13px', color: '#9a8b7d', margin: '0 0 8px' }}>Adds to your personal shelf (current session). Go to the Plan page to use it.</p>
      <form onSubmit={submit}>
        <span style={label}>Product Name</span>
        <input style={input} value={form.name} onChange={set('name')} placeholder="e.g. Bakuchiol Serum" required />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
          <div>
            <span style={label}>Type</span>
            <select style={input} value={form.tag} onChange={set('tag')}>
              {TAGS.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <span style={label}>Routine</span>
            <select style={input} value={form.time} onChange={set('time')}>
              {TIMES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <span style={label}>Ingredients <span style={{ color: '#b08070', fontWeight: 400 }}>(comma-separated)</span></span>
        <input style={input} value={form.ingredients} onChange={set('ingredients')} placeholder="e.g. Bakuchiol, Squalane, Vitamin E" />

        <button style={btn} disabled={loading}>{loading ? 'Adding…' : 'Add to Shelf'}</button>
        {status && <StatusMsg {...status} />}
      </form>
    </div>
  )
}

export default function Admin() {
  useEffect(() => { initSession() }, [])

  return (
    <main style={{ maxWidth: '740px', margin: '0 auto', padding: '40px 20px 60px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: '28px', color: '#43382f', margin: '0 0 6px' }}>🛠️ Admin</h1>
        <p style={{ color: '#9a8b7d', fontSize: '14px', margin: 0 }}>This page is not linked from the app. Bookmark it to return.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <IngredientForm />
        <ProductForm />
      </div>
    </main>
  )
}
