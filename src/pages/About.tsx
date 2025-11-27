import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const About = () => {
  // Image slider state
  const images = ["/images/1.jpeg", "/images/2.jpeg"];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* ---- HEADER ---- */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              स्वामी समर्थ महाराजांबद्दल
            </h1>
            <div className="w-24 h-1 bg-gradient-divine mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              दिव्य अवतार आणि आध्यात्मिक गुरु ज्यांनी असंख्य भक्तांना आशीर्वाद दिला
            </p>
          </div>

          {/* ---- TWO CARDS ---- */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 bg-card hover:shadow-divine transition-all duration-300 animate-scale-in">
              <h2 className="text-2xl font-semibold mb-4 text-primary">दिव्य जीवन</h2>
              <p className="text-foreground/90 leading-relaxed">
                श्री स्वामी समर्थ महाराज, ज्यांना अक्कलकोट स्वामी समर्थ म्हणूनही ओळखले जाते...
              </p>
            </Card>

            <Card className="p-8 bg-card hover:shadow-divine transition-all duration-300 animate-scale-in">
              <h2 className="text-2xl font-semibold mb-4 text-primary">आध्यात्मिक वारसा</h2>
              <p className="text-foreground/90 leading-relaxed">
                स्वामी समर्थांची शिकवण भक्ती, शरणागती आणि परमेश्वरावरील विश्वासावर भर देते...
              </p>
            </Card>
          </div>

          {/* ---- DIVINE ATTRIBUTES ---- */}
          <Card className="p-8 md:p-12 bg-gradient-peaceful border-primary/20 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
              दिव्य गुणधर्म
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🙏</div>
                <h3 className="font-semibold mb-2 text-foreground">करुणा</h3>
                <p className="text-sm text-muted-foreground">सर्व प्राण्यांवर अमर्याद प्रेम</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">✨</div>
                <h3 className="font-semibold mb-2 text-foreground">चमत्कार</h3>
                <p className="text-sm text-muted-foreground">भक्तांना मदत करण्यासाठी दिव्य शक्ती</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📿</div>
                <h3 className="font-semibold mb-2 text-foreground">ज्ञान</h3>
                <p className="text-sm text-muted-foreground">शाश्वत आध्यात्मिक मार्गदर्शन</p>
              </div>
            </div>
          </Card>

          {/*  -----------------------------------------------  
               ⭐ ADDED SECTION: PHOTO SLIDER + VIDEO ⭐
              ----------------------------------------------- */}
          <Card className="p-8 md:p-12 bg-card mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
              फोटो आणि व्हिडिओ
            </h2>

            {/* IMAGE SLIDER */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-center mb-4">बाल संस्कार फोटो गॅलरी</h3>

              <div className="relative flex justify-center">
                <img
                  src={images[currentImage]}
                  className="w-full max-w-md rounded-lg shadow-lg"
                />

                {/* Prev */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
                >
                  ◀
                </button>

                {/* Next */}
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
                >
                  ▶
                </button>
              </div>
            </div>

            {/* VIDEO PLAYER */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-center mb-4">व्हिडिओ</h3>

              <video controls className="w-full max-w-2xl mx-auto rounded-lg shadow-lg">
                <source src="/video/1.mp4" type="video/mp4" />
              </video>
               <h3 className="text-xl font-semibold text-center mb-4">                                   </h3>
               <video controls className="w-full max-w-2xl mx-auto rounded-lg shadow-lg">
                <source src="/video/2.mp4" type="video/mp4" />
              </video>
                <h3 className="text-xl font-semibold text-center mb-4">     </h3>
            <video controls className="w-full max-w-2xl mx-auto rounded-lg shadow-lg">
                <source src="/video/3.mp4" type="video/mp4" />
              </video>
               <h3 className="text-xl font-semibold text-center mb-4">                                   </h3>
               <video controls className="w-full max-w-2xl mx-auto rounded-lg shadow-lg">
                <source src="/video/5.mp4" type="video/mp4" />
              </video>
            </div>
          </Card>
          {/* ------------------------- END SECTION ------------------------- */}

          {/* ---- WEBSITE USAGE SECTION ---- */}
          <Card className="p-8 md:p-12 bg-card">
            <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
              या वेबसाइटचा वापर कसा करावा
            </h2>
            {/* your original code continues… */}
          </Card>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
