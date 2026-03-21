import { Section } from './Section'
import './Testimonials.css'

const testimonials = [
  {
    quote:
      "My sporting challenge demanded that I ride over the Pyrenees from the Atlantic to the Mediterranean in 100 hours. Cycling 800kms over countless mountains. I got it done with hours to spare and in good shape by trusting Adam, trusting the process, and embracing the positive feeling that comes from following a well-structured training plan. A bout of Covid induced a massive self-doubt-wobble, but Adam's calmness and words of wonderful wisdom became as important as the time spent on the bike. I'm in my sixties and not a life-long sportsman so this is not the exclusive domain of the elite athlete. If you are thinking of a challenge, sign up and then engage with Adam. You will be glad you did.",
    name: 'Philip',
    event: 'Pyrenees Crossing, 800km',
  },
  {
    quote:
      "I started training with Cameron when I became determined to achieve my dream of a sub 4 hour marathon. This would mean knocking 20 minutes off my current time so it was a big challenge. After all the hard work, I achieved my goal. Cameron taught me so much about how to run effectively and efficiently and also how to enjoy the process and believe in myself. After this success I am now working towards my next goal of a Sprint Triathlon. Cameron provides specific targets for each of the disciplines and knows exactly what I need to do in order to improve.",
    name: 'Naomi',
    event: 'Sub-4 Hour Marathon',
  },
  {
    quote:
      "Thanks to Adam, I, a long-term road cyclist who had never run before, was able to complete a duathlon and a marathon with confidence and success! Without Adam's custom training plans and positive mindset, I wouldn't have been able to do it! His knowledge and expertise as a coach gave me the boost I needed to push beyond my limits and achieve personal bests in both competitions. Adam played a massive role in my accomplishments, and I am forever grateful for his support and mentorship.",
    name: 'Jason',
    event: 'Duathlon & Marathon',
  },
  {
    quote:
      "Being coached by Adam gave me a clear, structured, personalised plan to follow, which enabled me to enjoy the training and fully trust that, if I followed his process, I'd get great results. I achieved a personal best race time only a few weeks after a ski injury and covid, thanks to Adam's knowledge and experience to adapt my training. He guided me through a new plan that challenged me within my limits and I wouldn't have had the same confidence and result without his coaching.",
    name: 'Karina',
    event: 'Personal Best Race Time',
  },
  {
    quote:
      "Cameron always provides a clear, precise and effective program to follow and enjoy. He helped me train towards a marathon which was always a big goal of mine. Every step of the way he's communicative, professional and resourceful and I couldn't recommend him high enough. If you want any form of training be it triathlon, fitness or marathons, please don't hesitate to be in contact. You won't regret it!",
    name: 'Joe',
    event: 'Marathon',
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
