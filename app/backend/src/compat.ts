const KEY_GROUPS: [string, string[]][] = [
  ['retinol',     ['retinol', 'retinoid', 'retinal', 'tretinoin']],
  ['vitc',        ['vitamin c', 'vit c', 'ascorbic', 'ascorbyl']],
  ['exfoliant',   ['aha', 'bha', 'pha', 'glycolic', 'salicylic', 'lactic', 'mandelic', 'exfoli']],
  ['niacinamide', ['niacinamide', 'niacin']],
  ['spf',         ['spf', 'sunscreen', 'zinc ox']],
]

const CLASHES = [
  { a: 'retinol', b: 'vitc',      severity: 'avoid',   message: "Don't layer Retinol with Vitamin C — they cancel each other out." },
  { a: 'retinol', b: 'exfoliant', severity: 'avoid',   message: "Retinol + AHA/BHA can over-irritate skin. Use on alternate nights." },
  { a: 'vitc',    b: 'exfoliant', severity: 'caution', message: "Vitamin C with AHA/BHA may cause sensitivity. Patch test first." },
]

function detectKeys(ingredients: string[]): Set<string> {
  const lower = ingredients.map(i => i.toLowerCase())
  const found = new Set<string>()
  for (const [key, terms] of KEY_GROUPS)
    if (lower.some(i => terms.some(t => i.includes(t)))) found.add(key)
  return found
}

export function checkCompat(products: { ingredients: string[] }[]) {
  const keys = detectKeys(products.flatMap(p => p.ingredients))
  const clashes = CLASHES.filter(c => keys.has(c.a) && keys.has(c.b))
  return { clashes, ok: clashes.length === 0 }
}
