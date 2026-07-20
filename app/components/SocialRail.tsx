"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SOCIALS } from "../socials";

// A floating rail of social links that reveals itself for the middle of the
// page: hidden while the hero fills the screen (so it never sits on the
// opening footage), and hidden again once the footer scrolls in (whose big
// social rows would otherwise duplicate it). Desktop = vertical rail pinned
// right; mobile = a centered pill along the bottom.
export function SocialRail() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("main > :first-child");
    const footer = document.querySelector<HTMLElement>("footer");
    if (!hero || !footer) return;

    // Show only when BOTH bookends are out of view. Each observer just records
    // its element's state; a shared resolver flips the rail from the two.
    let heroOut = false;
    let footerOut = true;
    const resolve = () => setVisible(heroOut && footerOut);

    const heroObs = new IntersectionObserver(
      ([e]) => {
        heroOut = !e.isIntersecting;
        resolve();
      },
      // A little breathing room so the rail doesn't flash on right at the seam.
      { threshold: 0, rootMargin: "-15% 0px 0px 0px" },
    );
    const footerObs = new IntersectionObserver(
      ([e]) => {
        footerOut = !e.isIntersecting;
        resolve();
      },
      { threshold: 0 },
    );

    heroObs.observe(hero);
    footerObs.observe(footer);
    return () => {
      heroObs.disconnect();
      footerObs.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        // Centering lives in Tailwind transforms (-translate-*), so the motion
        // element animates opacity only — animating x/y here would set an inline
        // transform that overrides the centering and knock the rail off-axis.
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Social links"
          // Desktop-only: on mobile the cookie banner owns the bottom-center and
          // the footer's big social rows already cover reach; a floating rail
          // there would collide and crowd a small screen.
          className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 md:flex"
        >
          {SOCIALS.map(({ label, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              aria-label={label}
              title={label}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full
                bg-ink/60 text-white/70 ring-1 ring-white/10 backdrop-blur-md transition-all
                hover:scale-110 hover:bg-accent hover:text-ink"
            >
              <Icon weight="fill" className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
