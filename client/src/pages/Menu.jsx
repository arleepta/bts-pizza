import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export default function Menu() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${API_BASE}/menu`)
        if (!res.ok) throw new Error('Failed to load menu')
        const data = await res.json()
        setItems(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load menu items right now.')
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [])

  if (loading) return <p>Loading menu...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Menu</h2>
      {items.length === 0 && <p>No menu items available yet.</p>}
      <ul className="menu-list">
        {items.map((item) => (
          <li key={item.id} className="menu-item">
            <div className="menu-header">
              <span className="menu-name">
                {item.name} ({item.category})
              </span>
              <span className="menu-price">${Number(item.price).toFixed(2)}</span>
            </div>
            {item.description && (
              <p className="menu-description">{item.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
