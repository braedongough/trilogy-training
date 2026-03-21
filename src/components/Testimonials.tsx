import { Section } from './Section'
import './Testimonials.css'

const testimonials = [
  {
    quote:
      "I\u2019ve really enjoyed working with Adam over the past year. Prior to hiring a coach I was very much training on my own with a plan I put together from watching YouTube videos. Adam\u2019s plan is tailored around my personal targets, lifestyle, and ability. Having a dedicated coach has been a game changer for my training consistency and race results.",
    name: 'Mark T.',
    event: 'Ironman 70.3 Finisher',
  },
  {
    quote:
      "The personalised approach makes all the difference. My coach understood that I\u2019m a busy professional and designed sessions that fit my schedule without compromising on quality. I\u2019ve smashed every PB this season.",
    name: 'Sarah K.',
    event: 'Sub-3:30 Marathon',
  },
  {
    quote:
      "From a complete triathlon beginner to completing my first Olympic distance in under 3 hours. The structured plan, weekly check-ins, and race-day strategy gave me total confidence on the start line.",
    name: 'James W.',
    event: 'First Olympic Triathlon',
  },
  {
    quote:
      "What sets Trilogy apart is the communication. I never feel like I\u2019m just getting a cookie-cutter plan. Every session has a purpose, and my coach explains the \u2018why\u2019 behind each workout.",
    name: 'Laura D.',
    event: 'Age Group Podium \u2014 Ironman Switzerland',
  },
]

export function Testimonials() {
  return (
    <Section background="default" id="testimonials">
      <div className="testi">
        <p className="testi__label">Athletes Speaking</p>
        <h2 className="testi__title">What Our Athletes Say</h2>

        <div className="testi__grid">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="testi__card"
            >
              <div className="testi__quote-mark" aria-hidden="true">&ldquo;</div>
              <p className="testi__text">{t.quote}</p>
              <footer className="testi__footer">
                <div className="testi__avatar">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <cite className="testi__name">{t.name}</cite>
                  <span className="testi__event">{t.event}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </Section>
  )
}
