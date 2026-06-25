import { useState } from 'react'
import PillarCard from '../components/PillarCard'
import { ingredients, FILTERS, filterMeta } from '../lib/ingredientData'

const pillars = [
  { icon: '🛡️', num: '01', title: 'Protection',  color: '#2b7fd4', softColor: '#6aa9ec', borderColor: '#d8e8fb', shadowColor: '#2b7fd414', chips: ['☀️ SPF 50', '🍊 Vitamin C', '🫧 Moisturizer'], desc: 'Shield skin from sun, pollution and moisture loss — the daily armour that stops damage before it starts.' },
  { icon: '🌱', num: '02', title: 'Nourishment', color: '#5f9c1f', softColor: '#a7d06a', borderColor: '#dcebc6', shadowColor: '#5f9c1f14', chips: ['💦 Hyaluronic', '💧 Niacinamide', '🧼 Cleanser'],   desc: 'Feed and hydrate your skin barrier so it stays plump, calm and comfortable all day long.' },
  { icon: '🧪', num: '03', title: 'Treatment',   color: '#8246c4', softColor: '#b78ae3', borderColor: '#ddccef', shadowColor: '#8246c414', chips: ['🌙 Retinol', '✨ AHA / BHA'],                         desc: 'Target specific concerns — texture, fine lines, dark spots — with active ingredients that renew.' },
]

const DAY_STEPS = [
  { n: 1, color: '#0f8fa6', emoji: '🧼', label: 'Cleanser' },
  { n: 2, color: '#2b7fd4', emoji: '💧', label: 'Toner' },
  { n: 3, color: '#8246c4', emoji: '🧪', label: 'Essence / Serum' },
  { n: 4, color: '#dd5a72', emoji: '👁️', label: 'Eye Cream', optional: true },
  { n: 5, color: '#11998a', emoji: '🫧', label: 'Moisturizer' },
  { n: 6, color: '#d99403', emoji: '☀️', label: 'Sunscreen' },
]

const NIGHT_STEPS = [
  { n: 1, color: '#dd5a72', emoji: '🧴', label: 'Makeup Remover', optional: true },
  { n: 2, color: '#0f8fa6', emoji: '🧼', label: 'Cleanser' },
  { n: 3, color: '#2b7fd4', emoji: '💧', label: 'Toner' },
  { n: 4, color: '#8246c4', emoji: '✨', label: 'Serum' },
  { n: 5, color: '#5f9c1f', emoji: '👁️', label: 'Eye Cream', optional: true },
  { n: 6, color: '#11998a', emoji: '🫧', label: 'Moisturizer' },
  { n: 7, color: '#7c4fc0', emoji: '🌙', label: 'Sleeping Mask' },
]

function RoutineStep({ step, dividerColor }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '9px 2px' }}>
        <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: step.color, color: '#fff', fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{step.n}</span>
        <span style={{ fontSize: '18px', width: '22px', textAlign: 'center' }}>{step.emoji}</span>
        <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, fontSize: '14.5px', color: '#43382f' }}>{step.label}</span>
        {step.optional && <span style={{ marginLeft: 'auto', fontSize: '10.5px', fontWeight: 700, color: '#a8998b', background: '#fff', border: '1px solid #ece1d0', borderRadius: '999px', padding: '2px 9px' }}>Optional</span>}
      </div>
      <div style={{ height: '1px', background: dividerColor }} />
    </>
  )
}

