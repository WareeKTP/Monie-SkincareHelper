export const ingredients = [
  { id: 'vitc', name: 'Vitamin C',       emoji: '🍊', tag: 'brighten', color: '#e07407', soft: '#fef3e6', bestTime: 'AM',      timeIcon: '☀️', tip: 'Apply before SPF for best effect',  desc: 'A potent antioxidant that brightens skin tone, fades dark spots, and shields against environmental damage.' },
  { id: 'ha',   name: 'Hyaluronic Acid', emoji: '💦', tag: 'hydrate',  color: '#2b7fd4', soft: '#e6effb', bestTime: 'AM & PM', timeIcon: '🕐', tip: 'Apply on damp skin',                 desc: 'A moisture magnet that draws water into the skin, keeping it plump and dewy all day.' },
  { id: 'ret',  name: 'Retinol',         emoji: '🌙', tag: 'renew',    color: '#8246c4', soft: '#f0e7fb', bestTime: 'PM',      timeIcon: '🌙', tip: 'Start slow — 2×/week',               desc: 'The gold standard for cell turnover. Smooths texture, reduces fine lines, and fades dark spots over time.' },
  { id: 'nia',  name: 'Niacinamide',     emoji: '💧', tag: 'calm',     color: '#5f9c1f', soft: '#eef6e0', bestTime: 'AM & PM', timeIcon: '🕐', tip: 'Pairs well with most actives',       desc: 'A multitasker that reduces redness, minimises pores, and gently brightens without irritation.' },
  { id: 'spf',  name: 'SPF 50',          emoji: '☀️', tag: 'protect',  color: '#d99403', soft: '#fdf0cf', bestTime: 'AM',      timeIcon: '☀️', tip: 'Last step, always',                  desc: 'Your #1 anti-aging product. Blocks UVA/UVB rays that cause premature aging, dark spots, and skin cancer.' },
  { id: 'cen',  name: 'Centella',        emoji: '🌿', tag: 'calm',     color: '#5f9c1f', soft: '#eef6e0', bestTime: 'AM & PM', timeIcon: '🕐', tip: 'Great for sensitive skin',           desc: 'A soothing botanical that calms redness, heals the skin barrier, and reduces inflammation.' },
  { id: 'aha',  name: 'AHA / BHA',       emoji: '✨', tag: 'renew',    color: '#8246c4', soft: '#f0e7fb', bestTime: 'PM',      timeIcon: '🌙', tip: "Don't pair with retinol",            desc: 'Chemical exfoliants that dissolve dead skin cells to reveal brighter, smoother skin underneath.' },
  { id: 'cer',  name: 'Ceramide',        emoji: '🫧', tag: 'hydrate',  color: '#11998a', soft: '#e0f3f0', bestTime: 'AM & PM', timeIcon: '🕐', tip: 'Locks in everything underneath',    desc: 'Lipids that reinforce the skin barrier, locking in moisture and keeping irritants out.' },
]

export const FILTERS = ['all', 'hydrate', 'brighten', 'calm', 'renew', 'protect']

export const filterMeta = {
  all:      { label: 'Everything',   color: '#e0632a' },
  hydrate:  { label: 'Hydrate 💦',  color: '#2b7fd4' },
  brighten: { label: 'Brighten 🍊', color: '#e07407' },
  calm:     { label: 'Calm 🌿',     color: '#5f9c1f' },
  renew:    { label: 'Renew 🌙',    color: '#8246c4' },
  protect:  { label: 'Protect ☀️',  color: '#d99403' },
}
