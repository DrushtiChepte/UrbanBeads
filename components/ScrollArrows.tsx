import { Button } from "./ui/button";

interface ScrollArrowsProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const ScrollArrows = ({ containerRef }: ScrollArrowsProps) => {
  const scrollLeft = () => {
    containerRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex justify-between items-center mt-2 z-50">
      <Button onClick={scrollLeft} className="scroll-arrows">
        <img src="/left-arrow.svg" alt="left arrow" className="h-5 w-5" />
      </Button>

      <Button onClick={scrollRight} className="scroll-arrows">
        <img src="/right-arrow.svg" alt="right arrow" className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ScrollArrows;
