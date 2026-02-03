import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/product";

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <section className="min-h-screen px-6 md:px-10 max-w-7xl mx-auto py-10 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
