import { Card } from "@/components/ui/card";

export const Prayer = () => {
  return (
    <section className="py-16 px-4 md:py-20">
      <div className="container mx-auto max-w-3xl">

        {/* Heading */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-wide">
            पवित्र मंत्र
          </h2>
          <p className="mt-3 text-muted-foreground text-lg md:text-xl">
            Sacred Mantra • Divine Chant
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-divine mx-auto rounded-full"></div>
        </div>

        {/* Main Mantra Card */}
        <Card className="p-8 md:p-12 bg-gradient-sacred text-white text-center shadow-divine rounded-3xl">
          <div className="text-6xl md:text-7xl mb-6 animate-pulse-slow">🕉️</div>

          <h3 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-wide">
            श्री स्वामी समर्थ
          </h3>

          <p className="text-xl md:text-2xl font-medium opacity-95 mb-6">
            Shree Swami Samarth
          </p>

         
        </Card>

        {/* Daily Practice Section */}
        <div className="mt-12 text-center">
          <h4 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
            Daily Practice
          </h4>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Recite the mantra <span className="font-semibold text-primary">108 times</span> 
            every morning or evening.  
            Stay focused, calm, and connect with Swami Samarth’s divine energy.
          </p>
        </div>

      </div>
    </section>
  );
};
