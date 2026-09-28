import { useLayoutEffect, useRef, type SVGProps } from "react";
import gsap from "gsap";

import { EASE } from "../lib/motion";
import { email as siteEmail, mailto as buildMailto, socials } from "../lib/site";

type ContactSectionProps = {
  email?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
};

function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5 shrink-0"
      {...props}
    >
      <path
        d="M4.5 15.5 15 5m0 0H6m9 0v9"
        stroke="currentColor"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function Stamp() {
  return (
    <span
      aria-hidden="true"
      className="grid h-[52px] w-[52px] place-items-center border border-dashed border-black/45 sm:h-[61px] sm:w-[61px]"
    >
      <span className="h-[16px] w-[16px] rounded-full bg-[#b8795d] sm:h-[19px] sm:w-[19px]" />
    </span>
  );
}

export default function ContactSection({
  email = siteEmail,
  instagramUrl,
  linkedinUrl,
}: ContactSectionProps) {
  const root = useRef<HTMLElement>(null);

  const mailto = email === siteEmail
    ? buildMailto()
    : `mailto:${email}?subject=${encodeURIComponent('Hello from your portfolio')}`;

  const hrefOverride: Partial<Record<(typeof socials)[number]["key"], string>> = {
    instagram: instagramUrl,
    linkedin: linkedinUrl,
  };

  const footerSocials = socials
    .filter((social) => social.primary)
    .map((social) => ({
      ...social,
      href: hrefOverride[social.key] ?? social.href,
    }));

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
        .from(q(".contact-eyebrow"), { x: -14, autoAlpha: 0, duration: 0.8 }, 0)
        .from(
          q(".contact-line > span"),
          {
            yPercent: 108,
            autoAlpha: 0,
            duration: 1.15,
            stagger: 0.08,
          },
          0.06,
        )
        .from(q(".contact-frame"), { scale: 0.94, autoAlpha: 0, duration: 1.3 }, 0.1)
        .from(q(".contact-ring"), { scale: 0.7, autoAlpha: 0, duration: 1.2 }, 0.18)
        .from(
          q(".contact-slug"),
          { y: 18, autoAlpha: 0, duration: 1, stagger: 0.1 },
          0.24,
        )
        .from(q(".contact-flap"), { y: 40, autoAlpha: 0, duration: 1.2 }, 0.3)
        .from(q(".contact-card"), { y: 34, autoAlpha: 0, duration: 1.15 }, 0.42)
        .from(q(".contact-sub"), { y: 16, autoAlpha: 0, duration: 0.9 }, 0.5)
        .from(q(".contact-meta"), { y: 10, autoAlpha: 0, duration: 0.8 }, 0.58);
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      aria-labelledby="contact-title"
      className="relative isolate min-h-[100dvh] overflow-hidden px-8 py-[72px] text-[#141414] sm:px-12 lg:px-[112px]"
    >
      <div className="mx-auto grid min-h-[calc(100dvh-130px)] max-w-[2560px] grid-rows-[44px_1fr_58px]">
        <header className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] sm:text-[13px]">
          <div className="flex items-center gap-[18px]">
            <span aria-hidden="true" className="h-[2px] w-11 bg-[#b8795d]" />
            <span className="text-black/35">
              Contact Section
            </span>
          </div>
        </header>   

        <div className="grid items-center lg:grid-cols-[41%_59%]">
          <div className="relative z-10 pl-2">
            <p className="contact-eyebrow mb-[34px] text-[10px] uppercase tracking-[0.22em] text-[#7d7d78] sm:text-xs">
              A simple invitation
            </p>
            <h2
              id="contact-title"
              className="max-w-[720px] font-serif text-[clamp(2.6rem,6.6vw,4.6rem)] font-normal leading-[0.89] tracking-[-0.07em] lg:text-[clamp(3.5rem,5.2vw,7.5rem)]"
            >
              <span className="contact-line line-mask">
                <span className="block">Good things</span>
              </span>
              <span className="contact-line line-mask">
                <span className="block">start with a</span>
              </span>
              <span className="contact-line line-mask">
                <span className="block text-[#b8795d]">message.</span>
              </span>
            </h2>
            <p className="contact-sub mt-[38px] text-base text-[#777774] sm:text-[21px]">
              Have a project in mind?
            </p>
            <span aria-hidden="true" className="mt-7 block h-[9px] w-[9px] rounded-full bg-[#b8795d]" />
          </div>

          <div className="relative mt-16 h-[560px] sm:h-[700px] lg:mt-0 lg:h-[820px]">
            <div className="contact-frame absolute right-0 top-[70px] h-[440px] w-[96%] origin-center border border-black/25 sm:top-[110px] sm:h-[600px] sm:w-[94%]" />

            <div className="contact-ring absolute right-[6%] top-[46px] h-[170px] w-[170px] rounded-full border border-black/60 after:absolute after:inset-[9px] after:rounded-full after:border after:border-black/30 sm:right-[12%] sm:top-[74px] sm:h-[350px] sm:w-[350px] sm:after:inset-[18px]" />

            <div className="contact-slug absolute right-[4%] top-[116px] h-[150px] w-[76px] origin-bottom-right bg-[#b8795d] after:absolute after:bottom-3 after:left-[15px] after:font-serif after:text-[21px] after:text-[#f4f4f2] after:content-['04'] sm:right-[11%] sm:top-[196px] sm:h-[248px] sm:w-[126px] sm:after:bottom-6 sm:after:left-[25px] sm:after:text-[34px]" />

            <div className="contact-flap absolute right-[4%] top-[100px] h-[400px] w-[92%] overflow-hidden border border-[#141414] bg-[#eef0f1]/40 sm:right-[5%] sm:top-[150px] sm:h-[560px]">
              <span className="absolute left-0 top-[130px] h-px w-[55%] origin-left rotate-[31deg] bg-[#141414] sm:top-[185px]" />
              <span className="absolute right-0 top-[130px] h-px w-[55%] origin-right -rotate-[31deg] bg-[#141414] sm:top-[185px]" />
            </div>

            <div className="contact-card absolute right-[6%] top-[190px] z-10 h-[320px] w-[88%] border border-black/40 bg-[#f4f4f2] p-[20px_22px] shadow-[10px_10px_0_#b8795d] sm:right-[17%] sm:top-[280px] sm:h-[430px] sm:w-[72%] sm:p-[38px_42px] sm:shadow-[18px_18px_0_#b8795d]">
              <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.22em] sm:text-[13px]">
                <span>To / Chelo</span>
                <Stamp />
              </div>

              <a
                href={mailto}
                className="mt-[64px] flex items-center justify-between border-b border-[#141414] pb-3 font-serif text-[clamp(1rem,2.4vw,2.875rem)] tracking-[-0.055em] transition-colors hover:text-[#b8795d] sm:mt-[108px]"
              >
                <span className="break-all">{email}</span>
                <ArrowUpRight className="ml-4" />
              </a>

              <div className="mt-7 flex gap-3 text-[10px] uppercase tracking-[0.18em] sm:mt-12 sm:gap-[30px]">
                <span className="flex-1 border-t border-dashed border-black/45 pt-2">Subject</span>
                <span className="flex-1 border-t border-dashed border-black/45 pt-2">From</span>
              </div>
            </div>

            <span
              aria-hidden="true"
              className="absolute bottom-[92px] right-2 hidden rotate-180 text-[10px] uppercase tracking-[0.23em] text-[#777774] [writing-mode:vertical-rl] lg:block"
            >
              Good things start here
            </span>
          </div>
        </div>

        <footer className="contact-meta flex items-end justify-between border-t border-black/25 pt-[18px] text-[13px] text-[#333] sm:text-[15px]">
          <div className="flex items-center gap-6">
            {footerSocials.map((social) => (
              <a
                key={social.key}
                href={social.href}
                aria-label={social.label}
                title={social.label}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noreferrer" : undefined}
                className="transition-opacity hover:opacity-60"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px] sm:h-5 sm:w-5"
                  fill="currentColor"
                >
                  <path d={social.path} fillRule="evenodd" clipRule="evenodd" />
                </svg>
              </a>
            ))}
          </div>
          <a href="#home" className="flex items-center gap-2 transition-colors hover:text-[#b8795d]">
            Back to top
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </footer>
      </div>
    </section>
  );
}
