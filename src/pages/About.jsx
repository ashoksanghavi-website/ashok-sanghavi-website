import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import ImageSlot from '../components/ImageSlot'
import Icon from '../components/Icons'
import { whyChooseUs } from '../lib/content'
import { CREDENTIALS, Reg } from '../components/Cred'

export default function About() {
  return (
    <PageTransition>
      <Seo
        title="About Ashok Sanghavi"
        description="A relationship first fiduciary practice in Elkhart, Indiana, with over thirty years of experience in tax and wealth planning."
      />
      <PageHero
        eyebrow="The advisor"
        title="Guidance built on trust, earned over a lifetime."
        intro="For more than thirty years, Ashok Sanghavi has helped families and business owners plan with clarity and confidence."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      {/* Editorial bio, asymmetric */}
      <section className="bg-ivory py-24 sm:py-28">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-[0.82fr_1fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-sm lg:max-w-none">
            <ImageSlot src="/family.webp" label="Ashok Sanghavi with family" ratio="4 / 3" framed />
            <div className="mt-9 flex justify-center">
              <div className="flex items-center gap-3 whitespace-nowrap rounded-full border border-gold/40 bg-ivory px-6 py-3.5 shadow-soft">
                <span className="font-display text-[1.05rem] text-emerald">Ashok Sanghavi</span>
                <span className="h-4 w-px shrink-0 bg-gold/50" />
                <span className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  CFP<Reg /> · ChFC<Reg /> · CLU<Reg />
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">A considered career</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 max-w-xl font-display text-[2.1rem] leading-[1.12] sm:text-[2.7rem]">
                Relationship first, client first, for over thirty years.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="mt-6 flex flex-wrap gap-2">
                {CREDENTIALS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-gold/30 bg-cream px-3.5 py-1.5 font-sans text-[0.76rem] font-semibold tracking-wide text-emerald"
                  >
                    {c}
                    <Reg />
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-7 max-w-prose text-body text-ink-soft">
                Ashok Sanghavi is a Certified Financial Planner, a Chartered Financial Consultant and a Certified Life
                Underwriter. He also holds a Chartered Accountant background from India, and he passed the CPA exam in
                1988. Over more than thirty years in financial services, he has guided individuals, families, retirees
                and business owners through the decisions that shape a secure future.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-4 max-w-prose text-body text-ink-soft">
                His practice operates under Global Financial Group LLC, with one belief at its centre. The relationship
                comes first, and your interests always come first.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The team */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-lux grid items-center gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <Reveal>
            {/* Real team photo sourced from the firm */}
            <ImageSlot src="/media/team.jpg" label="Ashok and the team" icon="people" ratio="7 / 6" framed parallax />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">The practice</p>
            <h2 className="mt-5 font-display text-[2rem] leading-[1.14] sm:text-[2.5rem]">
              A team that treats your plan like their own.
            </h2>
            <p className="mt-6 text-body text-ink-soft">
              Behind every plan is a small, dedicated team that knows your name and your goals. We work closely together
              in our Elkhart office, bringing tax, investment and protection expertise to the same table, so your whole
              financial life is considered as one.
            </p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 link-gold">
              Come and meet us
              <Icon name="arrow" size={18} className="text-gold" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Mission pull quote */}
      <section className="py-8">
        <div className="container-lux">
          <Reveal>
            <figure className="mx-auto max-w-4xl rounded-[1.6rem] border border-gold/25 bg-cream px-8 py-14 text-center sm:px-16">
              <Icon name="quote" size={34} className="mx-auto text-gold" />
              <blockquote className="mt-6 font-display text-[1.6rem] leading-[1.4] text-emerald sm:text-[2rem]">
                Our mission is to help individuals, families, retirees and business owners achieve financial security and
                independence, through proven strategies that eliminate unproductive debt, protect against loss and
                taxation, and increase and safeguard assets.
              </blockquote>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* We are a fiduciary */}
      <section className="py-24 sm:py-28">
        <div className="container-lux grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <span className="grid h-16 w-16 place-items-center rounded-2xl border border-gold/30 bg-cream text-emerald">
              <Icon name="scale" size={30} />
            </span>
            <p className="eyebrow mt-8">We are a fiduciary</p>
            <h2 className="mt-5 font-display text-[2rem] leading-[1.14] sm:text-[2.6rem]">
              A higher standard, by law and by choice.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lead text-ink-soft">
              A fiduciary is legally bound to put your interests first, at the highest standard of care.
            </p>
            <p className="mt-5 text-body text-ink-soft">
              It is a higher bar than most advisors are held to, and it shapes every recommendation we make. When your
              advisor is a fiduciary, you never have to wonder whose interests come first. Yours always do.
            </p>
            <a
              href="https://www.cfp.net/ethics/code-of-ethics-and-standards-of-conduct"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 link-gold"
            >
              Read the CFP fiduciary standard
              <Icon name="arrowUpRight" size={18} className="text-gold" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-cream py-24 sm:py-28">
        <div className="container-lux">
          <Reveal>
            <p className="eyebrow">Why families choose us</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 max-w-2xl font-display text-[2rem] leading-[1.14] sm:text-[2.6rem]">
              Quiet reasons that add up to lasting trust.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {whyChooseUs.map((w, i) => (
              <Reveal key={w.title} delay={(i % 2) * 90}>
                <div className="flex gap-5">
                  <span className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/30 bg-ivory text-gold">
                    <Icon name={w.icon} size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.35rem] text-emerald">{w.title}</h3>
                    <p className="mt-2 text-body text-ink-soft">{w.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Work with us"
        heading="Ready for an advisor who is legally on your side?"
        sub="Meet Ashok and the team for a relaxed, no obligation conversation about where you are and where you want to be."
        variant="quote"
      />
    </PageTransition>
  )
}
