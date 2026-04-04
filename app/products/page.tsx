import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/product";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await fetchProducts();
  if (!products) {
    return <div>Something went wrong</div>;
  }

  return (
    <section className="min-h-screen px-4 md:px-10 max-w-7xl mx-auto py-10 mt-20">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-brown/60">
          UrbanBeads collection
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-primary font-semibold text-brown">
          Shop all handcrafted pieces
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1">
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
