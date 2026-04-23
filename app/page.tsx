import CustomJewelryStrip from "@/components/CustomJewelryStrip";
import FeaturesStrip from "@/components/FeaturesStrip";
import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import Shop from "@/components/Shop";
import { fetchStoreCategories } from "@/lib/categories";
import { fetchProducts } from "@/lib/product";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchStoreCategories(),
  ]);

  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="mt-10 px-5 lg:max-w-7xl lg:mx-auto overflow-x-hidden bg-background">
        <div>
          <Shop categories={categories} />
        </div>
        <CustomJewelryStrip />
        {products.length > 0 ? <ProductSections products={products} /> : null}
      </div>
      <div className="mx-0">
        <FeaturesStrip />
      </div>
    </>
  );
}
