import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Teachings } from "@/components/Teachings";
import { Prayer } from "@/components/Prayer";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Hero setSidebarOpen={setSidebarOpen} />
    </>
  );
}