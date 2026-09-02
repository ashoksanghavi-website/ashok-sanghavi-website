// ── Editable page content registry ──────────────────────────────────────────
// The single source of truth for the text blocks and images the owner can edit
// from the admin "Pages" section. Each field has a stable `key`, a `default`
// (what ships / shows until overridden), a `type`, and a `label` for the editor.
// Components read a key with useSiteContent().t(key); the admin lists these
// grouped by page. Reviews, header and footer are intentionally NOT included.

export const contentSchema = [
  {
    page: 'home',
    label: 'Home',
    groups: [
      {
        label: 'Advisor introduction',
        fields: [
          { key: 'home.intro.eyebrow', label: 'Eyebrow', type: 'text', default: 'The advisor' },
          { key: 'home.intro.heading', label: 'Heading', type: 'text', default: 'Guidance built on relationship first, client first.' },
          {
            key: 'home.intro.body1',
            label: 'Paragraph 1',
            type: 'multiline',
            default:
              'For more than thirty years, Ashok Sanghavi has helped individuals, families and business owners make calm, confident decisions about their money. A Certified Financial Planner with a Chartered Accountant background from India, he brings the full picture together, tax, retirement, protection and legacy, under one trusted roof.',
          },
          {
            key: 'home.intro.body2',
            label: 'Paragraph 2',
            type: 'multiline',
            default:
              'His practice operates under Global Financial Group LLC, with a simple belief at its centre. The relationship comes first, and your interests always come first.',
          },
          { key: 'home.intro.image', label: 'Advisor / family image', type: 'image', default: '/family.webp' },
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
          { key: 'about.hero.eyebrow', label: 'Eyebrow', type: 'text', default: 'The advisor' },
          { key: 'about.hero.title', label: 'Title', type: 'text', default: 'Guidance built on trust, earned over a lifetime.' },
          {
            key: 'about.hero.intro',
            label: 'Intro',
            type: 'multiline',
            default:
              'For more than thirty years, Ashok Sanghavi has helped families and business owners plan with clarity and confidence.',
          },
        ],
      },
      {
        label: 'Biography',
        fields: [
          { key: 'about.bio.eyebrow', label: 'Eyebrow', type: 'text', default: 'A considered career' },
          { key: 'about.bio.heading', label: 'Heading', type: 'text', default: 'Relationship first, client first, for over thirty years.' },
          {
            key: 'about.bio.body1',
            label: 'Paragraph 1',
            type: 'multiline',
            default:
              'Ashok Sanghavi is a Certified Financial Planner, a Chartered Financial Consultant and a Certified Life Underwriter. He also holds a Chartered Accountant background from India, and he passed the CPA exam in 1988. Over more than thirty years in financial services, he has guided individuals, families, retirees and business owners through the decisions that shape a secure future.',
          },
          {
            key: 'about.bio.body2',
            label: 'Paragraph 2',
            type: 'multiline',
            default:
              'His practice operates under Global Financial Group LLC, with one belief at its centre. The relationship comes first, and your interests always come first.',
          },
          { key: 'about.bio.image', label: 'Family image', type: 'image', default: '/family.webp' },
        ],
      },
      {
        label: 'The practice / team',
        fields: [
          { key: 'about.team.heading', label: 'Heading', type: 'text', default: 'A team that treats your plan like their own.' },
          {
            key: 'about.team.body',
            label: 'Paragraph',
            type: 'multiline',
            default:
              'Behind every plan is a small, dedicated team that knows your name and your goals. We work closely together in our Elkhart office, bringing tax, investment and protection expertise to the same table, so your whole financial life is considered as one.',
          },
          { key: 'about.team.image', label: 'Team image', type: 'image', default: '/media/team.jpg' },
        ],
      },
      {
        label: 'Mission',
        fields: [
          {
            key: 'about.mission.quote',
            label: 'Mission statement',
            type: 'multiline',
            default:
              'Our mission is to help individuals, families, retirees and business owners achieve financial security and independence, through proven strategies that eliminate unproductive debt, protect against loss and taxation, and increase and safeguard assets.',
          },
        ],
      },
      {
        label: 'Fiduciary',
        fields: [
          { key: 'about.fiduciary.heading', label: 'Heading', type: 'text', default: 'A higher standard, by law and by choice.' },
          {
            key: 'about.fiduciary.body1',
            label: 'Paragraph 1',
            type: 'multiline',
            default: 'A fiduciary is legally bound to put your interests first, at the highest standard of care.',
          },
          {
            key: 'about.fiduciary.body2',
            label: 'Paragraph 2',
            type: 'multiline',
            default:
              'It is a higher bar than most advisors are held to, and it shapes every recommendation we make. When your advisor is a fiduciary, you never have to wonder whose interests come first. Yours always do.',
          },
        ],
      },
      {
        label: 'Why families choose us',
        fields: [
          { key: 'about.why.heading', label: 'Heading', type: 'text', default: 'Quiet reasons that add up to lasting trust.' },
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
