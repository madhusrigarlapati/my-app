import type { MetadataRoute } from "next";
import { domains } from "@/lib/calculators";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorUrls: MetadataRoute.Sitemap = domains.flatMap((domain) =>
    domain.calculators.map((calculator) => ({
      url: `${siteUrl}/${domain.slug}/${calculator.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }))
  );

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    ...calculatorUrls,
  ];
}
