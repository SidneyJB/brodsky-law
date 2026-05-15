import type { Metadata } from "next";
import Script from "next/script";

const zapierHookFromEnv = process.env.NEXT_PUBLIC_DIVORCIO_ZAPIER_HOOK_URL?.trim();

export const metadata: Metadata = {
  title: "Divorce Questionnaire",
  description:
    "Complete the uncontested divorce intake questionnaire for Brodsky Law PLLC. Your answers are reviewed by an attorney.",
};

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {zapierHookFromEnv ? (
        <Script id="divorcio-zapier-hook-url" strategy="beforeInteractive">
          {`window.__DIVORCIO_ZAPIER_HOOK_URL__=${JSON.stringify(zapierHookFromEnv)}`}
        </Script>
      ) : null}
      <Script id="divorcio-confirmation-path" strategy="beforeInteractive">
        {`window.__DIVORCIO_CONFIRMATION_PATH__='/intake/confirmation';`}
      </Script>
      {children}
    </>
  );
}
