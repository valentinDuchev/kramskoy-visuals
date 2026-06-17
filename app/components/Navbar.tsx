"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LanguageToggle, useI18n } from "../i18n/I18nProvider";

// Keep these in lockstep with the sticky offsets in ScrollSequence.
const NAV_H = 72;

const LEFT_LINKS = [
  { key: "home", href: "/" },
  { key: "work", href: "/#work" },
] as const;

const RIGHT_LINKS = [
  { key: "story", href: "/#story" },
  { key: "contact", href: "/#contact" },
] as const;

export function Navbar() {
  const { t } = useI18n();
  // onLight = navbar is currently over a light (white) section -> dark text.
  const [onLight, setOnLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  // Flip nav text to match whichever section sits under the navbar.
  // Each top-level section declares data-nav-bg="dark|light". A 1px
  // detection line just below the navbar reports the section crossing it.
  // No scroll listener (only resize, to keep the line positioned).
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-bg]"));
    if (!sections.length) return;

    let obs: IntersectionObserver | undefined;
    const build = () => {
      obs?.disconnect();
      const bottom = -(window.innerHeight - NAV_H - 2);
      obs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) setOnLight(e.target.getAttribute("data-nav-bg") === "light");
          }
        },
        { rootMargin: `-${NAV_H}px 0px ${bottom}px 0px`, threshold: 0 },
      );
      sections.forEach((s) => obs!.observe(s));
    };

    build();
    window.addEventListener("resize", build);
    return () => {
      obs?.disconnect();
      window.removeEventListener("resize", build);
    };
  }, []);

  const text = onLight ? "text-ink" : "text-white";
  const subtle = onLight ? "text-ink/55 hover:text-ink" : "text-white/55 hover:text-white";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{ height: NAV_H }}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5 md:grid md:grid-cols-3 md:px-10">
        {/* Left links (desktop) */}
        <nav className="hidden items-center gap-9 md:flex">
          {LEFT_LINKS.map((l) => (
            <NavLink key={l.href} href={l.href} label={t.nav[l.key]} className={subtle} />
          ))}
        </nav>

        {/* Center logo */}
        <a
          href="/"
          aria-label="Kramskoy Visuals home"
          className={`flex items-center justify-self-start md:justify-self-center ${text} transition-colors duration-500`}
        >
          <Logo />
        </a>

        {/* Right links + language (desktop) */}
        <nav className="hidden items-center justify-end gap-9 md:flex">
          {RIGHT_LINKS.map((l) => (
            <NavLink key={l.href} href={l.href} label={t.nav[l.key]} className={subtle} />
          ))}
          <LanguageToggle className={text} />
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? t.nav.close : t.nav.menu}
          aria-expanded={menuOpen}
          className={`md:hidden ${text} transition-colors duration-500`}
        >
          <span className="block text-[13px] font-medium uppercase tracking-[0.18em]">
            {menuOpen ? t.nav.close : t.nav.menu}
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 grid gap-1 rounded-2xl border border-white/10 bg-ink-soft/95 p-4 backdrop-blur-md md:hidden"
          >
            {[...LEFT_LINKS, ...RIGHT_LINKS].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {t.nav[l.key]}
              </a>
            ))}
            <div className="px-3 pt-2">
              <LanguageToggle className="text-white" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  label,
  href,
  className,
}: {
  label: string;
  href: string;
  className: string;
}) {
  return (
    <a
      href={href}
      className={`group relative text-[13px] font-medium tracking-tight transition-colors duration-300 ${className}`}
    >
      {label}
      <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

// Brand mark (KV) on its dark tile reads on both dark and white sections;
// the wordmark underneath uses currentColor so it flips with the nav theme.
function Logo() {
  return (
    <span className="flex flex-col items-center gap-1">
      <span className="block h-7 w-7 overflow-hidden rounded-md ring-1 ring-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/kv-mark.png" alt="Kramskoy Visuals" className="h-full w-full object-cover" />
      </span>
      <span className="font-logo text-[8px] font-bold uppercase leading-none tracking-[0.2em]">
        Kramskoy Visuals
      </span>
    </span>
  );
}
