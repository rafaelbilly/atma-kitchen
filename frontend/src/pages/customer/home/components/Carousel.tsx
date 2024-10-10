import { MoveLeft, MoveRight } from "lucide-react";

type CarouselProps = {
  images: string[];
};

export default function Carousel(prop: CarouselProps) {
  console.log(prop.images.length);
  return (
    <div className="carousel w-full">
      {prop.images.map((image, index) => (
        <div
          id={`slide${index + 1}`}
          className="carousel-item relative w-full"
          key={index}
        >
          <img src={image} className="w-full max-h-screen" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={
                index === 0 ? `#slide${prop.images.length}` : "#slide" + index
              }
              className="btn btn-circle bg-transparent border border-transparent"
            >
              <MoveLeft size={32} strokeWidth={1.5} className="text-black" />
            </a>
            <a
              href={
                index === prop.images.length - 1
                  ? "#slide1"
                  : "#slide" + (index + 2)
              }
              className="btn btn-circle bg-transparent border border-transparent"
            >
              <MoveRight size={32} strokeWidth={1.5} className="text-black" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
