/**
 * Runtime ES module copied to `public/intake/` (see scripts/sync-divorcio-to-public.mjs).
 * Not resolved by the bundler; loaded via dynamic import from the app origin.
 */
declare module "/intake/engine.js" {
  export function bootstrapDivorcioInterview(): void;
  export function teardownDivorcioInterview(): void;
}
