import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Book {
  title: string;
  description: string;
  author: string;
  pages: number;
  pdf: string;
}

const books: Book[] = [
  {
    title: "Shree Gurucharitra",
    description: "The sacred biography of Shree Nrusimha Saraswati and Shree Narasimha Saraswati",
    author: "Saraswati Gangadhar",
    pages: 256,
    pdf: "/pdfs/gurucharitra.pdf"
  },
  {
    title: "Life and Teachings of Swami Samarth",
    description: "Complete guide to the divine life and spiritual wisdom of Akkalkot Swami Samarth",
    author: "Devotee Publications",
    pages: 184,
    pdf: "/pdfs/swami-samarth-life.pdf"
  },
  {
    title: "Miracles of Swami Samarth",
    description: "Collection of miraculous incidents and divine experiences of devotees",
    author: "Swami Samarth Trust",
    pages: 312,
    pdf: "/pdfs/miracles.pdf"
  },
  {
    title: "Daily Prayer Book",
    description: "Essential prayers, aartis, and mantras for daily worship of Swami Samarth",
    author: "Spiritual Press",
    pages: 128,
    pdf: "/pdfs/daily-prayer.pdf"
  },
  {
    title: "Philosophy of Dattatreya",
    description: "Deep insights into the Dattatreya tradition and spiritual practices",
    author: "Ved Prakashan",
    pages: 420,
    pdf: "/pdfs/philosophy-dattatreya.pdf"
  },
  {
    title: "Swami Samarth Stotra Sangrah",
    description: "Complete collection of hymns, stotras, and devotional songs",
    author: "Bhakti Publications",
    pages: 96,
    pdf: "/pdfs/stotra-sangrah.pdf"
  }
];

export const Books = () => {
  const handleDownload = (pdfUrl: string) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfUrl.split("/").pop() || "book.pdf";
    link.click();
  };

  return (
    <section className="py-12 px-3 md:px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-foreground">
            पवित्र पुस्तके आणि साहित्य
          </h2>

          <div className="w-20 md:w-24 h-1 bg-gradient-divine mx-auto mb-4"></div>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            स्वामी समर्थांबद्दलची आध्यात्मिक पुस्तके आणि साहित्य डाउनलोड करा
          </p>
        </div>

        {/* Mobile Friendly Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {books.map((book, index) => (
            <Card 
              key={index} 
              className="p-4 md:p-6 bg-card hover:shadow-divine transition-all duration-300 animate-scale-in flex flex-col rounded-xl"
            >
              <div className="flex-grow">
                <div className="text-4xl mb-3 text-center">📖</div>

                <h3 className="text-lg md:text-xl font-semibold mb-2 text-primary text-center md:text-left">
                  {book.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {book.description}
                </p>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Pages:</strong> {book.pages}</p>
                </div>
              </div>

              <Button
                onClick={() => handleDownload(book.pdf)}
                className="w-full mt-4 py-5 text-base rounded-xl bg-primary hover:bg-primary/90"
              >
                <Download className="mr-2 h-5 w-5" />
                PDF डाउनलोड करा
              </Button>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
