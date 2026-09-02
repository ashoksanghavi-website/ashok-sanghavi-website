// ── Phase 2 content, sourced from ashoksanghavi.com and rewritten cleanly ──
// No dashes in visible copy. No invented statistics.

// -------- Service detail pages --------
export const serviceDetails = {
  'wealth-management': {
    tagline: 'Institutional grade investment strategies, thoughtfully curated.',
    overview:
      'We build and steward portfolios with the discipline used by institutions, curated for your goals and enhanced through collaboration with experienced third party asset managers. The result is a strategy designed to grow and protect what you have built.',
    forWho: [
      'Individuals and families building long term wealth',
      'Retirees who want their capital working with purpose',
      'Anyone seeking a considered second opinion',
    ],
    approach: [
      'Understand your goals, timeline and comfort with risk',
      'Design an allocation across curated managers and strategies',
      'Review and rebalance as markets and life change',
    ],
    benefits: [
      'A clear plan tied to your real goals',
      'Access to experienced third party managers',
      'Ongoing stewardship, not set and forget',
    ],
  },
  'retirement-planning': {
    tagline: 'A disciplined transition from accumulation to income.',
    overview:
      'Retirement is the beginning of your freedom phase. We help you move from a lifetime of saving to a dependable income you cannot outlive, coordinating investments, tax and timing so the transition feels calm and certain.',
    forWho: [
      'Those within ten years of retirement',
      'Recent retirees organizing their income',
      'Business owners planning an exit into retirement',
    ],
    approach: [
      'Map your income needs and every source',
      'Sequence withdrawals for tax efficiency',
      'Protect against longevity and market risk',
    ],
    benefits: ['Income you can rely on', 'A tax aware withdrawal plan', 'Confidence to enjoy the freedom phase'],
  },
  'strategic-tax-planning': {
    tagline: 'Proactive strategies that reduce tax across every kind of income.',
    overview:
      'Most tax savings are lost by waiting until spring. We plan ahead, all year, with forward looking strategies that reduce exposure across active income, passive income and qualified funds, so you keep more of what you earn.',
    forWho: [
      'High earners with active or W2 income',
      'Investors with passive and portfolio income',
      'Owners of qualified retirement funds',
    ],
    approach: [
      'Review your full income picture',
      'Identify proactive, legal strategies',
      'Coordinate with your CPA and plan through the year',
    ],
    benefits: [
      'Lower lifetime tax exposure',
      'Strategies for active, passive and qualified income',
      'Fewer surprises at filing time',
    ],
  },
  'zero-estate-tax-planning': {
    tagline: 'Advanced planning to minimize or eliminate estate tax impact.',
    overview:
      'With the right structures in place, your estate can pass to the next generation with little or no estate tax. We design advanced yet practical plans that preserve your legacy and honor your intentions.',
    forWho: [
      'Families with sizable estates',
      'Business owners planning succession',
      'Anyone who wants to pass on wealth intentionally',
    ],
    approach: [
      'Assess your estate and its exposure',
      'Design trusts and structures that fit your wishes',
      'Coordinate closely with your legal and tax advisors',
    ],
    benefits: ['Minimize or eliminate estate tax', 'Preserve wealth for your heirs', 'Clarity and control over your legacy'],
  },
  'asset-protection': {
    tagline: 'Strategic structures that safeguard what you have built.',
    overview:
      'The wealth you build deserves protection. We design sensible structures that shield your assets from risk and liability while preserving their long term value and your access to them.',
    forWho: [
      'Professionals with liability exposure',
      'Business owners and property owners',
      'Families protecting generational wealth',
    ],
    approach: [
      'Identify where you are exposed',
      'Design structures that fit your life',
      'Keep protection practical and compliant',
    ],
    benefits: ['Shield assets from unforeseen risk', 'Preserve long term value', 'Peace of mind for your family'],
  },
  'business-strategies': {
    tagline: 'Buy sell and succession planning with tax efficient exits.',
    overview:
      'Your business is likely your largest asset. We structure buy sell agreements and succession plans, integrated with tax efficient exit strategies, so the value you built transfers on your terms.',
    forWho: [
      'Owners planning an eventual exit',
      'Partners who need a buy sell agreement',
      'Families with a business to pass on',
    ],
    approach: [
      'Understand the business and the goal',
      'Structure agreements and their funding',
      'Align the exit with your tax plan',
    ],
    benefits: ['A clear succession path', 'Tax efficient transfer of value', 'Protection for partners and family'],
  },
  'employee-benefit-guidance': {
    tagline: 'Benefit strategies that attract, retain and support your people.',
    overview:
      'The right benefits reward your team and your bottom line. We tailor benefit strategies that help you attract, retain and support top talent, structured to stay efficient for the business.',
    forWho: [
      'Growing businesses and practices',
      'Employers competing for strong talent',
      'Owners seeking efficient benefit design',
    ],
    approach: [
      'Understand your team and goals',
      'Design benefits that fit budget and culture',
      'Review and refine as you grow',
    ],
    benefits: ['Attract and keep strong people', 'Efficient, well structured plans', 'Support for your whole team'],
  },
  'long-term-care': {
    tagline: 'Solutions that protect your family and your finances.',
    overview:
      'Planning for care later in life protects both your finances and the people you love. We design strategic long term care solutions so a future need never becomes a burden on your family.',
    forWho: ['Adults planning for later life', 'Families caring for aging parents', 'Anyone protecting retirement assets'],
    approach: [
      'Understand your wishes and resources',
      'Compare practical care funding options',
      'Put a plan in place before it is needed',
    ],
    benefits: ['Protect retirement assets', 'Ease the burden on family', 'Care choices on your terms'],
  },
}

