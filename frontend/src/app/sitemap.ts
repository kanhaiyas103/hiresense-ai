import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/chat", "/architecture", "/about"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-07-04"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
