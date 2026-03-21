import { Button } from './Button'
import SwimmerSvg from '../assets/silhouettes/swimmer.svg?raw'
import CyclistSvg from '../assets/silhouettes/cyclist.svg?raw'
import RunnerSvg from '../assets/silhouettes/runner.svg?raw'
import './Hero.css'

const silhouettes = [SwimmerSvg, CyclistSvg, RunnerSvg]

function MarqueeStrip({ reverse = false }: { reverse?: boolean }) {
  const items = [...silhouettes, ...silhouettes]
  return (
    <div className={`hero__marquee-strip ${reverse ? 'hero__marquee-strip--reverse' : ''}`}>
      <div className="hero__marquee-track">
        {items.map((svg, i) => (
          <div
            key={i}
            className="hero__silhouette"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ))}
        {items.map((svg, i) => (
          <div
            key={`dup-${i}`}
            className="hero__silhouette"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <MarqueeStrip />
        <MarqueeStrip reverse />
        <MarqueeStrip />
      </div>

      <div className="hero__geometric hero__geometric--tri-1" />
      <div className="hero__geometric hero__geometric--tri-2" />
      <div className="hero__geometric hero__geometric--line-1" />
      <div className="hero__geometric hero__geometric--line-2" />

      <div className="hero__content">
        <p className="hero__tag">Personalised Endurance Coaching</p>
        <h1 className="hero__title">
          Train Smarter.<br />
          <span className="hero__title-accent">Race Stronger.</span>
        </h1>
        <p className="hero__subtitle">
          Expert coaching from Switzerland &amp; Spain — triathlon, running, cycling &amp; swimming programmes built around your life.
        </p>
        <div className="hero__actions">
          <Button href="/contact/" variant="primary" size="lg">
            Book a Free Call
          </Button>
          <Button href="/plans/" variant="outline" size="lg">
            View Plans
          </Button>
        </div>
      </div>

      <div className="hero__scroll-hint">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
