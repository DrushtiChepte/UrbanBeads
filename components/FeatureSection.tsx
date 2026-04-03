import Image from "next/image";
import Link from "next/link";

type FeatureItem = {
  title: string;
  image: string;
  href: string;
  price?: number;
};

interface FeatureSectionProps {
  section: string;
  subTitle?: string;
  items: FeatureItem[];
}

const FeatureSection = ({ section, subTitle, items }: FeatureSectionProps) => {
  return (
    <div className="my-15 lg:my-20 ">
      <div className="flex flex-col my-5 lg:my-10">
        <span className="heading text-brown text-center block fade-up">
          {section}
        </span>
        <span className="text-brown/80 text-center block fade-up">
          {subTitle}
        </span>
      </div>
      <div className="relative overflow-x-auto no-scrollbar">
        <div className="flex lg:items-center lg:justify-center snap-x snap-mandatory overflow-x-auto gap-3 scroll-smooth py-5">
          {items.map((item) => (
            <div
              className="card snap-start shrink-0 w-[90%] md:w-80 lg:w-70"
              key={item.href}
            >
              <Link href={item.href} className="block cursor-pointer fade-up">
                <div className="relative aspect-4/5 mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-brown text-md font-semibold px-1 line-clamp-1">
                  {item.title}
                </span>
                {item.price ? (
                  <p className="px-1 mt-1 text-sm font-semibold text-brown/70">
                    Rs. {item.price}
                  </p>
                ) : null}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
