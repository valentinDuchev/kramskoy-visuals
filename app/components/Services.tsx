"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus, ArrowUpRight, Check } from "@phosphor-icons/react";
import { useI18n } from "../i18n/I18nProvider";

// Structural data only — images line up by index with t.services.items.
const SERVICE_IMAGES = [
  "https://picsum.photos/seed/kv-svc-brand/1280/960",
  "https://picsum.photos/seed/kv-svc-events/1280/960",
  "https://picsum.photos/seed/kv-svc-music/1280/960",
  "https://picsum.photos/seed/kv-svc-photo/1280/960",
];

export function Services() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);

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
      id="services"
      data-nav-bg="light"
      className="relative w-full bg-paper px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div {...reveal} className="mb-12 max-w-2xl md:mb-16">
          <h2 className="font-display text-6xl font-extrabold leading-[0.9] tracking-[-0.03em] text-ink md:text-8xl lg:text-[140px]">
            {t.services.heading}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/55">{t.services.intro}</p>
        </motion.div>

        <div className="border-t border-ink/12">
          {t.services.items.map((s, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-ink/12">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center gap-5 py-7 text-left md:py-9"
                >
                  <span className="flex-1 font-display text-3xl font-bold tracking-tight text-ink transition-opacity duration-300 md:text-5xl">
                    {s.title}
                  </span>
                  <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45 sm:block">
                    {s.tag}
                  </span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/20 text-ink transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <Plus
                      weight="bold"
                      className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 md:grid-cols-2 md:gap-12 md:pb-14">
                        <div className="order-2 md:order-1">
                          <p className="max-w-md text-base leading-relaxed text-ink/65 md:text-lg">
                            {s.blurb}
                          </p>
                          <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                            {s.included.map((inc) => (
                              <li key={inc} className="flex items-center gap-2.5 text-sm text-ink/75">
                                <Check weight="bold" className="h-3.5 w-3.5 shrink-0 text-accent" />
                                {inc}
                              </li>
                            ))}
                          </ul>
                          <a
                            href="#contact"
                            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent"
                          >
                            {t.services.enquire.replace("{title}", s.title)}
                            <ArrowUpRight weight="bold" className="h-4 w-4" />
                          </a>
                        </div>
                        <div className="order-1 md:order-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={SERVICE_IMAGES[i]}
                            alt={s.title}
                            loading="lazy"
                            className="aspect-[4/3] w-full rounded-xl object-cover md:aspect-video"
                          />
                        </div>
                      </div>
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
