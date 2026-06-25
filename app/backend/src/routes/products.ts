import { Router } from 'express'
import { pool } from '../db'
import { requireAuth } from '../auth'
import { ProductSchema } from '../schemas'

const router = Router()
router.use(requireAuth)

router.get('/', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM products WHERE user_id=$1 ORDER BY created_at',
    [res.locals.userId]
  )
  res.json(rows)
})

router.post('/', async (req, res) => {
  const parsed = ProductSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  const { name, tag, time, ingredients } = parsed.data
  const { rows } = await pool.query(
    'INSERT INTO products (user_id,name,tag,time,ingredients) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [res.locals.userId, name, tag, time, ingredients]
  )
  res.status(201).json(rows[0])
})

router.patch('/:id', async (req, res) => {
  const parsed = ProductSchema.partial().safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })

  const fields = parsed.data
  const keys = Object.keys(fields) as (keyof typeof fields)[]
  if (!keys.length) return res.status(400).json({ error: 'No fields provided' })

  const setClauses = keys.map((k, i) => `${k}=$${i + 3}`)
  const values = [req.params.id, res.locals.userId, ...keys.map(k => fields[k])]

  const { rows } = await pool.query(
    `UPDATE products SET ${setClauses.join(',')} WHERE id=$1 AND user_id=$2 RETURNING *`,
    values
  )
  if (!rows[0]) return res.status(404).json({ error: 'Not found' })
  res.json(rows[0])
})

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM products WHERE id=$1 AND user_id=$2', [req.params.id, res.locals.userId])
  res.status(204).send()
})

export default router
