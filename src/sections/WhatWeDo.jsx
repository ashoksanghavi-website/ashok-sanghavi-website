import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Icon from '../components/Icons'
import { services } from '../lib/site'
import { useSiteContent } from '../lib/useSiteContent'

const EASE = [0.16, 1, 0.3, 1]
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export default function WhatWeDo() {
  const { t } = useSiteContent()
  return (
    <section id="services" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      {/* faint gold glows for depth */}
      <div
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(198,162,83,0.18), transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(107,169,138,0.22), transparent 70%)' }}
      />

      <div className="container-lux relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow eyebrow--center justify-center">{t('home.whatwedo.eyebrow')}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
              {t('home.whatwedo.heading')}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <span className="mx-auto mt-6 block h-px w-16 bg-gold/50" />
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 whitespace-pre-line font-sans text-[1.05rem] leading-relaxed text-ink-soft">
              {t('home.whatwedo.body')}
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s, i) => (
            <motion.div key={s.slug} variants={item}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="h-full"
              >
                <Link
                  to={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-ivory p-7 transition-all duration-500 hover:border-gold/55 hover:shadow-lift"
                >
                  {/* top gold rule draws in on hover */}
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-[600ms] group-hover:scale-x-100"
                    style={{ background: 'linear-gradient(90deg, var(--gold-light), var(--gold-deep))', transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                  />
                  {/* soft gold wash on hover */}
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(120% 80% at 50% 0%, rgba(198,162,83,0.10), transparent 62%)' }}
                  />

                  <div className="relative flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold/30 bg-cream text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold/10 group-hover:scale-[1.06]">
                      <Icon name={s.icon} size={22} />
                    </span>
                    <span className="font-display text-[1.7rem] leading-none text-gold/25 transition-colors duration-500 group-hover:text-gold/55">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="relative mt-6 font-display text-[1.3rem] leading-snug text-emerald">{s.title}</h3>
                  <span className="relative mt-3 block h-px w-8 bg-gold/40 transition-all duration-500 group-hover:w-14 group-hover:bg-gold" />
                  <p className="relative mt-3 flex-1 font-sans text-[0.92rem] leading-relaxed text-ink-soft">{s.blurb}</p>

                  <span className="relative mt-6 inline-flex items-center gap-1.5 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-emerald">
                    <span className="opacity-60 transition-opacity duration-500 group-hover:opacity-100">Explore</span>
                    <Icon name="arrow" size={15} className="text-gold transition-transform duration-500 group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
