import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Books } from "@/components/Books";

const BooksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-8">
        <Books />
      </div>
      <Footer />
    </div>
  );
};

export default BooksPage;
