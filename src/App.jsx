import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import Footer from './components/Footer'
import GetInTouchPopup from './components/GetInTouchPopup'
import CookieConsent from './components/CookieConsent'
import { ScheduleProvider } from './components/ScheduleModal'
import Home from './pages/Home'
import About from './pages/About'
import CoreBeliefs from './pages/CoreBeliefs'
import ServicesHub from './pages/ServicesHub'
import ServiceDetail from './pages/ServiceDetail'
import WatchLearnHub from './pages/WatchLearnHub'
import WatchLearnSection from './pages/WatchLearnSection'
import BlogIndex from './pages/BlogIndex'
import BlogArticle from './pages/BlogArticle'
import Calculators from './pages/Calculators'
import Contact from './pages/Contact'
import ComingSoon from './pages/ComingSoon'
import Admin from './admin/Admin'
import { useSmoothScroll, getLenis } from './lib/useSmoothScroll'

function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    const t = setTimeout(() => ScrollTrigger.refresh(), 260)
    return () => clearTimeout(t)
  }, [pathname])
  return null
}

export default function App() {
  useSmoothScroll()
  const location = useLocation()

  // The admin panel is its own app — no marketing chrome (header/footer/popups).
  if (location.pathname.startsWith('/admin')) {
    return (
      <Routes location={location}>
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    )
  }

  return (
    <ScheduleProvider>
      <div className="grain-overlay" aria-hidden="true" />
      <Header />
      <ScrollManager />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/core-beliefs" element={<CoreBeliefs />} />
            <Route path="/services" element={<ServicesHub />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/watch-and-learn" element={<WatchLearnHub />} />
            <Route path="/watch-and-learn/:slug" element={<WatchLearnSection />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<ComingSoon eyebrow="Page not found" title="This page has moved." />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <GetInTouchPopup />
      <CookieConsent />
    </ScheduleProvider>
  )
}
