import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Devotee {
  name: string;
  time: string;
}

interface DayData {
  day: number;
  devotees: Devotee[];
}

// ✔ 31 Days With Fixed Names (No Random)
const useCalendarData = () => {
  return useMemo(() => {
    return [
      { day: 1, devotees: [
        { name: "Ramesh Patil", time: "8:00 AM" },
        { name: "Sneha Deshmukh", time: "10:30 AM" },
        { name: "Amit Kumar", time: "6:00 PM" }
      ]},
      { day: 2, devotees: [
        { name: "Vijay Jadhav", time: "8:00 AM" },
        { name: "Meera Joshi", time: "10:30 AM" },
        { name: "Kavita Naik", time: "6:00 PM" }
      ]},
      { day: 3, devotees: [
        { name: "Ganesh Sawant", time: "8:00 AM" },
        { name: "Rekha Shinde", time: "10:30 AM" },
        { name: "Pooja Kadam", time: "6:00 PM" }
      ]},
      { day: 4, devotees: [
        { name: "Suresh Pawar", time: "8:00 AM" },
        { name: "Lata Wagh", time: "10:30 AM" },
        { name: "Sachin More", time: "6:00 PM" }
      ]},
      { day: 5, devotees: [
        { name: "Prakash Mehta", time: "8:00 AM" },
        { name: "Sunita Bhosale", time: "10:30 AM" },
        { name: "Archana Kale", time: "6:00 PM" }
      ]},
      { day: 6, devotees: [
        { name: "Rajesh Rao", time: "8:00 AM" },
        { name: "Anita Kulkarni", time: "10:30 AM" },
        { name: "Ganesh Hinge", time: "6:00 PM" }
      ]},
      { day: 7, devotees: [
        { name: "Rohan Shinde", time: "8:00 AM" },
        { name: "Tanuja Patil", time: "10:30 AM" },
        { name: "Nikhil Jagtap", time: "6:00 PM" }
      ]},
      { day: 8, devotees: [
        { name: "Umesh More", time: "8:00 AM" },
        { name: "Arohi Pawar", time: "10:30 AM" },
        { name: "Sahil Chavan", time: "6:00 PM" }
      ]},
      { day: 9, devotees: [
        { name: "Swapnil Gaikwad", time: "8:00 AM" },
        { name: "Payal Shinde", time: "10:30 AM" },
        { name: "Mahesh Chorage", time: "6:00 PM" }
      ]},
      { day: 10, devotees: [
        { name: "Kiran Deshmukh", time: "8:00 AM" },
        { name: "Rutuja Jadhav", time: "10:30 AM" },
        { name: "Yogesh Pawar", time: "6:00 PM" }
      ]},
      { day: 11, devotees: [
        { name: "Mandar Kulkarni", time: "8:00 AM" },
        { name: "Seema Pawar", time: "10:30 AM" },
        { name: "Amol Ghodke", time: "6:00 PM" }
      ]},
      { day: 12, devotees: [
        { name: "Shantanu Shinde", time: "8:00 AM" },
        { name: "Varsha Thorat", time: "10:30 AM" },
        { name: "Akshay Kamble", time: "6:00 PM" }
      ]},
      { day: 13, devotees: [
        { name: "Ravindra Kadam", time: "8:00 AM" },
        { name: "Minal Patil", time: "10:30 AM" },
        { name: "Aditya Joshi", time: "6:00 PM" }
      ]},
      { day: 14, devotees: [
        { name: "Dipak Pawar", time: "8:00 AM" },
        { name: "Karuna More", time: "10:30 AM" },
        { name: "Hrishikesh Sawant", time: "6:00 PM" }
      ]},
      { day: 15, devotees: [
        { name: "Yashraj Kulkarni", time: "8:00 AM" },
        { name: "Tanvi Ghadge", time: "10:30 AM" },
        { name: "Sanket Jangam", time: "6:00 PM" }
      ]},
      { day: 16, devotees: [
        { name: "Prasad Shinde", time: "8:00 AM" },
        { name: "Snehal Pawar", time: "10:30 AM" },
        { name: "Omkar Bhoir", time: "6:00 PM" }
      ]},
      { day: 17, devotees: [
        { name: "Ajay More", time: "8:00 AM" },
        { name: "Gargi Apte", time: "10:30 AM" },
        { name: "Shrikant Bhalerao", time: "6:00 PM" }
      ]},
      { day: 18, devotees: [
        { name: "Nitin Shinde", time: "8:00 AM" },
        { name: "Sarika Chavan", time: "10:30 AM" },
        { name: "Milind Kolekar", time: "6:00 PM" }
      ]},
      { day: 19, devotees: [
        { name: "Kailas Kadam", time: "8:00 AM" },
        { name: "Ashwini Patil", time: "10:30 AM" },
        { name: "Roshan More", time: "6:00 PM" }
      ]},
      { day: 20, devotees: [
        { name: "Mahesh Shinde", time: "8:00 AM" },
        { name: "Komal Jadhav", time: "10:30 AM" },
        { name: "Shubham Mane", time: "6:00 PM" }
      ]},
      { day: 21, devotees: [
        { name: "Rakesh Pawar", time: "8:00 AM" },
        { name: "Bhagyashree Thorat", time: "10:30 AM" },
        { name: "Amey Kulkarni", time: "6:00 PM" }
      ]},
      { day: 22, devotees: [
        { name: "Sanjay Ghadge", time: "8:00 AM" },
        { name: "Janhavi Shinde", time: "10:30 AM" },
        { name: "Prathamesh Gaikwad", time: "6:00 PM" }
      ]},
      { day: 23, devotees: [
        { name: "Deepak Shelar", time: "8:00 AM" },
        { name: "Madhuri Nikam", time: "10:30 AM" },
        { name: "Vaibhav Chavan", time: "6:00 PM" }
      ]},
      { day: 24, devotees: [
        { name: "Ketan Patil", time: "8:00 AM" },
        { name: "Ankita More", time: "10:30 AM" },
        { name: "Sourabh Jagtap", time: "6:00 PM" }
      ]},
      { day: 25, devotees: [
        { name: "Amar Shinde", time: "8:00 AM" },
        { name: "Prachi Pawar", time: "10:30 AM" },
        { name: "Nitin Koli", time: "6:00 PM" }
      ]},
      { day: 26, devotees: [
        { name: "Vishal Bhosale", time: "8:00 AM" },
        { name: "Neha Ghadge", time: "10:30 AM" },
        { name: "Dhananjay Rane", time: "6:00 PM" }
      ]},
      { day: 27, devotees: [
        { name: "Sagar Patil", time: "8:00 AM" },
        { name: "Sayali Chavan", time: "10:30 AM" },
        { name: "Kiran Mane", time: "6:00 PM" }
      ]},
      { day: 28, devotees: [
        { name: "Rupesh Jadhav", time: "8:00 AM" },
        { name: "Nandini Shinde", time: "10:30 AM" },
        { name: "Tejas Deshmukh", time: "6:00 PM" }
      ]},
      { day: 29, devotees: [
        { name: "Ashok Pawar", time: "8:00 AM" },
        { name: "Lina Kamble", time: "10:30 AM" },
        { name: "Rohit Jagtap", time: "6:00 PM" }
      ]},
      { day: 30, devotees: [
        { name: "Sharad Kadam", time: "8:00 AM" },
        { name: "Pallavi More", time: "10:30 AM" },
        { name: "Suyog Chorage", time: "6:00 PM" }
      ]},
      { day: 31, devotees: [
        { name: "Vikas Patil", time: "8:00 AM" },
        { name: "Geeta Jadhav", time: "10:30 AM" },
        { name: "Manoj Gaikwad", time: "6:00 PM" }
      ]}
    ];
  }, []);
};

