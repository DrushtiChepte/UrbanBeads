import { fetchProducts } from "@/lib/product";
import Image from "next/image";

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

  return (
    <div className="mt-40 px-5 lg:max-w-7xl lg:mx-auto min-h-screen text-brown">
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT: Images */}
        <div className="grid grid-cols-2 gap-4">
          {product.images?.map((img: string, i: number) => (
            <div key={i} className="relative w-full aspect-square">
              <Image
                src={img}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* RIGHT: Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-xl font-medium">₹{product.price}</p>

          <p className="text-sm text-gray-600">
            Handcrafted jewelry designed to elevate your everyday style.
          </p>

          <button className="bg-brown text-white py-3 rounded-md mt-4 hover:bg-brown/90 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
