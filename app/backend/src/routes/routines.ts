import { Router } from 'express'
import { z } from 'zod'
import { pool } from '../db'
import { requireAuth } from '../auth'
import { SlotSchema } from '../schemas'
import { checkCompat } from '../compat'

const router = Router()
router.use(requireAuth)

router.get('/', async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT r.slot, p.id, p.name, p.tag, p.time, p.ingredients
     FROM routines r
     JOIN products p ON p.id = r.product_id
     WHERE r.user_id=$1
     ORDER BY r.slot, r.position`,
    [res.locals.userId]
  )
  res.json({
    am: rows.filter(r => r.slot === 'am').map(({ slot: _s, ...p }) => p),
    pm: rows.filter(r => r.slot === 'pm').map(({ slot: _s, ...p }) => p),
  })
})

router.put('/:slot', async (req, res) => {
  const slotParsed = z.enum(['am', 'pm']).safeParse(req.params.slot)
  if (!slotParsed.success) return res.status(400).json({ error: 'slot must be am or pm' })
  const bodyParsed = SlotSchema.safeParse(req.body)
  if (!bodyParsed.success) return res.status(400).json({ error: bodyParsed.error.flatten() })

  const slot = slotParsed.data
  const { productIds } = bodyParsed.data
  const userId = res.locals.userId

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    // Verify all products belong to this user
    if (productIds.length > 0) {
      const { rows } = await client.query(
        'SELECT id FROM products WHERE id = ANY($1) AND user_id=$2',
        [productIds, userId]
      )
      if (rows.length !== productIds.length) {
        await client.query('ROLLBACK')
        return res.status(403).json({ error: 'One or more products not found' })
      }
    }

    await client.query('DELETE FROM routines WHERE user_id=$1 AND slot=$2', [userId, slot])
    for (let i = 0; i < productIds.length; i++) {
      await client.query(
        'INSERT INTO routines (user_id,slot,product_id,position) VALUES ($1,$2,$3,$4)',
        [userId, slot, productIds[i], i]
      )
    }
    await client.query('COMMIT')
    res.json({ ok: true })
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
})

router.post('/check', async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT p.ingredients FROM routines r
     JOIN products p ON p.id = r.product_id
     WHERE r.user_id=$1`,
    [res.locals.userId]
  )
  res.json(checkCompat(rows))
})

export default router
