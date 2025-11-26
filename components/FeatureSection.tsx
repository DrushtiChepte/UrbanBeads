import Image from "next/image";

interface FeatureSectionProps {
  section: string;
  title: string[];
  photosURL: string[];
}

const FeatureSection = (props: FeatureSectionProps) => {
  return (
    <div className="my-20 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <span className="heading text-brown/80">{props.section}</span>
        <span className="cursor-pointer italic">View all</span>
      </div>
      <div className="relative overflow-x-hidden">
        <div className="flex snap-x snap-mandatory overflow-x-auto gap-5 py-5 scroll-smooth scrollbar-hide">
          {props.title.map((title, photo) => (
            <div
              className="card snap-start rounded-lg overflow-hidden shrink-0 w-[90%] md:w-70 cursor-pointer"
              key={title}
            >
              <Image
                src={props.photosURL[photo]}
                alt={title}
                height={600}
                width={500}
              />
              <span>{title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
