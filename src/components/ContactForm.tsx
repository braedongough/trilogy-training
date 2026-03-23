import { useState, useRef, useEffect } from 'react'
import { Button } from './Button'
import './ContactForm.css'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

type Country = { name: string; flag: string; dial: string }

const countries: Country[] = [
  { name: 'Australia', flag: '🇦🇺', dial: '+61' },
  { name: 'Austria', flag: '🇦🇹', dial: '+43' },
  { name: 'Belgium', flag: '🇧🇪', dial: '+32' },
  { name: 'Brazil', flag: '🇧🇷', dial: '+55' },
  { name: 'Canada', flag: '🇨🇦', dial: '+1' },
  { name: 'China', flag: '🇨🇳', dial: '+86' },
  { name: 'Croatia', flag: '🇭🇷', dial: '+385' },
  { name: 'Czech Republic', flag: '🇨🇿', dial: '+420' },
  { name: 'Denmark', flag: '🇩🇰', dial: '+45' },
  { name: 'Finland', flag: '🇫🇮', dial: '+358' },
  { name: 'France', flag: '🇫🇷', dial: '+33' },
  { name: 'Germany', flag: '🇩🇪', dial: '+49' },
  { name: 'Greece', flag: '🇬🇷', dial: '+30' },
  { name: 'Hong Kong', flag: '🇭🇰', dial: '+852' },
  { name: 'Hungary', flag: '🇭🇺', dial: '+36' },
  { name: 'India', flag: '🇮🇳', dial: '+91' },
  { name: 'Ireland', flag: '🇮🇪', dial: '+353' },
  { name: 'Israel', flag: '🇮🇱', dial: '+972' },
  { name: 'Italy', flag: '🇮🇹', dial: '+39' },
  { name: 'Japan', flag: '🇯🇵', dial: '+81' },
  { name: 'Luxembourg', flag: '🇱🇺', dial: '+352' },
  { name: 'Mexico', flag: '🇲🇽', dial: '+52' },
  { name: 'Netherlands', flag: '🇳🇱', dial: '+31' },
  { name: 'New Zealand', flag: '🇳🇿', dial: '+64' },
  { name: 'Norway', flag: '🇳🇴', dial: '+47' },
  { name: 'Poland', flag: '🇵🇱', dial: '+48' },
  { name: 'Portugal', flag: '🇵🇹', dial: '+351' },
  { name: 'Romania', flag: '🇷🇴', dial: '+40' },
  { name: 'Singapore', flag: '🇸🇬', dial: '+65' },
  { name: 'Slovakia', flag: '🇸🇰', dial: '+421' },
  { name: 'Slovenia', flag: '🇸🇮', dial: '+386' },
  { name: 'South Africa', flag: '🇿🇦', dial: '+27' },
  { name: 'South Korea', flag: '🇰🇷', dial: '+82' },
  { name: 'Spain', flag: '🇪🇸', dial: '+34' },
  { name: 'Sweden', flag: '🇸🇪', dial: '+46' },
  { name: 'Switzerland', flag: '🇨🇭', dial: '+41' },
  { name: 'Taiwan', flag: '🇹🇼', dial: '+886' },
  { name: 'Ukraine', flag: '🇺🇦', dial: '+380' },
  { name: 'United Arab Emirates', flag: '🇦🇪', dial: '+971' },
  { name: 'United Kingdom', flag: '🇬🇧', dial: '+44' },
  { name: 'United States', flag: '🇺🇸', dial: '+1' },
]

const trainingOptions = [
  '',
  'Triathlon',
  'Ironman',
  'Marathon',
  'Cycling Event',
  'Swimming Event',
  'General Fitness',
  'Other',
]

