"use client";

import { ArrowUpRight, ArrowUp } from "@phosphor-icons/react";
import { useI18n } from "../i18n/I18nProvider";
import { SOCIALS, EMAIL } from "../socials";

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

        {/* Social rows — sized off the wordmark above so the two read as one
            block. Each row is a full-width target, which is also what makes
            the WhatsApp and email rows comfortable to tap on a phone. */}
        <div className="pt-10">
          <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent/70">
            {t.footer.cols.elsewhere}
          </h2>
          {SOCIALS.map(({ label, handle, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              aria-label={`${label} — ${handle}`}
              className="group flex items-center justify-between gap-6 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.03] md:py-6"
            >
              <span className="flex min-w-0 items-center gap-4 md:gap-6">
                <Icon
                  weight="fill"
                  className="h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-accent md:h-6 md:w-6"
                />
                <span className="font-display text-2xl font-extrabold leading-none tracking-[-0.02em] text-white/70 transition-colors group-hover:text-white md:text-4xl">
                  {label}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-4">
                {/* Handles are supporting detail — dropped on the narrowest
                    screens rather than allowed to squeeze the platform name. */}
                <span className="hidden text-sm text-white/35 transition-colors group-hover:text-white/60 sm:block">
                  {handle}
                </span>
                <ArrowUpRight
                  weight="bold"
                  className="h-4 w-4 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white md:h-5 md:w-5"
                />
              </span>
            </a>
          ))}
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-12 md:grid-cols-3">
          <FooterCol title={t.footer.cols.navigate}>
            {NAV_HREFS.map((href, i) => (
              <FooterLink key={href} href={href} label={t.footer.nav[i]} />
            ))}
          </FooterCol>

          <FooterCol title={t.footer.cols.contact}>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              {EMAIL}
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
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-white/10 pt-8 text-[12px] uppercase tracking-[0.14em] text-white/40">
          <span>© 2026 Kramskoy Visuals</span>

          {/* Agency credit — dark logo sits on a light pill so it stays legible. */}
          <a
            href="https://invenios.dev"
            target="_blank"
            rel="noreferrer"
            aria-label="Powered by Invenios — invenios.dev"
            className="group order-last inline-flex w-full items-center justify-center gap-3 normal-case tracking-normal text-white/45 transition-colors hover:text-white/80 sm:order-none sm:w-auto"
          >
            <span className="text-[15px] font-medium md:text-base">Powered by</span>
            <span className="inline-flex items-center rounded-md bg-white px-2 py-1.5 transition-transform group-hover:-translate-y-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/invenios.png" alt="Invenios" className="h-auto w-[76px]" />
            </span>
          </a>

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
