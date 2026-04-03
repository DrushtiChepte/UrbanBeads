import ProductView from "@/components/ProductView";
import { fetchProducts } from "@/lib/product";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, category } = await params;

  const products = await fetchProducts();

  const product = products.find(
    (p) => p.slug === slug && p.category === category,
  );

  if (!product) {
    return <div className="p-10 mt-40">Product not found</div>;
  }

  return <ProductView product={product} />;
}
