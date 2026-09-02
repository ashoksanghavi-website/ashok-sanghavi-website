import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const SITE = 'Ashok Sanghavi Financial Advisory'
const DEFAULT_TITLE = `${SITE} · Private Wealth, Elkhart Indiana`
const DEFAULT_DESC =
  'A fiduciary tax and wealth planning firm in Elkhart, Indiana. Over thirty years of trusted guidance helping you keep more of what you earn.'
const DEFAULT_IMAGE = '/hero/poster-v2.jpg'

// Adapts to whatever origin the site is served from (…-tawny today, the custom
// domain later), so canonical / OG URLs are always correct without a rebuild.
const origin = () => (typeof window !== 'undefined' ? window.location.origin : '')

// Per-page head manager — title, description, canonical, Open Graph and Twitter.
export default function Seo({ title, description, image, type = 'website', noindex = false }) {
  const { pathname } = useLocation()
  const full = title ? `${title} · ${SITE}` : DEFAULT_TITLE
  const desc = description || DEFAULT_DESC
  const url = origin() + pathname
  const img = origin() + (image || DEFAULT_IMAGE)

  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  )
}
