import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kramskoy Visuals",
    short_name: "Kramskoy",
    description: "Cinematic videography and photography.",
    start_url: "/",
    display: "standalone",
    background_color: "#070a10",
    theme_color: "#070a10",
    icons: [
      { src: "/kv-mark.png", sizes: "160x160", type: "image/png" },
    ],
  };
}
