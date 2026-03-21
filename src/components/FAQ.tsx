import { useState } from 'react'
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
      'Absolutely, you can pause at any time. Just give us a heads-up and we\u2019ll pick things back up whenever you\u2019re ready. No extra cost, no penalty.',
  },
  {
    question: 'Do you coach complete beginners?',
    answer:
      'Absolutely. Some of our most rewarding work has been with athletes who are completely new to endurance sport. We\u2019ll build your fitness gradually and safely, with clear guidance at every step.',
  },
  {
    question: 'How do consultations work?',
    answer:
      'Your free initial consultation is a video call of up to 60 minutes where we learn about your goals, experience, and lifestyle. It\u2019s also a chance for you to get to know us and make sure you\u2019re happy that we\u2019d work well together. Zero pressure, just an open conversation.',
  },
  {
    question: 'What if I\u2019m training for a specific race?',
    answer:
      'Race-specific preparation is one of our specialities. We\u2019ll build a periodised plan working backwards from your race date, with key sessions, taper strategy, race-day pacing, and nutrition guidance all included.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="faq">
      <p className="faq__label">Common Questions</p>
      <h2 className="faq__title">Frequently Asked Questions</h2>

      <div className="faq__list">
        {items.map((item, i) => (
          <div
            key={item.question}
            className={`faq__item${openIndex === i ? ' faq__item--open' : ''}`}
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
  )
}
