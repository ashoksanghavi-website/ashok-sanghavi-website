import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// A large outline wordmark whose gold gradient is revealed under the cursor.
// Adapted to the brand palette (warm gold → sage → emerald), JSX, no cn.
export default function TextHoverEffect({ text, duration, className = '' }) {
  const svgRef = useRef(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' })

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (!r.width || !r.height) return
    const cx = ((cursor.x - r.left) / r.width) * 100
    const cy = ((cursor.y - r.top) / r.height) * 100
    if (Number.isFinite(cx) && Number.isFinite(cy)) {
      setMaskPosition({ cx: `${cx}%`, cy: `${cy}%` })
    }
  }, [cursor])

  const serif = { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 58"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`select-none uppercase ${className}`}
    >
      <defs>
        <linearGradient id="ase-textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#E7CE90" />
              <stop offset="28%" stopColor="#C6A253" />
              <stop offset="55%" stopColor="#A6863B" />
              <stop offset="80%" stopColor="#6BA98A" />
              <stop offset="100%" stopColor="#2F7E58" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="ase-revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: '50%', cy: '50%' }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: 'easeOut' }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="ase-textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#ase-revealMask)" />
        </mask>
      </defs>

      {/* Always-present faint gold outline */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        textLength="288"
        lengthAdjust="spacingAndGlyphs"
        strokeWidth="0.3"
        className="fill-transparent"
        style={{ ...serif, stroke: 'rgba(198,162,83,0.16)', fontSize: '42px' }}
      >
        {text}
      </text>

      {/* Draw-in gold stroke on mount */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        textLength="288"
        lengthAdjust="spacingAndGlyphs"
        strokeWidth="0.3"
        className="fill-transparent"
        style={{ ...serif, stroke: 'rgba(217,190,126,0.5)', fontSize: '42px' }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      >
        {text}
      </motion.text>

      {/* Cursor-revealed gold gradient fill */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        textLength="288"
        lengthAdjust="spacingAndGlyphs"
        stroke="url(#ase-textGradient)"
        strokeWidth="0.4"
        mask="url(#ase-textMask)"
        className="fill-transparent"
        style={{ ...serif, fontSize: '42px' }}
      >
        {text}
      </text>
    </svg>
  )
}
