const KEY_GROUPS = [
  ['retinol',     ['retinol', 'retinoid', 'retinal', 'tretinoin']],
  ['vitc',        ['vitamin c', 'vit c', 'ascorbic', 'ascorbyl']],
  ['exfoliant',   ['aha', 'bha', 'pha', 'glycolic', 'salicylic', 'lactic', 'mandelic', 'exfoli']],
  ['niacinamide', ['niacinamide', 'niacin']],
  ['spf',         ['spf', 'sunscreen', 'zinc ox']],
]

const CLASHES = [
  { a: 'retinol', b: 'vitc',      severity: 'avoid',   msg: "Don't layer Retinol with Vitamin C — they cancel each other out." },
  { a: 'retinol', b: 'exfoliant', severity: 'avoid',   msg: "Retinol + AHA/BHA can over-irritate skin. Use on alternate nights." },
  { a: 'vitc',    b: 'exfoliant', severity: 'caution', msg: "Vitamin C with AHA/BHA may cause sensitivity. Patch test first." },
]

function detectKeys(ingredients) {
  const lower = ingredients.map(i => i.toLowerCase())
  const found = new Set()
  for (const [key, terms] of KEY_GROUPS)
    if (lower.some(i => terms.some(t => i.includes(t)))) found.add(key)
  return found
}

export function checkCompatibility(products) {
  if (!products.length) return { clashes: [], mood: 'empty' }
  const keys = detectKeys(products.flatMap(p => p.ingredients || []))
  const clashes = CLASHES.filter(c => keys.has(c.a) && keys.has(c.b))
  const mood = clashes.length === 0
    ? 'happy'
    : clashes.some(c => c.severity === 'avoid') ? 'sad' : 'caution'
  return { clashes, mood }
}
