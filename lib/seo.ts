import type { Metadata } from "next";

export const siteUrl = "https://my-app-psi-eight-50.vercel.app";

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Calc Suite",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
