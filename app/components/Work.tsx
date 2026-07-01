"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Play, X } from "@phosphor-icons/react";
import { useI18n } from "../i18n/I18nProvider";

/**
 * Structural data only — same across languages. The translated bits
 * (category, hover meta) live in the dictionary and line up by index.
 * To go live, replace WORK with an API result of the same shape.
 */
type WorkItem = {
  id: string;
  title: string;
  youtubeId: string;
  thumb?: string;
  span: string;
};

const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

const WORK: WorkItem[] = [
  {
    id: "w1",
    title: "One Million Ahead — WDC 2024",
    youtubeId: "m5VtyttodNg",
    span: "md:col-span-2 lg:col-span-12",
  },
];

export function Work() {
  const { t } = useI18n();
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="work" data-nav-bg="dark" className="relative w-full bg-ink px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-wrap items-end justify-between gap-4 md:mb-16"
        >
          <h2 className="font-display text-5xl font-extrabold leading-[0.9] tracking-[-0.03em] text-white md:text-7xl">
            {t.work.heading}
          </h2>
          <p className="max-w-xs text-balance text-sm leading-relaxed text-white/45">{t.work.intro}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-12">
          {WORK.map((item, i) => (
            <WorkCard
              key={item.id}
              item={item}
              category={t.work.items[i].category}
              meta={t.work.items[i].meta}
              watch={t.work.watch}
              index={i}
              onOpen={() => setActive(i)}
              reduce={!!reduce}
            />
          ))}
        </div>
      </div>

      <Lightbox
        item={active != null ? WORK[active] : null}
        category={active != null ? t.work.items[active].category : ""}
        onClose={() => setActive(null)}
      />
    </section>
  );
}

function WorkCard({
  item,
  category,
  meta,
  watch,
  index,
  onOpen,
  reduce,
}: {
  item: WorkItem;
  category: string;
  meta: string[];
  watch: string;
  index: number;
  onOpen: () => void;
  reduce: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`${watch} ${item.title}`}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative block aspect-video w-full overflow-hidden rounded-xl bg-ink-soft text-left ${item.span}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.thumb ?? ytThumb(item.youtubeId)}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/10 transition-opacity duration-500 group-hover:from-ink/70"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/75 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Tech / credits line — reveals on hover */}
      <div className="absolute inset-x-0 top-0 -translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85">
          {meta.join("  /  ")}
        </div>
        <div className="mt-3 h-px w-full origin-left scale-x-0 bg-white/30 transition-transform delay-100 duration-700 ease-out group-hover:scale-x-100" />
      </div>

      {/* Play button — expands into a WATCH pill on hover */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:border-white group-hover:bg-white/20">
          <span className="grid h-16 w-16 place-items-center">
            <Play weight="fill" className="h-5 w-5 translate-x-px text-white" />
          </span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap pr-0 text-sm font-bold uppercase tracking-[0.16em] text-white opacity-0 transition-all duration-500 group-hover:max-w-[140px] group-hover:pr-6 group-hover:opacity-100">
            {watch}
          </span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-white md:text-xl">
            {item.title}
          </h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-accent/90">{category}</p>
        </div>
      </div>

      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />
    </motion.button>
  );
}

function Lightbox({
  item,
  category,
  onClose,
}: {
  item: WorkItem | null;
  category: string;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!item) return;
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [item, onKey]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} video player`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-8"
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl"
          >
            <div className="mb-3 flex items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-accent/80">{category}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close video"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
              >
                <X weight="bold" className="h-4 w-4" />
              </button>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
