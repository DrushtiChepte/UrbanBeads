"use client";

import { featuresList } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

export default function FeaturesStrip() {
  const AUTO_SLIDE_MS = 2500;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = (index: number) => {
    setActiveIndex((index + featuresList.length) % featuresList.length);
  };

  const next = () =>
    setActiveIndex((currentIndex) => (currentIndex + 1) % featuresList.length);
  const prev = () =>
    setActiveIndex(
      (currentIndex) =>
        (currentIndex - 1 + featuresList.length) % featuresList.length,
    );

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      next();
    }, AUTO_SLIDE_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeIndex, AUTO_SLIDE_MS]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40;
    if (diff > threshold) next();
    if (diff < -threshold) prev();
  };
  return (
    <section className="py-10 my-20 bg-[#ddd8c6]">
      <div className="hidden md:grid grid-cols-6 gap-6 max-w-6xl mx-auto">
        {featuresList.map((f) => (
          <div key={f.title} className="flex flex-col items-center gap-3">
            <div className="text-4xl mb-1 text-rose-500">{f.icon}</div>
            <h4 className="text-sm font-semibold">{f.title}</h4>
            <p className="text-xs text-neutral-500 px-6 text-center">
              {f.subtitle}
            </p>
          </div>
        ))}
      </div>
      <div className="md:hidden">
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {featuresList.map((f) => (
              <div
                key={f.title}
                className="min-w-full flex flex-col items-center gap-3 py-6"
              >
                <div className="text-4xl mb-1 text-rose-500">{f.icon}</div>
                <h4 className="text-sm font-semibold">{f.title}</h4>
                <p className="text-xs text-neutral-500 px-6 text-center">
                  {f.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {featuresList.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === activeIndex ? "w-4 bg-rose-500" : "bg-neutral-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
