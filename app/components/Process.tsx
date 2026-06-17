"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useI18n } from "../i18n/I18nProvider";

export function Process() {
  const { t } = useI18n();
  const STEPS = t.process.steps;
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 60%", "end 70%"],
  });

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="process"
      data-nav-bg="dark"
      className="relative w-full bg-ink px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div {...reveal()} className="mb-14 max-w-2xl md:mb-20">
          <h2 className="font-display text-6xl font-extrabold leading-[0.9] tracking-[-0.03em] text-white md:text-8xl lg:text-[140px]">
            {t.process.heading}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">{t.process.intro}</p>
        </motion.div>

        <div ref={trackRef} className="relative">
          {/* Track line + scroll-driven progress fill */}
          <div className="absolute bottom-2 left-[6px] top-2 w-px bg-white/12 md:left-[7px]" />
          <motion.div
            aria-hidden
            className="absolute left-[6px] top-2 w-px origin-top bg-accent md:left-[7px]"
            style={{ height: "calc(100% - 16px)", scaleY: reduce ? 1 : scrollYProgress }}
          />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              {...reveal(i * 0.04)}
              className="relative grid gap-3 pb-14 pl-12 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-12 md:pb-24 md:pl-24"
            >
              {/* Node — lights up as it enters view */}
              <motion.span
                aria-hidden
                initial={{ backgroundColor: reduce ? "#5ba8ff" : "rgba(255,255,255,0.25)" }}
                whileInView={{ backgroundColor: "#5ba8ff" }}
                viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-ink"
              />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {s.tag}
                </span>
                <h3 className="mt-2.5 font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                  {s.title}
                </h3>
              </div>
              <p className="max-w-md text-base leading-relaxed text-white/55 md:text-lg">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
