import type { Metadata } from "next";
import { LegalDoc } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Kramskoy Visuals",
};

export default function PrivacyPage() {
  return <LegalDoc doc="privacy" />;
}
