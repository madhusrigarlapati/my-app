"use client";

import { useEffect, useState } from "react";

type StringRecord = Record<string, string>;

/**
 * useState-like hook for a group of string fields that also hydrates from
 * the current URL's search params on mount, so a shared link with
 * ?principal=1000&rate=5 pre-fills a calculator's inputs.
 */
export function useShareableParams<T extends StringRecord>(defaults: T) {
  const [state, setState] = useState<T>(defaults);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let changed = false;
    const next = { ...defaults };
    for (const key of Object.keys(defaults) as (keyof T)[]) {
      const fromUrl = params.get(key as string);
      if (fromUrl !== null) {
        next[key] = fromUrl as T[keyof T];
        changed = true;
      }
    }
    // One-time hydration from a browser-only API (the URL) that isn't
    // available during SSR, so it can't be a lazy useState initializer
    // without causing a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (changed) setState(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(partial: Partial<T>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  return [state, update] as const;
}
