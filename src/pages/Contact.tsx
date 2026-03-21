import { Section } from '../components/Section'
import { ContactForm } from '../components/ContactForm'
import './Contact.css'

export function Contact() {

  return (
    <>
      {/* Hero */}
      <Section background="default" className="section--page-header contact-hero-section">
        <div className="contact-hero">
          <p className="contact-hero__label">Get in Touch</p>
          <h1 className="contact-hero__title">Let's Talk</h1>
          <p className="contact-hero__subtitle">
            Book a free consultation or drop us a message. We'd love to hear about your goals.
          </p>
        </div>
      </Section>

      {/* Form + Contact Info */}
      <Section background="alt" className="contact-form-section">
        <div className="contact-grid">
          <ContactForm />

          <div className="contact-info">
            <h2 className="contact-info__heading">Prefer to reach out directly?</h2>

            <div className="contact-info__items">
              <a
                href="https://wa.me/447545017670"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__item"
              >
                <span className="contact-info__item-icon">💬</span>
                <span className="contact-info__item-text">
                  <span className="contact-info__item-label">WhatsApp (UK)</span>
                  +44 7545 017670
                </span>
              </a>

              <a
                href="https://wa.me/41767227296"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__item"
              >
                <span className="contact-info__item-icon">💬</span>
                <span className="contact-info__item-text">
                  <span className="contact-info__item-label">WhatsApp (CH)</span>
                  +41 76 722 7296
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
                href="https://www.facebook.com/trilogy.tri.training/"
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
    </>
  )
}
