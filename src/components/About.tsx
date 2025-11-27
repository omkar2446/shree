import { Card } from "@/components/ui/card";

export const About = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            About Swami Samarth
          </h2>
          <div className="w-24 h-1 bg-gradient-divine mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A divine incarnation and spiritual master who blessed countless devotees
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 bg-card hover:shadow-divine transition-all duration-300 animate-scale-in">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Divine Life</h3>
            <p className="text-foreground/90 leading-relaxed">
              Shree Swami Samarth Maharaj, also known as Akkalkot Swami Samarth, is believed to be 
              an incarnation of Lord Dattatreya. His life was marked by miraculous deeds and divine 
              compassion. He spent his final years in Akkalkot, Maharashtra, blessing devotees and 
              spreading spiritual wisdom.
            </p>
          </Card>

          <Card className="p-8 bg-card hover:shadow-divine transition-all duration-300 animate-scale-in">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Spiritual Legacy</h3>
            <p className="text-foreground/90 leading-relaxed">
              Swami Samarth's teachings emphasize devotion, surrender, and faith in the divine. 
              He performed countless miracles, healed the sick, and transformed lives through his 
              divine presence. His grace continues to bless millions of devotees worldwide.
            </p>
          </Card>
        </div>

        <Card className="p-8 md:p-12 bg-gradient-peaceful border-primary/20">
          <h3 className="text-2xl font-semibold mb-6 text-center text-primary">
            Divine Attributes
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🙏</div>
              <h4 className="font-semibold mb-2 text-foreground">Compassion</h4>
              <p className="text-sm text-muted-foreground">Boundless love for all beings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">✨</div>
              <h4 className="font-semibold mb-2 text-foreground">Miracles</h4>
              <p className="text-sm text-muted-foreground">Divine powers to help devotees</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📿</div>
              <h4 className="font-semibold mb-2 text-foreground">Wisdom</h4>
              <p className="text-sm text-muted-foreground">Eternal spiritual guidance</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};