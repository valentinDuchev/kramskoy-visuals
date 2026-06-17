import type { Metadata } from "next";
import { LegalDoc } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy | Kramskoy Visuals",
};

export default function CookiesPage() {
  return <LegalDoc doc="cookies" />;
}
