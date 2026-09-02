import CTASection from '../components/CTASection'
import { useSiteContent } from '../lib/useSiteContent'

export default function FinalCTA() {
  const { t } = useSiteContent()
  return (
    <CTASection
      eyebrow={t('home.cta.eyebrow')}
      heading={t('home.cta.heading')}
      sub={t('home.cta.sub')}
    />
  )
}
