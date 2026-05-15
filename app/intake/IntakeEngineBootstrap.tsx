"use client";

import { useEffect } from "react";

type IntakeEngineModule = {
  bootstrapDivorcioInterview?: () => void;
  teardownDivorcioInterview?: () => void;
};

/**
 * ES module top-level runs only once per tab; Next client navigations remount /intake without
 * re-executing engine.js. Bootstrap from useEffect after the intake DOM is committed.
 */
export default function IntakeEngineBootstrap() {
  useEffect(() => {
    let cancelled = false;

    // Non-literal specifier: `moduleResolution: "bundler"` won't apply `declare module "/…"`
    // to root-relative imports, but the emitted URL must stay `/intake/engine.js`.
    const engineUrl = "/intake/engine.js";
    void import(/* webpackIgnore: true */ engineUrl).then((mod: IntakeEngineModule) => {
      if (!cancelled) mod.bootstrapDivorcioInterview?.();
    });

    return () => {
      cancelled = true;
      void import(/* webpackIgnore: true */ engineUrl).then((mod: IntakeEngineModule) => {
        mod.teardownDivorcioInterview?.();
      });
    };
  }, []);

  return null;
}
