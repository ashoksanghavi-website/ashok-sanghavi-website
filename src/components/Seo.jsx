import { Helmet } from 'react-helmet-async'

// Per-page head manager. Title falls back to the firm name.
export default function Seo({ title, description }) {
  const full = title
    ? `${title} · Ashok Sanghavi Financial Advisory`
    : 'Ashok Sanghavi Financial Advisory · Private Wealth, Elkhart Indiana'
  return (
    <Helmet>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  )
}
