"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useI18n } from "../i18n/I18nProvider";

export function HeroName() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  // Distance the two-line lockup glides down once it has filled. The full 22%
  // glide looks great on tall screens, but on a short viewport (e.g. a 13"
  // laptop) it pushes the big VISUALS line down onto the roles row. So cap it
  // to whatever still leaves clearance above the roles.
  const [downY] = useState(() => {
    if (typeof window === "undefined") return 230;
    const h = window.innerHeight;
    const w = window.innerWidth;
    // Mirror the responsive font sizes below (15vw / 13vw / 168px).
    const fontPx = w >= 1024 ? 168 : w >= 768 ? w * 0.13 : w * 0.15;
    const lineHalf = fontPx * 0.82; // half the two-line block (2·font·0.82 / 2)
    const rolesReserve = 112; // roles row + bottom offset + breathing gap
    const maxDown = h / 2 - lineHalf - rolesReserve;
    return Math.max(0, Math.round(Math.min(h * 0.22, maxDown)));
  });

  return (
    <section
      id="top"
      data-nav-bg="dark"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-ink"
    >
      {/* Background video — heavily darkened so the name stays the subject.
          Reduced-motion users get the still poster instead of playback. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {reduce ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/hero_poster.jpg" alt="" className="h-full w-full object-cover" />
        ) : (
          <video
            className="h-full w-full object-cover"
            src="/hero_video.mp4"
            poster="/hero_poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
        {/* Heavy darken: flat scrim + vignette + bottom blend into the page */}
        <div className="absolute inset-0 bg-black/70" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 35%, transparent 0%, rgba(7,10,16,0.55) 70%, var(--ink) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-ink" />
      </div>

      {/* Ambient floor glow — the single accent, low and centered. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-20%] z-0 h-[70%]"
        style={{
          background:
            "radial-gradient(65% 70% at 50% 100%, var(--accent-glow) 0%, transparent 72%)",
          opacity: 0.68,
        }}
      />

      {/* ── Name layer (z-0): slides in to center, fills white, then
          glides down to rest just above the roles row ── */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          initial={reduce ? false : { y: -180, opacity: 0 }}
          animate={
            reduce
              ? { y: downY, opacity: 1 }
              : { y: [-180, 0, 0, downY], opacity: [0, 1, 1, 1] }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 3.2,
                  times: [0, 0.4, 0.7, 1],
                  ease: ["easeOut", "linear", [0.16, 1, 0.3, 1]],
                }
          }
          className="relative px-4 will-change-transform"
        >
          {/* Ghost copy — the dim type that sits in the dark. */}
          <h1
            aria-label="Kramskoy Visuals"
            className="name-ghost select-none text-center font-display text-[15vw] font-extrabold leading-[0.82] tracking-[-0.04em] md:text-[13vw] lg:text-[168px]"
          >
            <span className="block">KRAMSKOY</span>
            <span className="block">VISUALS</span>
          </h1>

          {/* Fill copy — clip-wipes downward: KRAMSKOY white, VISUALS cyan. */}
          <motion.h1
            aria-hidden
            initial={reduce ? { clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ delay: reduce ? 0 : 1.15, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 select-none px-4 text-center font-display text-[15vw] font-extrabold leading-[0.82] tracking-[-0.04em] md:text-[13vw] lg:text-[168px]"
          >
            <span className="name-fill block">KRAMSKOY</span>
            <span className="block text-accent">VISUALS</span>
          </motion.h1>
        </motion.div>
      </div>

      {/* ── Portrait layer (z-20): sits IN FRONT of the name ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center">
        <Portrait delayed={!reduce} />
      </div>

      {/* ── Roles (z-30): fade up after the fill completes ── */}
      <motion.ul
        initial="hidden"
        animate="show"
        variants={listVariants(reduce)}
        className="absolute inset-x-0 bottom-7 z-30 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 md:bottom-10 md:gap-x-10"
      >
        {t.hero.roles.map((role) => (
          <motion.li
            key={role}
            variants={itemVariants(reduce)}
            className="flex items-center gap-6 text-[12px] font-medium uppercase tracking-[0.22em] text-white/65 md:gap-10 md:text-[13px]"
          >
            {role}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

function listVariants(reduce: boolean | null): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        // Hold until the name has slid in and filled, then reveal roles.
        delayChildren: reduce ? 0 : 3.1,
        staggerChildren: reduce ? 0 : 0.12,
      },
    },
  };
}

function itemVariants(reduce: boolean | null): Variants {
  return {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };
}

/**
 * Placeholder portrait. Drop a transparent cutout PNG at `public/portrait.png`
 * (Kramskoy, full/half body, no background) and it renders automatically.
 * Until then a labeled placeholder stands in so the layering reads correctly.
 */
function Portrait({ delayed }: { delayed: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      initial={delayed ? { opacity: 0, y: 40 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delayed ? 0.75 : 0, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex h-[62vh] max-h-[680px] w-auto items-end md:h-[68vh]"
    >
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

      {/* Placeholder shown only while the real PNG is missing. */}
      {failed && (
        <div className="absolute inset-0 flex items-end justify-center">
          <div
            className="flex aspect-[3/4] h-full max-w-[80vw] flex-col items-center justify-end rounded-t-[45%] border border-white/10 pb-10 text-center"
            style={{
              background:
                "linear-gradient(to top, var(--accent-soft) 0%, rgba(255,255,255,0.02) 55%, transparent 100%)",
            }}
          >
            <span className="px-6 text-[11px] uppercase tracking-[0.2em] text-white/40">
              portrait placeholder
            </span>
            <span className="mt-1 px-6 font-mono text-[10px] text-white/25">
              drop public/portrait.png
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
