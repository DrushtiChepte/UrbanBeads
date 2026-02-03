import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <main className="h-[80vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero.png"
        alt="Urban Beads Hero"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4 fade-up">
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-beige">
          Welcome to UrbanBeads
        </h1>

        <Link href="/products">
          <Button className="bg-white text-black hover:bg-beige transition">
            Shop Now
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default Hero;
