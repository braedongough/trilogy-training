import { useState, useEffect } from 'react'
import './ThemeSwitcher.css'

const themes = [
  { name: 'default', label: 'Original', colors: ['#00E5CC', '#FF2D78'] },
  { name: 'warm', label: 'Warm', colors: ['#FFB800', '#FF4500'] },
  { name: 'cool', label: 'Cool', colors: ['#7B68EE', '#00CED1'] },
  { name: 'earth', label: 'Earth', colors: ['#2ECC71', '#E67E22'] },
]

export default function ThemeSwitcher() {
  const [active, setActive] = useState('default')

  useEffect(() => {
    const saved = localStorage.getItem('trilogy-theme')
    if (saved) {
      setActive(saved)
    }
  }, [])

  function setTheme(name: string) {
    setActive(name)
    if (name === 'default') {
      document.documentElement.removeAttribute('data-theme')
      localStorage.removeItem('trilogy-theme')
    } else {
      document.documentElement.setAttribute('data-theme', name)
      localStorage.setItem('trilogy-theme', name)
    }
  }

  return (
    <div className="theme-switcher">
      <span className="theme-switcher__label">Theme</span>
      <div className="theme-switcher__swatches">
        {themes.map(t => (
          <button
            key={t.name}
            className={`theme-switcher__swatch ${active === t.name ? 'theme-switcher__swatch--active' : ''}`}
            onClick={() => setTheme(t.name)}
            aria-label={`Switch to ${t.label} theme`}
            title={t.label}
          >
            <span style={{ background: t.colors[0] }} />
            <span style={{ background: t.colors[1] }} />
          </button>
        ))}
      </div>
    </div>
  )
}
