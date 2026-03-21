import { Section } from './Section'
import './WhyTrilogy.css'

const reasons = [
  {
    icon: '◆',
    title: 'Truly Personalised',
    desc: 'No templates. Every plan is built from scratch based on your goals, schedule, and current fitness. As your life changes, your plan adapts.',
  },
  {
    icon: '▲',
    title: 'Certified & Experienced',
    desc: 'Endurance Sport Coaching Institute and Ironman U certified coaches with 15+ years of combined experience across triathlon, running, and cycling.',
  },
  {
    icon: '◇',
    title: 'Data-Driven Progress',
    desc: 'Regular performance analysis using TrainingPeaks metrics. We track what matters and adjust your training based on real data, not guesswork.',
  },
  {
    icon: '▽',
    title: 'Life-First Coaching',
    desc: 'Training should enhance your life, not consume it. We build plans around your work, family, and commitments — not the other way around.',
  },
]

export function WhyTrilogy() {
  return (
    <Section background="alt" divider="angle-top" id="why-trilogy">
      <div className="why">
        <p className="why__label">The Difference</p>
        <h2 className="why__title">Why Trilogy Training</h2>

        <div className="why__grid">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="why__card"
            >
              <div className="why__icon-wrap">
                <span className="why__icon">{r.icon}</span>
              </div>
              <h3 className="why__card-title">{r.title}</h3>
              <p className="why__card-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
