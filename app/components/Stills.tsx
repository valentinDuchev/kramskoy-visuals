"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { useI18n } from "../i18n/I18nProvider";

/**
 * Photo gallery ("Stills"). Gapless bento that always ends flush:
 * - phone: single column, every photo at its native aspect ratio
 * - sm/md: 2 columns of 4:3 tiles, the portrait spanning two rows
 * - lg: 3 columns x 6 rows, the portrait as the tall centre column
 * Click opens a lightbox with arrow-key / button navigation.
 * Structural data only — alt text lives in t.stills.alts, lined up by index.
 */
type Still = { src: string; w: number; h: number; cell: string };

const TILE = "sm:aspect-[4/3] lg:aspect-auto lg:row-span-2";

const STILLS: Still[] = [
  { src: "/story-1.jpg", w: 1600, h: 1064, cell: `${TILE} lg:col-start-1 lg:row-start-1` },
  {
    src: "/about-1.jpg",
    w: 1600,
    h: 2400,
    cell: "sm:row-span-2 lg:col-start-2 lg:row-start-1 lg:row-span-6",
  },
  { src: "/services/social-media.jpg", w: 1600, h: 1064, cell: `${TILE} lg:col-start-3 lg:row-start-1` },
  { src: "/services/documentaries.jpg", w: 1600, h: 1200, cell: `${TILE} lg:col-start-1 lg:row-start-3` },
  { src: "/services/real-estate.jpg", w: 1600, h: 900, cell: `${TILE} lg:col-start-3 lg:row-start-3` },
  { src: "/story-2.jpg", w: 1600, h: 900, cell: `${TILE} lg:col-start-1 lg:row-start-5` },
  { src: "/about-2.jpg", w: 1600, h: 1066, cell: `${TILE} lg:col-start-3 lg:row-start-5` },
];

export function Stills() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="stills"
      data-nav-bg="light"
      className="relative w-full bg-paper px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-wrap items-end justify-between gap-4 md:mb-16"
        >
          <h2 className="font-display text-6xl font-extrabold leading-[0.9] tracking-[-0.03em] text-ink md:text-8xl lg:text-[140px]">
            {t.stills.heading}
          </h2>
          <p className="max-w-xs text-balance text-sm leading-relaxed text-ink/55">{t.stills.intro}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:aspect-[3/2] lg:grid-cols-3 lg:grid-rows-6">
          {STILLS.map((s, i) => (
            <motion.button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${t.stills.open}: ${t.stills.alts[i]}`}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-ink/5 ${s.cell}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={t.stills.alts[i]}
                width={s.w}
                height={s.h}
                loading="lazy"
                className="block h-auto w-full sm:absolute sm:inset-0 sm:h-full sm:object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox index={active} setIndex={setActive} />
    </section>
  );
}

function Lightbox({
  index,
  setIndex,
}: {
  index: number | null;
  setIndex: (i: number | null) => void;
}) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const n = STILLS.length;

  const step = useCallback(
    (d: number) => setIndex(index == null ? null : (index + d + n) % n),
    [index, n, setIndex],
  );

  useEffect(() => {
    if (index == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, setIndex, step]);

  const still = index != null ? STILLS[index] : null;
  const navBtn =
    "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white";

  return (
    <AnimatePresence>
      {still && index != null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t.stills.alts[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setIndex(null)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/90 p-4 backdrop-blur-md md:p-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              key={still.src}
              src={still.src}
              alt={t.stills.alts[index]}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
          </AnimatePresence>

          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => step(-1)} aria-label={t.stills.prev} className={navBtn}>
              <ArrowLeft weight="bold" className="h-4 w-4" />
            </button>
            <span className="min-w-[4.5rem] text-center text-xs font-semibold tabular-nums tracking-[0.18em] text-white/60">
              {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => step(1)} aria-label={t.stills.next} className={navBtn}>
              <ArrowRight weight="bold" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIndex(null)}
              aria-label={t.stills.close}
              className={`${navBtn} ml-3`}
            >
              <X weight="bold" className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
