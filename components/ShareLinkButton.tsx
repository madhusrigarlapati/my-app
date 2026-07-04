"use client";

import { useState } from "react";

export default function ShareLinkButton({ params }: { params: Record<string, string> }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    const url = `${window.location.origin}${window.location.pathname}?${new URLSearchParams(
      params
    ).toString()}`;

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link:", url);
      return;
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-fit items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-100 dark:focus-visible:ring-neutral-100"
    >
      {copied ? "Copied!" : "Copy shareable link"}
    </button>
  );
}