// -------- Core beliefs --------
export const coreBeliefs = [
  {
    title: 'Relationships come first',
    body: 'We begin with relationships because trust is never assumed, it is earned. Before any strategy, we take the time to understand your life, your goals and what matters most to you.',
  },
  {
    title: 'Clarity over complexity',
    body: 'Good planning should make your life simpler, not harder. We explain every strategy in plain language, so you always understand what you own and why you own it.',
  },
  {
    title: 'A fiduciary, always',
    body: 'We are legally bound to put your interests first, at the highest standard of care. Your goals lead every recommendation we make, without exception.',
  },
  {
    title: 'Measured by more than money',
    body: 'Success is measured not only in numbers, but in the clarity, confidence and security you carry into the future.',
  },
]

// -------- Watch and learn concepts (each links directly to its YouTube video) --------
const yt = (id) => `https://www.youtube.com/watch?v=${id}`
export const concepts = [
  // Important Financial Concepts
  { group: 'important', icon: 'building', title: 'Your Bank', teaser: 'How the way you use your bank quietly shapes your wealth.', url: yt('Qks8JWSDHfc') },
  { group: 'important', icon: 'piggy', title: 'Private Reserve Strategy', teaser: 'Building a pool of capital that stays in your control.', url: yt('p7Jw1l8YzTc') },
  { group: 'important', icon: 'clock', title: 'A Ten Minute Lesson', teaser: 'The core idea, explained in ten simple minutes.', url: yt('9BHdLi3vB9Y') },
  { group: 'important', icon: 'graduation', title: 'College Funding', teaser: 'Funding education without derailing your own future.', url: yt('0ZirmmR9H8M') },
  { group: 'important', icon: 'home', title: 'Mortgages', teaser: 'Making your mortgage work in your favour.', url: yt('F_bip3fdhv4') },
  { group: 'important', icon: 'chart', title: 'The Personal Economic Model', teaser: 'See how money really flows through your life.', url: yt('xVVIo61Y0_M') },
  { group: 'important', icon: 'coins', title: 'The Private Reserve, In Depth', teaser: 'A closer look at keeping your capital available.', url: yt('L8Atvhs2Kak') },
  { group: 'important', icon: 'shield', title: 'Qualified Plans', teaser: 'What qualified plans do, and what they can cost.', url: yt('OmtkevIsVVU') },
  { group: 'important', icon: 'sun', title: 'Retirement, Are You Ready?', teaser: 'An honest look at whether you are on track.', url: yt('AURflXmV6nk') },

  // Standalone Financial Concepts
  { group: 'standalone', icon: 'gem', title: 'The Money Matrix', teaser: 'The forces that quietly shape every dollar you have.', url: yt('Pbh0ZbwBe3M') },
  { group: 'standalone', icon: 'coins', title: 'Transfers of Wealth', teaser: 'The wealth you lose without ever realising it.', url: yt('3OQCfY3Iylg') },
  { group: 'standalone', icon: 'shield', title: 'Qualified Plans', teaser: 'A clear look at qualified retirement plans.', url: yt('HIbbLEgT98U') },
  { group: 'standalone', icon: 'book', title: 'The Business of Learning', teaser: 'Why financial understanding pays for itself.', url: yt('0NkrGv0X7b8') },
  { group: 'standalone', icon: 'receipt', title: 'Taxes', teaser: 'Seeing tax as something you can plan for.', url: yt('YtCT4Y3lx44') },
  { group: 'standalone', icon: 'compass', title: 'Misguided Wisdom', teaser: 'Common money advice that quietly costs you.', url: yt('1yCrqpRua-g') },
  { group: 'standalone', icon: 'heart', title: 'The Charitable Legacy', teaser: 'Giving with intention, and with impact.', url: yt('wvB8Y-L9sMg') },
  { group: 'standalone', icon: 'target', title: 'Club vs. Swing', teaser: 'Focusing on what actually moves the result.', url: yt('99MDOKJBZZ8') },
  { group: 'standalone', icon: 'scale', title: 'The Thought Process', teaser: 'How we think through a financial decision.', url: yt('5eKo-wpEyvE') },
  { group: 'standalone', icon: 'umbrella', title: 'Insurance', teaser: 'Protection as a foundation, not an afterthought.', url: yt('IOieghF2qxc') },
  { group: 'standalone', icon: 'award', title: 'Your Circle of Wealth', teaser: 'Keeping your money working within your world.', url: yt('Avd5FvUM2Qk') },
  { group: 'standalone', icon: 'percent', title: 'Opportunity Cost', teaser: 'The hidden cost of every financial choice.', url: yt('Nt2EIzNPLFg') },
  { group: 'standalone', icon: 'people', title: 'Spender, Saver, Wealth Creator', teaser: 'Which one are you, and which one pays off.', url: yt('yP3IWQGx2O4') },
  { group: 'standalone', icon: 'lock', title: 'Avoiding the Losses', teaser: 'Why avoiding losses beats chasing gains.', url: yt('iN6LbAF2foE') },
  { group: 'standalone', icon: 'growth', title: 'Recoup vs. Recover', teaser: 'The real math of bouncing back from a loss.', url: yt('LQWUqxHBvKM') },
  { group: 'standalone', icon: 'handshake', title: 'Pay Cash or Finance', teaser: 'When to pay cash, and when not to.', url: yt('_4cSJZsDmeQ') },
  { group: 'standalone', icon: 'clock', title: 'Financial Warning Signs', teaser: 'The signals worth catching early.', url: yt('2u-_68Hhdqw') },
  { group: 'standalone', icon: 'legacy', title: 'The Zero Financial Line', teaser: 'Finding the line where money truly works.', url: yt('Aj1tA-Np3CE') },
  { group: 'standalone', icon: 'star', title: 'Human Life Value', teaser: 'What your earning power is really worth.', url: yt('QPEiOvO6ZAs') },
  { group: 'standalone', icon: 'piggy', title: 'Qualified Plan Contributions', teaser: 'Getting the most from what you put in.', url: yt('HGKRehTLDWQ') },
]

