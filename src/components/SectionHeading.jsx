import Reveal from './Reveal'

// Consistent eyebrow + serif heading + optional intro. align: left | center.
export default function SectionHeading({ eyebrow, title, intro, align = 'left', className = '' }) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <Reveal>
          <p className={`eyebrow ${center ? 'eyebrow--center justify-center' : ''}`}>{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2 className="mt-5 font-display text-[2.1rem] leading-[1.12] sm:text-[2.75rem]">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={140}>
          <p className="mt-5 text-body text-ink-soft">{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
