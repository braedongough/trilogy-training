import { useInView } from '../hooks/useInView'
import { Section } from '../components/Section'
import { ContactForm } from '../components/ContactForm'
import './Contact.css'

export function Contact() {
  const { ref: infoRef, inView: infoInView } = useInView<HTMLDivElement>()
  const { ref: locRef, inView: locInView } = useInView<HTMLDivElement>()

  return (
    <>
      {/* Hero */}
      <Section background="default">
        <div className="contact-hero">
          <p className="contact-hero__label">Get in Touch</p>
          <h1 className="contact-hero__title">Let's Talk</h1>
          <p className="contact-hero__subtitle">
            Book a free consultation or drop us a message. We'd love to hear about your goals.
          </p>
        </div>
      </Section>

      {/* Form + Contact Info */}
      <Section background="alt" divider="angle-top">
        <div className="contact-grid">
          <ContactForm />

          <div
            ref={infoRef}
            className={`contact-info ${infoInView ? 'contact-info--visible' : ''}`}
          >
            <h2 className="contact-info__heading">Prefer to reach out directly?</h2>

            <div className="contact-info__items">
              <a
                href="https://wa.me/41XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__item"
              >
                <span className="contact-info__item-icon">💬</span>
                <span className="contact-info__item-text">
                  <span className="contact-info__item-label">WhatsApp</span>
                  WhatsApp Adam 🇨🇭
                </span>
              </a>

              <a
                href="https://wa.me/34XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__item"
              >
                <span className="contact-info__item-icon">💬</span>
                <span className="contact-info__item-text">
                  <span className="contact-info__item-label">WhatsApp</span>
                  WhatsApp Cameron 🇪🇸
                </span>
              </a>

              <a
                href="mailto:info@trilogy-training.com"
                className="contact-info__item"
              >
                <span className="contact-info__item-icon">✉️</span>
                <span className="contact-info__item-text">
                  <span className="contact-info__item-label">Email</span>
                  info@trilogy-training.com
                </span>
              </a>

              <a
                href="https://www.instagram.com/trilogy_training_"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__item"
              >
                <span className="contact-info__item-icon">📸</span>
                <span className="contact-info__item-text">
                  <span className="contact-info__item-label">Instagram</span>
                  @trilogy_training_
                </span>
              </a>

              <a
                href="https://www.facebook.com/trilogytraining"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__item"
              >
                <span className="contact-info__item-icon">👍</span>
                <span className="contact-info__item-text">
                  <span className="contact-info__item-label">Facebook</span>
                  Trilogy Training
                </span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Coach Locations */}
      <Section background="default" divider="angle-top">
        <div ref={locRef} className={`contact-locations ${locInView ? 'contact-locations--visible' : ''}`}>
          <div className="contact-locations__header">
            <p className="contact-locations__label">Where We're Based</p>
            <h2 className="contact-locations__title">Coaching from Two Corners of Europe</h2>
          </div>

          <div className="contact-locations__grid">
            <div className="contact-locations__card contact-locations__card--adam">
              <span className="contact-locations__card-flag">🇨🇭</span>
              <h3 className="contact-locations__card-country">Switzerland</h3>
              <p className="contact-locations__card-desc">
                Based in the Swiss Alps — coaching athletes across Europe and beyond.
              </p>
              <div className="contact-locations__card-tri" aria-hidden="true" />
            </div>

            <div className="contact-locations__card contact-locations__card--cameron">
              <span className="contact-locations__card-flag">🇪🇸</span>
              <h3 className="contact-locations__card-country">Spain</h3>
              <p className="contact-locations__card-desc">
                Based on the Spanish coast — the perfect training environment year-round.
              </p>
              <div className="contact-locations__card-tri" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