const referralOptions = [
  '',
  'Google Search',
  'Instagram',
  'Facebook',
  'Friend / Referral',
  'Other',
]

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find((c) => c.dial === '+44')!
  )
  const [showDropdown, setShowDropdown] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
        setCountrySearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function toggleDropdown() {
    setShowDropdown((prev) => {
      if (!prev) {
        setTimeout(() => searchRef.current?.focus(), 0)
      }
      return !prev
    })
    setCountrySearch('')
  }

  function selectCountry(country: Country) {
    setSelectedCountry(country)
    setShowDropdown(false)
    setCountrySearch('')
  }

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.dial.includes(countrySearch)
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const formData = Object.fromEntries(new FormData(e.currentTarget))
    const data = {
      ...formData,
      phone: formData.phone ? `${selectedCountry.dial} ${formData.phone}` : '',
    }

    try {
      const res = await fetch('https://formspree.io/f/mwvrjqpp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form">
        <div className="contact-form__success">
          <span className="contact-form__success-icon">▲</span>
          <h3 className="contact-form__success-title">Message Sent!</h3>
          <p className="contact-form__success-text">
            Thanks for reaching out. We'll get back to you within 24 hours to discuss your goals.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit} className="contact-form__fields">
        <div className="contact-form__row">
          <div className="contact-form__group">
            <label className="contact-form__label" htmlFor="cf-name">Name *</label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              className="contact-form__input"
              placeholder="Your name"
            />
          </div>
          <div className="contact-form__group">
            <label className="contact-form__label" htmlFor="cf-email">Email *</label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              className="contact-form__input"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="contact-form__row">
          <div className="contact-form__group">
            <label className="contact-form__label" htmlFor="cf-phone">Phone</label>
            <div className="contact-form__phone-wrapper" ref={dropdownRef}>
              <button
                type="button"
                className="contact-form__country-btn"
                onClick={toggleDropdown}
                aria-label="Select country code"
              >
                <span className="contact-form__country-flag">{selectedCountry.flag}</span>
                <span className="contact-form__country-dial">{selectedCountry.dial}</span>
                <span className="contact-form__country-chevron">{showDropdown ? '▲' : '▼'}</span>
              </button>
              <input
                id="cf-phone"
                name="phone"
                type="tel"
                className="contact-form__phone-input"
                placeholder="Phone number"
              />
              {showDropdown && (
                <div className="contact-form__phone-dropdown">
                  <input
                    ref={searchRef}
                    type="text"
                    className="contact-form__phone-search"
                    placeholder="Search"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                  />
                  <ul className="contact-form__phone-list">
                    {filteredCountries.map((country) => (
                      <li key={country.name}>
                        <button
                          type="button"
                          className={`contact-form__phone-option${selectedCountry.name === country.name ? ' contact-form__phone-option--active' : ''}`}
                          onClick={() => selectCountry(country)}
                        >
                          <span className="contact-form__country-flag">{country.flag}</span>
                          <span className="contact-form__option-name">{country.name}</span>
                          <span className="contact-form__option-dial">{country.dial}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="contact-form__group">
            <label className="contact-form__label" htmlFor="cf-training">What are you training for? *</label>
            <select
              id="cf-training"
              name="training"
              required
              className="contact-form__select"
              defaultValue=""
            >
              <option value="" disabled>Select an option</option>
              {trainingOptions.filter(Boolean).map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="contact-form__group">
          <label className="contact-form__label" htmlFor="cf-goals">Tell us about your goals *</label>
          <textarea
            id="cf-goals"
            name="goals"
            required
            className="contact-form__textarea"
            placeholder="Your upcoming races, current fitness level, what you want to achieve..."
          />
        </div>

        <div className="contact-form__group">
          <label className="contact-form__label" htmlFor="cf-referral">How did you hear about us?</label>
          <select
            id="cf-referral"
            name="referral"
            className="contact-form__select"
            defaultValue=""
          >
            <option value="" disabled>Select an option</option>
            {referralOptions.filter(Boolean).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="contact-form__submit">
          <Button variant="primary" size="lg">
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </Button>
        </div>

        {status === 'error' && (
          <p className="contact-form__error">Something went wrong. Please try again or email us directly.</p>
        )}
      </form>
    </div>
  )
}
