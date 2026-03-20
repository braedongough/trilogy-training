import { useInView } from '../hooks/useInView'
import { Section } from './Section'
import './HowItWorks.css'

const steps = [
  {
    num: '01',
    title: 'Book a Free Call',
    desc: 'Tell us about your goals, experience, and lifestyle. We\u2019ll discuss how personalised coaching can work for you.',
  },
  {
    num: '02',
    title: 'Get Your Plan',
    desc: 'Receive a training programme built around your schedule, fitness level, and target events \u2014 delivered via TrainingPeaks.',
  },
  {
    num: '03',
    title: 'Train & Improve',
    desc: 'Ongoing coaching, weekly adjustments, race strategy, and data-driven feedback to keep you progressing.',
  },
]

export function HowItWorks() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <Section background="alt" divider="angle-top" id="how-it-works">
      <div ref={ref} className={`hiw ${inView ? 'hiw--visible' : ''}`}>
        <p className="hiw__label">The Process</p>
        <h2 className="hiw__title">How It Works</h2>

        <div className="hiw__grid">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="hiw__card"
              style={{ animationDelay: `${0.15 * (i + 1)}s` }}
            >
              <div className="hiw__tri">
                <span className="hiw__num">{step.num}</span>
              </div>
              <h3 className="hiw__card-title">{step.title}</h3>
              <p className="hiw__card-desc">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hiw__connector" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
