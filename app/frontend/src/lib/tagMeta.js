export const tagMeta = {
  Cleanser:        { emoji: '🧼', color: '#0f8fa6', soft: '#e6f4f6' },
  Toner:           { emoji: '💧', color: '#2b7fd4', soft: '#e6effb' },
  Essence:         { emoji: '🌸', color: '#c44d8c', soft: '#fbe7f1' },
  Serum:           { emoji: '🧪', color: '#8246c4', soft: '#f0e7fb' },
  Treatment:       { emoji: '🌙', color: '#7c4fc0', soft: '#efe8f9' },
  Exfoliant:       { emoji: '✨', color: '#dd5a72', soft: '#fbe7eb' },
  'Eye Cream':     { emoji: '👁️', color: '#5f9c1f', soft: '#eef6e0' },
  Moisturizer:     { emoji: '🫧', color: '#11998a', soft: '#e0f3f0' },
  Sunscreen:       { emoji: '☀️', color: '#d99403', soft: '#fdf0cf' },
  'Sleeping Mask': { emoji: '😴', color: '#6a5acd', soft: '#ece9fb' },
}

export const defaultTagMeta = { emoji: '🧴', color: '#d98c6a', soft: '#f7ece2' }

export const tagOrder = {
  'Makeup Remover': 0, Cleanser: 1, Toner: 2, Exfoliant: 2.5,
  Essence: 3, Serum: 3.2, Treatment: 4, 'Eye Cream': 4.5,
  Moisturizer: 5, Sunscreen: 6, 'Sleeping Mask': 7,
}

export const TAG_OPTIONS = [
  'Cleanser', 'Toner', 'Essence', 'Serum', 'Treatment',
  'Exfoliant', 'Eye Cream', 'Moisturizer', 'Sunscreen', 'Sleeping Mask',
]

export function getMeta(tag) {
  return tagMeta[tag] || defaultTagMeta
}
