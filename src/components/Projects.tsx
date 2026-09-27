"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import { EASE } from "../lib/motion";
import Bokurce from "../assets/images/projects/bokurce.png";
import FootballApi from "../assets/images/projects/football-api.png";
import GPMtuhaha from "../assets/images/projects/gpm-tuhaha.png";
import smp28malteng from "../assets/images/projects/smp28malteng.png";
import NegeriTuhaha from "../assets/images/projects/tuhaha.png";

type Project = {
  title: string;
  desc: string;
  techStack: string[];
  image?: string;
  imageAlt?: string;
  href?: string;
  /** Used for the visual placeholder until a real project screenshot is added. */
  accent?: string;
};

const defaultProjects: Project[] = [
  {
    title: "smpn28malteng",
    desc: "Official website for SMP Negeri 28 Maluku Tengah, showcasing school information and activities.",
    techStack: ["JavaScript", "Tailwind", "React.js", "GSAP"],
    image: smp28malteng,
    imageAlt: "SMP Negeri 28 Maluku Tengah website preview",
    href: "https://smp28malteng.vercel.app/",
    accent: "#cdd9d1",
  },
  {
    title: "Jemaat GPM Tuhaha",
    desc: "Church website with GSAP animations, WebGL 3D hero, and a contact form wired to WhatsApp.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "GSAP (ScrollTrigger)",
    ],
    image: GPMtuhaha,
    imageAlt: "GPM Tuhaha church website preview",
    href: "https://tuhaha.id",
    accent: "#d5d1e8",
  },
  {
    title: "Tuhaha.id",
    desc: "Official government website for Negeri Tuhaha, providing information about the village, government, and community.",
    techStack: ["CSS", "React.js"],
    image: NegeriTuhaha,
    imageAlt: "Tuhaha.id government website preview",
    href: "https://tuhaha.id",
    accent: "#e9d6c6",
  },
  {
    title: "Football Web",
    desc: "Modern football stats hub for Europe's top 5 leagues with cinematic animations.",
    techStack: [
      "Next.js",
      "React",
      "Tailwind",
      "API-Football",
      "GSAP",
      "Lenis",
    ],
    image: FootballApi,
    imageAlt: "Football stats website preview",
    href: "https://football-data-zeta.vercel.app/",
    accent: "#d8dce4",
  },
  {
    title: "Bokurce Library",
    desc: "Library management system, PHP + MySQL, Stack data structure.",
    techStack: ["PHP", "MySQL", "CSS", "JavaScript", "GSAP"],
    image: Bokurce,
    imageAlt: "Bokurce Library website preview",
    href: "https://bokurce-library.lovestoblog.com/",
    accent: "#e4ded2",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M4.5 15.5 15 5m0 0H6m9 0v9"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function ProjectArtwork({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.imageAlt ?? `${project.title} project preview`}
        className="absolute inset-0 h-full w-full object-contain object-top grayscale transition-all duration-500 ease-out group-hover:scale-[1.035] group-hover:grayscale-0"
      />
    );
  }

  return (
    <div
      aria-label={`${project.title} image placeholder`}
      className="absolute inset-0 overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.035]"
      style={{ background: project.accent ?? "#e7e6e2" }}
    >
      <div className="absolute -right-[8%] -top-[23%] h-[82%] w-[61%] rounded-full bg-white/40 blur-2xl" />
      <div className="absolute -bottom-[38%] -left-[6%] h-[80%] w-[68%] rounded-full bg-black/[0.08] blur-xl" />
      <div className="absolute inset-[7%] flex flex-col justify-between border border-black/10 p-[5%] text-[#171717]">
        <div className="flex items-center justify-between border-b border-black/15 pb-3 text-[clamp(8px,0.8vw,12px)] uppercase tracking-[0.18em]">
          <span>Chelo</span>
          <span>Featured projects</span>
        </div>
        <div className="grid grid-cols-[1fr_0.8fr] items-center gap-4 sm:gap-8">
          <div>
            <span className="text-[clamp(8px,0.75vw,11px)] uppercase tracking-[0.2em] text-black/55">
              Digital experience
            </span>
            <p className="mt-2 max-w-[8ch] text-[clamp(28px,5vw,76px)] font-medium leading-[0.88] tracking-[-0.075em]">
              {project.title}
            </p>
            <span className="mt-4 inline-block h-px w-10 bg-black/50" />
          </div>
          <div className="relative aspect-[0.82] overflow-hidden bg-white/55 shadow-[0_18px_50px_rgba(0,0,0,0.10)]">
            <div className="absolute inset-x-[12%] top-[12%] h-[8%] bg-black/75" />
            <div className="absolute left-[12%] top-[32%] h-[25%] w-[58%] bg-white/80" />
            <div className="absolute bottom-[12%] right-[12%] h-[32%] w-[38%] bg-black/15" />
            <div className="absolute bottom-[12%] left-[12%] h-[4%] w-[32%] bg-black/55" />
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-black/15 pt-3 text-[clamp(8px,0.75vw,11px)] uppercase tracking-[0.16em]">
          <span>Project preview</span>
          <span>01 — 04</span>
        </div>
      </div>
      <span className="absolute bottom-[8%] right-[8%] select-none text-[clamp(54px,10vw,150px)] font-semibold leading-none tracking-[-0.1em] text-black/[0.06]">
        01
      </span>
    </div>
  );
}

