"use client";

import { useEffect, useState } from "react";

type StringRecord = Record<string, string>;

function storageKeyFor(id: string) {
  return `calc:${id}`;
}

/**
 * useState-like hook for a group of string fields that:
 * - restores the last values a user entered for this calculator, from
 *   localStorage (so returning visitors don't retype everything), and
 * - hydrates from the current URL's search params on top of that, so a
 *   shared link with ?principal=1000&rate=5 always wins and pre-fills
 *   a calculator's inputs.
 */
export function useShareableParams<T extends StringRecord>(id: string, defaults: T) {
  const [state, setState] = useState<T>(defaults);

  useEffect(() => {
    const next = { ...defaults };
    let changed = false;

    try {
      const stored = window.localStorage.getItem(storageKeyFor(id));
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<T>;
        for (const key of Object.keys(defaults) as (keyof T)[]) {
          if (typeof parsed[key] === "string") {
            next[key] = parsed[key] as T[keyof T];
            changed = true;
          }
        }
      }
    } catch {
      // Corrupt or inaccessible storage (e.g. private browsing) — ignore.
    }

    const params = new URLSearchParams(window.location.search);
    for (const key of Object.keys(defaults) as (keyof T)[]) {
      const fromUrl = params.get(key as string);
      if (fromUrl !== null) {
        next[key] = fromUrl as T[keyof T];
        changed = true;
      }
    }

    // One-time hydration from browser-only APIs (localStorage, the URL)
    // that aren't available during SSR, so this can't be a lazy useState
    // initializer without causing a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (changed) setState(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKeyFor(id), JSON.stringify(state));
    } catch {
      // Storage disabled/full — sharing and calculating still work fine.
    }
  }, [id, state]);

  function update(partial: Partial<T>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  return [state, update] as const;
}
