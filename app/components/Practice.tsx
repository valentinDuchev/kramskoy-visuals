"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useI18n } from "../i18n/I18nProvider";

export function Practice() {
  const { t } = useI18n();
  const SPECTRUM = t.practice.spectrum;
  const PRACTICE = t.practice.items;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="practice"
      data-nav-bg="light"
      className="relative w-full bg-paper px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.h2
          {...reveal()}
          className="font-display text-6xl font-extrabold leading-[0.9] tracking-[-0.03em] text-ink md:text-8xl lg:text-[150px]"
        >
          {t.practice.heading}
        </motion.h2>

        {/* Spectrum band — inverted dark strip on the white section */}
        <motion.div
          {...reveal(0.05)}
          className="mt-10 flex items-center justify-between gap-3 bg-ink px-5 py-2.5 text-[11px] font-semibold text-white md:mt-14 md:text-sm"
        >
          {SPECTRUM.map((s, i) => (
            <span key={s} className={i > 0 && i < SPECTRUM.length - 1 ? "hidden sm:block" : ""}>
              {s}
            </span>
          ))}
        </motion.div>

        {/* Numbered practice rows with a gliding dot marker */}
        <div className="mt-4 md:mt-10" onMouseLeave={() => setActive(0)}>
          {PRACTICE.map((p, i) => {
            const on = active === i;
            return (
              <motion.div
                key={i}
                {...reveal(0.05 + i * 0.05)}
                onMouseEnter={() => setActive(i)}
                className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-ink/10 py-8 md:grid-cols-12 md:gap-6 md:py-12"
              >
                {/* Dot marker (numbers removed) */}
                <div className="relative md:col-span-1 md:col-start-4">
                  {on && (
                    <motion.span
                      layoutId="practice-dot"
                      className="absolute left-0 top-2 hidden h-3.5 w-3.5 rounded-full bg-accent md:block"
                      transition={
                        reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }
                      }
                    />
                  )}
                </div>

                {/* Title */}
                <h3
                  className={`font-display text-2xl font-bold leading-tight tracking-tight transition-colors duration-300 md:col-span-3 md:col-start-5 md:text-[28px] ${
                    on ? "text-ink" : "text-ink/55"
                  }`}
                >
                  {p.title}
                </h3>

                {/* Description */}
                <p
                  className={`col-span-2 max-w-md text-sm leading-relaxed transition-colors duration-300 md:col-span-3 md:col-start-9 md:max-w-none ${
                    on ? "text-ink/75" : "text-ink/45"
                  }`}
                >
                  {p.body}
                </p>
              </motion.div>
            );
          })}
          <div className="border-t border-ink/10" />
        </div>
      </div>
    </section>
  );
}
