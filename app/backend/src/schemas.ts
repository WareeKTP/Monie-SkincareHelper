import { z } from 'zod'

export const ProductSchema = z.object({
  name: z.string().min(1).max(200),
  tag: z.enum(['Cleanser', 'Toner', 'Essence', 'Serum', 'Treatment', 'Exfoliant', 'Eye Cream', 'Moisturizer', 'Sunscreen', 'Sleeping Mask']),
  time: z.enum(['am', 'pm', 'both']),
  ingredients: z.array(z.string().min(1).max(100)).max(50).default([]),
})

export const SlotSchema = z.object({
  productIds: z.array(z.string().uuid()),
})

export const IngredientSchema = z.object({
  id:          z.string().min(1).max(32).regex(/^[a-z0-9_-]+$/),
  name:        z.string().min(1).max(100),
  emoji:       z.string().min(1).max(10),
  tag:         z.enum(['brighten','hydrate','renew','calm','protect']),
  description: z.string().min(1).max(500),
  best_time:   z.enum(['AM','PM','AM & PM']),
  time_icon:   z.string().min(1).max(10),
  tip:         z.string().min(1).max(200),
})
