import { Helmet } from 'react-helmet-async'
import { firm, social } from '../lib/site'

// Site-wide JSON-LD so search engines understand the business (name, address,
// phone, area served) — key for local search and the Google business panel.
export default function StructuredData() {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${origin}/#business`,
    name: firm.name,
    url: origin || undefined,
    image: origin ? `${origin}/hero/poster-v2.jpg` : undefined,
    logo: origin ? `${origin}/logo.png` : undefined,
    telephone: firm.phone,
    email: firm.email,
    priceRange: 'Free initial consultation',
    description:
      'A fiduciary tax and wealth planning firm in Elkhart, Indiana. Over thirty years of trusted guidance in wealth management, retirement, tax, estate and business planning.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: firm.address.line1,
      addressLocality: 'Elkhart',
      addressRegion: 'IN',
      postalCode: '46514',
      addressCountry: 'US',
    },
    areaServed: 'Elkhart, Indiana and the Michiana region',
    founder: { '@type': 'Person', name: 'Ashok Sanghavi' },
    parentOrganization: firm.entity,
    sameAs: social.map((s) => s.href),
  }
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}
