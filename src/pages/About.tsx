import { Section } from '../components/Section'
import { Button } from '../components/Button'

export function About() {
  return (
    <>
      <Section background="default">
        <div style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
          <h1>Meet Your Coaches</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Adam Labbett (Switzerland) and Cameron Keast (Spain) — certified endurance coaches dedicated to helping you reach your goals.
          </p>
        </div>
      </Section>
      <Section background="alt" divider="angle-top">
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <h2>Find out if we're the right fit</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <Button href="/contact" variant="primary" size="lg">Book a Free Call</Button>
          </div>
        </div>
      </Section>
    </>
  )
}