function ProjectPreview({
  project,
  index,
  total,
  direction,
}: {
  project: Project;
  index: number;
  total: number;
  direction: 1 | -1;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const shift = direction === 1 ? 7 : -7;

      gsap.fromTo(
        card,
        { autoAlpha: 0, xPercent: shift, scale: 0.965, rotate: direction === 1 ? 0.5 : -0.5 },
        {
          autoAlpha: 1,
          xPercent: 0,
          scale: 1,
          rotate: 0,
          duration: 0.9,
          ease: EASE,
          clearProps: "transform,opacity,visibility",
        }
      );

      gsap.fromTo(
        "[data-caption]",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: EASE,
          stagger: 0.08,
          delay: 0.18,
          clearProps: "transform,opacity,visibility",
        }
      );
    }, card);

    return () => ctx.revert();
  }, [project.title, project.image, direction]);

  return (
    <div
      ref={cardRef}
      className="group relative aspect-[1.55] w-full overflow-hidden bg-[#e7e6e2] shadow-[0_24px_60px_rgba(0,0,0,0.10)] sm:aspect-[1.7]"
    >
      <ProjectArtwork project={project} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/40 to-transparent px-5 pb-5 pt-16 text-white sm:px-7 sm:pb-7">
        <span data-caption className="text-xs font-medium uppercase tracking-[0.18em]">
          {project.title}
        </span>
        <span data-caption className="text-xs tabular-nums">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export default function ProjectsSection({
  projects = defaultProjects,
}: {
  /** Add each project's real screenshot, alt text, URL, and accent color here. */
  projects?: Project[];
}) {
  const projectList = projects.length > 0 ? projects : defaultProjects;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const safeIndex = activeIndex % projectList.length;
  const activeProject = projectList[safeIndex];
  const nextProject = projectList[(safeIndex + 1) % projectList.length];

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative isolate overflow-hidden bg-[#f4f4f2] px-6 py-24 text-[#111] sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">

        <div className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.55fr] lg:gap-14 xl:gap-20">
          <div className="relative z-10">
            <h2
              id="projects-title"
              className="max-w-[8ch] text-[clamp(4rem,8.8vw,6rem)] font-medium leading-[0.82] tracking-[-0.085em]"
            >
              Featured projects
            </h2>
            <p className="mt-10 max-w-sm text-base leading-relaxed text-[#777774] sm:text-lg">
              A selection of projects I've built for real clients and personal work.
            </p>

            <div className="mt-12 sm:mt-16">
              <p className="text-xs font-medium tabular-nums tracking-[0.08em] text-[#555]">
                {String(safeIndex + 1).padStart(2, "0")} /{" "}
                {String(projectList.length).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-3xl font-medium tracking-[-0.055em] sm:text-4xl">
                {activeProject.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#777774]">
                {activeProject.desc}
              </p>

              {activeProject.techStack.length > 0 && (
                <div className="mt-5" aria-label="Project tech stack">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#777774]">
                    Tech stack
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {activeProject.techStack.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-full border border-black/10 px-3 py-1.5 text-xs text-[#444]"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeProject.href ? (
                <a
                  href={activeProject.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-7 inline-flex items-center gap-3 border-b border-black/60 pb-2 text-sm font-medium transition-colors hover:border-[#b8795d] hover:text-[#8e5d48]"
                >
                  View project <ArrowIcon />
                </a>
              ) : (
                <span className="group mt-7 inline-flex items-center gap-3 border-b border-black/60 pb-2 text-sm font-medium text-[#555]">
                  Add project link <ArrowIcon />
                </span>
              )}
            </div>
          </div>

          <div className="relative lg:pr-[7%]">
            <div className="relative z-10">
              <ProjectPreview
                key={activeProject.image ?? activeProject.title}
                project={activeProject}
                index={safeIndex}
                total={projectList.length}
                direction={direction}
              />
            </div>

            {projectList.length > 1 && (
              <div className="absolute right-0 top-[13%] hidden h-[72%] w-[17%] overflow-hidden bg-[#e1dfd9] shadow-[0_14px_40px_rgba(0,0,0,0.09)] sm:block">
                <div className="group relative h-full w-full overflow-hidden">
                  <ProjectArtwork project={nextProject} />
                </div>
              </div>
            )}

            <div
              className="mt-8 flex items-center gap-4 sm:mt-10 sm:gap-6"
              aria-label="Choose a project"
            >
              {projectList.map((project, index) => {
                const isActive = index === safeIndex;
                return (
                  <button
                    key={`${project.title}-${index}`}
                    type="button"
                    aria-label={`Show ${project.title}`}
                    aria-pressed={isActive}
                    onClick={() => {
                      setDirection(index >= safeIndex ? 1 : -1);
                      setActiveIndex(index);
                    }}
                    className="group flex min-w-0 flex-1 flex-col items-start gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8795d] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f4f2] cursor-pointer"
                  >
                    <span
                      className={`text-xs tabular-nums transition-colors ${
                        isActive
                          ? "font-semibold text-[#111]"
                          : "text-[#888] group-hover:text-[#111]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="relative h-[2px] w-full bg-black/10">
                      <span
                        className={`absolute inset-y-0 left-0 bg-[#111]  transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-1/3 "
                        }`}
                      />
                      {isActive && (
                        <span className="absolute -top-[3px] left-0 h-2 w-2 rounded-full bg-[#b8795d] " />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none  absolute -bottom-[0.2em] left-[2%] -z-10 select-none text-[clamp(16rem,38vw,40rem)] font-semibold leading-none tracking-[-0.1em] text-black/[0.025]"
        >
          {String(safeIndex + 1).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
