import { useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  MapPin,
} from 'lucide-react'
import type { SimpleIcon } from 'simple-icons'
import portraitImage from '../assets/images/silhouette.png'
import { EASE, STAGE } from '../lib/motion'
import { mailto, stack } from '../lib/site'

function StackMark({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px] shrink-0"
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  )
}

function ArrowPill({
  children,
  href,
  muted = false,
}: {
  children: ReactNode
  href: string
  muted?: boolean
}) {
  return (
    <a
      href={href}
      className={`group inline-flex h-12 items-center gap-4 rounded-full pl-6 pr-2 text-[13px] font-medium tracking-[-0.01em] transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.97] ${
        muted
          ? 'border border-black/10 bg-white/45 text-[#383b3f] hover:bg-white/80'
          : 'bg-[#17191b] text-white hover:bg-[#303337]'
      }`}
    >
      <span>{children}</span>
      <span
        className={`grid h-8 w-8 place-items-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5 ${
          muted ? 'bg-[#dfe1e2] text-[#232528]' : 'bg-[#f0f1f2] text-[#17191b]'
        }`}
      >
        <ArrowUpRight size={14} strokeWidth={1.8} />
      </span>
    </a>
  )
}

function Hero() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const scope = root.current
    if (!scope) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const q = gsap.utils.selector(scope)
    const lines = q('.line-mask > span')

    if (reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE } })

      tl.from('.hero-portrait', {
        yPercent: 6,
        scale: 0.97,
        autoAlpha: 0,
        duration: 1.4,
      }, STAGE.portrait)

      tl.from('.wordmark-backdrop', {
        y: 26,
        scale: 0.96,
        autoAlpha: 0,
        duration: 1.5,
      }, STAGE.wordmark)

      tl.from('.eyebrow', {
        x: -14,
        autoAlpha: 0,
        duration: 0.8,
      }, STAGE.eyebrow)

      tl.from(lines, {
        yPercent: 108,
        autoAlpha: 0,
        duration: 1.15,
        stagger: 0.09,
      }, STAGE.line)

      tl.from('.hero-meta', {
        y: 12,
        autoAlpha: 0,
        duration: 0.8,
      }, STAGE.meta)

      tl.from('.hero-actions > *', {
        y: 16,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.08,
      }, STAGE.actions)

      tl.from('.studio-card', {
        x: 26,
        y: 12,
        autoAlpha: 0,
        duration: 1.05,
      }, STAGE.card)

      tl.from('.partner-zone', {
        x: 22,
        autoAlpha: 0,
        duration: 0.95,
      }, STAGE.partners)

      tl.from('.hero-side-note', {
        x: -14,
        autoAlpha: 0,
        duration: 0.8,
      }, STAGE.note)
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="intro"
      ref={root}
      className="hero-stage relative z-10 mx-auto h-[calc(100svh-76px)] min-h-[700px] max-h-[960px] w-full max-w-[1600px] overflow-hidden px-5 sm:min-h-[760px] sm:px-8 lg:px-12"
    >
      <div className="hero-copy absolute left-5 top-[14%] z-20 w-[min(77vw,660px)] sm:left-8 sm:top-[16%] lg:left-12">
        <div className="eyebrow mb-5 flex items-center gap-2 text-[11px] font-medium tracking-[0.015em] text-[#5e6368]">
          <span className="h-px w-5 bg-[#d58452]" />
          Hi, I'm Chelo Sahetapy
        </div>
        <h1 className="hero-title max-w-[680px] text-[clamp(2.85rem,6.15vw,6rem)] font-medium leading-[0.84] tracking-[-0.085em] text-[#202225]">
          <span className="line-mask">
            <span className="block">Crafting Digital</span>
          </span>
          <span className="line-mask">
            <span className="block">Experiences as</span>
          </span>
          <span className="line-mask">
            <span className="block">Frontend Dev</span>
          </span>
        </h1>
        <div className="hero-meta mt-6 flex items-center gap-4 text-[10px] text-[#5f6469] sm:mt-7">
          <div className="flex items-center gap-1.5">
            <MapPin size={12} strokeWidth={1.8} color='black'/>
            <span>West Java</span>
          </div>
          <span className="h-3.5 w-px bg-black/15" />
          <span>
            <strong className="font-semibold text-[#35383b]">19</strong> Years old
          </span>
        </div>
        <div className="hero-actions mt-8 flex items-center gap-2.5 sm:mt-9">
          <ArrowPill href={mailto("Let's make something")}>
            Let's Talk
          </ArrowPill>
          <ArrowPill href="#partner-logos" muted>
            My Skills
          </ArrowPill>
        </div>
      </div>

      <div className="wordmark-backdrop pointer-events-none absolute bottom-[7%] left-1/2 z-[1] -translate-x-1/2 whitespace-nowrap text-[clamp(7rem,22vw,21rem)] font-semibold leading-[0.7] tracking-[-0.105em] text-black/5">
        FRONTEND
      </div>

      <div
        className="portrait-wrap pointer-events-none absolute inset-x-0 bottom-[-1px] z-10 flex h-[96%] items-end justify-center"
        aria-hidden="true"
      >
        <img
          className="hero-portrait h-full w-auto max-w-none object-contain object-bottom"
          src={portraitImage}
          alt=""
        />
      </div>

      <aside
        id="studio-card"
        className="studio-card absolute right-5 top-[16%] z-20 hidden w-[min(31vw,355px)] overflow-hidden rounded-[21px] border border-white/75 bg-[#e4e6e8]/80 p-[7px] shadow-[0_14px_35px_rgba(41,46,52,0.08)] backdrop-blur-md sm:block lg:right-12 lg:top-[17%]"
      >
        <div className="flex items-stretch gap-4">
          <div className="studio-mark relative grid aspect-square w-[39%] shrink-0 place-items-center overflow-hidden rounded-[15px] bg-[#090a0c] text-white">
            <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_85%,rgba(255,255,255,0.08),transparent_58%)]" />
            <svg aria-hidden="true" viewBox="0 0 42 42" className="relative h-8 w-8">
              <path d="M8 9h17l9 9v15H8z" fill="currentColor" />
              <path d="M8 17h17M17 9v9M25 17v16" stroke="#0b0c0e" strokeWidth="1.8" />
              <circle cx="31" cy="10" r="3" fill="#e6a077" />
            </svg>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-between py-4 pr-3">
            <span className="self-end rounded-full border border-black/10 px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-[#64696e]">
              01 / 04
            </span>
            <div>
              <p className="text-[clamp(1rem,1.6vw,1.35rem)] font-medium leading-[1.1] tracking-[-0.06em] text-[#51555a]">
                View
                <br />
                My Projects
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="h-px w-10 bg-[#777c81]" />
                <ArrowRight size={14} className="text-[#777c81]" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div
        id="partner-logos"
        className="partner-zone absolute right-6 top-[57%] z-20 hidden w-[min(31vw,350px)] text-[#555a5f] sm:block lg:right-12"
      >
        <p className="mb-5 text-right text-[9px] font-medium tracking-[0.02em] text-[#686d72]">
          tech Stack
        </p>
        <div className="grid grid-cols-3 gap-x-5 gap-y-4 text-[11px] font-semibold tracking-[-0.04em]">
          {stack.map((item, index) => (
            <span
              key={item.name}
              className={`flex items-center gap-1.5 ${index % 2 ? 'text-[#686d72]' : ''}`}
            >
              <StackMark icon={item.icon} />
              {item.name}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-side-note absolute bottom-[17%] left-5 z-20 hidden items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-[#686d72] sm:flex lg:left-12">
        <ArrowDownRight size={13} />
        Scroll to explore
      </div>

    </section>
  )
}

export default Hero
