import { Card } from "@/components/ui/card";

const teachings = [
  {
    title: "Faith and Devotion",
    quote: "Have unwavering faith in the divine and surrender completely to the will of God.",
    description: "True devotion comes from the heart and transforms one's entire being."
  },
  {
    title: "Compassion for All",
    quote: "See the divine in every living being and treat all with love and respect.",
    description: "Compassion is the highest virtue and the path to spiritual enlightenment."
  },
  {
    title: "Inner Peace",
    quote: "Seek peace within yourself, for the kingdom of God resides in your heart.",
    description: "Meditation and self-reflection lead to lasting inner tranquility."
  },
  {
    title: "Selfless Service",
    quote: "Serve others without expectation, for service to humanity is service to God.",
    description: "True seva (service) purifies the soul and brings divine grace."
  }
];

export const Teachings = () => {
  return (
    <section className="py-20 px-4 bg-gradient-peaceful">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Sacred Teachings
          </h2>
          <div className="w-24 h-1 bg-gradient-divine mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wisdom that illuminates the path to spiritual liberation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {teachings.map((teaching, index) => (
            <Card 
              key={index}
              className="p-6 bg-card hover:shadow-divine transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold mb-3 text-primary">
                {teaching.title}
              </h3>
              <blockquote className="text-foreground italic mb-4 pl-4 border-l-4 border-gold">
                "{teaching.quote}"
              </blockquote>
              <p className="text-sm text-muted-foreground">
                {teaching.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
