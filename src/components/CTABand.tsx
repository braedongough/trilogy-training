import { useInView } from '../hooks/useInView'
import { Button } from './Button'
import './CTABand.css'

type CTABandProps = {
  headline?: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
}

export function CTABand({
  headline = 'Ready to Take Your Training to the Next Level?',
  subtitle = 'Book a free consultation and discover how personalised coaching can transform your performance.',
  buttonText = 'Book Your Free Consultation',
  buttonHref = '/contact/',
}: CTABandProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="cta-band">
      <div className="cta-band__pattern" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="cta-band__tri" />
        ))}
      </div>

      <div ref={ref} className={`cta-band__content ${inView ? 'cta-band__content--visible' : ''}`}>
        <h2 className="cta-band__headline">{headline}</h2>
        <p className="cta-band__subtitle">{subtitle}</p>
        <Button href={buttonHref} variant="secondary" size="lg">
          {buttonText}
        </Button>
      </div>
    </section>
  )
}
