"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "../i18n/I18nProvider";

gsap.registerPlugin(ScrollTrigger);

// ─── Tunable knobs ──────────────────────────────────────────────────────
const SECTION_BG = "#ffffff"; // white studio backdrop, matches the Kling render
const SECTION_VH = 300; // section height in svh; sticky range = SECTION_VH - sticky height
const SCROLL_DURATION_PCT = 200; // scroll length the frame animation plays across
const ZOOM = 0.85; // contain-fit zoom; <1 leaves white margin, >1 crops
const DARK_OVERLAY_MAX = 0; // no scrim — the studio frames are already clean
const NAV_H = 72; // must match Navbar NAV_H

// ─── Frame tracks (counts verified against ffmpeg output) ───────────────
type Track = { total: number; src: (i: number) => string };

const DESKTOP_TRACK: Track = {
  total: 145,
  src: (i) => `/animated-view/frames/desktop/seq_${String(i + 1).padStart(4, "0")}.jpg`,
};

const MOBILE_TRACK: Track = {
  total: 91,
  src: (i) => `/animated-view/frames/mobile/seq_${String(i + 1).padStart(4, "0")}.jpg`,
};

// ─── Craft words that build as the camera resolves ──────────────────────
// Alternating sides; each wipes in from its own edge, staggered across the
// scrub. Layout lines up by index with t.camera.words.
// Positions hug the four corners, steering clear of the centred camera: the
// exploded lens fills the middle-left, so word 3 sits low-left below it. `at`
// values are the timeline progress each word starts revealing at — kept early
// enough that even the last word finishes before the scrub ends (see below).
const WORD_LAYOUT = [
  { pos: "left-[3vw] top-[9%] text-left", at: 0.06 },
  { pos: "right-[3vw] top-[30%] text-right", at: 0.26 },
  { pos: "left-[3vw] bottom-[18%] text-left", at: 0.46 },
  { pos: "right-[3vw] bottom-[9%] text-right", at: 0.62 },
] as const;

export function ScrollSequence() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const trackRef = useRef<Track>(DESKTOP_TRACK);
  const wordsRef = useRef<HTMLDivElement>(null);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  // 1. Preload every frame into memory so the scrub never waits on the network.
  useEffect(() => {
    const pickTrack = () =>
      window.matchMedia("(min-width: 1024px)").matches ? DESKTOP_TRACK : MOBILE_TRACK;

    const load = () => {
      const track = pickTrack();
      trackRef.current = track;
      framesRef.current = [];

      const first = new Image();
      first.onload = () => {
        framesRef.current[0] = first;
        setFirstFrameReady(true);
      };
      first.src = track.src(0);

      for (let i = 1; i < track.total; i++) {
        const im = new Image();
        im.src = track.src(i);
        im.onload = () => {
          framesRef.current[i] = im;
        };
      }
    };
    load();

    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => load();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // 2. Scrub + draw via a GSAP proxy (never React state per frame).
  useEffect(() => {
    if (!firstFrameReady) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement!;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    const draw = (idx: number) => {
      const img = framesRef.current[idx];
      if (!img) return; // not yet loaded -> keep previous frame painted
      const { width: w, height: h } = canvas;
      ctx.fillStyle = SECTION_BG;
      ctx.fillRect(0, 0, w, h);
      const scale = Math.min(w / img.width, h / img.height) * ZOOM;
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    sizeCanvas();
    draw(0);

    const wordEls = wordsRef.current
      ? gsap.utils.toArray<HTMLElement>(".scrub-word", wordsRef.current)
      : [];

    // Reduced motion: skip the scrub, settle on the final frame and show
    // all words (every letter) statically.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const allLetters = wordsRef.current
        ? gsap.utils.toArray<HTMLElement>(".scrub-letter", wordsRef.current)
        : [];
      gsap.set(allLetters, { opacity: 1, yPercent: 0 });
      const id = setInterval(() => {
        const lastIdx = trackRef.current.total - 1;
        if (framesRef.current[lastIdx]) draw(lastIdx);
      }, 200);
      const stop = setTimeout(() => clearInterval(id), 5000);
      return () => {
        clearInterval(id);
        clearTimeout(stop);
      };
    }

    const totalFrames = trackRef.current.total - 1;
    const proxy = { f: 0 };

    // One scrubbed timeline drives both the camera frames and the words,
    // so the typography stays locked to the camera's progress.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current!,
        start: "top top",
        end: `+=${SCROLL_DURATION_PCT}%`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(
      proxy,
      { f: totalFrames, ease: "none", duration: 1, onUpdate: () => draw(Math.round(proxy.f)) },
      0,
    );

    wordEls.forEach((el, i) => {
      const fromLeft = i % 2 === 0;
      const letters = gsap.utils.toArray<HTMLElement>(".scrub-letter", el);
      tl.fromTo(
        letters,
        { opacity: 0, yPercent: 55 },
        {
          opacity: 1,
          yPercent: 0,
          ease: "power2.out",
          duration: 0.05,
          // Left-side words build left-to-right; right-side words build
          // right-to-left, so each word grows out from its own edge.
          stagger: { each: 0.028, from: fromLeft ? "start" : "end" },
        },
        WORD_LAYOUT[i]?.at ?? 0.1 + i * 0.22,
      );
    });

    const onResize = () => {
      sizeCanvas();
      draw(Math.round(proxy.f));
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [firstFrameReady]);

  return (
    <section
      ref={sectionRef}
      id="craft"
      data-nav-bg="light"
      className="relative w-full"
      style={{ backgroundColor: SECTION_BG, height: `${SECTION_VH}svh` }}
    >
      {/* Sticky canvas — CSS sticky, not GSAP pin. Sits below the navbar. */}
      <div
        className="sticky z-0 w-full"
        style={{ top: NAV_H, height: `calc(100svh - ${NAV_H}px)` }}
      >
        <canvas ref={canvasRef} aria-hidden className="block h-full w-full" />

        {/* Soft brand-cyan feathers at the top/bottom edges of the white
            studio, for cohesion with the dark sections around it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-accent/15 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-accent/15 to-transparent"
        />

        {/* Craft words — pinned over the camera, built letter-by-letter
            by the scrub. Each word's letters are staggered within its
            scroll window. */}
        <div ref={wordsRef} className="pointer-events-none absolute inset-0 z-10">
          {t.camera.words.map((word, idx) => (
            <span
              key={idx}
              aria-label={word}
              // Type is sized in vw (clamped) so each word stays a constant
              // fraction of the viewport and never spills past its side gutter
              // onto the centered camera — regardless of width or language.
              // whitespace-nowrap keeps a long word (e.g. BG СВЕТЛИНА) on one
              // line so it can't wrap back over the frame. Oswald (--font-craft)
              // is condensed, so the long Cyrillic words stay narrow.
              className={`scrub-word absolute whitespace-nowrap font-[family-name:var(--font-craft)] text-[clamp(2rem,4.6vw,5.5rem)] font-bold uppercase leading-none tracking-[0.01em] text-ink ${WORD_LAYOUT[idx].pos}`}
            >
              {word.split("").map((ch, i) => (
                <span key={i} aria-hidden className="scrub-letter inline-block opacity-0">
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </div>

        {DARK_OVERLAY_MAX > 0 && (
          <div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: 0 }} />
        )}
      </div>
    </section>
  );
}
