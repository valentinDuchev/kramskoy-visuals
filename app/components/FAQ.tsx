"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDown, ArrowUpRight } from "@phosphor-icons/react";
import { useI18n } from "../i18n/I18nProvider";

export function FAQ() {
  const { t } = useI18n();
  const FAQS = t.faq.items;
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section
      id="faq"
      data-nav-bg="light"
      className="relative w-full bg-paper px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        {/* Left — sticky heading */}
        <motion.div {...reveal} className="md:sticky md:top-28 md:self-start">
          <h2 className="font-display text-6xl font-extrabold leading-[0.9] tracking-[-0.03em] text-ink md:text-8xl">
            {t.faq.heading}
          </h2>
          <p className="mt-6 max-w-xs text-base leading-relaxed text-ink/55">{t.faq.intro}</p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent"
          >
            {t.faq.getInTouch}
            <ArrowUpRight weight="bold" className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Right — Q&A list */}
        <div className="border-t border-ink/12">
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className="border-b border-ink/12">
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="group flex w-full items-center gap-4 py-6 text-left"
                >
                  <span className="flex-1 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                    {f.q}
                  </span>
                  <CaretDown
                    weight="bold"
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                      on ? "rotate-180 text-ink" : "text-ink/40 group-hover:text-ink"
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 text-[15px] leading-relaxed text-ink/65">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
