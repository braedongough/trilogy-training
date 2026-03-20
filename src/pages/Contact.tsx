import { Section } from '../components/Section'

export function Contact() {
  return (
    <>
      <Section background="default">
        <div style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
          <h1>Let's Talk</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Book a free consultation or drop us a message. We'd love to hear about your goals.
          </p>
        </div>
      </Section>
    </>
  )
}
