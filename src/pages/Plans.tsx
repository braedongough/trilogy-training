import { useState } from 'react'
import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { FAQ } from '../components/FAQ'
import './Plans.css'

type Currency = 'CHF' | 'EUR' | 'GBP'

const prices = {
  single: { CHF: 70, EUR: 75, GBP: 70 },
  multi: { CHF: 100, EUR: 105, GBP: 100 },
}

export function Plans() {
  const [currency, setCurrency] = useState<Currency>('CHF')

  return (
    <>
      <Section background="default" className="section--plans-pricing">
        <div className="plans-hero">
          <p className="plans-hero__label">Coaching Plans</p>
          <h1 className="plans-hero__title">Plans &amp; Pricing</h1>
          <p className="plans-hero__subtitle">
            Coaching tailored to you, not a one-size-fits-all package. Simple pricing, personalised coaching.
          </p>
        </div>

        <div className="pricing">
          <div className="pricing__toggle">
            <button
              className={`pricing__toggle-btn ${currency === 'CHF' ? 'pricing__toggle-btn--active' : ''}`}
              onClick={() => setCurrency('CHF')}
            >
              CHF
            </button>
            <button
              className={`pricing__toggle-btn ${currency === 'EUR' ? 'pricing__toggle-btn--active' : ''}`}
              onClick={() => setCurrency('EUR')}
            >
              EUR
            </button>
            <button
              className={`pricing__toggle-btn ${currency === 'GBP' ? 'pricing__toggle-btn--active' : ''}`}
              onClick={() => setCurrency('GBP')}
            >
              GBP
            </button>
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
      </Section>

      <Section background="surface" divider="angle-top">
        <div className="premade">
          <p className="premade__label">Off the Shelf</p>
          <h2 className="premade__title">Pre-Made Training Plans</h2>
          <p className="premade__desc">
            Prefer a ready-made plan? Browse our library of structured training plans on TrainingPeaks, designed for athletes who want expert programming without one-to-one coaching.
          </p>
          <Button
            href="https://www.trainingpeaks.com/my-training-plans/trilogytraining"
            variant="outline"
            size="lg"
            external
          >
            Browse Plans on TrainingPeaks
          </Button>
        </div>
      </Section>

      <FAQ />
    </>
  )
}
