import { TopNav } from "./components/TopNav";
import { Hero } from "./components/Hero";
import { ModelGrid } from "./components/ModelGrid";
import { SpecBand } from "./components/SpecBand";
import { CtaBand } from "./components/CtaBand";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <TopNav />
      <main className="flex-1">
        <Hero />
        <ModelGrid />
        <SpecBand />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
