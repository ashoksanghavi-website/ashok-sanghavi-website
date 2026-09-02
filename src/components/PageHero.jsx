import Reveal from './Reveal'
import Breadcrumb from './Breadcrumb'
import ImageSlot from './ImageSlot'

const GOLD = '#B08D3E'
const GOLD_SOFT = '#C6A253'
const EMERALD = '#14563B'

// A classic engraved crest — the firm name curves around a serif monogram,
// like a wax seal. Quiet, premium, and consistent as a brand mark.
function Crest() {
  return (
    <div className="relative mx-auto flex w-full items-center justify-center lg:ml-auto">
      <div
        className="pointer-events-none absolute h-80 w-80 rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(198,162,83,0.22), transparent 70%)' }}
      />
      <svg
        viewBox="0 0 240 240"
        className="relative w-60 sm:w-72 lg:w-[19rem]"
        role="img"
        aria-label="Ashok Sanghavi Financial Advisory"
      >
        <defs>
          <path id="crestTop" d="M 34 120 A 86 86 0 0 1 206 120" />
          <path id="crestBottom" d="M 206 120 A 86 86 0 0 1 34 120" />
        </defs>

        {/* rings */}
        <circle cx="120" cy="120" r="114" fill="none" stroke={GOLD_SOFT} strokeWidth="1" opacity="0.45" />
        <circle cx="120" cy="120" r="106" fill="none" stroke={GOLD} strokeWidth="1.4" />
        <circle cx="120" cy="120" r="70" fill="none" stroke={GOLD_SOFT} strokeWidth="0.9" opacity="0.55" />

        {/* curved engraved text — sized so each arc clears the side diamonds */}
        <text fill={GOLD} fontSize="8.4" letterSpacing="1.4" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
          <textPath href="#crestTop" startOffset="50%" textAnchor="middle">ASHOK SANGHAVI · FINANCIAL ADVISORY</textPath>
        </text>
        <text fill={GOLD} fontSize="8.4" letterSpacing="2" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
          <textPath href="#crestBottom" startOffset="50%" textAnchor="middle">PEACE OF MIND THROUGH PLANNING</textPath>
        </text>

        {/* side diamonds — both centred on the middle ring (r=106) at exactly
            9 and 3 o'clock, so they sit level and in sequence */}
        <g fill={GOLD_SOFT}>
          <path d="M 9 120 l 5 -5 5 5 -5 5 z" />
          <path d="M 221 120 l 5 -5 5 5 -5 5 z" />
        </g>

        {/* monogram + established */}
        <text
          x="120"
          y="126"
          textAnchor="middle"
          fill={EMERALD}
          fontSize="50"
          style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 }}
        >
          AS
        </text>
        <line x1="102" y1="140" x2="138" y2="140" stroke={GOLD_SOFT} strokeWidth="0.9" opacity="0.6" />
        <text
          x="120"
          y="158"
          textAnchor="middle"
          fill={GOLD}
          fontSize="9.5"
          letterSpacing="3"
          style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
        >
          EST. 1988
        </text>
      </svg>
    </div>
  )
}

// Compact premium inner-page hero. Light by design, never a heavy dark banner.
// variant: 'gradient' (soft cream to sage) or provide `image` for a split hero.
export default function PageHero({
  eyebrow,
  title,
  intro,
  crumbs = [],
  image,
  imageLabel = 'Client image',
  imageIcon = 'people',
}) {
  const hasImage = image !== undefined

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #FBF8F1 0%, #F5F0E6 55%, #E8EFE7 100%)' }}
      />
      <div
        className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(107,169,138,0.35), transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(198,162,83,0.22), transparent 70%)' }}
      />

      <div className="container-lux relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            {crumbs.length > 0 && (
              <Reveal>
                <div className="mb-8">
                  <Breadcrumb items={crumbs} />
                </div>
              </Reveal>
            )}
            {eyebrow && (
              <Reveal delay={60}>
                <p className="eyebrow">{eyebrow}</p>
              </Reveal>
            )}
            <Reveal delay={120}>
              <h1 className="mt-5 font-display text-[2.6rem] leading-[1.06] sm:text-[3.4rem] lg:text-[3.9rem]">
                {title}
              </h1>
            </Reveal>
            {intro && (
              <Reveal delay={200}>
                <p className="mt-6 max-w-xl text-lead text-ink-soft">{intro}</p>
              </Reveal>
            )}
          </div>

          <Reveal delay={160}>
            {hasImage ? (
              <ImageSlot
                src={image}
                alt={typeof title === 'string' ? title : ''}
                label={imageLabel}
                icon={imageIcon}
                ratio="5 / 4"
                framed
                parallax
              />
            ) : (
              <Crest />
            )}
          </Reveal>
        </div>
      </div>

      <div className="rule-gold absolute inset-x-0 bottom-0 h-px opacity-70" />
    </section>
  )
}
