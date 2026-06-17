"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, type Dict, type Locale } from "./dictionaries";

type Ctx = { locale: Locale; setLocale: (l: Locale) => void; t: Dict };

const I18nContext = createContext<Ctx | null>(null);
const KEY = "kv-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  // Default to English for SSR + first client render (avoids hydration
  // mismatch); auto-detect / restore the real choice after mount.
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    let next: Locale = "en";
    try {
      const stored = localStorage.getItem(KEY);
      if (stored === "en" || stored === "bg") next = stored;
      else if (navigator.language?.toLowerCase().startsWith("bg")) next = "bg";
    } catch {
      // ignore — keep English
    }
    if (next !== "en") setLocaleState(next);
    document.documentElement.lang = next;
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
    document.documentElement.lang = l;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/** EN / BG switch for the navbar. Inherits color from its parent. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <div
      aria-label={t.nav.language}
      className={`flex items-center gap-1 text-[12px] font-semibold tracking-wide ${className}`}
    >
      {(["en", "bg"] as const).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1 opacity-30">/</span>}
          <button
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={locale === l}
            className={`uppercase transition-opacity ${
              locale === l ? "opacity-100" : "opacity-40 hover:opacity-70"
            }`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
