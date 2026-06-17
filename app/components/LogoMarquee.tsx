"use client";

import { useI18n } from "../i18n/I18nProvider";

// Invented client wordmarks paired with simple geometric marks. Swap for
// real names (and real SVG logos) once Ivan's client list is confirmed.
const CLIENTS = [
  "Lumen Studio",
  "Halden Coffee",
  "Northsound Records",
  "Atlas & Co",
  "Veritas Films",
  "Kestrel Aero",
  "Ember Hospitality",
  "Tideline Surf",
];

function Glyph({ index }: { index: number }) {
  const cls = "h-5 w-5 shrink-0 text-white/35";
  switch (index % 4) {
    case 0:
      return (
        <svg viewBox="0 0 20 20" className={cls} aria-hidden>
          <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 20 20" className={cls} aria-hidden>
          <rect x="3" y="3" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 20 20" className={cls} aria-hidden>
          <path d="M10 2 L18 18 L2 18 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 20 20" className={cls} aria-hidden>
          <path d="M10 2 L18 10 L10 18 L2 10 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
  }
}

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-14 pr-14">
      {CLIENTS.map((c, i) => (
        <div key={c} className="flex items-center gap-3 whitespace-nowrap">
          <Glyph index={i} />
          <span className="font-display text-xl font-bold tracking-tight text-white/55">{c}</span>
        </div>
      ))}
    </div>
  );
}

export function LogoMarquee() {
  const { t } = useI18n();
  return (
    <section
      data-nav-bg="dark"
      className="relative w-full overflow-hidden border-t border-white/10 bg-ink py-14"
    >
      <div className="mx-auto mb-8 max-w-[1400px] px-5 md:px-10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent/70">
          {t.clients.label}
        </span>
      </div>

      <div className="kv-marquee relative flex overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
        <div className="kv-marquee-track flex">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
