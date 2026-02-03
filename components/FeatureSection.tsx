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
    <div className="my-15 lg:my-20 ">
      <div className="flex flex-col my-5 lg:my-10">
        <span className="heading text-brown text-center block fade-up">
          {props.section}
        </span>
        <span className="text-brown/80 text-center block fade-up">
          {props.subTitle}
        </span>
      </div>
      <div className="relative overflow-x-auto no-scrollbar">
        <div className="flex lg:items-center lg:justify-center snap-x snap-mandatory overflow-x-auto gap-3 scroll-smooth py-5">
          {props.productName.map((title, photo) => (
            <div
              className="card snap-start shrink-0 w-[90%] md:w-80 lg:w-70"
              key={title}
            >
              <Link
                href={"product"}
                className=" cursor-pointer fade-up"
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
                <span className="text-brown text-lg px-1">{title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
