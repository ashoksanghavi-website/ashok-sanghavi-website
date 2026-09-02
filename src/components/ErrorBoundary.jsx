import { Component } from 'react'

// Catches any render/runtime error in the tree below it and shows a graceful
// recovery card instead of a blank white screen. Resets when the route changes
// (via the `resetKey` prop) so a crash on one page doesn't wedge the whole app.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Surface it for debugging without crashing the UI.
    if (import.meta.env.DEV) console.error('ErrorBoundary caught:', error, info)
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="grid min-h-screen place-items-center bg-cream px-6 text-center">
            <div className="max-w-md">
              <p className="font-sans text-[0.72rem] uppercase tracking-[0.24em] text-gold-deep">Something went wrong</p>
              <h1 className="mt-3 font-display text-2xl text-emerald">This page hit a snag.</h1>
              <p className="mt-3 text-body text-ink-soft">
                Please try again. If it keeps happening, reload the page.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => this.setState({ hasError: false })}
                  className="rounded-lg bg-gold px-5 py-2.5 text-[0.9rem] font-semibold text-emerald-deep transition hover:bg-gold-light"
                >
                  Try again
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-lg border border-emerald/20 px-4 py-2.5 text-[0.9rem] font-semibold text-emerald transition hover:bg-emerald/5"
                >
                  Reload
                </button>
              </div>
            </div>
          </div>
        )
      )
    }
    return this.props.children
  }
}