export const watchLearnSections = [
  {
    slug: 'important-financial-concepts',
    title: 'Important Financial Concepts',
    intro: 'Short videos on the foundations, from your bank and mortgages to qualified plans and retirement readiness.',
    group: 'important',
  },
  {
    slug: 'standalone-financial-concepts',
    title: 'Standalone Financial Concepts',
    intro: 'A deeper library of ideas, from the money matrix and opportunity cost to human life value and beyond.',
    group: 'standalone',
  },
]

// -------- Blog --------
export const posts = [
  {
    slug: 'hiring-children-in-your-own-business',
    title: 'Hiring Children in Your Own Business, Is It Legal',
    category: 'Tax Strategy',
    date: '2025-06-12',
    excerpt:
      'Employing your children can be a legitimate and powerful strategy, when it is done correctly. Here is what the rules actually allow.',
    body: [
      { type: 'p', text: 'Many business owners are surprised to learn that hiring their own children can be both legal and genuinely useful. Done properly, it can shift income to a lower bracket, fund a child’s future and teach real responsibility along the way.' },
      { type: 'h', text: 'The work has to be real' },
      { type: 'p', text: 'The rule that matters most is simple. The work must be real, age appropriate and reasonably paid. A child filing papers, managing social media or helping in the shop is doing legitimate work. Pay that matches the task is defensible, pay that does not is a problem.' },
      { type: 'quote', text: 'Structure it as you would any other role, with a job, a wage and a record.' },
      { type: 'h', text: 'Why it helps' },
      { type: 'p', text: 'Wages paid to your child are a deductible business expense, and the child often pays little or no tax on modest earnings. Those earnings can then fund a Roth account, giving decades of tax free growth. It is a quiet, compounding advantage.' },
      { type: 'p', text: 'As with any strategy, the details decide whether it holds up. We are glad to help you set it up cleanly and keep the records that protect you.' },
    ],
  },
  {
    slug: 'what-is-pom-and-opm',
    title: 'What is POM and OPM',
    category: 'Wealth',
    date: '2025-04-28',
    excerpt:
      'Two ideas sit at the heart of how we think about money. Peace of mind, and the intelligent use of other people’s money.',
    body: [
      { type: 'p', text: 'When we talk about building and protecting wealth, two ideas come up again and again. We call them POM and OPM.' },
      { type: 'h', text: 'Peace of mind' },
      { type: 'p', text: 'POM is peace of mind. It is the quiet confidence that comes from knowing your plan can withstand a bad year, an unexpected bill or a change in the law. Peace of mind is not a luxury, it is the whole point.' },
      { type: 'h', text: 'Other people’s money' },
      { type: 'p', text: 'OPM is the intelligent use of other people’s money. Used carefully, leverage and the right financial tools let your own capital keep working while other resources carry part of the load. Used carelessly, the same tools create risk. The difference is planning.' },
      { type: 'quote', text: 'Wealth is built not only by what you earn, but by how wisely you use every dollar around you.' },
      { type: 'p', text: 'Together, these ideas keep our advice grounded. Grow with intention, protect what matters and never trade your peace of mind for a slightly higher return.' },
    ],
  },
  {
    slug: 'the-secure-act-and-your-large-iras',
    title: 'The SECURE Act and Your Large IRAs',
    category: 'Retirement',
    date: '2025-03-05',
    excerpt:
      'The SECURE Act changed the rules for inherited retirement accounts. For larger IRAs, the tax impact can be significant.',
    body: [
      { type: 'p', text: 'The SECURE Act reshaped how inherited retirement accounts are taxed, and for families with larger IRAs the effect deserves real attention.' },
      { type: 'h', text: 'The ten year rule' },
      { type: 'p', text: 'Many non spouse beneficiaries must now empty an inherited IRA within ten years. For a large account, that can push heirs into higher tax brackets during their peak earning years, quietly eroding the legacy you intended to leave.' },
      { type: 'quote', text: 'A large IRA is a wonderful thing to leave behind, and a poor thing to leave unplanned.' },
      { type: 'h', text: 'What you can do' },
      { type: 'p', text: 'Strategies such as thoughtful Roth conversions, coordinated beneficiary planning and the use of certain trusts can soften the impact. The right approach depends on your family and your timeline.' },
      { type: 'p', text: 'If a significant IRA is part of your estate, it is worth reviewing before the rules, or your circumstances, change again.' },
    ],
  },
  {
    slug: 'bob-marley-legacy-and-estate-planning-battles',
    title: 'Bob Marley’s Multi Million Legacy and Estate Planning Battles',
    category: 'Estate Planning',
    date: '2025-01-20',
    excerpt:
      'One of music’s greatest icons left behind a fortune and no will. The decades of conflict that followed hold a clear lesson.',
    body: [
      { type: 'p', text: 'When Bob Marley died in 1981, he left behind an extraordinary legacy of music, a substantial fortune and no will. What followed was decades of legal conflict among those he loved.' },
      { type: 'h', text: 'A fortune without a plan' },
      { type: 'p', text: 'Without clear instructions, his estate became a battleground. Family members, associates and courts spent years deciding what he never had the chance to decide himself. The wealth survived, but the peace did not.' },
      { type: 'quote', text: 'An estate plan is not about wealth. It is about sparing the people you love from having to guess.' },
      { type: 'h', text: 'The lesson for the rest of us' },
      { type: 'p', text: 'You do not need a superstar’s fortune to leave a mess behind. A clear plan, kept current, is one of the kindest things you can do for your family. It turns uncertainty into clarity at the moment they need it most.' },
      { type: 'p', text: 'If you have been meaning to put your wishes in writing, let this be the reminder. We can help you make it simple.' },
    ],
  },
]

