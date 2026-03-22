import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main
        style={{
          paddingTop: "var(--site-header-offset)",
          background: "var(--color-canvas-soft)",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
