import { useState } from 'react'
import Parallax from './Parallax'
import Icon from './Icons'

// Graceful image with a labeled placeholder fallback. Drop the real file at
// `src` (in /public) and it appears; until then a tasteful placeholder shows.
// framed adds the soft gold frame; parallax adds gentle vertical drift.
export default function ImageSlot({
  src,
  alt = '',
  label = 'Image',
  ratio = '4 / 5',
  framed = false,
  parallax = false,
  icon = 'people',
  className = '',
  rounded = 'rounded-[1.3rem]',
}) {
  const [failed, setFailed] = useState(!src)

  const img = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  )

  return (
    <div className={`relative ${className}`}>
      {framed && <div className="pointer-events-none absolute -inset-3 rounded-[1.6rem] border border-gold/40" />}
      {framed && <div className="pointer-events-none absolute -inset-3 rounded-[1.6rem] shadow-lift" />}
      <div className={`relative overflow-hidden bg-cream ${rounded}`} style={{ aspectRatio: ratio }}>
        {!failed ? (
          parallax ? (
            <Parallax amount={70} className="absolute inset-0 h-[118%] -top-[9%]">
              {img}
            </Parallax>
          ) : (
            img
          )
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
            style={{ background: 'linear-gradient(160deg, #F5F0E6, #E7DEC9)' }}
          >
            <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/50 text-gold">
              <Icon name={icon} size={26} />
            </span>
            <span className="px-6 font-sans text-[0.72rem] uppercase tracking-[0.22em] text-ink-muted">{label}</span>
          </div>
        )}
      </div>
    </div>
  )
}
