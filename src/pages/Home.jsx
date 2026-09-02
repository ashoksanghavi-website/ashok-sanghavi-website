import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import ScrollHero from '../components/ScrollHero'
import Intro from '../sections/Intro'
import WhatWeDo from '../sections/WhatWeDo'
import Testimonials from '../sections/Testimonials'
import FinalCTA from '../sections/FinalCTA'

export default function Home() {
  return (
    <PageTransition>
      <Seo
        description="Ashok Sanghavi Financial Advisory is a fiduciary financial planner in Elkhart, Indiana. Over thirty years of trusted guidance in wealth management, retirement, tax, estate and business planning. Book a no cost consultation."
      />
      <ScrollHero />
      <Intro />
      <WhatWeDo />
      <Testimonials />
      <FinalCTA />
    </PageTransition>
  )
}
