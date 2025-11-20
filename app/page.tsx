import Hero from "@/components/Hero";
import Shop from "@/components/Shop";
import { categories } from "@/lib/constants";

export default function Home() {
  return (
    <div className="mt-30 px-5 md:px-40">
      <div>
        <Hero />
      </div>
      <div>
        <Shop />
      </div>
    </div>
  );
}
