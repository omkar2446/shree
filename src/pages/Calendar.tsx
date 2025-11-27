import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DarshanCalendar } from "@/components/DarshanCalendar";

const Calendar = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-8">
        <DarshanCalendar />
      </div>
      <Footer />
    </div>
  );
};

export default Calendar;
