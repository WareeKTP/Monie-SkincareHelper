import { useState, useEffect, useRef } from 'react'
import { initSession, getProducts, createProduct, deleteProduct, getRoutines, setRoutineSlot } from '../lib/api'
import { checkCompatibility } from '../lib/compatibility'
import { getMeta, TAG_OPTIONS } from '../lib/tagMeta'
import ProductCard from '../components/ProductCard'
import DropZone from '../components/DropZone'
import AddProductForm from '../components/AddProductForm'
import HelperCharacter from '../components/HelperCharacter'

export default function Plan() {
  const [shelf, setShelf] = useState([])
  const [amZone, setAmZone] = useState([])
  const [pmZone, setPmZone] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pickerFor, setPickerFor] = useState(null)
  const draggingId = useRef(null)

  useEffect(() => {
    async function load() {
      try {
        await initSession()
        const [products, routines] = await Promise.all([getProducts(), getRoutines()])
        setShelf(products)
        setAmZone(routines.am || [])
        setPmZone(routines.pm || [])
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const amCompat = checkCompatibility(amZone)
  const pmCompat = checkCompatibility(pmZone)
  const MOOD_RANK = { sad: 3, caution: 2, happy: 1, empty: 0 }
  const compat = {
    clashes: [...amCompat.clashes, ...pmCompat.clashes],
    mood: MOOD_RANK[amCompat.mood] >= MOOD_RANK[pmCompat.mood] ? amCompat.mood : pmCompat.mood,
  }

  async function handleDrop(slot) {
    const id = draggingId.current
    if (!id) return
    const product = shelf.find(p => p.id === id)
    if (!product) return

    const isAm = slot === 'am'
    const zone = isAm ? amZone : pmZone
    const setZone = isAm ? setAmZone : setPmZone

    if (zone.some(p => p.id === id)) return // already in this zone

    const next = [...zone, product]
    setZone(next)
    try {
      await setRoutineSlot(slot, next.map(p => p.id))
    } catch {
      setZone(zone) // rollback
    }
  }

  async function removeFromZone(slot, productId) {
    const isAm = slot === 'am'
    const zone = isAm ? amZone : pmZone
    const setZone = isAm ? setAmZone : setPmZone

    const next = zone.filter(p => p.id !== productId)
    setZone(next)
    try {
      await setRoutineSlot(slot, next.map(p => p.id))
    } catch {
      setZone(zone)
    }
  }

  async function handleAddProduct(data) {
    setFormLoading(true)
    try {
      const product = await createProduct(data)
      setShelf(prev => [...prev, product])
      setShowForm(false)
    } catch (e) {
      alert('Failed to add product: ' + e.message)
    } finally {
      setFormLoading(false)
    }
  }

  async function tapAddToZone(product, slot) {
    const isAm = slot === 'am'
    const zone = isAm ? amZone : pmZone
    const setZone = isAm ? setAmZone : setPmZone
    setPickerFor(null)
    if (zone.some(p => p.id === product.id)) return
    const next = [...zone, product]
    setZone(next)
    try {
      await setRoutineSlot(slot, next.map(p => p.id))
    } catch {
      setZone(zone)
    }
  }

  async function handleDeleteProduct(id) {
    setShelf(prev => prev.filter(p => p.id !== id))
    setAmZone(prev => prev.filter(p => p.id !== id))
    setPmZone(prev => prev.filter(p => p.id !== id))
    try {
      await deleteProduct(id)
    } catch {
      // best-effort
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '48px', animation: 'bob 2s ease-in-out infinite' }}>🌸</div>
        <p style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, color: '#8a7d72' }}>Loading your routine…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '12px' }}>
        <div style={{ fontSize: '48px' }}>😕</div>
        <p style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, color: '#43382f' }}>Couldn't connect to the backend</p>
        <p style={{ fontSize: '13px', color: '#8a7d72' }}>{error}</p>
      </div>
    )
  }

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '34px 24px 80px' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '38px', letterSpacing: '-.02em', margin: 0, color: '#43382f' }}>Plan your routine</h1>
        <p style={{ margin: '10px 0 0', fontSize: '16px', color: '#6b5d52' }}>Drag a product from your shelf into morning or night — or just tap it.</p>
      </div>

      {/* Shelf */}
      <div style={{ margin: '26px auto 0', maxWidth: '1000px', background: '#ffffff', border: '1px solid #f0e2cf', borderRadius: '22px', padding: '18px 20px', boxShadow: '0 4px 16px rgba(74,63,56,.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, fontSize: '14px', color: '#8a7d72' }}>🧴 YOUR SHELF</span>
          <button onClick={() => setShowForm(v => !v)} style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '13px', color: '#fff', background: 'linear-gradient(135deg,#f2925a,#e0632a)', border: 'none', borderRadius: '11px', padding: '8px 15px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(224,99,42,.32)' }}>＋ Add product</button>
        </div>

        {showForm && <AddProductForm onAdd={handleAddProduct} onClose={() => setShowForm(false)} loading={formLoading} />}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          {shelf.map(p => (
            <div key={p.id} onClick={() => setPickerFor(p)} style={{ cursor: 'pointer' }}>
              <ProductCard
                product={p}
                onDragStart={() => { draggingId.current = p.id }}
                onDragEnd={() => { draggingId.current = null }}
              />
            </div>
          ))}
          {shelf.length === 0 && (
            <p style={{ color: '#a8998b', fontSize: '14px', padding: '16px 0' }}>Your shelf is empty — add a product to get started.</p>
          )}
        </div>
      </div>

      {/* Routine + helper */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '22px', marginTop: '24px', alignItems: 'start' }}>

        {/* Routine table */}
        <div style={{ background: '#ffffff', border: '1px solid #f0e2cf', borderRadius: '22px', padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '21px', margin: 0, color: '#43382f' }}>My routine</h2>
            <button onClick={async () => {
              setAmZone([]); setPmZone([])
              await Promise.all([setRoutineSlot('am', []), setRoutineSlot('pm', [])])
            }} style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: '13px', color: '#a8998b', background: 'none', border: '1px solid #e7dccd', borderRadius: '10px', padding: '6px 12px', cursor: 'pointer' }}>Clear all</button>
          </div>

          <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, fontSize: '15px', color: '#d99633', marginBottom: '8px' }}>☀️ Morning</div>
          <DropZone slot="am" items={amZone} onDrop={() => handleDrop('am')} onRemove={id => removeFromZone('am', id)} />

          <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, fontSize: '15px', color: '#9b7bc4', margin: '18px 0 8px' }}>🌙 Night</div>
          <DropZone slot="pm" items={pmZone} onDrop={() => handleDrop('pm')} onRemove={id => removeFromZone('pm', id)} />
        </div>

        {/* Helper */}
        <HelperCharacter
          mood={compat.mood}
          clashes={compat.clashes}
          amCount={amZone.length}
          pmCount={pmZone.length}
        />
      </div>

      {pickerFor && (
        <div onClick={() => setPickerFor(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(67,56,47,.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '20px', padding: '24px 28px', boxShadow: '0 16px 40px rgba(74,63,56,.18)', maxWidth: '300px', width: '100%', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '16px', color: '#43382f', margin: '0 0 4px' }}>{pickerFor.name}</p>
            <p style={{ fontSize: '13px', color: '#8a7d72', margin: '0 0 18px' }}>Add to which routine?</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => tapAddToZone(pickerFor, 'am')} style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '14px', color: '#d99633', background: '#fbf4e8', border: '2px solid #ead9bf', borderRadius: '12px', padding: '10px 20px', cursor: 'pointer' }}>☀️ Morning</button>
              <button onClick={() => tapAddToZone(pickerFor, 'pm')} style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '14px', color: '#9b7bc4', background: '#f6f1f8', border: '2px solid #ddd0e6', borderRadius: '12px', padding: '10px 20px', cursor: 'pointer' }}>🌙 Night</button>
            </div>
            <button onClick={() => setPickerFor(null)} style={{ marginTop: '14px', display: 'block', width: '100%', fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: '13px', color: '#9a8b7d', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}
    </section>
  )
}
