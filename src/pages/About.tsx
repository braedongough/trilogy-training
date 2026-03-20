import { useInView } from '../hooks/useInView'
import { Section } from '../components/Section'
import { CoachProfile } from '../components/CoachProfile'
import { CTABand } from '../components/CTABand'
import './About.css'

const principles = [
  {
    icon: '◆',
    title: 'Built Around You',
    desc: 'Every training plan starts with a conversation about your life, not just your fitness. We design around your work schedule, family commitments, and personal goals.',
  },
  {
    icon: '▲',
    title: 'Communication First',
    desc: "Coaching isn't a one-way street. We provide regular check-ins, detailed session feedback, and are always available when you need guidance or motivation.",
  },
  {
    icon: '◇',
    title: 'Science Meets Experience',
    desc: 'We combine evidence-based training methodology with years of real-world coaching experience. Every session has a purpose, and every plan has a structure.',
  },
  {
    icon: '▽',
    title: 'Long-Term Thinking',
    desc: "We're not interested in quick fixes. We build sustainable fitness that develops over months and years — so you keep improving season after season.",
  },
]

export function About() {
  const heroRef = useInView<HTMLDivElement>()
  const philRef = useInView<HTMLDivElement>()

  return (
    <>
      <Section background="default" id="about-hero">
        <div ref={heroRef.ref} className={`about-hero ${heroRef.inView ? 'about-hero--visible' : ''}`}>
          <p className="about-hero__label">About Us</p>
          <h1 className="about-hero__title">Meet Your Coaches</h1>
          <p className="about-hero__subtitle">
            Personalised endurance coaching from Switzerland &amp; Spain — two coaches, one shared philosophy: training that fits your life.
          </p>
        </div>
      </Section>

      <CoachProfile
        name="Adam Labbett"
        imageSrc="/images/coaches/adam.jpg"
        location="Switzerland"
        flag="🇨🇭"
        credentials="Endurance Sport Coaching Institute certified, Ironman U Certified Coach"
        bio="With over a decade of experience in endurance sport, Adam specialises in building training programmes that fit around busy lifestyles. His approach combines data-driven planning with a deep understanding of each athlete's individual needs — whether you're targeting your first sprint triathlon or chasing an Ironman PB. Adam believes that consistency, communication, and trust are the foundations of great coaching."
        accent="accent-1"
      />

      <CoachProfile
        name="Cameron Keast"
        imageSrc="/images/coaches/cameron.jpg"
        location="Spain"
        flag="🇪🇸"
        credentials="Sport Science degree from Edinburgh University"
        bio="Cameron brings a sport science background and a passion for helping athletes unlock their potential. Based in the heart of Spain's cycling and running paradise, he works with athletes of all levels — from complete beginners to experienced competitors. Cameron's coaching philosophy centres on progressive overload, smart recovery, and making training something you look forward to every day."
        accent="accent-2"
        reverse
      />

      <Section background="surface" divider="angle-top" id="philosophy">
        <div ref={philRef.ref} className={`phil ${philRef.inView ? 'phil--visible' : ''}`}>
          <p className="phil__label">What We Believe</p>
          <h2 className="phil__title">Our Philosophy</h2>

          <div className="phil__grid">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="phil__card"
                style={{ animationDelay: `${0.12 * (i + 1)}s` }}
              >
                <div className="phil__icon-wrap">
                  <span className="phil__icon">{p.icon}</span>
                </div>
                <h3 className="phil__card-title">{p.title}</h3>
                <p className="phil__card-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTABand
        headline="Find out if we're the right fit"
        subtitle="Book a free consultation to discuss your goals and see how personalised coaching can work for you."
        buttonText="Book a Free Call"
        buttonHref="/contact/"
      />
    </>
  )
}
