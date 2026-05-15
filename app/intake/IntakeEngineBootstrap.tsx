"use client";

import { useEffect } from "react";

/**
 * ES module top-level runs only once per tab; Next client navigations remount /intake without
 * re-executing engine.js. Bootstrap from useEffect after the intake DOM is committed.
 */
export default function IntakeEngineBootstrap() {
  useEffect(() => {
    let cancelled = false;

    void import(/* webpackIgnore: true */ "/intake/engine.js").then((mod) => {
      if (!cancelled) mod.bootstrapDivorcioInterview?.();
    });

    return () => {
      cancelled = true;
      void import(/* webpackIgnore: true */ "/intake/engine.js").then((mod) => {
        mod.teardownDivorcioInterview?.();
      });
    };
  }, []);

  return null;
}
