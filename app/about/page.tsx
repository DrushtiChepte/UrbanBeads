"use client";

import Image from "next/image";

const About = () => {
  return (
    <section className="relative w-full min-h-screen mt-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/about-bg.png"
          alt="About Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        {/*Title */}
        <div className="text-center max-w-3xl mx-auto mb-5">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-wide mb-4 text-brown">
            UrbanBeads Story
          </h2>
          <p className="text-sm md:text-lg text-brown/90 leading-relaxed">
            Urban Beads was born out of creativity, curiosity, and a shared
            drive to build something of our own. What started as a college
            business fair idea soon turned into a journey we chose to continue
            growing, experimenting, and creating together every step of the way.
          </p>
        </div>

        {/* Story */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-brown/90 leading-relaxed text-sm md:text-base">
            Founded on 6th April 2023, Urban Beads reflects a blend of
            individuality and collaboration. With backgrounds in finance and
            marketing, we bring both structure and storytelling into everything
            we create — balancing creativity with purpose.
            <br />
            <br />
            More than just a brand, Urban Beads is a space where ideas come to
            life, where style meets personality, and where every piece carries a
            part of our journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Preeti */}
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
            {/* Profile Image */}
            <img
              src="/images/profile2.jpg"
              alt="Preeti"
              className="w-40 rounded-full object-cover mb-4 border-4 border-white shadow-md"
            />

            {/* Name */}
            <h3 className="text-2xl font-semibold text-brown">Preeti</h3>

            {/* Role */}
            <span className="text-xs uppercase tracking-widest text-gray-500 mt-1">
              Co-Founder
            </span>
            <div className="w-10 h-0.5 bg-brown/30 my-4"></div>

            {/* Description */}
            <p className="text-sm text-gray-700 leading-relaxed">
              A finance student with a natural flair for both numbers and
              creativity, Preeti drives the business side of Urban Beads. From
              managing finances to overseeing operations, she ensures everything
              runs smoothly while contributing thoughtfully to the creative
              process.
            </p>
          </div>

          {/* Mandira */}
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
            <img
              src="/images/profile1.jpg"
              alt="Preeti"
              className="w-40 rounded-full object-cover mb-4 border-4 border-white shadow-md"
            />
            <h3 className="text-2xl font-semibold mb-1 text-brown">Mandira</h3>
            <span className="text-xs uppercase tracking-widest text-gray-500">
              Co-Founder
            </span>
            <div className="w-10 h-0.5 bg-brown/30 my-4"></div>
            <p className="text-sm text-gray-700 mt-4 leading-relaxed">
              A marketing student driven by creativity and expression, Mandira
              shapes the voice and vision of Urban Beads. From branding to
              communication, she transforms ideas into meaningful experiences
              that connect with people.
            </p>
          </div>
        </div>

        {/* Together + Brand (highlight section) */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Together */}
          <div className="bg-[#eae3d2]/90 backdrop-blur-md p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-1 text-brown">Together</h3>
            <span className="text-xs uppercase tracking-widest text-gray-500">
              Our Journey
            </span>
            <p className="text-sm text-gray-700 mt-4 leading-relaxed">
              With a blend of finance and marketing, structure and storytelling,
              we built Urban Beads from a simple idea into something meaningful.
              Every piece reflects our creativity, passion, and journey.
            </p>
          </div>

          {/* Brand */}
          <div className="bg-[#eae3d2]/90 backdrop-blur-md p-8 rounded-3xl shadow-md hover:shadow-xl transition border border-brown/10">
            <h3 className="text-xl font-semibold mb-1 text-brown">
              Urban Beads
            </h3>
            <span className="text-xs uppercase tracking-widest text-gray-600">
              Since 2023
            </span>
            <p className="text-sm text-gray-800 mt-4 leading-relaxed">
              A brand where style meets personality — blending modern aesthetics
              with handcrafted charm to create timeless pieces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
