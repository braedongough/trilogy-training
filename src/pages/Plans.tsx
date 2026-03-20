import { Section } from '../components/Section'
import { Button } from '../components/Button'

export function Plans() {
  return (
    <>
      <Section background="default">
        <div style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
          <h1>Plans &amp; Pricing</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Find the perfect coaching plan for your goals — from self-guided training to fully personalised elite coaching.
          </p>
        </div>
      </Section>
      <Section background="accent-2" divider="angle-top">
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <h2>Not sure which plan is right for you?</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <Button href="/contact" variant="secondary" size="lg">Book a Free Call</Button>
          </div>
        </div>
      </Section>
    </>
  )
}