export default function Learn() {
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? ingredients : ingredients.filter(i => i.tag === filter)

  return (
    <section style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px 80px' }}>

      {/* Heading */}
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: 'clamp(36px,5vw,60px)', lineHeight: '1.1', letterSpacing: '-.02em', margin: 0, color: '#43382f', textWrap: 'balance' }}>Learn about skincare</h1>
        <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.55', color: '#6b5d52' }}>Healthy skin rests on three simple pillars. Understand them, learn the daily order, then meet the ingredients that help.</p>
      </div>

      {/* Pillars */}
      <div style={{ textAlign: 'center', margin: '46px 0 4px' }}>
        <span style={{ display: 'inline-block', fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, fontSize: '30px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#b5673f', background: '#f6e3d6', padding: '6px 14px', borderRadius: '999px' }}>The 3 pillars of healthy skin</span>
      </div>
      <p style={{ textAlign: 'center', fontSize: '14px', color: '#8a7d72', margin: '10px 0 24px' }}>Hover a pillar to see what it covers ✨</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
        {pillars.map(p => <PillarCard key={p.title} {...p} />)}
      </div>

      {/* Daily routine */}
      <h2 style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '30px', letterSpacing: '-.01em', textAlign: 'center', margin: '56px 0 6px', color: '#43382f' }}>Your daily routine, in order</h2>
      <p style={{ textAlign: 'center', fontSize: '15px', color: '#6b5d52', margin: '0 0 24px' }}>Layer thinnest to thickest — here's the sequence for each part of the day.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'start' }}>
        {/* Day */}
        <div style={{ background: 'linear-gradient(135deg,#fff4e0,#ffe1bd)', border: '1px solid #f3d6ab', borderRadius: '20px', padding: '18px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '20px' }}>☀️</span>
            <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '18px', color: '#c4731a' }}>Day routine</span>
            <span style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: '12px', color: '#bf8a3e', background: '#fff5e4', borderRadius: '999px', padding: '2px 9px' }}>in order</span>
          </div>
          {DAY_STEPS.map(s => <RoutineStep key={s.n} step={s} dividerColor="rgba(196,115,26,.16)" />)}
        </div>

        {/* Night */}
        <div style={{ background: 'linear-gradient(135deg,#f0e8fb,#ddd0f3)', border: '1px solid #d9c8ef', borderRadius: '20px', padding: '18px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '20px' }}>🌙</span>
            <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '18px', color: '#7c4fc0' }}>Night routine</span>
            <span style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: '12px', color: '#8a63c4', background: '#f3edfb', borderRadius: '999px', padding: '2px 9px' }}>in order</span>
          </div>
          {NIGHT_STEPS.map(s => <RoutineStep key={s.n} step={s} dividerColor="rgba(124,79,192,.16)" />)}
        </div>
      </div>

      {/* Ingredient cards */}
      <h2 style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '30px', letterSpacing: '-.01em', textAlign: 'center', margin: '56px 0 6px', color: '#43382f' }}>What does each ingredient do?</h2>
      <p style={{ textAlign: 'center', fontSize: '15px', color: '#6b5d52', margin: '0 0 4px' }}>Pick what your skin needs and we'll show only the ingredients that help.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', margin: '22px 0 28px' }}>
        {FILTERS.map(f => {
          const active = filter === f
          const { label, color } = filterMeta[f]
          return (
            <button key={f} onClick={() => setFilter(f)} style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '14px', cursor: 'pointer', borderRadius: '999px', padding: '9px 17px', transition: 'all .15s', background: active ? color : '#fff', color: active ? '#fff' : color, border: `1.5px solid ${active ? color : color + '44'}`, boxShadow: active ? `0 5px 13px ${color}55` : 'none' }}>
              {label}
            </button>
          )
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(248px,1fr))', gap: '18px' }}>
        {visible.map(ing => (
          <div key={ing.id} style={{ background: '#fff', border: '1px solid #f0e2cf', borderRadius: '20px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '27px', background: ing.soft }}>{ing.emoji}</div>
              <div>
                <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 600, fontSize: '17px', color: '#43382f' }}>{ing.name}</div>
                <div style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: ing.color }}>{filterMeta[ing.tag]?.label || ing.tag}</div>
              </div>
            </div>
            <p style={{ margin: '14px 0 0', fontSize: '14px', lineHeight: '1.5', color: '#6b5d52' }}>{ing.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', paddingTop: '13px', borderTop: '1px solid #f0e7da' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#8a7d72' }}>{ing.timeIcon} {ing.bestTime}</span>
              <span style={{ fontSize: '12px', color: '#a8998b' }}>·</span>
              <span style={{ fontSize: '12px', color: '#8a7d72' }}>{ing.tip}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
