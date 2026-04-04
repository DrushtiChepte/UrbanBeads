import CustomJewelryStrip from "@/components/CustomJewelryStrip";
import FeaturesStrip from "@/components/FeaturesStrip";
import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import Shop from "@/components/Shop";
import { fetchProducts } from "@/lib/product";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="mt-10 px-5 lg:max-w-7xl lg:mx-auto overflow-x-hidden bg-background">
        <div>
          <Shop />
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
