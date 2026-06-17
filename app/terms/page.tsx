import type { Metadata } from "next";
import { LegalDoc } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms | Kramskoy Visuals",
};

export default function TermsPage() {
  return <LegalDoc doc="terms" />;
}
