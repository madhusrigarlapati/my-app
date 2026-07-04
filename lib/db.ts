import { neon } from "@neondatabase/serverless";

// Lazy on purpose: Next.js imports every route module in a worker during
// its build-time "collect page data" pass, even for routes marked
// force-dynamic. Throwing at import time fails that pass in environments
// where DATABASE_URL isn't propagated to those workers. Deferring the
// check to first actual call keeps the check without breaking the build.
export function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(process.env.DATABASE_URL);
}
