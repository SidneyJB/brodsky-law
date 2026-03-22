import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "4rem" }}>{children}</main>
      <Footer />
    </>
  );
}
