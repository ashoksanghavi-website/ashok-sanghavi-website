// ── Central content for the site (rewritten cleanly · no dashes in visible copy) ──

export const firm = {
  name: 'Ashok Sanghavi Financial Advisory',
  short: 'Ashok Sanghavi',
  phone: '1-866-800-4771',
  phoneHref: 'tel:+18668004771',
  email: 'info@ashoksanghavi.com',
  address: {
    line1: '25416 County 6 Road, Suite 102',
    line2: 'Elkhart, IN 46514',
  },
  entity: 'Global Financial Group LLC',
  yearsBadge: '30+ Years of Trust',
}

export const services = [
  {
    slug: 'wealth-management',
    title: 'Wealth Management',
    blurb: 'A considered plan for growing and protecting what you have built.',
    icon: 'growth',
  },
  {
    slug: 'retirement-planning',
    title: 'Retirement Planning',
    blurb: 'Turn a lifetime of saving into steady, lasting retirement income.',
    icon: 'sun',
  },
  {
    slug: 'strategic-tax-planning',
    title: 'Strategic Tax Planning',
    blurb: 'Keep more of what you earn across every kind of income.',
    icon: 'shield',
  },
  {
    slug: 'zero-estate-tax-planning',
    title: 'Zero Estate Tax Planning',
    blurb: 'Pass your wealth to the next generation, intact and intentional.',
    icon: 'legacy',
  },
  {
    slug: 'asset-protection',
    title: 'Asset Protection',
    blurb: 'Thoughtful structures that shield what matters most.',
    icon: 'lock',
  },
  {
    slug: 'business-strategies',
    title: 'Business Strategies',
    blurb: 'Tax and exit strategies built around how your business really works.',
    icon: 'building',
  },
  {
    slug: 'employee-benefit-guidance',
    title: 'Employee Benefit Guidance',
    blurb: 'Benefit plans that reward your people and your bottom line.',
    icon: 'people',
  },
  {
    slug: 'long-term-care',
    title: 'Long Term Care',
    blurb: 'Plan ahead so care later never becomes a burden on family.',
    icon: 'heart',
  },
]

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Core Beliefs', to: '/core-beliefs' },
  { label: 'Services', to: '/services', children: services.map((s) => ({ label: s.title, to: `/services/${s.slug}` })) },
  {
    label: 'Watch and Learn',
    to: '/watch-and-learn',
    children: [
      { label: 'Important Financial Concepts', to: '/watch-and-learn/important-financial-concepts' },
      { label: 'Standalone Financial Concepts', to: '/watch-and-learn/standalone-financial-concepts' },
    ],
  },
  { label: 'Calculators', to: '/calculators' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

// Hero scroll captions — one per scene, in scroll order
export const heroScenes = [
  {
    eyebrow: 'Private Wealth Advisory',
    line: 'What if your capital gains tax could be reduced all the way to zero.',
  },
  {
    eyebrow: 'Fiduciary Standard',
    line: 'Your interests come first, always, at the highest standard of care.',
  },
  {
    eyebrow: 'Since 1988',
    line: 'Over thirty years of trusted financial guidance under one roof.',
  },
  {
    eyebrow: 'Strategic Tax Planning',
    line: 'Keep more of what you earn across active, passive and qualified income.',
  },
  {
    eyebrow: 'Retirement, Reimagined',
    line: 'Turn your savings into retirement income that can be tax free.',
  },
  {
    eyebrow: 'Let us begin',
    line: 'A no cost, no obligation conversation about your future.',
    cta: true,
  },
]

export const outcomes = [
  { kicker: 'Capital gains', value: 0, display: '0', line: 'Guided all the way toward zero.' },
  { kicker: 'Business taxes', value: 50, suffix: '%', prefix: 'to ', line: 'Lowered by 20 to 50 percent.' },
  { kicker: 'Retirement income', word: 'Tax free', line: 'Structured so it can be tax free.' },
  { kicker: 'Estate tax', value: 0, display: '0', line: 'Planned down to zero for your heirs.' },
]

// Only LinkedIn is a real, verified profile for the firm. The old site had no
// other social links, so we keep just this one (with its authentic mark).
export const social = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ashok-hiralal-sanghavi-cfp-chfc-clu-8778976',
    icon: 'linkedin',
  },
]
