import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { useAnimationFrame } from 'framer-motion'

// Tracks the pointer position relative to a container (falls back to the
// viewport). Stored in a ref so the animation frame reads it without re-renders.
function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = { x: x - rect.left, y: y - rect.top }
      } else {
        positionRef.current = { x, y }
      }
    }

    const handleMouseMove = (ev) => updatePosition(ev.clientX, ev.clientY)
    const handleTouchMove = (ev) => {
      const touch = ev.touches[0]
      if (touch) updatePosition(touch.clientX, touch.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [containerRef])

  return positionRef
}

const FloatingContext = createContext(null)

// A container whose registered children drift toward the pointer, each by an
// amount set by its `depth`, producing a layered parallax effect.
export function ParallaxFloating({
  children,
  className = '',
  sensitivity = 1,
  easingFactor = 0.05,
}) {
  const containerRef = useRef(null)
  const elementsMap = useRef(new Map())
  const mousePositionRef = useMousePositionRef(containerRef)

  const registerElement = useCallback((id, element, depth) => {
    elementsMap.current.set(id, {
      currentPosition: { x: 0, y: 0 },
      depth,
      element,
    })
  }, [])

  const unregisterElement = useCallback((id) => {
    elementsMap.current.delete(id)
  }, [])

  useAnimationFrame(() => {
    if (!containerRef.current) return

    elementsMap.current.forEach((data) => {
      const strength = (data.depth * sensitivity) / 20
      const newTargetX = mousePositionRef.current.x * strength
      const newTargetY = mousePositionRef.current.y * strength

      data.currentPosition.x += (newTargetX - data.currentPosition.x) * easingFactor
      data.currentPosition.y += (newTargetY - data.currentPosition.y) * easingFactor

      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
    })
  })

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div className={`absolute left-0 top-0 h-full w-full ${className}`} ref={containerRef}>
        {children}
      </div>
    </FloatingContext.Provider>
  )
}

// A single floating layer. Position it with utility classes; `depth` controls
// how far it travels with the pointer.
export function FloatingElement({ children, className = '', depth = 1 }) {
  const elementRef = useRef(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(FloatingContext)

  useEffect(() => {
    if (!elementRef.current || !context) return
    const id = idRef.current
    context.registerElement(id, elementRef.current, depth ?? 0.01)
    return () => context.unregisterElement(id)
  }, [depth, context])

  return (
    <div className={`absolute will-change-transform ${className}`} ref={elementRef}>
      {children}
    </div>
  )
}

export default ParallaxFloating
