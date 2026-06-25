import 'dotenv/config'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const VALID_TAGS = ['Cleanser','Toner','Essence','Serum','Treatment','Exfoliant','Eye Cream','Moisturizer','Sunscreen','Sleeping Mask']
const VALID_TIMES = ['am','pm','both']

function arg(name: string): string {
  const flag = `--${name}=`
  const entry = process.argv.find(a => a.startsWith(flag))
  if (!entry) { console.error(`Missing: --${name}=<value>`); process.exit(1) }
  return entry.slice(flag.length)
}

async function main() {
  const userId      = arg('user-id')
  const name        = arg('name')
  const tag         = arg('tag')
  const time        = arg('time')
  const ingredients = arg('ingredients').split(',').map(s => s.trim()).filter(Boolean)

  if (!VALID_TAGS.includes(tag)) {
    console.error(`Invalid tag. Choose one of:\n  ${VALID_TAGS.join(', ')}`)
    process.exit(1)
  }
  if (!VALID_TIMES.includes(time)) {
    console.error(`Invalid time. Choose one of: ${VALID_TIMES.join(', ')}`)
    process.exit(1)
  }

  const userCheck = await pool.query('SELECT id FROM users WHERE id=$1', [userId])
  if (!userCheck.rows[0]) {
    console.error(`User not found: ${userId}`)
    process.exit(1)
  }

  const { rows } = await pool.query(
    `INSERT INTO products (user_id,name,tag,time,ingredients)
     VALUES ($1,$2,$3,$4,$5) RETURNING id`,
    [userId, name, tag, time, ingredients]
  )

  console.log(`✅ Product "${name}" added to user ${userId}`)
  console.log(`   ID: ${rows[0].id}`)
  await pool.end()
}

main().catch(err => { console.error(err.message); process.exit(1) })
