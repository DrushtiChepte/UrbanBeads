import FeatureSection from "@/components/FeatureSection";
import FeaturesStrip from "@/components/FeaturesStrip";
import Hero from "@/components/Hero";
import Shop from "@/components/Shop";
import { categories } from "@/lib/constants";

export default function Home() {
  return (
    <div className="mt-30 px-5 md:px-40 overflow-x-hidden">
      <div>
        <Hero />
      </div>
      <div>
        <Shop />
      </div>
      <div>
        <FeatureSection
          section={"featured products"}
          title={["Featured Photos", "New Arrivals", "Best Sellers", "On Sale"]}
          photosURL={[
            "/images/placeholder.png",
            "/images/placeholder.png",
            "/images/placeholder.png",
            "/images/placeholder.png",
          ]}
        />
        <FeatureSection
          section={"popular products"}
          title={["Featured Photos", "New Arrivals", "Best Sellers", "On Sale"]}
          photosURL={[
            "/images/placeholder.png",
            "/images/placeholder.png",
            "/images/placeholder.png",
            "/images/placeholder.png",
          ]}
        />
      </div>
      <div>
        <FeaturesStrip />
      </div>
    </div>
  );
}
