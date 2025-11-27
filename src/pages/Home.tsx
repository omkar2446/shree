import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Teachings } from "@/components/Teachings";
import { Prayer } from "@/components/Prayer";
import { Footer } from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Teachings />
      <Prayer />
      <Footer />
    </div>
  );
};

export default Home;
