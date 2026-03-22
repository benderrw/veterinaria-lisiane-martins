import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { FaqSection } from "@/sections/faq/FaqSection";
import { FinalCta } from "@/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <About />
        <Contact />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
