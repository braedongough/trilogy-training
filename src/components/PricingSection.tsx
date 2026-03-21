import { useState } from 'react'
import { Button } from './Button'
import '../pages/Plans.css'

type Currency = 'CHF' | 'EUR' | 'GBP'

const currencies: Currency[] = ['CHF', 'EUR', 'GBP']

const prices = {
  single: { CHF: 70, EUR: 75, GBP: 70 },
  multi: { CHF: 100, EUR: 105, GBP: 100 },
}

export default function PricingSection() {
  const [currency, setCurrency] = useState<Currency>('CHF')

  return (
    <div className="pricing">
      <div className="pricing__toggle">
        {currencies.map((c) => (
          <button
            key={c}
            className={`pricing__toggle-btn ${currency === c ? 'pricing__toggle-btn--active' : ''}`}
            onClick={() => setCurrency(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="pricing__cards">
        <div className="pricing__card">
          <h3 className="pricing__card-name">Single Discipline</h3>
          <p className="pricing__card-desc">
            Ongoing coaching, feedback, and structured training for one sport: swimming, cycling, or running.
          </p>
          <p className="pricing__card-price">
            <span className="pricing__card-amount">{prices.single[currency]}</span>
            <span className="pricing__card-currency">{currency}</span>
            <span className="pricing__card-period">/ month</span>
          </p>
        </div>

        <div className="pricing__card">
          <h3 className="pricing__card-name">Multi-Discipline</h3>
          <p className="pricing__card-desc">
            Full coaching across multiple disciplines with training that adapts to your progress and schedule.
          </p>
          <p className="pricing__card-price">
            <span className="pricing__card-amount">{prices.multi[currency]}</span>
            <span className="pricing__card-currency">{currency}</span>
            <span className="pricing__card-period">/ month</span>
          </p>
        </div>

        <div className="pricing__card">
          <h3 className="pricing__card-name">Custom</h3>
          <p className="pricing__card-desc">
            Something different in mind? We're happy to build a coaching arrangement that fits your specific needs.
          </p>
          <p className="pricing__card-price">
            <span className="pricing__card-custom">Let's talk</span>
          </p>
        </div>
      </div>

      <div className="pricing__cta">
        <Button href="/contact/" variant="primary" size="lg">
          Get in Touch
        </Button>
      </div>
    </div>
  )
}
