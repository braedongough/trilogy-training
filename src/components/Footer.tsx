import { ThemeSwitcher } from './ThemeSwitcher'
import './Footer.css'

const sitemapLinks = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/plans/', label: 'Plans & Pricing' },
  { href: '/contact/', label: 'Contact' },
  { href: 'https://www.owayo.ie/store/trilogytraining', label: 'Shop' },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__geometric" />
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-tri">TRI</span>
              <span className="footer__logo-logy">LOGY</span>
            </div>
            <p className="footer__tagline">
              Personalised endurance coaching from Switzerland &amp; Spain.
            </p>
            <ThemeSwitcher />
          </div>

          <div className="footer__col">
            <p className="footer__heading">Pages</p>
            {sitemapLinks.map(link => (
              <a key={link.href} href={link.href} className="footer__link">{link.label}</a>
            ))}
          </div>

          <div className="footer__col">
            <p className="footer__heading">Connect</p>
            <a href="https://www.instagram.com/trilogy_training_/" className="footer__link" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://www.facebook.com/trilogytraining" className="footer__link" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="mailto:info@trilogy-training.com" className="footer__link">
              Email Us
            </a>
          </div>

          <div className="footer__col">
            <p className="footer__heading">Stay Updated</p>
            <p className="footer__text">Get training tips and camp announcements.</p>
            <form className="footer__newsletter" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="footer__input"
                aria-label="Email for newsletter"
              />
              <button type="submit" className="footer__submit">→</button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Trilogy Training. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="#" className="footer__link">Privacy Policy</a>
            <a href="#" className="footer__link">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
