import { useEffect, useState, useRef, useCallback } from 'react'
import { useInView } from '../hooks/useInView'
import './Stats.css'

const stats = [
  { value: 500, suffix: '+', label: 'Training Plans Delivered' },
  { value: 15, suffix: '+', label: 'Years Combined Experience' },
  { value: 10, suffix: '+', label: 'Countries Served' },
  { value: 100, suffix: '%', label: 'Personalised Coaching' },
]

function AnimatedNumber({ target, suffix, animate }: { target: number; suffix: string; animate: boolean }) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>(0)

  const run = useCallback(() => {
    const duration = 2000
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
  }, [target])

  useEffect(() => {
    if (animate) run()
    return () => cancelAnimationFrame(frameRef.current)
  }, [animate, run])

  return (
    <span className="stats__number">
      {animate ? count : 0}{suffix}
    </span>
  )
}

export default function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })

  return (
    <div ref={ref} className={`stats ${inView ? 'stats--visible' : ''}`}>
      <div className="stats__grid">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="stats__item"
            style={{ animationDelay: `${0.1 * (i + 1)}s` }}
          >
            <AnimatedNumber
              target={stat.value}
              suffix={stat.suffix}
              animate={inView}
            />
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
