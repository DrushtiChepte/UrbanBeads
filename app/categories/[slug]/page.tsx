import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/product";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const products = await fetchProducts();

  const filteredProducts =
    slug === "all" ? products : products.filter((p) => p.category === slug);
  console.log("slug:", slug);

  return (
    <main className="mt-30 px-5 lg:max-w-7xl lg:mx-auto min-h-screen text-brown">
      {/* Heading */}
      <h1 className="text-3xl font-bold capitalize mb-8">{slug} Collection</h1>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <p className="text-lg text-brown font-medium">
              Nothing here yet ✨
            </p>

            <p className="text-sm text-brown/60 mt-2">
              Try a different category or explore our latest pieces.
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))
        )}
      </div>
    </main>
  );
}
