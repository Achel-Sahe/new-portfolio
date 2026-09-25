import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import { EASE } from './lib/motion'

function App() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.grain-layer', { autoAlpha: 0, duration: 1.2, ease: EASE })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <main
      id="home"
      ref={root}
      className="relative isolate bg-[#eef0f1] text-[#17191b]"
    >
      <div className="grain-layer pointer-events-none absolute inset-0 z-0" />

      <Navbar />

      <Hero />

      <About />
    </main>
  )
}

export default App
