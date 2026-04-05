import ProductView from "@/components/ProductView";
import { fetchProducts, getPrimaryCategory } from "@/lib/product";

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
    (product) =>
      product.slug === slug && getPrimaryCategory(product) === category,
  );

  if (!product) {
    return <div className="p-10 mt-40">Product not found</div>;
  }

  return <ProductView product={product} />;
}
