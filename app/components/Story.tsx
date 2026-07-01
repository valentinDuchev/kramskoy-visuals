"use client";

import { motion, useReducedMotion } from "motion/react";
import { useI18n } from "../i18n/I18nProvider";

/**
 * Long-form bio ("My Story"). Reached from the "Read my full story" pill in
 * AboutMe (#about-more). Editorial two-column: copy on the left, the two real
 * on-set photos stacked and offset on the right.
 */
export function Story() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="about-more"
      data-nav-bg="dark"
      className="relative w-full scroll-mt-[72px] bg-ink px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* Copy column */}
        <div>
          <motion.h2
            {...reveal()}
            className="font-display text-5xl font-extrabold leading-[0.9] tracking-[-0.03em] text-white md:text-7xl lg:text-8xl"
          >
            {t.story.heading}
          </motion.h2>

          <div className="mt-8 space-y-5 md:mt-12 md:space-y-6">
            {t.story.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                {...reveal(0.05 + i * 0.05)}
                className="max-w-xl text-base leading-relaxed text-white/60 md:text-lg"
              >
                {p}
              </motion.p>
            ))}
            <motion.p
              {...reveal(0.2)}
              className="max-w-xl font-display text-xl font-bold leading-snug tracking-tight text-white md:text-2xl"
            >
              {t.story.closing}
            </motion.p>
          </div>
        </div>

        {/* Photo column — two on-set stills, stacked and offset */}
        <div className="relative">
          <motion.div
            {...reveal(0.1)}
            className="overflow-hidden rounded-2xl border border-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-1.jpg"
              alt="Ivan filming on a gimbal"
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
          </motion.div>
          <motion.div
            {...reveal(0.2)}
            className="mt-5 ml-auto w-[82%] overflow-hidden rounded-2xl border border-white/10 md:mt-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-2.jpg"
              alt="Ivan operating a Ronin gimbal on location"
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
