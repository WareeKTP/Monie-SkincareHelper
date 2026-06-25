import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import sessionRouter from './routes/session'
import productsRouter from './routes/products'
import routinesRouter from './routes/routines'
import ingredientsRouter from './routes/ingredients'

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(express.json())

app.use('/api/v1/session',     sessionRouter)
app.use('/api/v1/products',    productsRouter)
app.use('/api/v1/routines',    routinesRouter)
app.use('/api/v1/ingredients', ingredientsRouter)
app.get('/api/v1/health', (_req, res) => res.json({ ok: true }))

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Backend running on :${port}`))
