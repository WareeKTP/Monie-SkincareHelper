import { Router } from 'express'
import { pool } from '../db'
import { requireAuth } from '../auth'
import { ProductSchema } from '../schemas'

const router = Router()
router.use(requireAuth)

router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, tag, time, ingredients FROM products WHERE user_id=$1 ORDER BY created_at',
      [res.locals.userId]
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const parsed = ProductSchema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
    const { name, tag, time, ingredients } = parsed.data
    const { rows } = await pool.query(
      'INSERT INTO products (user_id,name,tag,time,ingredients) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [res.locals.userId, name, tag, time, ingredients]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
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

    if (fields.time !== undefined) {
      const validSlots = rows[0].time === 'both' ? ['am', 'pm'] : [rows[0].time]
      await pool.query(
        'DELETE FROM routines WHERE product_id=$1 AND user_id=$2 AND slot <> ALL($3::text[])',
        [req.params.id, res.locals.userId, validSlots]
      )
    }

    res.json(rows[0])
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await pool.query('DELETE FROM products WHERE id=$1 AND user_id=$2', [req.params.id, res.locals.userId])
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

export default router
