"use client";

import { YoutubeLogo, InstagramLogo, FilmSlate, ArrowUp } from "@phosphor-icons/react";
import { useI18n } from "../i18n/I18nProvider";

// Placeholder handles/links — swap for Ivan's real accounts.
// (Phosphor has no Vimeo logo, so Vimeo uses a generic film glyph.)
const SOCIAL = [
  { label: "YouTube", href: "https://youtube.com/@kramskoyvisuals", Icon: YoutubeLogo },
  { label: "Instagram", href: "https://instagram.com/kramskoyvisuals", Icon: InstagramLogo },
  { label: "Vimeo", href: "https://vimeo.com/kramskoyvisuals", Icon: FilmSlate },
];

// Hrefs line up by index with t.footer.nav / t.footer.legal.
const NAV_HREFS = ["/", "/#work", "/#services", "/#story", "/#contact"];
const LEGAL_HREFS = ["/privacy", "/terms", "/cookies"];

export function Footer() {
  const { t } = useI18n();
  return (
    <footer data-nav-bg="dark" className="relative w-full bg-ink px-5 pb-10 pt-24 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        {/* Wordmark + back to top */}
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/10 pb-12">
          <a
            href="/"
            className="font-display text-5xl font-extrabold leading-[0.85] tracking-[-0.03em] text-white md:text-8xl"
          >
            Kramskoy
            <br />
            Visuals
          </a>
          <a
            href="/#top"
            className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            {t.footer.backToTop}
            <ArrowUp weight="bold" className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          </a>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-12 md:grid-cols-4">
          <FooterCol title={t.footer.cols.navigate}>
            {NAV_HREFS.map((href, i) => (
              <FooterLink key={href} href={href} label={t.footer.nav[i]} />
            ))}
          </FooterCol>

          <FooterCol title={t.footer.cols.elsewhere}>
            {SOCIAL.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-white"
              >
                <Icon weight="fill" className="h-4 w-4" />
                {label}
              </a>
            ))}
          </FooterCol>

          <FooterCol title={t.footer.cols.contact}>
            <a
              href="mailto:hello@kramskoyvisuals.com"
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              hello@kramskoyvisuals.com
            </a>
            <span className="text-sm text-white/40">{t.footer.travel}</span>
          </FooterCol>

          <FooterCol title={t.footer.cols.legal}>
            {LEGAL_HREFS.map((href, i) => (
              <FooterLink key={href} href={href} label={t.footer.legal[i]} />
            ))}
          </FooterCol>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-[12px] uppercase tracking-[0.14em] text-white/40">
          <span>© 2026 Kramskoy Visuals</span>
          <span>{t.common.rights}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent/70">
        {title}
      </h3>
      <div className="grid gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="text-sm text-white/55 transition-colors hover:text-white">
      {label}
    </a>
  );
}
