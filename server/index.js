import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool } from './db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// GET /api/menu - list all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, category, name, description, price FROM menu_items ORDER BY category, name'
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching menu items', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// optional: POST /api/menu to add items manually (for seeding)
app.post('/api/menu', async (req, res) => {
  const { category, name, description, price } = req.body
  if (!category || !name || price == null) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO menu_items (category, name, description, price)
       VALUES ($1, $2, $3, $4)
       RETURNING id, category, name, description, price`,
      [category, name, description || '', price]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error inserting menu item', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
