import { Router } from 'express'
import { pool } from '../db'

const router = Router()

router.get('/', async (req, res) => {
  const { category } = req.query
  if (category && typeof category === 'string') {
    const { rows } = await pool.query('SELECT * FROM ingredients WHERE tag=$1 ORDER BY name', [category])
    return res.json(rows)
  }
  const { rows } = await pool.query('SELECT * FROM ingredients ORDER BY name')
  res.json(rows)
})

export default router
