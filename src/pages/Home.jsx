import PageTransition from '../components/PageTransition'
import ScrollHero from '../components/ScrollHero'
import Intro from '../sections/Intro'
import WhatWeDo from '../sections/WhatWeDo'
import Testimonials from '../sections/Testimonials'
import FinalCTA from '../sections/FinalCTA'

export default function Home() {
  return (
    <PageTransition>
      <ScrollHero />
      <Intro />
      <WhatWeDo />
      <Testimonials />
      <FinalCTA />
    </PageTransition>
  )
}
