import Hero from "@/components/Home/Hero";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen hero-section">
      <Navbar />
      <Hero />
    </div>
  );
}
