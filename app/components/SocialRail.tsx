"use client";

import { useEffect, useState } from "react";
import { SOCIALS } from "../socials";

// A floating rail of social links pinned to the right edge. On phone it stays
// fixed the whole scroll, always visible. On desktop it steps aside over the
// footer, whose big social rows are the same links — floating icons on top of
// them there would read as a glitch. Right-edge + vertically centred keeps it
// clear of the bottom-anchored cookie banner.
export function SocialRail() {
  const [mounted, setMounted] = useState(false);
  const [overFooter, setOverFooter] = useState(false);

  useEffect(() => {
    // Fade in once after mount rather than popping in on first paint.
    setMounted(true);

    const footer = document.querySelector<HTMLElement>("footer");
    if (!footer) return;
    const obs = new IntersectionObserver(([e]) => setOverFooter(e.isIntersecting), {
      threshold: 0,
    });
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      aria-label="Social links"
      className={`fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2 transition-opacity duration-300 md:right-5 md:gap-2.5
        ${mounted ? "opacity-100" : "opacity-0"}
        ${overFooter ? "md:pointer-events-none md:opacity-0" : ""}`}
    >
      {SOCIALS.map(({ label, href, Icon, external }) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          aria-label={label}
          title={label}
          className="group inline-flex h-10 w-10 items-center justify-center rounded-full
            bg-ink/60 text-white/70 ring-1 ring-white/10 backdrop-blur-md transition-all
            hover:scale-110 hover:bg-accent hover:text-ink md:h-11 md:w-11"
        >
          <Icon weight="fill" className="h-[18px] w-[18px] md:h-5 md:w-5" />
        </a>
      ))}
    </div>
  );
}
