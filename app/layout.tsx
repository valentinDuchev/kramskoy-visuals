import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora, Montserrat, Oswald } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "./i18n/I18nProvider";
import { CookieBanner } from "./components/CookieBanner";

// Absolute base for canonical + OG/Twitter image URLs. Netlify injects `URL`
// (the live site address) at build; falls back to localhost in dev. Override
// with NEXT_PUBLIC_SITE_URL once the custom domain is live.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for the big kinetic name + section headlines.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

// Matches the logo wordmark — used for the brand lockup in the navbar.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

// Condensed, cinematic display for the big kinetic craft words over the camera
// sequence. Includes Cyrillic so the Bulgarian words (КАДЪР, СВЕТЛИНА…) render.
const oswald = Oswald({
  variable: "--font-craft",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
});

const DESCRIPTION =
  "Kramskoy Visuals — cinematic videography and photography by Ivan. Brand films, documentaries, music videos, weddings, events, and portraits, shot, color-graded, and edited in-house. Based in Bulgaria, available for travel.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kramskoy Visuals — Videographer & Photographer",
    template: "%s | Kramskoy Visuals",
  },
  description: DESCRIPTION,
  applicationName: "Kramskoy Visuals",
  authors: [{ name: "Kramskoy Visuals" }],
  creator: "Kramskoy Visuals",
  publisher: "Kramskoy Visuals",
  category: "Videography & Photography",
  keywords: [
    // English
    "videography",
    "video production",
    "cinematography",
    "cinematic video",
    "videographer",
    "photography",
    "photographer",
    "portrait photography",
    "documentary",
    "documentaries",
    "documentary film",
    "brand films",
    "commercial video",
    "corporate video",
    "music videos",
    "wedding videography",
    "wedding film",
    "event videography",
    "color grading",
    "film director",
    "Bulgaria videographer",
    "Kramskoy Visuals",
    // Bulgarian
    "видеография",
    "видео заснемане",
    "видео продукция",
    "видеограф",
    "фотография",
    "фотограф",
    "портретна фотография",
    "документални филми",
    "бранд филми",
    "рекламно видео",
    "корпоративно видео",
    "музикални клипове",
    "сватбено видео",
    "сватбен филм",
    "заснемане на събития",
    "цветокорекция",
    "кинематография",
    "режисьор",
    "видеограф България",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "bg_BG",
    url: "/",
    siteName: "Kramskoy Visuals",
    title: "Kramskoy Visuals — Cinematic Videography & Photography",
    description: DESCRIPTION,
    images: [
      {
        url: "/hero_poster.jpg",
        width: 1920,
        height: 1080,
        alt: "Kramskoy Visuals — cinematic videography and photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kramskoy Visuals — Cinematic Videography & Photography",
    description: DESCRIPTION,
    images: ["/hero_poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#070a10",
  colorScheme: "dark",
};

// Structured data — helps search engines understand the business and can drive
// rich results. Mirrors the on-page content (services, area served, socials).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kramskoy Visuals",
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/hero_poster.jpg`,
  email: "hello@kramskoyvisuals.com",
  founder: { "@type": "Person", name: "Ivan" },
  areaServed: "Worldwide",
  knowsAbout: [
    "Videography",
    "Photography",
    "Documentary film",
    "Brand films",
    "Music videos",
    "Wedding videography",
    "Color grading",
    "Film direction",
  ],
  sameAs: [
    "https://youtube.com/@kramskoyvisuals",
    "https://instagram.com/kramskoyvisuals",
    "https://vimeo.com/kramskoyvisuals",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} ${montserrat.variable} ${oswald.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider>
          {children}
          <CookieBanner />
        </I18nProvider>
      </body>
    </html>
  );
}
