import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/product";

export const dynamic = "force-dynamic";

const normalizeSearchText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[-_/]+/g, " ")
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      if (word.endsWith("ies") && word.length > 3) {
        return `${word.slice(0, -3)}y`;
      }

      if (word.endsWith("es") && word.length > 4) {
        return word.slice(0, -2);
      }

      if (word.endsWith("s") && word.length > 3) {
        return word.slice(0, -1);
      }

      return word;
    })
    .join(" ");

interface ProductsPageProps {
  searchParams?: Promise<{
    q?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const products = await fetchProducts();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const query = resolvedSearchParams.q?.trim() ?? "";
  const normalizedQuery = normalizeSearchText(query);

  if (!products) {
    return <div>Something went wrong</div>;
  }

  const filteredProducts = normalizedQuery
    ? products.filter((product) =>
        [
          product.title,
          product.primary_category,
          product.slug,
          ...product.categories,
        ].some((value) =>
          normalizeSearchText(value).includes(normalizedQuery),
        ),
      )
    : products;

  return (
    <section className="min-h-screen px-4 md:px-10 max-w-7xl mx-auto py-10 mt-20">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-brown/60">
          UrbanBeads collection
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-primary font-semibold text-brown">
          {query ? `Search results for "${query}"` : "Shop all handcrafted pieces"}
        </h1>
        {query ? (
          <p className="mt-3 text-sm text-brown/70">
            {filteredProducts.length} piece
            {filteredProducts.length === 1 ? "" : "s"} found
          </p>
        ) : null}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <p className="text-lg text-brown font-medium">
              No matching pieces found
            </p>

            <p className="text-sm text-brown/60 mt-2">
              Try a different search term or explore our latest pieces.
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))
        )}
      </div>
    </section>
  );
}
