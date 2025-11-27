import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { DarshanCalendar } from "@/components/DarshanCalendar";
import { Teachings } from "@/components/Teachings";
import { Books } from "@/components/Books";
import { Prayer } from "@/components/Prayer";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <DarshanCalendar />
      <Teachings />
      <Books />
      <Prayer />
      <Footer />
    </div>
  );
};

export default Index;
