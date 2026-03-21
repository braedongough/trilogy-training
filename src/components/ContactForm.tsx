import { useState } from 'react'
import { Button } from './Button'
import './ContactForm.css'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const res = await fetch('https://formspree.io/f/placeholder', {
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
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              className="contact-form__input"
              placeholder="+41 / +34 ..."
            />
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