// -------- Calculators (external links, open in a new tab) --------
export const calculators = [
  { icon: 'chart', title: 'Investment Calculator', blurb: 'See how regular investing can grow over time.', href: 'https://www.calculatorsoup.com/calculators/financial/investment-calculator.php?do=pop' },
  { icon: 'percent', title: 'Investment and Inflation', blurb: 'Understand what inflation does to your returns.', href: 'https://www.calculatorsoup.com/calculators/financial/investment-inflation-calculator.php?do=pop' },
  { icon: 'piggy', title: 'Retirement Savings', blurb: 'Estimate what your savings could become at retirement.', href: 'https://www.calculatorsoup.com/calculators/financial/retirement-savings-calculator.php?do=pop' },
  { icon: 'home', title: 'Mortgage Payment', blurb: 'Calculate a monthly payment for any loan.', href: 'https://www.calculatorsoup.com/calculators/financial/mortgage-payment-calculator.php?do=pop' },
  { icon: 'receipt', title: 'Income Tax', blurb: 'Get a quick estimate of your federal income tax.', href: 'https://www.calculatorsoup.com/calculators/financial/tax-federal-est.php?do=pop' },
]

// -------- Partner / professional affiliations (footer) --------
export const partners = [
  { label: 'National Retirement Foundation', href: 'https://site.nationalretirementfoundation.com/main' },
  { label: 'HTK', href: 'https://www.htk.com/' },
  { label: 'FFR', href: 'https://ffrmembers.com/home' },
  { label: 'ABS', href: 'https://www.absgo.com/' },
]

