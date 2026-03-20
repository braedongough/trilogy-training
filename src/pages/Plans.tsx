import { useInView } from '../hooks/useInView'
import { Section } from '../components/Section'
import { PricingCards } from '../components/PricingCard'
import { FAQ } from '../components/FAQ'
import { CTABand } from '../components/CTABand'
import './Plans.css'

const comparisonFeatures = [
  { feature: 'Personalised training plan', foundation: 'Monthly', performance: 'Weekly', elite: 'Daily' },
  { feature: 'TrainingPeaks integration', foundation: true, performance: true, elite: true },
  { feature: 'Coaching calls', foundation: 'Monthly', performance: 'Weekly', elite: '2×/week' },
  { feature: 'Messaging support', foundation: 'Email', performance: 'Unlimited', elite: 'Daily' },
  { feature: 'Race strategy & pacing', foundation: false, performance: true, elite: true },
  { feature: 'Performance reviews', foundation: 'Quarterly', performance: 'Monthly', elite: 'Monthly' },
  { feature: 'Session analysis', foundation: false, performance: false, elite: true },
  { feature: 'Nutrition guidance', foundation: false, performance: false, elite: true },
  { feature: 'Plan revisions', foundation: false, performance: false, elite: 'Unlimited' },
  { feature: 'Race-day support', foundation: false, performance: false, elite: true },
  { feature: 'Training camp priority', foundation: false, performance: true, elite: true },
  { feature: 'Annual periodisation', foundation: false, performance: false, elite: true },
]

function renderCell(value: boolean | string) {
  if (value === true) return <span className="compare__check">✓</span>
  if (value === false) return <span className="compare__dash">—</span>
  return value
}

export function Plans() {
  const heroView = useInView<HTMLDivElement>()
  const compareView = useInView<HTMLDivElement>()

  return (
    <>
      <Section background="default">
        <div ref={heroView.ref} className="plans-hero">
          <p className="plans-hero__label">Coaching Plans</p>
          <h1 className="plans-hero__title">Plans &amp; Pricing</h1>
          <p className="plans-hero__subtitle">
            Find the perfect coaching plan for your goals — from self-guided training to fully personalised elite coaching.
          </p>
        </div>
      </Section>

      <PricingCards />

      <Section background="surface" divider="angle-top">
        <div ref={compareView.ref} className={`compare ${compareView.inView ? 'compare--visible' : ''}`}>
          <p className="compare__label">At a Glance</p>
          <h2 className="compare__title">Compare Plans</h2>

          <div className="compare__table-wrap">
            <table className="compare__table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Foundation</th>
                  <th className="compare__th--featured">Performance</th>
                  <th>Elite</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td>{renderCell(row.foundation)}</td>
                    <td>{renderCell(row.performance)}</td>
                    <td>{renderCell(row.elite)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <FAQ />

      <CTABand
        headline="Not sure which plan is right for you?"
        subtitle="Book a free consultation and we'll help you find the perfect fit."
        buttonText="Book a Free Call"
        buttonHref="/contact/"
      />
    </>
  )
}
