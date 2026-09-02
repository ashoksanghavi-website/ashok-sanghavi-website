import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Singleton Lenis instance shared across the app.
export let lenis = null

export function getLenis() {
  return lenis
}

// Mount once near the app root. Wires Lenis inertia scrolling into the GSAP
// ticker and keeps ScrollTrigger in sync so pinned scrubbing stays smooth.
export function useSmoothScroll() {
  useEffect(() => {
    // On touch devices (iOS/Android) use native scroll — it is far more reliable
    // there than a JS smooth-scroll library. ScrollTrigger + reveals still run on
    // native scroll, so all animations keep working. Also let ScrollTrigger
    // measure regardless.
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const refreshAll = () => ScrollTrigger.refresh()
    window.addEventListener('load', refreshAll)
    const tt = setTimeout(refreshAll, 600)
    if (isTouch) {
      return () => {
        window.removeEventListener('load', refreshAll)
        clearTimeout(tt)
      }
    }

    lenis = new Lenis({
      duration: 1.1,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenis.on('scroll', ScrollTrigger.update)
    if (import.meta.env.DEV) window.__lenis = lenis

    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      window.removeEventListener('load', refreshAll)
      clearTimeout(tt)
      lenis.destroy()
      lenis = null
    }
  }, [])
}
