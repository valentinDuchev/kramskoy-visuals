import {
  YoutubeLogo,
  InstagramLogo,
  WhatsappLogo,
  EnvelopeSimple,
  type Icon,
} from "@phosphor-icons/react";

// Single source of truth for every place Ivan can be reached — the footer
// social rows, the floating rail, and the contact section all read this.
export const EMAIL = "kramskoy.visuals@gmail.com";
// wa.me wants the number bare — no +, spaces or dashes.
const WHATSAPP = "32496468041";

export type Social = {
  label: string;
  // Muted supporting detail shown beside the label in the footer rows.
  handle: string;
  href: string;
  Icon: Icon;
  // Off-site links open in a new tab; mailto: stays in place.
  external: boolean;
};

export const SOCIALS: Social[] = [
  {
    label: "Instagram",
    handle: "@kramskoy.visuals",
    href: "https://www.instagram.com/kramskoy.visuals/",
    Icon: InstagramLogo,
    external: true,
  },
  {
    label: "YouTube",
    handle: "@ivan.kramskoy",
    href: "https://www.youtube.com/@ivan.kramskoy",
    Icon: YoutubeLogo,
    external: true,
  },
  {
    label: "WhatsApp",
    handle: "+32 496 46 80 41",
    href: `https://wa.me/${WHATSAPP}`,
    Icon: WhatsappLogo,
    external: true,
  },
  {
    label: "Email",
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    Icon: EnvelopeSimple,
    external: false,
  },
];
