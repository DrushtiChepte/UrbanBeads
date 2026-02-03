import FeatureSection from "@/components/FeatureSection";
import FeaturesStrip from "@/components/FeaturesStrip";
import Hero from "@/components/Hero";
import Shop from "@/components/Shop";

export default function Home() {
  return (
    <>
      <div className="mt-30 px-5 lg:max-w-7xl lg:mx-auto overflow-x-hidden">
        <div>
          <Hero />
        </div>
        <div>
          <Shop />
        </div>
        <div className="scrollbar-hidden">
          <FeatureSection
            section={"Best Sellers"}
            subTitle="The Favorites Everyone's Talking About."
            productName={[
              "Featured Photos",
              "New Arrivals",
              "Best Sellers",
              "On Sale",
            ]}
            photosURL={[
              "/images/placeholder.png",
              "/images/placeholder.png",
              "/images/placeholder.png",
              "/images/placeholder.png",
            ]}
          />
          <FeatureSection
            section={"Popular products"}
            productName={[
              "Featured Photos",
              "New Arrivals",
              "Best Sellers",
              "On Sale",
            ]}
            photosURL={[
              "/images/placeholder.png",
              "/images/placeholder.png",
              "/images/placeholder.png",
              "/images/placeholder.png",
            ]}
          />
        </div>
      </div>
      <div className="mx-0">
        <FeaturesStrip />
      </div>
    </>
  );
}
