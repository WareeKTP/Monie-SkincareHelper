import 'dotenv/config'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

function arg(name: string): string {
  const flag = `--${name}=`
  const entry = process.argv.find(a => a.startsWith(flag))
  if (!entry) { console.error(`Missing: --${name}=<value>`); process.exit(1) }
  return entry.slice(flag.length)
}

async function main() {
  const row = {
    id:          arg('id'),
    name:        arg('name'),
    emoji:       arg('emoji'),
    tag:         arg('tag'),
    description: arg('description'),
    best_time:   arg('best_time'),
    time_icon:   arg('time_icon'),
    tip:         arg('tip'),
  }

  await pool.query(
    `INSERT INTO ingredients (id,name,emoji,tag,description,best_time,time_icon,tip)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     ON CONFLICT (id) DO UPDATE SET
       name=$2, emoji=$3, tag=$4, description=$5, best_time=$6, time_icon=$7, tip=$8`,
    Object.values(row)
  )

  console.log(`✅ Ingredient "${row.name}" (${row.id}) saved.`)
  await pool.end()
}

main().catch(err => { console.error(err.message); process.exit(1) })
