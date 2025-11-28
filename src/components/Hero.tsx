import heroImage from "@/assets/hero-divine.jpg";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            श्री स्वामी समर्थ 
          </h1>
          <h2 className="text-3xl md:text-5xl font-semibold mb-8 bg-gradient-divine bg-clip-text text-transparent">
            Shree Swami Samarth 
          </h2>
          
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-gradient-divine text-white hover:opacity-90 transition-all shadow-divine text-lg px-8 py-6"
            >
              Learn More
            </Button>
            
           
          </div>
        </div>
      </div>
    </section>
  );
};
