import { siteUrl } from "@/lib/seo";
import type { Explanation } from "@/lib/calculators";

export function buildWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calc Suite",
    url: siteUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description: "Finance, health, math, and everyday calculators in one place.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function buildFaqSchema(calculatorName: string, explanation: Explanation) {
  const answerParts = [explanation.summary, `Formula: ${explanation.formula}`];
  if (explanation.notes) answerParts.push(explanation.notes);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How is ${calculatorName} calculated?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: answerParts.join(" "),
        },
      },
    ],
  };
}
