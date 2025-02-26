import Hero from "@/components/Home/Hero";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <div className="h-screen hero-section">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}
