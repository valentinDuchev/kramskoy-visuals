"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "../i18n/I18nProvider";

gsap.registerPlugin(ScrollTrigger);

const SECTION_VH = 250; // tall enough to pin + scrub the reveal
const SCROLL_PCT = 150; // scroll length the reveal plays across
const NAV_H = 72;

export function AboutMe() {
  const { t } = useI18n();
  const HEADING = t.about.heading;
  const BODY = t.about.body;
  const sectionRef = useRef<HTMLElement>(null);
  const headWrapRef = useRef<HTMLDivElement>(null);
  const headFillRef = useRef<HTMLHeadingElement>(null);
  const bodyWrapRef = useRef<HTMLDivElement>(null);
  const bodyFillRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: show the finished, filled state. No scrub.
    if (reduce) {
      gsap.set([headWrapRef.current, bodyWrapRef.current], { opacity: 1, yPercent: 0 });
      // Heading uses tight leading, so glyph tops/bottoms overflow its box —
      // bleed the clip past the box (negative insets) so the fill covers them.
      gsap.set(headFillRef.current, { clipPath: "inset(-20% 0 -20% 0)" });
      gsap.set(bodyFillRef.current, { clipPath: "inset(0 0 0% 0)" });
      if (sectionRef.current)
        gsap.set(sectionRef.current.querySelectorAll(".about-meta"), { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top top",
          end: `+=${SCROLL_PCT}%`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Heading rises from below as outline ("empty letters").
      tl.fromTo(
        headWrapRef.current,
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.16, ease: "power3.out" },
        0,
      );
      // 2. Heading fills white.
      tl.fromTo(
        headFillRef.current,
        { clipPath: "inset(-20% 0 100% 0)" },
        { clipPath: "inset(-20% 0 -20% 0)", duration: 0.16, ease: "none" },
        0.2,
      );
      // Pill + footer fade in alongside the heading.
      tl.fromTo(".about-meta", { opacity: 0 }, { opacity: 1, duration: 0.18 }, 0.1);
      // 3. Body rises in as outline.
      tl.fromTo(
        bodyWrapRef.current,
        { yPercent: 34, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.18, ease: "power3.out" },
        0.18,
      );
      // 4. Body fills white, row by row (top-to-bottom clip wipe).
      tl.fromTo(
        bodyFillRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.44, ease: "none" },
        0.42,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      data-nav-bg="dark"
      className="relative w-full bg-ink"
      style={{ height: `${SECTION_VH}svh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div
          className="relative mx-auto flex h-full max-w-[1400px] flex-col px-5 md:px-10"
          style={{ paddingTop: NAV_H + 28, paddingBottom: 40 }}
        >
          {/* Heading row: outline -> white fill, with the story pill */}
          <div className="flex items-start justify-between gap-6">
            <div ref={headWrapRef} className="relative" style={{ opacity: 0 }}>
              <h2 className="txt-outline-lg select-none font-display text-[15vw] font-extrabold leading-[0.85] tracking-[-0.03em] md:text-[min(12vw,20vh)] lg:text-[min(150px,20vh)]">
                {HEADING}
              </h2>
              <h2
                ref={headFillRef}
                aria-hidden
                className="absolute inset-0 select-none font-display text-[15vw] font-extrabold leading-[0.85] tracking-[-0.03em] text-accent md:text-[min(12vw,20vh)] lg:text-[min(150px,20vh)]"
                style={{ clipPath: "inset(-20% 0 100% 0)" }}
              >
                {HEADING}
              </h2>
            </div>

            <div className="about-meta shrink-0 pt-3 md:pt-6" style={{ opacity: 0 }}>
              <a
                href="#story"
                className="inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors duration-300 hover:border-white hover:text-white"
              >
                {t.about.readStory}
              </a>
            </div>
          </div>

          {/* Body: outline -> white fill, row by row */}
          <div className="flex flex-1 items-center justify-center">
            <div
              ref={bodyWrapRef}
              className="relative z-10 w-full max-w-[34rem]"
              style={{ opacity: 0 }}
            >
              <p className="txt-outline-sm text-balance text-center font-sans text-[clamp(17px,2.5vh,24px)] font-semibold leading-snug md:text-[clamp(20px,3.3vh,32px)] md:leading-[1.2]">
                {BODY}
              </p>
              <p
                ref={bodyFillRef}
                aria-hidden
                className="absolute inset-0 text-balance text-center font-sans text-[clamp(17px,2.5vh,24px)] font-semibold leading-snug text-white md:text-[clamp(20px,3.3vh,32px)] md:leading-[1.2]"
                style={{ clipPath: "inset(0 0 100% 0)" }}
              >
                {BODY}
              </p>
            </div>
          </div>

          {/* Footer meta row */}
          <div
            className="about-meta flex items-center justify-between border-t border-white/10 pt-5 text-[11px] uppercase tracking-[0.16em] text-white/35"
            style={{ opacity: 0 }}
          >
            <span>© 2026 Kramskoy Visuals</span>
            <span className="hidden font-display font-bold tracking-tighter text-white/45 sm:inline">
              KV
            </span>
            <span>{t.common.rights}</span>
          </div>
        </div>

        {/* Portrait — stands in front of the body copy, like the reference. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
          <AboutPortrait />
        </div>
      </div>
    </section>
  );
}

/** Same swap-in convention as the hero: drop public/portrait.png. */
function AboutPortrait() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative flex h-[58vh] max-h-[620px] w-auto items-end">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/portrait.png"
        alt="Kramskoy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-auto object-contain object-bottom transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {failed && (
        <div className="absolute inset-0 flex items-end justify-center">
          <div
            className="flex aspect-[3/4] h-full max-w-[70vw] items-end justify-center rounded-t-[45%] border border-white/10 pb-8"
            style={{
              background:
                "linear-gradient(to top, var(--accent-soft) 0%, rgba(255,255,255,0.02) 55%, transparent 100%)",
            }}
          >
            <span className="font-mono text-[10px] text-white/25">drop public/portrait.png</span>
          </div>
        </div>
      )}
    </div>
  );
}
