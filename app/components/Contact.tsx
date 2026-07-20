"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "@phosphor-icons/react";
import { useI18n } from "../i18n/I18nProvider";
import { en } from "../i18n/dictionaries";
// Single source of truth — the footer lists the same address in its social rows.
import { EMAIL } from "./Footer";

export function Contact() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  // typeIdx (not the label) so the selection survives a language switch.
  // company is a honeypot — kept empty by humans, ignored on the server.
  const [form, setForm] = useState({ name: "", email: "", typeIdx: 0, message: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: "name" | "email" | "message" | "company") => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!form.name.trim()) er.name = t.contact.errors.name;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = t.contact.errors.email;
    if (form.message.trim().length < 10) er.message = t.contact.errors.message;
    setErrors(er);
    if (Object.keys(er).length) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          // Send the English label so enquiries read consistently regardless
          // of the visitor's chosen language.
          type: en.contact.types[form.typeIdx],
          message: form.message.trim(),
          company: form.company,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setSent(true);
    } catch {
      setErrors({ form: t.contact.errors.send });
    } finally {
      setSending(false);
    }
  };

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
      id="contact"
      data-nav-bg="light"
      className="relative w-full bg-accent px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:gap-20">
        {/* Left — invitation */}
        <motion.div {...reveal}>
          <h2 className="font-display text-6xl font-extrabold leading-[0.9] tracking-[-0.03em] text-ink md:text-8xl">
            {t.contact.heading}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">{t.contact.intro}</p>

          <a
            href={`mailto:${EMAIL}`}
            className="mt-10 inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight text-ink transition-colors hover:text-white md:text-2xl"
          >
            {EMAIL}
            <ArrowUpRight weight="bold" className="h-5 w-5" />
          </a>

          <div className="mt-8 flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
            </span>
            {t.contact.booking}
          </div>
        </motion.div>

        {/* Right — form / confirmation */}
        <motion.div {...reveal}>
          {sent ? (
            <div className="flex h-full flex-col justify-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-white">
                <Check weight="bold" className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink">
                {t.contact.success.title.replace("{first}", form.name.split(" ")[0] || "")}
              </h3>
              <p className="mt-3 max-w-sm text-ink/60">{t.contact.success.body}</p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", typeIdx: 0, message: "", company: "" });
                }}
                className="mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ink/60 transition-colors hover:text-ink"
              >
                {t.contact.success.again}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-7">
              {/* Honeypot — hidden from users, catches naive bots. */}
              <div aria-hidden className="pointer-events-none absolute left-[-9999px] opacity-0">
                <label htmlFor="c-company">Company</label>
                <input
                  id="c-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={(e) => set("company")(e.target.value)}
                />
              </div>
              <Field
                id="c-name"
                label={t.contact.labels.name}
                value={form.name}
                onChange={set("name")}
                error={errors.name}
                placeholder="Ivan Kramskoy"
              />
              <Field
                id="c-email"
                label={t.contact.labels.email}
                type="email"
                value={form.email}
                onChange={set("email")}
                error={errors.email}
                placeholder="you@studio.com"
              />

              {/* Project type — pill selector */}
              <div className="grid gap-2.5">
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/70">
                  {t.contact.labels.type}
                </span>
                <div className="flex flex-wrap gap-2">
                  {t.contact.types.map((ty, idx) => {
                    const on = form.typeIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, typeIdx: idx }))}
                        aria-pressed={on}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                          on
                            ? "border-ink bg-ink text-white"
                            : "border-ink/20 text-ink/70 hover:border-ink/50"
                        }`}
                      >
                        {ty}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="grid gap-2.5">
                <label
                  htmlFor="c-message"
                  className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/70"
                >
                  {t.contact.labels.message}
                </label>
                <textarea
                  id="c-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                  placeholder={t.contact.placeholders.message}
                  className={`resize-none border-b bg-transparent py-3 text-ink outline-none transition-colors placeholder:text-ink/50 ${
                    errors.message ? "border-red-400" : "border-ink/25 focus:border-ink"
                  }`}
                />
                {errors.message && <p className="text-[12px] text-red-500">{errors.message}</p>}
              </div>

              <div className="mt-2 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-ink disabled:hover:text-white"
                >
                  {sending ? t.contact.sending : t.contact.send}
                  {!sending && (
                    <ArrowUpRight
                      weight="bold"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  )}
                </button>
                {errors.form && (
                  <p role="alert" className="text-[13px] font-medium text-red-600">
                    {errors.form}
                  </p>
                )}
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="grid gap-2.5">
      <label
        htmlFor={id}
        className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/70"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`border-b bg-transparent py-3 text-ink outline-none transition-colors placeholder:text-ink/50 ${
          error ? "border-red-400" : "border-ink/25 focus:border-ink"
        }`}
      />
      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