// -------- Reviews --------
// Real 5-star Google reviews for the firm. Each: { quote, name, role, stars, image }.
// `image` is an optional profile-photo URL; without it the card shows the name's
// initial in a monogram avatar.
export const reviews = [
  {
    quote:
      'Ashok has been our financial planner for over a decade. He has a measured approach, is always available, and explains everything simply. His plans ensure long-term success, not just short-term windfalls. We know our finances are in excellent shape and growing. Recommend 10/10.',
    name: 'Vidhi S.',
    role: 'Client of over a decade',
    stars: 5,
  },
  {
    quote:
      'Working with Ashok Sanghavi has been a great experience. He is knowledgeable, responsive, and truly takes the time to understand my financial goals. He explains investment strategies clearly and always keeps my best interests in mind. I highly recommend him.',
    name: 'Karan Bhagchandani',
    role: 'Investment planning',
    stars: 5,
  },
  {
    quote:
      'Ashok Sanghavi and his team have been a great partner in our financial planning journey. They are knowledgeable, transparent, and take the time to explain every option clearly. We always feel confident making decisions with their guidance.',
    name: 'Ankith Chandra',
    role: 'Local Guide',
    stars: 5,
  },
  {
    quote:
      'Global Financial Group is a great firm and have helped my family in financial planning. Ashok Sanghavi is a very knowledgeable and trustworthy person. Exceptional service. Neel is a great person and quickly responds to any queries you may have. Keep it up.',
    name: 'Sheel Sheth',
    role: 'Financial planning',
    stars: 5,
  },
  {
    quote:
      'We are incredibly grateful for the guidance Ashok Sanghavi provided during one of the most difficult times in our lives. After my father passed away, he was compassionate, patient, and went above and beyond. His genuine care made a heavy situation feel much more manageable.',
    name: 'Laura Deluca',
    role: 'Estate and legacy planning',
    stars: 5,
  },
  {
    quote:
      'Working with Ashok Sanghavi and his assistant Neel has been an awesome experience. Financial planning is complex and very necessary. They listen first and then help customize a plan that meets your needs today and into the future.',
    name: 'Krishna Jasani',
    role: 'Financial planning',
    stars: 5,
  },
  {
    quote:
      'If you need financial planning and advice on wealth management, this is the firm to go to. They give good advice, help manage your future, plan for your kids and build wealth, with policies suitable for every stage of life.',
    name: 'Abhi G',
    role: 'Wealth management',
    stars: 5,
  },
  {
    quote:
      'I truly appreciate his dedication to client satisfaction and would highly recommend Mr. Ashok Sanghavi to anyone looking for reliable and trustworthy guidance in life insurance.',
    name: 'Sukhram Bishnoi',
    role: 'Life insurance',
    stars: 5,
  },
]

export const whyChooseUs = [
  { icon: 'scale', title: 'Fiduciary by duty', text: 'Legally bound to put your interests first.' },
  { icon: 'clock', title: 'Over thirty years', text: 'Guidance shaped by decades of real experience.' },
  { icon: 'compass', title: 'One coordinated plan', text: 'Tax, retirement, protection and legacy, together.' },
  { icon: 'handshake', title: 'Relationship first', text: 'We measure success by your confidence, not just returns.' },
]
