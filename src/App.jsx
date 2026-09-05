import { useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import Footer from './components/Footer'
import GetInTouchPopup from './components/GetInTouchPopup'
import CookieConsent from './components/CookieConsent'
import { ScheduleProvider } from './components/ScheduleModal'
import ErrorBoundary from './components/ErrorBoundary'
import StructuredData from './components/StructuredData'
import { SiteContentProvider } from './lib/useSiteContent'
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

// Turn off the browser's own scroll restoration — with the tall scroll-scrub
// hero it was restoring a stale position and dumping you at the footer when you
// came back to a page. We take a page to the top ourselves on every navigation.
if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

function ScrollManager() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    const lenis = getLenis()
    const toTop = () => {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
      else window.scrollTo(0, 0)
    }
    toTop()
    // Re-assert a few times so the hero mounting / ScrollTrigger settling can't
    // leave the page scrolled part-way down.
    const r = requestAnimationFrame(toTop)
    const t1 = setTimeout(toTop, 120)
    const t2 = setTimeout(() => { ScrollTrigger.refresh(); toTop() }, 320)
    return () => {
      cancelAnimationFrame(r)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname])
  return null
}

export default function App() {
  useSmoothScroll()
  const location = useLocation()

  // The admin panel is its own app — no marketing chrome (header/footer/popups).
  if (location.pathname.startsWith('/admin')) {
    return (
      <ErrorBoundary resetKey={location.pathname}>
        <Routes location={location}>
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary resetKey={location.pathname}>
    <SiteContentProvider>
    <ScheduleProvider>
      <StructuredData />
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
    </SiteContentProvider>
    </ErrorBoundary>
  )
}
