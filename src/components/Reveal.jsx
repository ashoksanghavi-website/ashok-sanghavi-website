import { motion } from 'framer-motion'

// Premium scroll reveal, driven by Framer Motion. Same API as before
// (`delay`, `variant`, `as`) so every call site keeps working — no blur,
// just a refined rise/slide/scale with a soft, expensive easing curve.
const EASE = [0.16, 1, 0.3, 1]

const variants = {
  up:    { hidden: { opacity: 0, y: 30 },              show: { opacity: 1, y: 0, x: 0 } },
  left:  { hidden: { opacity: 0, x: -44 },             show: { opacity: 1, x: 0, y: 0 } },
  right: { hidden: { opacity: 0, x: 44 },              show: { opacity: 1, x: 0, y: 0 } },
  scale: { hidden: { opacity: 0, y: 22, scale: 0.94 }, show: { opacity: 1, y: 0, scale: 1 } },
  fade:  { hidden: { opacity: 0 },                     show: { opacity: 1 } },
}

export default function Reveal({ children, className = '', delay = 0, variant = 'up', as = 'div', ...rest }) {
  const MotionTag = motion[as] || motion.div
  const v = variants[variant] || variants.up

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={v}
      transition={{ duration: 0.85, ease: EASE, delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
