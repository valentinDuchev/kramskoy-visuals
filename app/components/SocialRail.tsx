"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SOCIALS } from "../socials";

// A floating rail of social links pinned to the right edge, present the whole
// scroll — hero included. The one place it steps aside is directly over the
// footer, whose big social rows are the same links, so floating icons on top
// of them would read as a glitch. Right-edge + vertically centred keeps it
// clear of the bottom-anchored cookie banner on mobile.
export function SocialRail() {
  const [overFooter, setOverFooter] = useState(false);

  useEffect(() => {
    const footer = document.querySelector<HTMLElement>("footer");
    if (!footer) return;

    const obs = new IntersectionObserver(([e]) => setOverFooter(e.isIntersecting), {
      threshold: 0,
    });
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {!overFooter && (
        // Centering lives in the Tailwind -translate-y-1/2 transform, so the
        // motion element animates opacity only — animating x/y here would set an
        // inline transform that overrides the centering and knock it off-axis.
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Social links"
          className="fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2 md:right-5 md:gap-2.5"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
