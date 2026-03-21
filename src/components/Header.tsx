import { useState, useEffect } from 'react'
import { Button } from './Button'
import './Header.css'

const navLinks: { href: string; label: string; external?: boolean }[] = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/plans/', label: 'Plans' },
  { href: '/contact/', label: 'Contact' },
  { href: 'https://www.owayo.ie/store/trilogytraining', label: 'Shop', external: true },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/'

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="/" className="header__logo">
          <span className="header__logo-tri">TRI</span>
          <span className="header__logo-logy">LOGY</span>
          <span className="header__logo-training">TRAINING</span>
        </a>

        <button
          className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`header__link ${!link.external && (currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href))) ? 'header__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__cta">
          <Button href="/contact/" variant="primary" size="sm">
            Book a Free Call
          </Button>
        </div>
      </div>
    </header>
  )
}
