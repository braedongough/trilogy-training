import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { Stats } from '../components/Stats'
import { Testimonials } from '../components/Testimonials'
import { WhyTrilogy } from '../components/WhyTrilogy'
import { CTABand } from '../components/CTABand'

export function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <WhyTrilogy />
      <CTABand />
    </>
  )
}
