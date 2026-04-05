import React from "react";
import { ChevronDown } from "lucide-react";
import { ProductDetails } from "@/lib/constants";

export default function ProductAccordion() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="mt-6 border-t border-brown/10">
      {ProductDetails.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <div key={i} className="border-b border-brown/10">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <div className="flex items-center gap-3 text-brown/80">
                {item.icon}
                <span className="text-sm">{item.title}</span>
              </div>

              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-[32rem] opacity-100 pb-4" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm text-brown/60 leading-relaxed whitespace-pre-line pl-7 pr-2">
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
