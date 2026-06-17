"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useI18n } from "../i18n/I18nProvider";

// Structural data only — names/initials are not translated.
const PEOPLE = [
  { id: "t1", name: "Marta Vidović", initials: "MV" },
  { id: "t2", name: "Daniel Roth", initials: "DR" },
  { id: "t3", name: "Sofia & Petar Ilić", initials: "SP" },
  { id: "t4", name: "Naomi Adeyemi", initials: "NA" },
];

const INTERVAL = 6500;

export function Testimonials() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setI((p) => (p + 1) % PEOPLE.length);
  const prev = () => setI((p) => (p - 1 + PEOPLE.length) % PEOPLE.length);

  useEffect(() => {
    if (paused || reduce) return;
    const timer = setTimeout(next, INTERVAL);
    return () => clearTimeout(timer);
  }, [i, paused, reduce]);

  // Merge structural person with the translated quote for the current index.
  const q = { ...PEOPLE[i], ...t.testimonials.items[i] };

  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.5 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section
      id="testimonials"
      data-nav-bg="dark"
      className="relative w-full overflow-hidden bg-ink px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <motion.div {...reveal} className="mb-12 flex items-end justify-between md:mb-16">
          <h2 className="font-display text-5xl font-extrabold leading-[0.9] tracking-[-0.03em] text-white md:text-7xl">
            {t.testimonials.heading}
          </h2>
          <span className="font-mono text-sm text-accent/80">
            {String(i + 1).padStart(2, "0")} / {String(PEOPLE.length).padStart(2, "0")}
          </span>
        </motion.div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Big decorative quote mark */}
          <span
            aria-hidden
            className="pointer-events-none absolute -mt-16 select-none font-display text-[160px] leading-none text-accent/15 md:text-[240px]"
          >
            &ldquo;
          </span>

          {/* Quote */}
          <div className="relative min-h-[160px] md:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={q.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -22 }}
                transition={{ duration: reduce ? 0.2 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="max-w-4xl text-balance font-display text-2xl font-semibold leading-snug tracking-tight text-white md:text-4xl md:leading-[1.2]">
                  {q.quote}
                </p>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Attribution + controls */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={q.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.2 : 0.4, delay: reduce ? 0 : 0.05 }}
                className="flex items-center gap-4"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-white">
                  {q.initials}
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">{q.name}</div>
                  <div className="text-[12px] text-white/50">
                    {q.role} · {q.client}
                  </div>
                </div>
                <span className="ml-1 hidden rounded-full border border-white/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 md:inline-block">
                  {q.project}
                </span>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-5">
              {/* Segment indicators (also jump-to) */}
              <div className="flex items-center gap-2">
                {PEOPLE.map((person, idx) => (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => setI(idx)}
                    aria-label={t.testimonials.goTo.replace("{n}", String(idx + 1))}
                    aria-current={idx === i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === i ? "w-8 bg-accent" : "w-4 bg-white/25 hover:bg-white/45"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label={t.testimonials.prev}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  <ArrowLeft weight="bold" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label={t.testimonials.next}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  <ArrowRight weight="bold" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
