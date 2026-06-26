import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { pool } from './db'
import sessionRouter from './routes/session'
import productsRouter from './routes/products'
import routinesRouter from './routes/routines'
import ingredientsRouter from './routes/ingredients'

if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET environment variable is required')
  process.exit(1)
}

pool.on('error', (err) => console.error('Unexpected idle DB client error', err))

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(express.json())

app.use('/api/v1/session',     sessionRouter)
app.use('/api/v1/products',    productsRouter)
app.use('/api/v1/routines',    routinesRouter)
app.use('/api/v1/ingredients', ingredientsRouter)
app.get('/api/v1/health', (_req, res) => res.json({ ok: true }))

app.use((_req, res) => res.status(404).json({ error: 'Not found' }))

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Server error' })
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Backend running on :${port}`))
