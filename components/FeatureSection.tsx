import Image from "next/image";
import Link from "next/link";

interface FeatureSectionProps {
  section: string;
  subTitle?: string;
  productName: string[];
  photosURL: string[];
}

const FeatureSection = (props: FeatureSectionProps) => {
  return (
    <div className="my-5 lg:my-10">
      <div className="flex flex-col my-10">
        <span className="heading mb-2 text-brown text-center block fade-up">
          {props.section}
        </span>
        <span className="text-brown/80 text-center block fade-up">
          {props.subTitle}
        </span>
      </div>
      <div className="relative overflow-x-auto no-scrollbar">
        <div className="flex snap-x snap-mandatory overflow-x-auto gap-3 scroll-smooth pb-10">
          {props.productName.map((title, photo) => (
            <Link
              href={"product"}
              className="card snap-start shrink-0 w-[90%] md:w-80 lg:w-70 cursor-pointer"
              key={title}
            >
              <div className="relative aspect-4/5 mb-4">
                <Image
                  src={props.photosURL[photo]}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-brown text-lg">{title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
