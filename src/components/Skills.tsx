import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { EASE } from "../lib/motion";

type SkillKind =
  | "javascript"
  | "typescript"
  | "tailwind"
  | "react"
  | "nextjs"
  | "github";

type Skill = {
  name: string;
  kind: SkillKind;
};

const skills: Skill[] = [
  { name: "JavaScript", kind: "javascript" },
  { name: "TypeScript", kind: "typescript" },
  { name: "Tailwind CSS", kind: "tailwind" },
  { name: "React.js", kind: "react" },
  { name: "Next.js", kind: "nextjs" },
  { name: "GitHub", kind: "github" },
];

function SkillMark({ kind }: { kind: SkillKind }) {
  if (kind === "javascript" || kind === "typescript") {
    return (
      <span
        aria-hidden="true"
        className="grid h-10 w-10 shrink-0 place-items-end rounded-[9px] bg-[#111] p-1 text-[15px] font-bold leading-none tracking-[-0.06em] text-white sm:h-[60px] sm:w-[60px] sm:text-[23px]"
      >
        {kind === "javascript" ? "JS" : "TS"}
      </span>
    );
  }

  if (kind === "tailwind") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 32"
        fill="currentColor"
        className="h-8 w-11 shrink-0 sm:h-12 sm:w-16"
      >
        <path d="M24 0C17.6 0 13.6 3.2 12 9.6c2.4-3.2 5.2-4.4 8.4-3.6 1.83.46 3.14 1.8 4.58 3.27C27.32 11.67 30.03 14.4 36 14.4c6.4 0 10.4-3.2 12-9.6-2.4 3.2-5.2 4.4-8.4 3.6-1.83-.46-3.14-1.8-4.58-3.27C32.68 2.73 29.97 0 24 0ZM12 17.6C5.6 17.6 1.6 20.8 0 27.2c2.4-3.2 5.2-4.4 8.4-3.6 1.83.46 3.14 1.8 4.58 3.27C15.32 29.27 18.03 32 24 32c6.4 0 10.4-3.2 12-9.6-2.4 3.2-5.2 4.4-8.4 3.6-1.83-.46-3.14-1.8-4.58-3.27C20.68 20.33 17.97 17.6 12 17.6Z" />
      </svg>
    );
  }

  if (kind === "react") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10 shrink-0 sm:h-[60px] sm:w-[60px]"
      >
        <g stroke="currentColor" strokeWidth="1.8">
          <ellipse cx="24" cy="24" rx="21" ry="8.5" />
          <ellipse
            cx="24"
            cy="24"
            rx="21"
            ry="8.5"
            transform="rotate(60 24 24)"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="21"
            ry="8.5"
            transform="rotate(120 24 24)"
          />
        </g>
        <circle cx="24" cy="24" r="3.2" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "nextjs") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10 shrink-0 sm:h-[60px] sm:w-[60px]"
      >
        <path d="M11 39V9l26 30V9" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="m27.5 28.2 11.7 13.6"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="currentColor"
      className="h-10 w-10 shrink-0 sm:h-[60px] sm:w-[60px]"
    >
      <path d="M24 .9a23.1 23.1 0 0 0-7.3 45c1.15.21 1.58-.5 1.58-1.1v-4.3c-6.43 1.4-7.79-2.73-7.79-2.73-1.05-2.67-2.57-3.38-2.57-3.38-2.1-1.44.16-1.41.16-1.41 2.32.16 3.54 2.38 3.54 2.38 2.06 3.53 5.4 2.51 6.71 1.92.21-1.49.81-2.51 1.47-3.09-5.13-.58-10.52-2.57-10.52-11.43 0-2.53.9-4.59 2.38-6.21-.24-.58-1.03-2.93.23-6.11 0 0 1.94-.62 6.35 2.37a22.1 22.1 0 0 1 11.56 0c4.41-2.99 6.35-2.37 6.35-2.37 1.26 3.18.47 5.53.23 6.11 1.48 1.62 2.37 3.68 2.37 6.21 0 8.88-5.4 10.84-10.55 11.41.83.72 1.57 2.12 1.57 4.27v6.36c0 .61.42 1.32 1.59 1.1A23.1 23.1 0 0 0 24 .9Z" />
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
        className="skills-ghost pointer-events-none absolute bottom-[8%] -right-[4%] z-0 select-none whitespace-nowrap text-[clamp(6rem,19vw,17rem)] font-semibold leading-[.7] tracking-[-.105em] text-black/2"
      >
        STACK
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="grid lg:grid-cols-[52px_minmax(0,1fr)] lg:gap-x-12">
          <div className="skills-rail relative hidden lg:block">
            <span className="absolute inset-y-0 left-0 w-px bg-[linear-gradient(180deg,transparent,rgba(36,40,44,0.16)_16%,rgba(36,40,44,0.16)_84%,transparent)]" />
          </div>

          <div className="relative z-10">
            <p className="skills-eyebrow mb-5 flex items-center gap-2 text-[11px] font-medium tracking-[0.015em] text-[#5e6368]">
              <span aria-hidden="true" className="h-px w-5 bg-[#d58452]" />
              Skills
              <span className="text-[#666b70]">/ 02</span>
            </p>

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
              {skills.map((skill) => (
                <li key={skill.kind}>
                  <div className="skills-card group flex min-h-[128px] flex-col items-start justify-center gap-3 rounded-[18px] border border-black/[0.12] bg-white/25 px-4 py-5 transition-[background-color,border-color] duration-300 ease-out hover:border-black/20 hover:bg-white/45 sm:min-h-[148px] sm:flex-row sm:items-center sm:gap-8 sm:px-8 sm:py-6">
                    <span className="shrink-0 transition-opacity duration-300 ease-out group-hover:opacity-70">
                      <SkillMark kind={skill.kind} />
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
