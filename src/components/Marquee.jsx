// Seamless auto-scrolling marquee. Renders items twice and pauses on hover.
export default function Marquee({ items, renderItem, duration = 46, reverse = false, gap = '1.25rem' }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee">
      <div
        className="marquee-track"
        style={{ '--duration': `${duration}s`, '--gap': gap, '--dir': reverse ? 'reverse' : 'normal' }}
      >
        {doubled.map((it, i) => renderItem(it, i))}
      </div>
    </div>
  )
}
