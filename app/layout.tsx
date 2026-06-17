import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora, Montserrat, Oswald } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "./i18n/I18nProvider";
import { CookieBanner } from "./components/CookieBanner";

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

export const metadata: Metadata = {
  title: "Kramskoy Visuals | Videographer & Photographer",
  description:
    "Kramskoy Visuals. Cinematic videography and photography. Selected work, story, and contact.",
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
        <I18nProvider>
          {children}
          <CookieBanner />
        </I18nProvider>
      </body>
    </html>
  );
}
