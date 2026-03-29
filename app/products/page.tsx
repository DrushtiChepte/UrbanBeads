import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/product";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await fetchProducts();
  if (!products) {
    return <div>Something went wrong</div>;
  }

  return (
    <section className="min-h-screen px-6 md:px-10 max-w-7xl mx-auto py-10 mt-20">
      <Button className="w-full text-brown text-md font-semibold flex items-center py-10">
        <span>Filter</span>
        <img src="/down-arrow.svg" alt="arrow" className="w-5 h-5" />
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))
        )}
      </div>
    </section>
  );
}
