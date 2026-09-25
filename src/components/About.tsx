import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { EASE } from '../lib/motion'

const LEAD =
  "I'm a frontend developer from Indonesia with a passion for building modern, interactive websites that combine thoughtful design, clean code, and seamless user experiences."

const CLOSING =
  'I enjoy turning ideas into engaging digital experiences that are both visually appealing and functional.'

function About() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const scope = root.current
    if (!scope) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const q = gsap.utils.selector(scope)

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: EASE },
          scrollTrigger: { trigger: scope, start: 'top 78%', once: true },
        })
        .from(q('.about-rail'), { autoAlpha: 0, x: -12, duration: 1 }, 0)
        .from(q('.about-ghost'), { autoAlpha: 0, scale: 1.08, duration: 1.8 }, 0)
        .from(q('.line-mask > span'), {
          yPercent: 108,
          autoAlpha: 0,
          duration: 1.15,
          stagger: 0.08,
        }, 0.06)
        .from(q('.about-lead'), { y: 20, autoAlpha: 0, duration: 1 }, 0.34)
        .from(q('.about-close'), { y: 26, autoAlpha: 0, duration: 1.15 }, 0.44)
        .from(q('.about-link'), { y: 12, autoAlpha: 0, duration: 0.9 }, 0.6)
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={root}
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden text-[#17191b]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(36,40,44,0.14)_12%,rgba(36,40,44,0.14)_88%,transparent)]" />

      <div
        aria-hidden="true"
        className="about-ghost pointer-events-none absolute bottom-[15%] -right-[4%] z-0 select-none whitespace-nowrap text-[clamp(6rem,19vw,17rem)] font-semibold leading-[.7] tracking-[-.105em] text-transparent"
      >
        ABOUT
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="grid lg:grid-cols-[52px_minmax(0,1fr)] lg:gap-x-12">
          <div className="about-rail relative hidden lg:block">
            <span className="absolute inset-y-0 left-0 w-px bg-[linear-gradient(180deg,transparent,rgba(36,40,44,0.16)_16%,rgba(36,40,44,0.16)_84%,transparent)]" />
            <span className="absolute left-[19px] top-1 flex items-center gap-3 [writing-mode:vertical-rl] rotate-180 text-[9px] font-medium uppercase tracking-[.24em] text-[#62676b]">
              Frontend Developer · 
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d58452]" />
            </span>
          </div>

          <div className="relative z-10">
            <h2
              id="about-heading"
              className="text-[clamp(2.9rem,7vw,6rem)] font-medium leading-[.92] tracking-[-.085em] text-[#202225]"
            >
              <span className="line-mask">
                <span className="block">Looks right.</span>
              </span>
              <span className="line-mask text-black/60">
                <span className="block">Runs right. </span>
              </span>
              <span className="line-mask">
                <span className="block text-black/45">Feels right.</span>
              </span>
            </h2>

            <div className="mt-14 lg:mt-20">
              <div className="h-px w-full bg-[linear-gradient(90deg,rgba(36,40,44,0.16),rgba(36,40,44,0.16)_72%,transparent)]" />
              <p className="about-lead mt-8 max-w-[37em] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.75] tracking-[-.02em] text-[#3f4448] lg:ml-[16%] lg:mt-10">
                {LEAD}
              </p>
            </div>

            <div className="about-close mt-16 lg:mt-24">
              <p className="max-w-[34ch] text-[clamp(1.35rem,2.6vw,2.1rem)] font-medium leading-[1.16] tracking-[-.05em] text-[#5b6064] lg:max-w-[26ch]">
                {CLOSING}
              </p>
            </div>

            <a
              href="#projects"
              className="about-link group mt-10 inline-flex items-center gap-2 text-[12px] font-medium text-[#2b2f33] underline decoration-black/25 underline-offset-[6px] transition-colors duration-200 hover:text-[#8a4f2b] hover:decoration-[#d99469] lg:mt-12"
            >
              See the work
              <ArrowUpRight
                size={13}
                strokeWidth={1.7}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
