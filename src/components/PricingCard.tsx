import { Section } from './Section'
import { Button } from './Button'
import './PricingCard.css'

type Tier = {
  name: string
  price: string
  desc: string
  features: string[]
  featured?: boolean
  buttonVariant: 'primary' | 'outline'
}

const tiers: Tier[] = [
  {
    name: 'Foundation',
    price: '€99',
    desc: 'For athletes who want structure but prefer independence.',
    features: [
      'Monthly personalised training plan',
      'TrainingPeaks integration',
      'Monthly check-in call',
      'Email support',
      'Quarterly plan review',
    ],
    buttonVariant: 'outline',
  },
  {
    name: 'Performance',
    price: '€199',
    desc: 'For athletes serious about improvement.',
    features: [
      'Weekly personalised training plan',
      'TrainingPeaks integration',
      'Weekly coaching call',
      'Unlimited messaging support',
      'Race strategy & pacing',
      'Monthly performance review',
      'Training camp priority access',
    ],
    featured: true,
    buttonVariant: 'primary',
  },
  {
    name: 'Elite',
    price: '€349',
    desc: 'For athletes targeting peak performance.',
    features: [
      'Daily personalised training plan',
      'TrainingPeaks integration',
      'Twice-weekly coaching calls',
      'Daily messaging support',
      'Detailed session analysis',
      'Nutrition guidance',
      'Unlimited plan revisions',
      'Race-day support',
      'Annual periodisation planning',
    ],
    buttonVariant: 'outline',
  },
]

export function PricingCards() {
  return (
    <Section background="default" id="pricing">
      <div className="pricing">
        <p className="pricing__label">Coaching Plans</p>
        <h2 className="pricing__title">Simple, Transparent Pricing</h2>
        <p className="pricing__subtitle">
          Every plan includes personalised coaching. No templates, no generic advice. Choose the level of support that fits your goals.
        </p>

        <div className="pricing__grid">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing__card${tier.featured ? ' pricing__card--featured' : ''}`}
            >
              {tier.featured && <span className="pricing__badge">Most Popular</span>}
              <h3 className="pricing__tier">{tier.name}</h3>
              <p className="pricing__price">
                {tier.price}<span>/month</span>
              </p>
              <p className="pricing__desc">{tier.desc}</p>
              <hr className="pricing__divider" />
              <ul className="pricing__features">
                {tier.features.map((f) => (
                  <li key={f} className="pricing__feature">
                    <span className="pricing__check" aria-hidden="true">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="pricing__cta">
                <Button href="/contact/" variant={tier.buttonVariant} size="md">
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
