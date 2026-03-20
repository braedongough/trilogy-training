import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { Section } from './Section'
import './FAQ.css'

type FAQItem = {
  question: string
  answer: string
}

const items: FAQItem[] = [
  {
    question: 'What platform do you use for training plans?',
    answer:
      'We deliver all training plans via TrainingPeaks, the industry-standard platform for endurance coaching. You\u2019ll be able to see your workouts on your phone, sync them to your watch, and track your progress over time.',
  },
  {
    question: 'Can I pause my coaching?',
    answer:
      'Life happens \u2014 we get it. You can pause your coaching subscription for up to 4 weeks per year with no penalty. Just give us a heads-up and we\u2019ll adjust your plan for when you return.',
  },
  {
    question: 'Do you coach complete beginners?',
    answer:
      'Absolutely. Some of our most rewarding work has been with athletes who are completely new to endurance sport. We\u2019ll build your fitness gradually and safely, with clear guidance at every step.',
  },
  {
    question: 'How do consultations work?',
    answer:
      'Your free initial consultation is a 30-minute video call where we learn about your goals, experience, and lifestyle. There\u2019s zero pressure \u2014 it\u2019s simply a chance for us to understand what you\u2019re looking for and explain how we can help.',
  },
  {
    question: 'What if I\u2019m training for a specific race?',
    answer:
      'Race-specific preparation is one of our specialities. We\u2019ll build a periodised plan working backwards from your race date, with key sessions, taper strategy, race-day pacing, and nutrition guidance all included.',
  },
  {
    question: 'Can I switch plans?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle. We\u2019ll adjust your coaching approach to match your new plan immediately.',
  },
]

export function FAQ() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section background="alt" divider="angle-top" id="faq">
      <div ref={ref} className={`faq ${inView ? 'faq--visible' : ''}`}>
        <p className="faq__label">Common Questions</p>
        <h2 className="faq__title">Frequently Asked Questions</h2>

        <div className="faq__list">
          {items.map((item, i) => (
            <div
              key={item.question}
              className={`faq__item${openIndex === i ? ' faq__item--open' : ''}`}
              style={{ animationDelay: `${0.1 * (i + 1)}s` }}
            >
              <button
                className="faq__trigger"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                {item.question}
                <span className="faq__icon" aria-hidden="true">+</span>
              </button>
              <div className="faq__body">
                <div className="faq__body-inner">
                  <p className="faq__answer">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
