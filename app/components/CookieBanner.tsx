"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "../i18n/I18nProvider";

const KEY = "kv-cookie-consent";

export function CookieBanner() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      // localStorage unavailable — skip the banner rather than crash.
    }
  }, []);

  const choose = (value: "all" | "essential") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie notice"
          className="fixed inset-x-3 bottom-3 z-[120] mx-auto max-w-md rounded-2xl border border-white/10 bg-ink-soft/95 p-5 shadow-2xl backdrop-blur-md md:bottom-6 md:right-6 md:left-auto md:mx-0"
        >
          <p className="text-sm leading-relaxed text-white/70">
            {t.cookie.text.split("{policy}")[0]}
            <a href="/cookies" className="text-accent underline-offset-2 hover:underline">
              {t.cookie.policy}
            </a>
            {t.cookie.text.split("{policy}")[1]}
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => choose("all")}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
            >
              {t.cookie.accept}
            </button>
            <button
              type="button"
              onClick={() => choose("essential")}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white hover:text-white"
            >
              {t.cookie.essential}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
