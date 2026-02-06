import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://arleepta:Schwab123@10.2.1.3:5432/bts_pizza'

export const pool = new Pool({
  connectionString,
})