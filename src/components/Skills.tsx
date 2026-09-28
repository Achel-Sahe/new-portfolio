import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { EASE } from "../lib/motion";
import { stack } from "../lib/site";

function SkillMark({ path, title }: { path: string; title: string }) {
  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 24 24"
      className="h-9 w-9 shrink-0 sm:h-11 sm:w-11"
    >
      <path d={path} fill="currentColor" />
    </svg>
  );
}

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const q = gsap.utils.selector(scope);

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: EASE },
          scrollTrigger: { trigger: scope, start: "top 78%", once: true },
        })
        .from(q(".skills-rail"), { autoAlpha: 0, x: -12, duration: 1 }, 0)
        .from(
          q(".skills-ghost"),
          { autoAlpha: 0, scale: 1.08, duration: 1.8 },
          0,
        )
        .from(q(".skills-eyebrow"), { x: -14, autoAlpha: 0, duration: 0.8 }, 0.1)
        .from(
          q(".line-mask > span"),
          {
            yPercent: 108,
            autoAlpha: 0,
            duration: 1.15,
            stagger: 0.08,
          },
          0.06,
        )
        .from(q(".skills-lead"), { y: 20, autoAlpha: 0, duration: 1 }, 0.34)
        .from(
          q(".skills-card"),
          { y: 28, scale: 0.97, autoAlpha: 0, duration: 1.15, stagger: 0.07 },
          0.4,
        );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={root}
      aria-labelledby="skills-heading"
      className="relative isolate overflow-hidden text-[#17191b]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(36,40,44,0.14)_12%,rgba(36,40,44,0.14)_88%,transparent)]" />

      <div
        aria-hidden="true"
        className=" pointer-events-none absolute top-[8%] -right-[4%] z-0 select-none whitespace-nowrap text-[clamp(6rem,19vw,17rem)] font-semibold leading-[.7] tracking-[-.105em] text-black/2"
      >
        STACK
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="grid lg:grid-cols-[52px_minmax(0,1fr)] lg:gap-x-12">
          <div className="skills-rail relative hidden lg:block">
            <span className="absolute inset-y-0 left-0 w-px bg-[linear-gradient(180deg,transparent,rgba(36,40,44,0.16)_16%,rgba(36,40,44,0.16)_84%,transparent)]" />
          </div>

          <div className="relative z-10">

            <h2
              id="skills-heading"
              className="max-w-[680px] text-[clamp(2.9rem,7vw,6rem)] font-medium leading-[.92] tracking-[-.085em] text-[#202225]"
            >
              <span className="line-mask">
                <span className="block">The tools I</span>
              </span>
              <span className="line-mask">
                <span className="block">build with</span>
              </span>
            </h2>

            <div className="mt-14 lg:mt-20">
              <div className="h-px w-full bg-[linear-gradient(90deg,rgba(36,40,44,0.16),rgba(36,40,44,0.16)_72%,transparent)]" />
              <p className="skills-lead my-8 max-w-[37em] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.75] tracking-[-.02em] text-[#3f4448] lg:ml-[16%] lg:my-10">
                These are the tools I use to turn ideas into clean, interactive
                websites shaped through real projects and plenty of lessons
                along the way.
              </p>
            </div>

            <ul
              aria-label="Technologies and tools"
              className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3 xl:gap-7"
            >
              {stack.map((skill) => (
                <li key={skill.name}>
                  <div className="skills-card group flex min-h-[128px] flex-col items-start justify-center gap-3 rounded-[18px] border border-black/[0.12] bg-white/25 px-4 py-5 transition-[background-color,border-color] duration-300 ease-out hover:border-black/20 hover:bg-white/45 sm:min-h-[148px] sm:flex-row sm:items-center sm:gap-8 sm:px-8 sm:py-6">
                    <span className="shrink-0 text-[#3c4045] transition-opacity duration-300 ease-out group-hover:opacity-70">
                      <SkillMark path={skill.icon.path} title={skill.icon.title} />
                    </span>
                    <span className="text-[15px] font-medium leading-[1.2] tracking-[-0.035em] transition-colors duration-300 ease-out group-hover:text-[#202225] sm:text-xl">
                      {skill.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
