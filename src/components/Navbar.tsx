import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'
import { EASE, STAGE } from '../lib/motion'
import { socials } from '../lib/site'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' }, 
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const root = useRef<HTMLDivElement>(null)
  const menuOpenRef = useRef(false)

  useLayoutEffect(() => {
    const scope = root.current
    if (!scope) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: EASE } })
        .from('.brand-lockup', { y: -12, autoAlpha: 0, duration: 0.8 }, STAGE.header)
        .from('.nav-link', { y: -8, autoAlpha: 0, duration: 0.7, stagger: 0.06 }, STAGE.navLink)
        .from('.social-link', { y: -8, autoAlpha: 0, duration: 0.7, stagger: 0.07 }, STAGE.social)
        .from('.menu-toggle', { scale: 0.8, autoAlpha: 0, duration: 0.6 }, STAGE.header)
    }, scope)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    const scope = root.current
    if (!scope) return

    const header = scope.querySelector('header')
    if (!header) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lastY = window.scrollY
    let hidden = false

    const show = (immediate = false) => {
      hidden = false
      gsap.to(header, {
        yPercent: 0,
        duration: immediate ? 0 : 0.45,
        ease: EASE,
        overwrite: true,
      })
    }

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll()
        const delta = y - lastY
        lastY = y

        setScrolled(y > 24)

        if (reduced || menuOpenRef.current) return

        if (delta > 4 && y > 140 && !hidden) {
          hidden = true
          gsap.to(header, { yPercent: -100, duration: 0.45, ease: EASE, overwrite: true })
        } else if ((delta < -4 || y <= 140) && hidden) {
          show()
        }
      },
    })

    return () => st.kill()
  }, [])

  useLayoutEffect(() => {
    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) return

    let frame = 0

    const measure = () => {
      frame = 0

      const line = window.innerHeight * 0.4
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2

      let current = sections[0].id

      if (atBottom) {
        current = sections[sections.length - 1].id
      } else {
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= line) current = section.id
        }
      }

      setActive((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const toggleMenu = () => {
    const next = !mobileOpen
    menuOpenRef.current = next
    setMobileOpen(next)

    if (next) {
      const header = root.current?.querySelector('header')
      if (header) gsap.set(header, { yPercent: 0 })
    }
  }

  const closeMenu = () => {
    menuOpenRef.current = false
    setMobileOpen(false)
  }

  return (
    <div ref={root} className="sticky top-0 z-40">
      <header
        data-scrolled={scrolled}
        className="site-header relative mx-auto flex h-[76px] w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <a
          href="#home"
          aria-label="Zenixa home"
          className="brand-lockup flex shrink-0 items-center gap-2.5"
        >
          <span className="text-[18px] font-semibold tracking-[-0.075em]">Chelo</span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 text-[11px] font-medium tracking-[-0.02em] text-[#515459] lg:flex"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              aria-current={active === link.href.slice(1) ? 'true' : undefined}
            >
              {link.label}
              <span className="nav-dot" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {socials.filter((social) => social.primary).map((social) => (
            <a
              key={social.key}
              href={social.href}
              aria-label={social.label}
              target={social.external ? '_blank' : undefined}
              rel={social.external ? 'noreferrer' : undefined}
              className="social-link grid h-[36px] w-[36px] place-items-center rounded-lg border border-black/[0.09] bg-white/30 text-[#313438] transition-colors hover:bg-white/70"
            >
              <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" aria-hidden="true">
                <path d={social.path} fill="currentColor" fillRule="evenodd" />
              </svg>
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={toggleMenu}
          className="menu-toggle grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/40 lg:hidden"
        >
          {mobileOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </header>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="mobile-menu absolute left-4 right-4 top-[68px] z-50 grid gap-1 rounded-2xl border border-black/[0.08] p-3 shadow-xl backdrop-blur-xl bg-[#f7f8f8]/95 lg:hidden"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm text-[#42464a] hover:bg-black/[0.04]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  )
}

export default Navbar
