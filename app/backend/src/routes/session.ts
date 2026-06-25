import { Router } from 'express'
import { pool } from '../db'
import { signToken } from '../auth'

const SEED = [
  { name: 'Rojukiss Vit C',       tag: 'Serum',       time: 'am',   ingredients: ['Gluta', 'Vitamin C'] },
  { name: 'Gentle Foam Cleanser', tag: 'Cleanser',    time: 'both', ingredients: ['Glycerin', 'Centella'] },
  { name: 'Hydra Boost Toner',    tag: 'Toner',       time: 'both', ingredients: ['Hyaluronic Acid', 'Panthenol'] },
  { name: 'Night Repair Cream',   tag: 'Treatment',   time: 'pm',   ingredients: ['Retinol', 'Squalane'] },
  { name: 'Daily Shield SPF 50',  tag: 'Sunscreen',   time: 'am',   ingredients: ['Zinc Oxide', 'SPF 50'] },
  { name: 'Barrier Moisturizer',  tag: 'Moisturizer', time: 'both', ingredients: ['Niacinamide', 'Ceramide'] },
  { name: 'Glow Exfoliant',       tag: 'Exfoliant',   time: 'pm',   ingredients: ['Glycolic Acid', 'BHA'] },
]

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { userId } = req.body

    if (userId) {
      // Returning user — verify exists, then re-issue token
      const { rows } = await pool.query('SELECT id FROM users WHERE id=$1', [userId])
      if (!rows[0]) return res.status(404).json({ error: 'User not found' })
      return res.json({ token: signToken(userId), userId })
    }

    // New user — create + seed products in a transaction
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const { rows } = await client.query('INSERT INTO users DEFAULT VALUES RETURNING id')
      const id: string = rows[0].id
      for (const p of SEED) {
        await client.query(
          'INSERT INTO products (user_id,name,tag,time,ingredients) VALUES ($1,$2,$3,$4,$5)',
          [id, p.name, p.tag, p.time, p.ingredients]
        )
      }
      await client.query('COMMIT')
      res.json({ token: signToken(id), userId: id })
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    } finally {
      client.release()
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
