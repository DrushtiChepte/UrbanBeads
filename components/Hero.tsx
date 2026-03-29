import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <main className="relative h-hero w-full overflow-hidden flex items-center justify-center mt-20">
      {/* Background Image */}
      <Image
        src="/images/hero.png"
        alt="Urban Beads Jewelry"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center gap-6 animate-fadeUp">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white drop-shadow-lg leading-tight">
          Effortless Elegance
        </h1>

        {/* Subheading */}
        <p className="text-sm md:text-lg text-white/90 drop-shadow-md max-w-xl">
          Handcrafted pieces designed to elevate your everyday style.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-4">
          <Link href="/products">
            <Button className="bg-white text-brown px-6 py-3 rounded-full hover:bg-beige transition duration-300 shadow-lg">
              Shop Collection
            </Button>
          </Link>

          <Link href="/about">
            <Button
              variant="outline"
              className="border-white text-brown px-6 py-3 rounded-full hover:bg-beige transition duration-300"
            >
              Explore More
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Hero;
