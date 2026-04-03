import FeatureSection from "@/components/FeatureSection";
import { Product } from "@/lib/product";

type ProductSectionsProps = {
  products: Product[];
};

export default function ProductSections({ products }: ProductSectionsProps) {
  const newArrivals = products.slice(0, 4);
  const browseMore = [...products]
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, 4);

  return (
    <div className="space-y-4">
      <FeatureSection
        section="New Arrivals"
        subTitle="Fresh handcrafted drops, ready to style every day."
        items={newArrivals.map((product) => ({
          title: product.title,
          image: product.images?.[0] || "/images/placeholder.png",
          href: `/products/${product.category}/${product.slug}`,
          price: product.price,
        }))}
      />
      <FeatureSection
        section="Browse the Collection"
        subTitle="A closer look at versatile pieces across the UrbanBeads range."
        items={browseMore.map((product) => ({
          title: product.title,
          image: product.images?.[0] || "/images/placeholder.png",
          href: `/products/${product.category}/${product.slug}`,
          price: product.price,
        }))}
      />
    </div>
  );
}
