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
