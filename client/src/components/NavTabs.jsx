import { useState, useEffect } from 'react'
import Menu from '../pages/Menu.jsx'
import Locations from '../pages/Locations.jsx'
import Offers from '../pages/Offers.jsx'
import Reservation from '../pages/Reservation.jsx'
import About from '../pages/About.jsx'

const tabs = ['Menu', 'Locations', 'Offers', 'Reservation', 'About']

export default function NavTabs() {
  const [activeTab, setActiveTab] = useState('Menu')
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    } catch (e) {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {}
  }, [theme])

  const renderTab = () => {
    switch (activeTab) {
      case 'Menu':
        return <Menu />
      case 'Locations':
        return <Locations />
      case 'Offers':
        return <Offers />
      case 'Reservation':
        return <Reservation />
      case 'About':
        return <About />
      default:
        return <Menu />
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>BT&apos;s Pizza</h1>
        <button
          aria-label="Toggle theme"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          style={{ marginLeft: '1rem' }}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </header>

      <nav className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="content">{renderTab()}</main>
    </div>
  )
}