export const DarshanCalendar = () => {
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const calendarData = useCalendarData();

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">

        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            दर्शन दिनदर्शिका
          </h2>
          <div className="w-24 h-1 bg-gradient-divine mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            स्वामी समर्थांच्या दर्शनासाठी मासिक वेळापत्रक
          </p>
        </div>

        <Card className="p-6 md:p-8 bg-card rounded-2xl shadow-sm">
          <div className="grid grid-cols-5 sm:grid-cols-7 gap-3 md:gap-4">
            {calendarData.map((dayData) => (
              <button
                key={dayData.day}
                onClick={() => setSelectedDay(dayData)}
                className="
                  aspect-square flex items-center justify-center 
                  text-lg font-semibold rounded-xl 
                  bg-gradient-peaceful hover:bg-gradient-divine hover:text-white
                  transition-all duration-300 hover:scale-105 hover:shadow-divine
                  border border-primary/20
                "
              >
                {dayData.day}
              </button>
            ))}
          </div>
        </Card>

        <Dialog open={selectedDay !== null} onOpenChange={() => setSelectedDay(null)}>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">
                दिवस {selectedDay?.day} - दर्शन वेळापत्रक
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {selectedDay?.devotees.map((devotee, index) => (
                <Card key={index} className="p-4 bg-muted/50 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-foreground">{devotee.name}</p>
                      <p className="text-sm text-muted-foreground">भक्त</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-primary">{devotee.time}</p>
                      <p className="text-xs text-muted-foreground">दर्शन वेळ</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
};
