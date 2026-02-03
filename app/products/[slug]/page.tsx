interface PageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Category: {params.slug}</h1>
    </div>
  );
}
