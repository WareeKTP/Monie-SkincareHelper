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

router.post('/', async (req, res) => {
  const { id, name, emoji, tag, description, best_time, time_icon, tip } = req.body
  if (!id || !name || !emoji || !tag || !description || !best_time || !time_icon || !tip) {
    return res.status(400).json({ error: 'All fields are required' })
  }
  const { rows } = await pool.query(
    `INSERT INTO ingredients (id,name,emoji,tag,description,best_time,time_icon,tip)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     ON CONFLICT (id) DO UPDATE SET
       name=$2,emoji=$3,tag=$4,description=$5,best_time=$6,time_icon=$7,tip=$8
     RETURNING *`,
    [id, name, emoji, tag, description, best_time, time_icon, tip]
  )
  res.status(201).json(rows[0])
})

export default router
