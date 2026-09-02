// ── Editable page content registry ──────────────────────────────────────────
// Single source of truth for the text blocks and images the owner can edit from
// the admin "Pages" section. Static copy is listed with its default here; the
// data-driven lists (beliefs, service descriptions, learn sections) derive their
// defaults from the existing content so nothing is duplicated. Components read a
// key with useSiteContent().t(key). Reviews, header and footer are NOT included.
import { services } from './site'
import { serviceDetails, coreBeliefs, watchLearnSections } from './content'

const T = (key, label, def, type = 'text') => ({ key, label, type, default: def })
const M = (key, label, def) => ({ key, label, type: 'multiline', default: def })
const IMG = (key, label, def) => ({ key, label, type: 'image', default: def })

export const contentSchema = [
  {
    page: 'home',
    label: 'Home',
    groups: [
      {
        label: 'Advisor introduction',
        fields: [
          T('home.intro.eyebrow', 'Eyebrow', 'The advisor'),
          T('home.intro.heading', 'Heading', 'Guidance built on relationship first, client first.'),
          M('home.intro.body1', 'Paragraph 1',
            'For more than thirty years, Ashok Sanghavi has helped individuals, families and business owners make calm, confident decisions about their money. A Certified Financial Planner with a Chartered Accountant background from India, he brings the full picture together, tax, retirement, protection and legacy, under one trusted roof.'),
          M('home.intro.body2', 'Paragraph 2',
            'His practice operates under Global Financial Group LLC, with a simple belief at its centre. The relationship comes first, and your interests always come first.'),
          IMG('home.intro.image', 'Advisor / family image', '/family.webp'),
        ],
      },
      {
        label: 'What we do',
        fields: [
          T('home.whatwedo.eyebrow', 'Eyebrow', 'What we do'),
          T('home.whatwedo.heading', 'Heading', 'Eight disciplines, one considered plan.'),
          M('home.whatwedo.body', 'Paragraph',
            'Every part of your financial life connects. We bring them together with care, so nothing works against anything else.'),
        ],
      },
      {
        label: 'Closing call to action',
        fields: [
          T('home.cta.eyebrow', 'Eyebrow', 'Let us begin'),
          T('home.cta.heading', 'Heading', 'Yes, I am interested in a no cost, no obligation consultation.'),
          M('home.cta.sub', 'Sub text',
            'A calm, unhurried conversation about where you are and where you want to be. No pressure, no cost, just clarity about your options.'),
        ],
      },
    ],
  },
  {
    page: 'about',
    label: 'About',
    groups: [
      {
        label: 'Page header',
        fields: [
          T('about.hero.eyebrow', 'Eyebrow', 'The advisor'),
          T('about.hero.title', 'Title', 'Guidance built on trust, earned over a lifetime.'),
          M('about.hero.intro', 'Intro',
            'For more than thirty years, Ashok Sanghavi has helped families and business owners plan with clarity and confidence.'),
        ],
      },
      {
        label: 'Biography',
        fields: [
          T('about.bio.eyebrow', 'Eyebrow', 'A considered career'),
          T('about.bio.heading', 'Heading', 'Relationship first, client first, for over thirty years.'),
          M('about.bio.body1', 'Paragraph 1',
            'Ashok Sanghavi is a Certified Financial Planner, a Chartered Financial Consultant and a Certified Life Underwriter. He also holds a Chartered Accountant background from India, and he passed the CPA exam in 1988. Over more than thirty years in financial services, he has guided individuals, families, retirees and business owners through the decisions that shape a secure future.'),
          M('about.bio.body2', 'Paragraph 2',
            'His practice operates under Global Financial Group LLC, with one belief at its centre. The relationship comes first, and your interests always come first.'),
          IMG('about.bio.image', 'Family image', '/family.webp'),
        ],
      },
      {
        label: 'The practice / team',
        fields: [
          T('about.team.heading', 'Heading', 'A team that treats your plan like their own.'),
          M('about.team.body', 'Paragraph',
            'Behind every plan is a small, dedicated team that knows your name and your goals. We work closely together in our Elkhart office, bringing tax, investment and protection expertise to the same table, so your whole financial life is considered as one.'),
          IMG('about.team.image', 'Team image', '/media/team.jpg'),
        ],
      },
      {
        label: 'Mission',
        fields: [
          M('about.mission.quote', 'Mission statement',
            'Our mission is to help individuals, families, retirees and business owners achieve financial security and independence, through proven strategies that eliminate unproductive debt, protect against loss and taxation, and increase and safeguard assets.'),
        ],
      },
      {
        label: 'Fiduciary',
        fields: [
          T('about.fiduciary.heading', 'Heading', 'A higher standard, by law and by choice.'),
          M('about.fiduciary.body1', 'Paragraph 1', 'A fiduciary is legally bound to put your interests first, at the highest standard of care.'),
          M('about.fiduciary.body2', 'Paragraph 2',
            'It is a higher bar than most advisors are held to, and it shapes every recommendation we make. When your advisor is a fiduciary, you never have to wonder whose interests come first. Yours always do.'),
        ],
      },
      {
        label: 'Why families choose us',
        fields: [T('about.why.heading', 'Heading', 'Quiet reasons that add up to lasting trust.')],
      },
    ],
  },
  {
    page: 'core-beliefs',
    label: 'Core Beliefs',
    groups: [
      {
        label: 'Page header',
        fields: [
          T('beliefs.hero.eyebrow', 'Eyebrow', 'Core beliefs'),
          T('beliefs.hero.title', 'Title', 'What we believe about your money.'),
          M('beliefs.hero.intro', 'Intro', 'Trust is never assumed. It is earned, slowly and deliberately, over the course of a relationship.'),
        ],
      },
      {
        label: 'Lead philosophy',
        fields: [
          M('beliefs.lead', 'Lead statement',
            'We begin with relationships, because success is measured not only in numbers, but in the clarity, confidence and security you carry into the future.'),
        ],
      },
      {
        label: 'The beliefs',
        fields: coreBeliefs.flatMap((b, i) => [
          T(`belief.${i}.title`, `Belief ${i + 1} — title`, b.title),
          M(`belief.${i}.body`, `Belief ${i + 1} — text`, b.body),
        ]),
      },
      {
        label: 'Closing call to action',
        fields: [
          T('beliefs.cta.eyebrow', 'Eyebrow', 'Experience it'),
          T('beliefs.cta.heading', 'Heading', 'See what a relationship first practice feels like.'),
          M('beliefs.cta.sub', 'Sub text', 'Beliefs are easy to write and harder to live by. Let us show you the difference in a single conversation.'),
        ],
      },
    ],
  },
  {
    page: 'services',
    label: 'Services',
    groups: [
      {
        label: 'Page header',
        fields: [
          T('services.hero.eyebrow', 'Eyebrow', 'What we do'),
          T('services.hero.title', 'Title', 'Eight disciplines, one considered plan.'),
          M('services.hero.intro', 'Intro', 'Every part of your financial life connects. We bring them together with care, so nothing works against anything else.'),
        ],
      },
      {
        label: 'Our approach',
        fields: [
          T('services.approach.eyebrow', 'Eyebrow', 'Our approach'),
          T('services.approach.heading', 'Heading', 'One plan, considered from every angle.'),
          M('services.approach.body', 'Paragraph',
            'We rarely look at a single decision in isolation. A tax choice affects retirement, a retirement choice affects your estate, and your estate affects the people you love. We coordinate all of it, so every part of your plan pulls in the same direction.'),
          IMG('services.approach.image', 'Office image', '/media/lobby.jpg'),
        ],
      },
      {
        label: 'Services grid',
        fields: [
          T('services.grid.eyebrow', 'Eyebrow', 'The full picture'),
          T('services.grid.heading', 'Heading', 'Explore each discipline in detail.'),
        ],
      },
      // One group per individual service page — its full content.
      ...services.map((s) => {
        const d = serviceDetails[s.slug]
        return {
          label: `Service: ${s.title}`,
          fields: [
            T(`service.${s.slug}.tagline`, 'Tagline', d.tagline),
            M(`service.${s.slug}.overview`, 'Overview', d.overview),
            M(`service.${s.slug}.forWho`, 'Who it is for (one per line)', d.forWho.join('\n')),
            M(`service.${s.slug}.approach`, 'Our approach (one per line)', d.approach.join('\n')),
            M(`service.${s.slug}.benefits`, 'Key benefits (one per line)', d.benefits.join('\n')),
          ],
        }
      }),
      {
        label: 'Closing call to action',
        fields: [
          T('services.cta.eyebrow', 'Eyebrow', 'Find your fit'),
          T('services.cta.heading', 'Heading', 'Not sure where to start? Let us point the way.'),
          M('services.cta.sub', 'Sub text', 'Tell us a little about your situation and we will show you which of these disciplines matters most for you.'),
        ],
      },
    ],
  },
  {
    page: 'watch-learn',
    label: 'Watch & Learn',
    groups: [
      {
        label: 'Page header',
        fields: [
          T('watch.hero.eyebrow', 'Eyebrow', 'Watch and learn'),
          T('watch.hero.title', 'Title', 'Clear ideas, calmly explained.'),
          M('watch.hero.intro', 'Intro', 'A growing library of the strategies we use most, each one explained in plain language, without the jargon.'),
        ],
      },
      {
        label: 'Sections',
        fields: watchLearnSections.flatMap((s) => [
          T(`watch.${s.slug}.title`, `${s.title} — title`, s.title),
          M(`watch.${s.slug}.intro`, `${s.title} — intro`, s.intro),
        ]),
      },
      {
        label: 'Closing call to action',
        fields: [
          T('watch.cta.eyebrow', 'Eyebrow', 'Have a question?'),
          T('watch.cta.heading', 'Heading', 'Prefer to talk it through in person?'),
          M('watch.cta.sub', 'Sub text', 'Every idea here is easier with context. We are glad to walk you through what applies to your situation.'),
        ],
      },
    ],
  },
  {
    page: 'calculators',
    label: 'Calculators',
    groups: [
      {
        label: 'Page header',
        fields: [
          T('calc.hero.eyebrow', 'Eyebrow', 'Tools'),
          T('calc.hero.title', 'Title', 'Financial calculators.'),
          M('calc.hero.intro', 'Intro', 'A few simple tools to help you picture the numbers. Each one opens in a new tab.'),
        ],
      },
      {
        label: 'Personalised card',
        fields: [
          T('calc.card.heading', 'Heading', 'Want the number for your exact situation?'),
          M('calc.card.body', 'Paragraph', 'These tools give a rough picture. A short conversation gives you a real one, built around your income, your goals, and your tax position.'),
        ],
      },
      {
        label: 'Disclaimer',
        fields: [
          M('calc.disclaimer', 'Disclaimer', 'These calculators are provided for general illustration only. They do not account for your full situation and are not advice. For guidance tailored to you, we would be glad to talk.'),
        ],
      },
      {
        label: 'Closing call to action',
        fields: [
          T('calc.cta.eyebrow', 'Eyebrow', 'Beyond the numbers'),
          T('calc.cta.heading', 'Heading', 'A calculator is a start. The plan is the rest.'),
          M('calc.cta.sub', 'Sub text', 'Numbers on a screen cannot see your whole picture. We can. Let us turn an estimate into a real strategy.'),
        ],
      },
    ],
  },
  {
    page: 'contact',
    label: 'Contact',
    groups: [
      {
        label: 'Page header',
        fields: [
          T('contact.hero.eyebrow', 'Eyebrow', 'Contact'),
          T('contact.hero.title', 'Title', 'Let us begin the conversation.'),
          M('contact.hero.intro', 'Intro', 'A calm, no cost, no obligation conversation about where you are and where you want to be.'),
        ],
      },
      {
        label: 'Form',
        fields: [
          T('contact.form.heading', 'Heading', 'Send us a note'),
          M('contact.form.body', 'Paragraph', 'Tell us a little about what you are looking for and we will take it from there.'),
        ],
      },
      {
        label: 'Reach us directly',
        fields: [
          T('contact.details.eyebrow', 'Eyebrow', 'Reach us directly'),
          T('contact.details.heading', 'Heading', 'We would be glad to hear from you.'),
        ],
      },
    ],
  },
  {
    page: 'blog',
    label: 'Blog',
    groups: [
      {
        label: 'Page header',
        fields: [
          T('blog.hero.eyebrow', 'Eyebrow', 'Journal'),
          T('blog.hero.title', 'Title', 'Notes on planning and tax.'),
          M('blog.hero.intro', 'Intro', 'Plain spoken thoughts on the strategies, stories and lessons that shape a secure financial life.'),
        ],
      },
    ],
  },
]

// Flat { key: default } map, derived once.
export const contentDefaults = (() => {
  const out = {}
  for (const p of contentSchema) for (const g of p.groups) for (const f of g.fields) out[f.key] = f.default
  return out
})()
