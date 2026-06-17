"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useI18n } from "../i18n/I18nProvider";

// Which legal document to render. Each key maps to t.legal[doc] in dictionaries.
type Doc = "privacy" | "terms" | "cookies";

/**
 * Renders the tiny markdown subset used in legal bodies:
 *   [label](href)  → link   **word** → bold
 * Anything else passes through as plain text. Kept intentionally small — this
 * is for first-party copy in the dictionary, not arbitrary user input.
 */
function renderRich(text: string): React.ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1]) {
      nodes.push(
        <a key={key++} href={m[2]} className="text-accent hover:underline">
          {m[1]}
        </a>,
      );
    } else {
      nodes.push(
        <strong key={key++} className="font-semibold text-white/80">
          {m[3]}
        </strong>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function LegalDoc({ doc }: { doc: Doc }) {
  const { t } = useI18n();
  const page = t.legal[doc];

  return (
    <>
      <Navbar />
      <main
        data-nav-bg="dark"
        className="relative min-h-[100dvh] w-full bg-ink px-5 pb-32 pt-40 md:px-10 md:pt-56"
      >
        <div className="mx-auto max-w-3xl">
          <a href="/" className="text-sm text-white/50 transition-colors hover:text-white">
            {t.legal.backHome}
          </a>
          <h1 className="mt-8 font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] text-white md:text-7xl">
            {page.title}
          </h1>
          <p className="mt-4 text-sm text-white/40">
            {t.legal.lastUpdated} {t.legal.updated}
          </p>
          <div className="mt-12 space-y-10">
            <p className="text-[15px] leading-relaxed text-white/70">{renderRich(page.intro)}</p>
            {page.sections.map((section, i) => (
              <section key={i} className="space-y-3">
                <h2 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                  {section.heading}
                </h2>
                <div className="space-y-3 text-[15px] leading-relaxed text-white/60">
                  <p>{renderRich(section.body)}</p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
